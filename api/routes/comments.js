import express from 'express';

import {
    getComments, 
    getReplies,
    addComment,
    deleteComment,
    updateComment
} from "../controllers/commentController.js";

const router = express.Router();

router.get('/:post_id', getComments);
router.get('/replies/:id', getReplies);
router.post('/addComment', addComment);
router.delete('/:commentId', deleteComment);
router.put("/:commentId", updateComment);
export default router;