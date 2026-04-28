module.exports = (sequelize, DataTypes) => {
  const WeightEntry = sequelize.define('WeightEntry', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      }
    }
  }, {
    timestamps: false,
  });

  return WeightEntry;
};
