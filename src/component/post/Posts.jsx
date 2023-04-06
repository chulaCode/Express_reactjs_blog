import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import moment from "moment";

function GroupPost() {

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`posts/post${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //console.log(cat)
  }, [cat]);
 
  return (
    <>
     <div>
        <Row xs={1} md={2} className="g-4">
            {(posts).map((post) => (
                <Col>
                <Card>
                   <Link className="link" to={`/${post.post_id}`}>
                    <Card.Img variant="top" src={`../upload/${post.img}`} />
                    <Card.Body key={post.id}>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text></Card.Text>
                    </Card.Body>
                   
                    <div className="user">
                       <div className="info">
                        <span className="text-primary my-3">{post.cat}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                        </div>
                    </div>  
                   
                    </Link>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
        
    </>
  );
}

export default GroupPost;


         
    
    
    





           