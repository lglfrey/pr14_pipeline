const fs = require('fs');
const crypto = require('crypto');

function generateKey() {
    try {
        // Чтение текущего значения SECURITY_KEY из файла .env
        const envContent = fs.readFileSync('.env', 'utf-8');

        // Генерация нового безопасного ключа
        const newSecureKey = crypto.randomBytes(32).toString('hex');

        // Формирование нового значения SECURITY_KEY
        const updatedSecurityKey = `${envContent.trim()},${newSecureKey}`;

        // Обновление файла .env с новым значением SECURITY_KEY
        fs.writeFileSync('.env', updatedSecurityKey);

        console.log('New Security Key added to .env');
    } catch (error) {
        console.error('Error generating or updating Security Key:', error);
    }
}

function getKey() {
    try {
        // Чтение текущего значения SECURITY_KEY из файла .env
        const envContent = fs.readFileSync('.env', 'utf-8');

        // Разделение содержимого файла по символу "," и удаление лишних пробелов
        const keys = envContent.trim().split(',');

        // Получение последнего ключа без лишних пробелов
        const lastKey = keys[keys.length - 1].trim();
        return lastKey;
    } catch (error) {
        console.error('Error getting Security Key:', error);
    }
}

module.exports = { generateKey, getKey };
