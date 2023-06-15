import express from 'express';
import { singupUser, loginUser } from '../controllers/user-controller.js';
import { uploadImage, getImage } from '../controllers/image-controller.js';
import upload from '../utils/upload.js'
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controllers/post-controller.js';
import { authenticateToken } from '../controllers/jwt-controller.js'

const router = express.Router();

router.post('/signup', singupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.post('/create', authenticateToken, createPost);

router.get('/file/:filename', getImage);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);

router.put('/update/:id', authenticateToken, updatePost);

router.delete('/delete/:id', authenticateToken, deletePost);

export default router;
