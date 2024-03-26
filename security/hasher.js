const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function hashData(data) {
    try {
        const hash = await bcrypt.hash(data, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error hashing data:', error);
        throw new Error('Error hashing data');
    }
}

async function compareHash(data, hashedData) {
    try {
        const match = await bcrypt.compare(data, hashedData);
        return match;
    } catch (error) {
        console.error('Error comparing hash:', error);
        throw new Error('Error comparing hash');
    }
}

module.exports = { hashData, compareHash };