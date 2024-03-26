const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const SubscriptionType = sequelize.define('SubscriptionType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logicalDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    freezeTableName: true,
});

//withLogicalDelete(sequelize)(SubscriptionType);

module.exports = SubscriptionType;
