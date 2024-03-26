const { exec } = require('child_process');
const path = require('path');
const dbConfig = require('../db.config');
const sequelize = require('../sequelize');
const fs = require('fs');

const archiveTableData = async (req, res) => {
    try {
        // Получаем название таблицы из запроса
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

        // Настройте ваши данные для подключения к базе данных PostgreSQL
        const DBHOST = dbConfig.development.host;
        const DBPORT = dbConfig.development.port;
        const DBUSER = dbConfig.development.username;
        const DBPASSWORD = dbConfig.development.password;
        const DBNAME = dbConfig.development.database;

        // Путь к файлу архива
        const archiveDir = path.join(process.cwd(), 'archives', `${tableName}`);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/[-:]/g, '_');
        const archiveFilePath = path.join(archiveDir, `${tableName}_${formattedDate}_archive.csv`);

        if (!fs.existsSync(archiveDir)) {
            fs.mkdirSync(archiveDir);
        }

        process.env.PGPASSWORD = DBPASSWORD;

        // Выполняем команду
        exec(`psql -h ${DBHOST} -p ${DBPORT} -U ${DBUSER} -d ${DBNAME} -c "COPY (SELECT * FROM \\"${tableName}\\" WHERE \\"logicalDelete\\" = true) TO '${archiveFilePath}' WITH CSV HEADER;"`, (error, stdout, stderr) => {
            process.env.PGPASSWORD = ''; // Сбрасываем PGPASSWORD после выполнения команды

            if (error) {
                console.error(`Error archiving data: ${stderr}`);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Теперь, когда архивация прошла успешно, удаляем данные из таблицы
            sequelize.query(
                `DELETE FROM "${tableName}" WHERE "logicalDelete" = true;`,
                { type: sequelize.QueryTypes.DELETE }
            )
                .then(() => {
                    console.log(`Data deleted successfully from ${tableName}`);
                    res.status(200).json({ message: 'Data archived and deleted successfully' });
                })
                .catch((deleteError) => {
                    console.error('Error deleting data:', deleteError);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        });
    } catch (error) {
        console.error('Error archiving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { archiveTableData };
