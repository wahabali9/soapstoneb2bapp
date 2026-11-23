import express from 'express';
import { registeradmin, loginadmin } from '../controllers/adminauthcontroller.js';

const router = express.Router();

router.post("/register", registeradmin);
router.post("/login", loginadmin);


export default router