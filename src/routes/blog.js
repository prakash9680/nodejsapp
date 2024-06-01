const express = require('express');
const router = express.Router();
const { create, update, deleteBlog, getBlog, getBlogList } = require('./../controllers/BlogController');
const { addComment, deleteComment, getComment } = require('./../controllers/CommentController');
const authenticateToken = require('./../middlewares/authenticateToken');
const upload = require('./../middlewares/upload');
const {BlogValidation, CommentValidation} = require('./../middlewares/validation');

//blog routes
router.post('/', authenticateToken,upload.single('image'), BlogValidation(), create);
router.put('/:id', authenticateToken, upload.single('image'), BlogValidation(), update);
router.delete('/:id', authenticateToken, deleteBlog);
router.get('/:id', authenticateToken, getBlog);
router.get('/', authenticateToken, getBlogList);

//comment routes
router.post('/:id/comments', authenticateToken, CommentValidation(), addComment);
router.delete('/:blogId/comments/:commentId', authenticateToken, deleteComment);
router.get('/:id/comments', authenticateToken, getComment);

module.exports = router;