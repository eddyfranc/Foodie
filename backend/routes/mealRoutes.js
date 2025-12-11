import express from 'express';
import {
  addMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} from '../controllers/mealController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addMeal).get(protect, getMeals);
router
  .route('/:id')
  .get(protect, getMealById)
  .put(protect, updateMeal)
  .delete(protect, deleteMeal);

export default router;
