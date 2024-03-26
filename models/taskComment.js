const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const TaskComment = sequelize.define('TaskComment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Task',
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

//withLogicalDelete(sequelize)(TaskComment);

module.exports = TaskComment;
