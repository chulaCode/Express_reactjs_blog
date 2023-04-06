import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=(req, res, next) =>{
//CHECK EXISTING USER
const q = "SELECT * FROM users WHERE email = ? OR username = ?";
db.query(q, [req.body.email, req.body.username], (err, data) => {
   if (err) 
       return res.status(500).json(err,'error');
    if (data.length) 
       return res.json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`user_type`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email,req.body.user_type, hash];

    db.query(q, [values], (err, data) => {
      if (err) 
         return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
}
export const login=(req, res, next) =>{
    //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ user_id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200).json(other);
  });
}
export const logout=(req, res, next) =>{
    res.clearCookie("access_token",{
       samSite:"none",
       secure: true
    }).status(200).json("User has been logged out")
}