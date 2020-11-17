const db = require(".");

module.exports = function (sequelize, DataTypes) {
    let SavedPet = sequelize.define("SavedPet", {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        species: DataTypes.STRING,
        age: DataTypes.STRING,
        gender: DataTypes.STRING,
        photo_url: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address1: DataTypes.STRING,
        address2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        country: DataTypes.STRING
    });

    SavedPet.associate = function(models) {
        SavedPet.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return SavedPet;
}