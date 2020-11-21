import { Router } from 'express';
import ChatController from "../controllers/chat.controller";
import ChatService from "../services/chat.service";

const router = Router();
const controller = ChatController(new ChatService());
router.get('/', controller.search);
router.post('/', controller.create);
router.get('/:id', controller.find);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default  router;