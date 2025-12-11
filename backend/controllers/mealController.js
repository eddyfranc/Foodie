import Meal from '../models/mealModel.js';

// @desc    Create a new meal
// @route   POST /api/meals
// @access  Private
const addMeal = async (req, res) => {
  const { name, description, calories } = req.body;

  const meal = await Meal.create({
    name,
    description,
    calories,
    UserId: req.user.id,
  });

  if (meal) {
    res.status(201).json(meal);
  } else {
    res.status(400);
    throw new Error('Invalid meal data');
  }
};

// @desc    Get all meals for a user
// @route   GET /api/meals
// @access  Private
const getMeals = async (req, res) => {
  const meals = await Meal.findAll({ where: { UserId: req.user.id } });
  res.json(meals);
};

// @desc    Get a single meal by ID
// @route   GET /api/meals/:id
// @access  Private
const getMealById = async (req, res) => {
  const meal = await Meal.findOne({
    where: { id: req.params.id, UserId: req.user.id },
  });

  if (meal) {
    res.json(meal);
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
};

// @desc    Update a meal
// @route   PUT /api/meals/:id
// @access  Private
const updateMeal = async (req, res) => {
  const { name, description, calories } = req.body;

  const meal = await Meal.findOne({
    where: { id: req.params.id, UserId: req.user.id },
  });

  if (meal) {
    meal.name = name || meal.name;
    meal.description = description || meal.description;
    meal.calories = calories || meal.calories;

    const updatedMeal = await meal.save();
    res.json(updatedMeal);
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
};

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = async (req, res) => {
  const meal = await Meal.findOne({
    where: { id: req.params.id, UserId: req.user.id },
  });

  if (meal) {
    await meal.destroy();
    res.json({ message: 'Meal removed' });
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
};

export { addMeal, getMeals, getMealById, updateMeal, deleteMeal };
