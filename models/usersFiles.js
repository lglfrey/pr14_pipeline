const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const UsersFiles = sequelize.define('UsersFiles', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    fileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'File',
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

//withLogicalDelete(sequelize)(UsersFiles);

module.exports = UsersFiles;
