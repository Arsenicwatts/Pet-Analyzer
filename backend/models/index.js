const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'petpassport',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Pet = require('./Pet')(sequelize, DataTypes);
db.WeightEntry = require('./WeightEntry')(sequelize, DataTypes);
db.DailyLog = require('./DailyLog')(sequelize, DataTypes);
db.MedicalRecord = require('./MedicalRecord')(sequelize, DataTypes);

// Associations
// Pet -> WeightEntries (1:N)
db.Pet.hasMany(db.WeightEntry, { foreignKey: 'petId', as: 'weightHistory', onDelete: 'CASCADE' });
db.WeightEntry.belongsTo(db.Pet, { foreignKey: 'petId' });

// Pet -> DailyLogs (1:N)
db.Pet.hasMany(db.DailyLog, { foreignKey: 'petId', onDelete: 'CASCADE' });
db.DailyLog.belongsTo(db.Pet, { foreignKey: 'petId' });

// Pet -> MedicalRecords (1:N)
db.Pet.hasMany(db.MedicalRecord, { foreignKey: 'petId', onDelete: 'CASCADE' });
db.MedicalRecord.belongsTo(db.Pet, { foreignKey: 'petId' });

module.exports = db;
