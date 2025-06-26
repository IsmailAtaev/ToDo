const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Schema = sequelize.define('todo', {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true, defaultValue: DataTypes.UUIDV4 },
        title: { type: DataTypes.STRING(30), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
    }, {
        charset: 'UTF-8',
        timestamps: true,
    });
    return Schema;
}