const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const UserRole = sequelize.define('UserRole', {
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

//withLogicalDelete(sequelize)(UserRole);

module.exports = UserRole;
