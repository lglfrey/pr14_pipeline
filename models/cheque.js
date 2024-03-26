const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const Cheque = sequelize.define('Cheque', {
    payment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    chequeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ChequeType',
            key: 'id',
        },
    },
    logicalDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    freezeTableName: true,
});

//withLogicalDelete(sequelize)(Cheque);

module.exports = Cheque;
