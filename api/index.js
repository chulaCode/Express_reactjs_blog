import express from 'express';
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import cookieParser from 'cookie-parser';
import  cors  from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
const upload=multer({storage})
app.post('/api/upload', upload.single('file'),
(req,res, next)=>{
    const file = req.file;
   res.status(200).json(file.filename);
  })
//app.use so data can be sent to db
app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/comments",commentRoutes)


app.listen(8080, () => {
  console.log("Connected!");
});