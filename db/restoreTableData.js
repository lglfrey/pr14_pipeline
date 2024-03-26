const { exec } = require('child_process');
const path = require('path');
const dbConfig = require('../db.config');
const sequelize = require('../sequelize');

const restoreTableData = async (req, res) => {
    try {
        // Получаем название таблицы из запроса
        const fileName = req.body.fileName;
        const tableName = req.body.tableName;

        // Проверяем, что таблица существует
        // (ваш способ проверки наличия таблицы, это может быть запрос к информационной схеме)
        const tableExists = async (tableName) => {
            try {
                const result = await sequelize.query(
                    'SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = :tableName);',
                    {
                        replacements: { tableName },
                        type: sequelize.QueryTypes.SELECT,
                    }
                );

                return result[0].exists;
            } catch (error) {
                console.error('Error checking table existence:', error);
                return false;
            }
        };

        const isTableExists = await tableExists(tableName);

        if (!isTableExists) {
            return res.status(400).json({ error: 'Table does not exist' });
        }

        // Путь к файлу бэкапа
        const restoreDir = path.join(process.cwd(), 'archives', `${tableName}`);
        const restoreFilePath = path.join(restoreDir, fileName);



        // Настройте ваши данные для подключения к базе данных PostgreSQL
        const DBHOST = dbConfig.development.host;
        const DBPORT = dbConfig.development.port;
        const DBUSER = dbConfig.development.username;
        const DBPASSWORD = dbConfig.development.password;
        const DBNAME = dbConfig.development.database;

        process.env.PGPASSWORD = DBPASSWORD;

        // Выполняем команду
        exec(`psql -h ${DBHOST} -p ${DBPORT} -U ${DBUSER} -d ${DBNAME} -c "COPY \\"${tableName}\\" FROM '${restoreFilePath}' WITH CSV HEADER;"`, (error, stdout, stderr) => {
            process.env.PGPASSWORD = '';

            if (error) {
                console.error(`Error restoring data: ${stderr}`);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log(`Data restored successfully for ${tableName}`);
            res.status(200).json({ message: 'Data restored successfully' });
        });
    } catch (error) {
        console.error('Error archiving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { restoreTableData };
