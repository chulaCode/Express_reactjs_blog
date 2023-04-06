import { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import useHttp from './use-http';
import { getComments, addComment } from './commentApi';
import LoadingSpinner from './UI/LoadingSpinner';
import CommentsList from './CommentList';
import NewComment from './NewComment';
import {AuthContext} from "../../context/authContext";


const Comments = () => {
  // const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();

  const postId = params.id;
  const parentCommentId = 0;

  const {  isLogedIn} = useContext(AuthContext);
  //console.log("Comment", activeComment.id);

  const { sendRequest, status, data: loadedComments } = useHttp(getComments);
  
  useEffect(() => {
    sendRequest(postId);
  }, [postId, sendRequest]);

  const handleCreateComment = async (comment) => {
    // Send comment to backend
    console.log("Create: ", comment) 
  };
  /*
   const handleCreateComment = useCallback(() => {
      sendRequest(postId);
    }, [sendRequest, postId]);
  */

  let comments;
  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList  comments={loadedComments}   />;
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>This post have no comment yet!</p>;
  }

  return (
    <section className="">
      <h4><span className='text-primary mr-4'></span>Comments</h4>
         {isLogedIn===false ?
          <span><Link  to="/login">Login to comment</Link></span>
           :
         <NewComment
            postId={postId}
            parentId={parentCommentId}
            handleComment = {handleCreateComment}
            submitLabel="Add a comment"
            text="add"
            cancelButtonHandler={false}
            initialText=""
        />
         }
      
      {comments}
    </section>
  );
};

export default Comments;