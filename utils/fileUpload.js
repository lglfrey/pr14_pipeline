const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Функция для настройки Multer
const configureMulter = (uploadDir) => {
    // Проверка существования директории
    if (!fs.existsSync(uploadDir)) {
        // Если директория не существует, создаем ее
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const uniqueIdentifier = Date.now();
                const fileName = `${uniqueIdentifier}_${req.body.name}`;
                const uri = path.join(uploadDir, fileName);
                cb(null, fileName);
                req.body.uri = uri; // Добавляем uri в req.body
            },
        }),
        fileFilter: (req, file, cb) => {
            console.log('File received:'.green, file.green);
            // Проверка, является ли файл ZIP или RAR архивом
            if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-rar-compressed') {
                cb(null, true);
            } else {
                cb(new Error('Only ZIP and RAR archives are allowed!'), false);
            }
        },
    });
};

module.exports = { configureMulter };
