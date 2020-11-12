module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        agreeToTerms: {
            type: DataTypes.BOOLEAN,
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