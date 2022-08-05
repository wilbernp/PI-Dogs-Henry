const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    // defino los modelos
    sequelize.define('Breed', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false })
}