module.exports = (sequelize, DataTypes) => {
  const MedicalRecord = sequelize.define('MedicalRecord', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Vaccine', 'Checkup', 'Surgery'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nextDueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    vet: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    clinic: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    status: {
      type: DataTypes.ENUM('upcoming', 'completed'),
      defaultValue: 'upcoming',
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      }
    }
  }, {
    timestamps: true,
    hooks: {
      beforeSave: (record) => {
        record.status = new Date(record.date) > new Date() ? 'upcoming' : 'completed';
      }
    }
  });

  return MedicalRecord;
};
