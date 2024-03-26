const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const { withLogicalDelete } = require('../mixins');

const Journal = sequelize.define('Journal', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
    logicalDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'info', 
    }
}, {
    freezeTableName: true,
});

//withLogicalDelete(sequelize)(Subscription);

module.exports = Journal;
