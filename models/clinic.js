module.exports = function(sequelize, DataTypes){
    let Clinic = sequelize.define("Clinic", {
        organization_id: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address1: DataTypes.STRING,
        address2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.INTEGER,
        country: DataTypes.STRING
    });

    Clinic.associate = function(models) {
        Clinic.hasMany(models.Pet, {
            onDelete: "cascade"
        });
    };

    return Clinic;
};