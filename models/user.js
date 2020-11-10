module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.SavedPet, {
            onDelete: "cascade"
        });
    };



    return User;
};