const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const ChequeType = sequelize.define('ChequeType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    logicalDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    freezeTableName: true,
});

//withLogicalDelete(sequelize)(ChequeType);

module.exports = ChequeType;
