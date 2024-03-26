const fs = require('fs');
const path = require('path');

const getArchiveFileNames = (req, res) => {
  try {
    const tableName = req.body.tableName;
    const restoreDir = path.join(process.cwd(), 'archives', `${tableName}`);

    // Проверяем существование папки
    if (!fs.existsSync(restoreDir)) {
      return res.status(404).json({ error: 'Archive folder not found' });
    }

    // Получаем имена файлов в папке
    const fileNames = fs.readdirSync(restoreDir);

    // Отправляем имена файлов в формате JSON
    res.status(200).json({ fileNames });
  } catch (error) {
    console.error('Error getting restore file names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getArchiveFileNames };
