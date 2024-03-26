// genericController.js
const express = require('express');
const router = express.Router();
const Sequelize = require('../sequelize');
const User = require('../models/user');
const Cheque = require('../models/cheque');
const encryption = require('../security/encryption');

const genericController = (Model, action) => async (req, res) => {
    try {
        console.log(`Route for ${Model.name} - Action: ${req.method}`);

        // Объявляем options
        let options = {};

        if (req.method === 'GET') {
            options.include = getIncludeModels(Model);
        }

        switch (req.method) {
            case 'POST':
                const newRecord = await Model.create(req.body);
                res.json(newRecord);
                break;
            case 'GET':
                if (req.params.id) {
                    // Получение записи по идентификатору
                    let record = await Model.findByPk(req.params.id);
                    if (record) {
                        if (Model === User) {
                            record.phone = await encryption.decrypt(record.phone);
                        } else if (Model === Cheque) {
                            record.payment = await encryption.decrypt(record.payment);
                            record.accountNumber = await encryption.decrypt(record.accountNumber);
                        }
                        res.json(record);
                    } else {
                        res.status(404).json({ error: 'Record not found' });
                    }
                } else {
                    // Получение всех записей
                    let records;
                    if (Model === User) {
                        records = await Model.findAll();
                        for (const record of records) {
                            record.phone = await encryption.decrypt(record.phone);
                        }
                    } else if (Model === Cheque) {
                        records = await Model.findAll();
                        for (const record of records) {
                            record.payment = await encryption.decrypt(record.payment);
                            record.accountNumber = await encryption.decrypt(record.accountNumber);
                        }
                    } else {
                        // Получение всех записей
                        records = await Model.findAll();
                    }
                    res.json(records);
                }
                break;
            case 'PUT':
                const updatedRecord = await Model.update(req.body, { where: { id: req.params.id } });
                res.json(updatedRecord);
                break;
            case 'DELETE':
                const deletedRecord = await Model.destroy({ where: { id: req.params.id } });
                res.json({ message: 'Record deleted successfully' });
                break;
            case 'PATCH':
                if (action === 'logicalDelete' || action === 'logicalRestore') {
                    const logicalDeleteValue = action === 'logicalDelete';
                    const patchedRecord = await Model.update(
                        { logicalDelete: logicalDeleteValue },
                        { where: { id: req.params.id } }
                    );
                    res.json({ message: `Record ${logicalDeleteValue ? 'logically deleted' : 'restored'} successfully` });
                } else {
                    res.status(400).json({ error: 'Invalid PATCH action' });
                }
                break;
            default:
                res.status(400).json({ error: 'Unsupported HTTP method' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Функция для получения моделей, которые следует подтягивать
const getIncludeModels = (Model) => {
    const include = [];

    // Получаем информацию о связях
    const associations = Model.associations || {};

    Object.values(associations).forEach((association) => {
        // Добавляем связанные модели в массив include
        include.push({ model: association.target, as: association.as });
    });

    return include;
};

module.exports = genericController;
