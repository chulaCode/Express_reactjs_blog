import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function RelatedNews({cat}) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/post?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <Row xs={1} md={3} className="g-4">
            {(posts).map((post) => (
                <Col>
                <Card>
                    <Card.Img variant="top" src={`../upload/${post.img}`} />
                    <Card.Body key={post.id}>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text></Card.Text>
                    </Card.Body>    
                </Card>
                </Col>
            ))}
            </Row>
  );
}

export default RelatedNews;