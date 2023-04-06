import React, { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import moment from "moment";

function AllPost() {

  const [posts, setPosts] = useState([]);
  const cat = useLocation().search
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("posts/all");
        setPosts(res.data);
        console.log("latest",res)
      } catch (err) {
        console.log(err);
      }
     
    };
    fetchData();
   
  },[cat]);
  return (
        <>
        <div className="more-post">
         <Row xs={1} md={3} className="g-4">
            {(posts).map((post) => (
                <Col>
                   <Link className="link" to={`/${post.post_id}`}>    
                <Card>
                    <Card.Img variant="top" src={`../upload/${post.img}`} />
                    <Card.Body key={post.id}>
                    <Card.Title className='title'>{post.title}</Card.Title>
                    <Card.Text></Card.Text>
                    </Card.Body>
                    <div className="user">
                       <div className="info">
                        <span className="text-primary">{post.cat}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                        </div>
                    </div>    
                </Card>
                </Link>
                </Col>
            ))}
            </Row>
          </div>
        </>
  );
}

export default AllPost;