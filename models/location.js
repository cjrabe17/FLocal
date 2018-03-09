module.exports = function(sequelize, DataTypes) {
    var Locations = sequelize.define("Locations", {
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
            type: DataTypes.STRING,
            allowNull: true
            // Try to validate for a URL
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
            // Try to validate for a URL
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
            // Try to validate for numbers in phone number format
        },
        visited: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        recommended: {
            type: DataTypes.INTEGER,
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