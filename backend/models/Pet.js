module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    species: {
      type: DataTypes.ENUM('Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Reptile', 'Other'),
      allowNull: false,
      defaultValue: 'Dog',
    },
    breed: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    age: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Unknown'),
      defaultValue: 'Unknown',
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    microchipId: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    avatarUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
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

  return Pet;
};
