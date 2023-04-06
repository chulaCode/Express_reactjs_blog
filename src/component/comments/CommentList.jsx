import { useState } from 'react';
import CommentItem from './CommentItem';
import { removeComment } from './commentApi';

const CommentsList = (props) => {
  //console.log("props",props);
  return (
    <ul className="comment mt-3">
      {props.comments.map((comment) => (
        <CommentItem key={comment.c_id} 
         id={comment.c_id}
         username={comment.username} 
         comments={comment.comments} 
         userId={comment.userId}
         time={comment.time} 
         replies={comment.replies}
         deleteComment={removeComment}
        
         />
      ))}
    </ul>
  );
};

export default CommentsList;