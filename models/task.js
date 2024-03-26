const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const Task = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    advance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    startDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            id: 'id',
        },
    },
    workerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            id: 'id'
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

//withLogicalDelete(sequelize)(Task);

module.exports = Task;
