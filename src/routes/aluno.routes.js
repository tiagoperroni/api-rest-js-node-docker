import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoController.get);
router.get('/:id', alunoController.getById);
router.post('/', loginRequired, alunoController.create);
router.put('/:id', loginRequired,  alunoController.update);
router.delete('/:id', loginRequired, alunoController.delete);

export default router;