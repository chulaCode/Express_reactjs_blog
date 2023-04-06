import axios from "axios";
import React, { useEffect, useState } from "react";

const Trending = ({cat}) => {

  const [posts, setPosts] = useState([]);

  //const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("posts/trending");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //console.log(cat)
  }, []);
  
  
  return (
    <div className="trend">
      <h3 className="text-primary">Trending News</h3>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h3>{post.title}</h3>
          
        </div>
      ))}
      <div className="advert mb-3">

      </div>
    </div>
  );
};

export default Trending;