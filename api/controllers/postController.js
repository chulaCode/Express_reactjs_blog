import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getTopPosts = (req, res) => {
  const q =  "SELECT * FROM posts WHERE cat=?"
  
  db.query(q, "topnews", (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};
export const getPosts= (req, res) => {
  const q = "SELECT * FROM posts WHERE cat!=? AND cat!=?";
    
  db.query(q, ["topnews", "trending"], (err, data) => {
    if (err) 
      return res.status(500).send(err);
   //return res.json(req.query);
    return res.status(200).json(data);
  });
}

export const getPost = (req, res) => {
  //console.log("post",req.params.id);
  const q =
  "SELECT * FROM posts WHERE post_id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) 
       return res.status(500).json(err);
       //console.log(data)
    return res.status(200).json(data[0]);
});
}
export const getLatest=(req, res)=>{
  //console.log("it came here")
  const q = "SELECT * FROM  posts ORDER BY post_id DESC LIMIT 6";
  db.query(q, (err, data) => {
    if (err) 
       return res.status(500).json(err);
    //console.log(data);
    return res.status(200).json(data);
});
}
export const getAllPosts = (req, res) => {
  const q =
  "SELECT * FROM posts";

  db.query(q, (err, data) => {
    if (err) 
       return res.status(500).json(err);
       //console.log(data)
    return res.status(200).json(data);
});
}
export const getTrending = (req, res) => {
  const q = "SELECT * FROM posts WHERE cat=?";
    
  db.query(q, "trending" ,  (err, data) => {
    if (err) 
      return res.status(500).send(err);
   //return res.json(req.query);
    return res.status(200).json(data);
  });
}

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) 
     return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    console.log(userInfo);
    if (err) 
       return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `uid`,`cat`, `date`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      2,
      req.body.cat,
      req.body.date,
    ];

    db.query(q, [values], (err, data) => {
      if (err) 
        return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
}
export const updatePost = (req, res) => {
  
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    console.log(userInfo);
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `post_id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
}
export const deletePost = (req, res) => {
  //console.log(req.params.id)
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
}

   
