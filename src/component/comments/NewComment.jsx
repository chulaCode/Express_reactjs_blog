import { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addComment} from './commentApi';
import {AuthContext} from "../../context/authContext";
import LoadingSpinner from './UI/LoadingSpinner';
import useHttp from './use-http';
import moment from 'moment';

function NewComment(props) {

  const {currentUser, isLogin} = useContext(AuthContext);
  const [value, setValue] = useState(props.initialText);
  //const buttonDisabled = value.length === 0;
  const { sendRequest, status, error } = useHttp(addComment);
/*
  useEffect(() => {
    if (status === 'completed' && !error) {
      props.handleComment()
    }
  }, [status, error, props.handleComment]);
 */
  const handleCommentAction = () => {
   /* sendRequest({ commentData: {
       comment: value,
       post_Id: props.postId , 
       user_id:currentUser.user_id,
       parent_id:props.parentId,
       time:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }, postId:props.postId});*/
  
    
   props.handleComment({
      comment: value, 
      post_Id: props.postId , 
      user_id:currentUser.user_id,
      parent_id:props.parentId,
      time:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    })
  }

  return (
    <div>
      <div className="">
     
        <FloatingLabel controlId="floatingTextarea2" label="Leave a comments">
          <Form.Control
    
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '70px' }}
            value={value} required
            onChange={(event) =>setValue(event.target.value)}
          />
        </FloatingLabel>
      </div>
      <div className='mt-1'>
        <span> 
          <button className='btn btn-primary' onClick={handleCommentAction}>{props.submitLabel}</button>    
        </span>
        
        {props.cancelButtonHandler && (
         <span className='mx-2'>
            <button
              type="button"
              className="
                btn btn-secondary 
                comment-form-button 
                comment-form-cancel-button"
               onClick={props.cancelButton} 
            >
              Cancel
            </button>
          </span>
        )}  
       </div>
     </div>
     );
};


export default NewComment;
