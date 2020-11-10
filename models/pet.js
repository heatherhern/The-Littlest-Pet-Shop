module.exports = function(sequelize, DataTypes){
    let Pet = sequelize.define("Pet", {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        species: DataTypes.STRING,
        age: DataTypes.STRING,
        gender: DataTypes.STRING,
        photo_url: DataTypes.STRING,
    });

    Pet.associate = function(models) {
        Pet.belongsTo(models.Clinic, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Pet;
};