module.exports = (sequelize, DataTypes) => {
  const DailyLog = sequelize.define('DailyLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    foodIntake: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    mood: {
      type: DataTypes.ENUM('happy', 'energetic', 'lethargic', 'anxious', 'sick'),
      defaultValue: 'happy',
    },
    medicationGiven: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { min: 0 },
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      }
    }
  }, {
    timestamps: true,
  });

  return DailyLog;
};
