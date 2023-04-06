import {useEffect, useState} from "react";
import Pagination from 'react-bootstrap/Pagination';
import { Link, useLocation } from "react-router-dom";
import Posts from "../component/post/Posts";
import Trending from "../component/post/Trending";
import Latest from "../component/post/Latest";
import axios from "axios";

const Home =()=> {

  const [post, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
 
  /*let active = 2;
  let items = []; 
  let arr=[];
   post.map((post) =>{
       arr=post;
   });
  
  for (let number = arr.post_id; number <= arr.length; number++) {
   items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
    );
    
   }
   <Pagination>
      <Pagination.First />
        {items}
      <Pagination.Last />
    </Pagination>
   
   console.log("number", arr.post_id)*/
    
  /*const posts = [
          {
             id: 1,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
           },
          /* {
             id: 2,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
            img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
           },
           {
             id: 3,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
           },
           {
             id: 4,
             title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
             desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
             img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
           },
         ];
         Facebook Sharer Api:-  "https://www.facebook.com/sharer/sharer.php?u="; 

function shareOnFacebook(){
  const navUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + 'https://github.com/knoldus/angular-facebook-twitter.git';
  window.open(navUrl , '_blank');
}
         */
    
        return (
          <div className="home">
            <div className="posts">
              <div className="heading text-primary"> 
                 Top stories
              </div>
              
                <div className="post" key={post.post_id}>
                  
                  <div className="img">
                     <img src={`../upload/${post.img}`} alt="" />
                  </div>
                  <div className="content">
                  
                    <Link className="link" to={`/${post.post_id}`}>
                      <h1>{post.title}</h1>
                    </Link>
                    <p>{post.desc}</p>
                    
                    <Link className="link" to={`/${post.post_id}`}>
                       <button>Read More</button>
                    </Link>
                    
                   
                  </div>
                </div>
             
            </div> 
             <div className="content">
               <div className="post-left">
                 <Posts />
               </div> 
                <div className="sidebar">
                   <Trending />
                </div>
              </div>
              <div className="advert mb-4">

              </div>
              <div className="latest">
                <h3 className="text-primary"> Latest News</h3>
                < Latest />
              </div>
              <div className="moreNews">
             
                <Link className="link" to="/AllNews">
                  <p className="">view  more  news</p>
                </Link>
              </div>
              
         </div> 
        )         
};

export default Home;

export function loader(){
    //const postId =params.id;
    //return getPost(postId);
  }