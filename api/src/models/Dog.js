const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
   
    min_weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    min_life_span: {
      type: DataTypes.INTEGER,
    },
    max_life_span: {
      type: DataTypes.INTEGER,
    },

    height:{
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.min_height} - ${this.max_height}`
      }
    },

    weight:{
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.min_weight} - ${this.max_weight}`
      }
    },

    life_span:{
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.min_life_span} - ${this.max_life_span} years`
      }
    },
    image:{
      type: DataTypes.STRING
    }

    
  });
};

