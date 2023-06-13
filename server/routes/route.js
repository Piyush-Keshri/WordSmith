import express from 'express';
import { singupUser, loginUser } from '../controllers/user-controller.js';
import { uploadImage, getImage } from '../controllers/image-controller.js';
import upload from '../utils/upload.js'
import { createPost } from '../controllers/post-controller.js';
import { authenticateToken } from '../controllers/jwt-controller.js'

const router = express.Router();

router.post('/signup', singupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.post('/create', authenticateToken, createPost);

router.get('/file/:filename', getImage);

export default router;
