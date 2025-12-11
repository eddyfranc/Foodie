import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './userModel.js';

const Meal = sequelize.define('Meal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Meal);
Meal.belongsTo(User);

export default Meal;
