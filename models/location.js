module.exports = function(sequelize, DataTypes) {
    var Locations = sequelize.define("locations", {
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        visited: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        recommended: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Locations;
}

// Something something still need foreign key. Primary key is adding by Sequelize