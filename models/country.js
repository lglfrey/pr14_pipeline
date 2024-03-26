const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    /*phoneCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },*/
    logicalDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    freezeTableName: true,
});

//withLogicalDelete(sequelize)(Country);

module.exports = Country;
