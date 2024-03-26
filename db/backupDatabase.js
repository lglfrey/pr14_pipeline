const { exec } = require('child_process');
const path = require('path');
const dbConfig = require('../db.config');
const fs = require('fs');

const backupDatabase = async (req, res) => {
  try {
    // Настройте ваши данные для подключения к базе данных PostgreSQL
    const DBHOST = dbConfig.development.host;
    const DBPORT = dbConfig.development.port;
    const DBUSER = dbConfig.development.username;
    const DBDATABASE = dbConfig.development.database;
    const DBPASSWORD = dbConfig.development.password;

    // Задайте имя файла бэкапа с текущей датой и временем
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[-:]/g, '_');
    const backupFileName = `backup_${formattedDate}.sql`;


    // Путь к файлу бэкапа
    const backupDir = path.join(process.cwd(), 'backups');

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const backupFilePath = path.join(backupDir, backupFileName);

    console.log(`Backup path is : ${backupFilePath}, -h ${DBHOST} -p ${DBPORT} -U ${DBUSER} -d ${DBDATABASE}`);

    // Устанавливаем переменную окружения PGPASSWORD
    process.env.PGPASSWORD = DBPASSWORD;

    // Команда для создания бэкапа
    const backupCommand = `pg_dump -h ${DBHOST} -p ${DBPORT} -U ${DBUSER} -d ${DBDATABASE} -Fc -b -v -f "${backupFilePath}"`;

    // Выполнение команды
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating backup: ${stderr}`);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      process.env.PGPASSWORD = '';

      console.log(`Backup created successfully: ${backupFilePath}`);
      res.status(200).json({ message: 'Backup created successfully', filePath: backupFilePath });
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { backupDatabase };
