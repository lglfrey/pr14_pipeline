const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const TaskJournal = sequelize.define('TaskJournal', {
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Task',
            key: 'id',
        },
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TaskStatus',
            key: 'id',
        },
    },
    logicalDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    freezeTableName: true,
});

//withLogicalDelete(sequelize)(TaskJournal);

module.exports = TaskJournal;
