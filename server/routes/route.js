import express from 'express';

import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controllers/post-controller.js'
import { uploadImage, getImage } from '../controllers/image-controller.js';
import { newComment, getComments, deleteComment } from '../controllers/comment-controller.js';
import { loginUser, singupUser, logoutUser } from '../controllers/user-controller.js';
import { authenticateToken, createNewToken } from '../controllers/jwt-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comment/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;
