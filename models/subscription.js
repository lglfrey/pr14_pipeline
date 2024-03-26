const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const Subscription = sequelize.define('Subscription', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscriptionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'SubscriptionType',
            key: 'id',
        },
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Country',
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

//withLogicalDelete(sequelize)(Subscription);

module.exports = Subscription;
