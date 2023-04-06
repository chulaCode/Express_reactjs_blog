import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { FaClock} from 'react-icons/fa';
//import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
//import Add from "../../img/add.png";
import {AuthContext} from "../../context/authContext";
import NewComment from './NewComment';
import { useParams } from 'react-router-dom';
import { removeComment } from './commentApi';

const CommentItem = (props) => {
  const params = useParams();
  const [isEditing, setIsEdititing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const postId = params.id;
   const { 
    currentUser, 
    isLogedIn,
  } = useContext(AuthContext);
  const handleUpdatedComment = (comment) => {
    // send updated comment to  backend
    console.log("Update: ", comment)
  } 
  const handleReplyComment = (comment) => {
    // send reply comment to  backend
    console.log("Reply: ", comment)
  } 

  const canReply = Boolean(currentUser.user_id);
  const isCommentOwner = currentUser.user_id === props.userId

 
  const replyId = props.parentId ? props.parentId : props.id;

  return (
    <li className="" >
      <div className="right-side mb-1">
          <div className='circle mb-2'><span>{props.username.charAt(0)}</span>
          <span className="text-primary username ">{props.username}</span>
          </div>
        <div><small className='text-muted time'><FaClock/> posted {moment(props.time).fromNow()}</small></div>
      </div>
      <div className='comment-body'>
      {!isEditing &&  <span>{props.comments}</span>}
      {isEditing && (
          <NewComment
          postId={postId}
          parentId={replyId}
          handleComment= {handleUpdatedComment}
          submitLabel="Update"
          text="update"
          cancelButtonHandler={false}
          initialText={props.comments}
        />
      )}
        <div className="edit ">
            {canReply && (
              <small className='reply text-muted reply-edit'
              onClick={() => setIsReplying(true)}
              >
                Reply
              </small> 
            )}
              {/* edit if owner */}
            {isLogedIn===true &&(
              <span>
                {isCommentOwner &&
                  <span>
                    {isCommentOwner && ( 
                      <small className='text-muted reply '
                          onClick={
                            () => setIsEdititing(true)
                          }
                        >
                        Edit
                      </small>
                    )}
                    {isCommentOwner && (
                      <span className="">
                          <img onClick={() => props.deleteComment(props.id)} src={Delete} alt="" />
                      </span>
                    )}
                  </span>
                }
              </span>
            )}
                  
        </div>
        {isReplying && (
          <NewComment
          postId={postId}
          parentId={replyId}
          handleComment= {handleReplyComment}
          submitLabel="Reply"
          text="add"
          cancelButtonHandler ={false}
        />
      )}
        {props.replies.length > 0 && (
        <div className="replies">
          {props.replies.map((reply) => (
            
            <CommentItem key={reply.id} 
              username={reply.username} 
              comments={reply.comments} 
              userId={reply.userId}
              time={reply.time} 
              parentId={reply.c_id}
              replies={[]}
              deleteComment={removeComment}
              

            />
          ))}
        </div>
      )}
        </div>
    </li>
  );
  };
  
  export default CommentItem;