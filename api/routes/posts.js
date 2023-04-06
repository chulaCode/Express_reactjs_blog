import express from 'express';
import {
     addPost, 
     getTopPosts, 
     getPost,
     getLatest,
     getPosts,
     getTrending,
     getAllPosts,
     updatePost,
     deletePost,
    
    } from '../controllers/postController.js';


const router = express.Router();

router.get("/", getTopPosts);
router.get("/post", getPosts);
router.get("/latest", getLatest);
router.get("/all", getAllPosts);
router.get("/trending", getTrending);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);



export default router;