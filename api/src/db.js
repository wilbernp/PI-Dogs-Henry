const Sequelize = require('sequelize')
require('dotenv').config()
const BreedModel = require('./models/Breeds')
const DogModel = require('./models/Dog')
const TemperamentModel =require('./models/Temperament')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);
BreedModel(sequelize)
DogModel(sequelize)
TemperamentModel(sequelize)

const { Dog, Temperament, Breed } = sequelize.models;

Dog.belongsToMany(Temperament, {through: 'rel'})
Temperament.belongsToMany(Dog, {through: 'rel'})

Breed.hasMany(Dog)
Dog.belongsTo(Breed)
module.exports={
    sequelize,
    ...sequelize.models
}