const crypto = require('crypto');
const keyGen = require('./keyGen');
require('dotenv').config();

const algorithm = 'aes-256-cbc';


function encrypt(data) {
    const key = keyGen.getKey(); // Убедитесь, что у вас есть безопасный ключ
    const iv = crypto.randomBytes(16);
    console.log('Generated IV:', iv.toString('hex')); // Добавим этот лог
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(data) {
    const key = keyGen.getKey(); // Убедитесь, что у вас есть безопасный ключ

    // Разбиваем строку на IV и зашифрованные данные
    const [iv, encrypted] = data.split(':');

    try {
        // Преобразуем IV и ключ из строк в буферы
        const ivBuffer = Buffer.from(iv, 'hex');
        const keyBuffer = Buffer.from(key, 'hex');

        // Убедимся, что IV имеет правильную длину
        if (ivBuffer.length !== 16) {
            throw new Error('Invalid IV length');
        }

        // Используем IV и ключ при создании объекта Decipheriv
        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);

        // Дешифруем данные
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        
        return decrypted;
    } catch (error) {
        console.error('Error decrypting data:', error);
        throw new Error('Decryption failed');
    }
}




module.exports = { encrypt, decrypt };
