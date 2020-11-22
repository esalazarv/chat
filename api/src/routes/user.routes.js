import { Router } from 'express';
import UserController from "../controllers/user.controller";
import UserRepository from "../repositories/user.repository";

const router = Router();
const controller = UserController(new UserRepository());
router.get('/', controller.search);
router.post('/', controller.create);
router.get('/:id', controller.find);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;