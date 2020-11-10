module.exports = function (sequelize, DataTypes) {
    let SavedPet = sequelize.define("SavedPet", {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        species: DataTypes.STRING,
        age: DataTypes.STRING,
        gender: DataTypes.STRING,
        photo_url: DataTypes.STRING,
        organization_id: DataTypes.STRING,
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