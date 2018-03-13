module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING
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

    return Location;
}

// Something something still need foreign key for User model. Primary key is added by Sequelize