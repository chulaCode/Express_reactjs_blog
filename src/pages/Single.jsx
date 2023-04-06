import {useState, useEffect,useContext} from "react";
import {Link,  useLocation, useNavigate} from "react-router-dom";
import { getComments } from '../component/comments/commentApi';
import Menu from "../component/post/Menu";
import RelatedNews from "../component/post/RelatedNews";
//import NewComment from "../component/comments/NewComment";
import axios from "axios";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Facebook from "../img/facebook.png";
import Twitter from "../img/twitter.jpg";
import Instagram from "../img/instagram.png";
import Whatsaap from "../img/whatsaap.png";
import LinkedIn from "../img/linkedIn.png";
//import Stack from 'react-bootstrap/Stack';
import moment from "moment";
import { useParams } from "react-router-dom";
import {AuthContext} from "../context/authContext";
import DOMPurify from "dompurify";
import Comments from "../component/comments/Comments";



const Single =()=> {
    
  const [post, setPosts] = useState({});
  //const [comment, setComment]=useState({});
  const params=useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  //const postId= location.pathname.split('/')[1];
  const postId = params.id;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`posts/${postId}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //console.log("id")
  }, [postId]);

  const userExist =()=>{
    if(currentUser.username ==="Admin@ogbesh"){
      return true;
    }
  }
   
  const handleDelete = async ()=> {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  /*<Stack direction="horizontal" gap={5}>
      <div className="">Comments</div>
      <div className=" ms-auto">Login to comments</div>   
    </Stack>
    */
        return (
            <div className="single">
                <div className="content">
                
                   <img src={`../upload/${post.img}`}alt="" />
                  
                   <div className="user">
                    <div className="info">
                        <span className="text-primary">{post.cat}</span>
                        <span>{post?.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                      </div>
                      {!userExist ? 
                        <div className="edit">
                          <Link to={`/write?edit=2`} state={post}>
                            <img src={Edit} alt="" />
                          </Link>
                          <img onClick={handleDelete} src={Delete} alt="" />
                        </div>: <span> </span>
                      }    
                   </div>
                   <h1>{post.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.desc),
                      }}
                    ></p>      
                   <div className="share">
                     <span className="post">Share this post on</span>
                      <Link to="/">
                        <img src={Facebook} alt="" />
                      </Link>
                      <Link to="/">
                        <img src={Instagram} alt="" />
                      </Link>
                      <Link to="/">
                        <img src={Twitter} alt="" />
                      </Link>
                      <Link to="/">
                        <img src={Whatsaap} alt="" />
                      </Link>
                      <Link to="/">
                        <img src={LinkedIn} alt="" />
                      </Link>
                     
                    </div>
                    <div className="advertise mb-3">

                    </div>
                    <div className="related">
                      <h3 className="text-primary">Related  News</h3>
                      <RelatedNews cat={post.cat}/> 
                    </div>
                    
                    <div className="comments">
                      <h3>Disclaimer</h3>
                      <p>Comments expressed here do not reflect the opinions of 
                        Eleme reporters or any employee thereof.</p>
                       <Comments/>
                    </div>
                </div>
                
                <Menu />
                
            </div>
        )
};

export default Single;

export function loader(){
    //const postId =params.id;
    //return getPost(postId);
  }