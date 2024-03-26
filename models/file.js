const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const File = sequelize.define('File', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uri: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fileTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'FileType',
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

//withLogicalDelete(sequelize)(File);

module.exports = File;
