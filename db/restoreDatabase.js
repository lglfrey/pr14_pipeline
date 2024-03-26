const { exec } = require('child_process');
const path = require('path');
const dbConfig = require('../db.config');
const fs = require('fs');

const restoreDatabase = async (req, res) => {
  try {
    // Настройте ваши данные для подключения к базе данных PostgreSQL
    const DBHOST = dbConfig.development.host;
    const DBPORT = dbConfig.development.port;
    const DBUSER = dbConfig.development.username;
    const DBDATABASE = dbConfig.development.database;
    const DBPASSWORD = dbConfig.development.password;

    // Задайте имя файла бэкапа для восстановления (ваш запрос должен передавать это имя)
    const backupFileName = req.body.fileName; // Предположим, что вы передаете имя файла через тело запроса

    // Путь к файлу бэкапа
    const backupDir = path.join(process.cwd(), 'backups');
    const backupFilePath = path.join(backupDir, backupFileName);

    // Устанавливаем переменную окружения PGPASSWORD
    process.env.PGPASSWORD = DBPASSWORD;

    // Команда для восстановления бэкапа с опцией -c (force)
    const restoreCommand = `pg_restore -h ${DBHOST} -p ${DBPORT} -U ${DBUSER} -d ${DBDATABASE} --clean -v "${backupFilePath}"`;

    // Выполнение команды
    exec(restoreCommand, (error, stdout, stderr) => {
      // После выполнения команды сбрасываем PGPASSWORD
      process.env.PGPASSWORD = '';

      if (error) {
        console.error(`Error restoring backup: ${stderr}`);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log(`Backup restored successfully: ${backupFilePath}`);
      res.status(200).json({ message: 'Backup restored successfully' });
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { restoreDatabase };
