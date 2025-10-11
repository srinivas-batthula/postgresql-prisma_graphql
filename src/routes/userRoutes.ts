import { Router } from "express";
import { getAll, getById, create, updateById, deleteById } from "../controllers/userController.ts";

const router = Router();

router.route('/')
    .get(getAll)
    .post(create);

router.route('/:id')
    .get(getById)
    .patch(updateById)
    .delete(deleteById);

export default router;
