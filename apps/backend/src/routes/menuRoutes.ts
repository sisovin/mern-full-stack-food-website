import express from 'express';
import { getAllMenus, getMenuById, createMenu, updateMenu, deleteMenu, getFilteredMenus } from '../controllers/menuController';

const router = express.Router();

router.get('/', getAllMenus);
router.get('/:id', getMenuById);
router.post('/', createMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);
router.get('/filter', getFilteredMenus);

export default router;
