import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getComments=(req, res)=>{
    //console.log(req.params.id);
     const q= "SELECT `c_id`,`post_id`,`username`,`comments`,`time`,`userId` FROM users u JOIN comments c ON c.userId=u.user_id WHERE  post_id =? AND parent_id=0 ORDER BY C_id DESC ";
      
    db.query(q, [req.params.post_id], (err, data) => {
      if (err) 
        return res.status(500).send(err);
      //console.log(data); 
      return res.status(200).json(data);
    });
  }
  export const getReplies=(req, res)=>{
    // console.log(req.params.id);
     const q= "SELECT `c_id`,`post_id`,`Parent_id`,`username`,`comments`,`time`,`userId` FROM users u JOIN comments c ON c.userId=u.user_id WHERE  parent_id =? ORDER BY C_id DESC";
      
    db.query(q, [req.params.id], (err, data) => {
      if (err) 
        return res.status(500).send(err);
     // console.log(data); 
      return res.status(200).json(data);
    });
  }
  export const addComment=(req, res)=>{
   
    const token = req.cookies.access_token;
    console.log(req.body);
    if (!token) 
       return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      //console.log(userInfo);
      if (err) 
         return res.status(403).json("Token is not valid!");
  
    const q =
      "INSERT INTO comments(`comments`, `post_id`, `userId`, `parent_id`,`time` ) VALUES (?)";

    const values = [
      req.body.comment,
      req.body.post_Id,
      req.body.user_id,
      req.body.parent_id,
      req.body.time
    ];

    db.query(q, [values], (err, data) => {
      if (err) 
        return res.status(500).json(err);
        console.log(data);
      return res.json(data);
    });
  });
}
export const deleteComment=(req, res)=>{
  console.log(req.params);
   const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const Id = req.params.commentId;
    const q = "DELETE FROM comments WHERE c_id= ?";

    db.query(q, [Id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
}
export const updateComment=(req, res)=>{
  console.log(req.body)
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.commentId;
    //console.log(userInfo);
    const q =
      "UPDATE comments SET `comments`=?, WHERE `c_id` = ?";

    const values = [req.body.comment];

    db.query(q, [...values, commentId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
}
  
