const fs = require('fs');
const path = require('path');

const getBackupFileNames = (req, res) => {
  try {
    const backupDir = path.join(process.cwd(), 'backups');

    // Проверяем существование папки
    if (!fs.existsSync(backupDir)) {
      return res.status(404).json({ error: 'Backup folder not found' });
    }

    // Получаем имена файлов в папке
    const fileNames = fs.readdirSync(backupDir);

    // Отправляем имена файлов в формате JSON
    res.status(200).json({ fileNames });
  } catch (error) {
    console.error('Error getting backup file names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getBackupFileNames };
