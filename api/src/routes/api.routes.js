import { Router } from 'express';
import ApiController from '../controllers/api.controller'

const router = Router();
const controller = ApiController();
router.get('/', controller.info);

export default router;