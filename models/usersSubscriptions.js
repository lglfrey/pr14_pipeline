const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const UsersSubscriptions = sequelize.define('UsersSubscriptions', {
    beginDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Subscription',
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

//withLogicalDelete(sequelize)(UserSubscriptions);

module.exports = UsersSubscriptions;
