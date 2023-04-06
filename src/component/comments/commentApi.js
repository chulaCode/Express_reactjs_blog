import axios from 'axios';
import {map} from 'p-iteration'
import { useContext } from 'react';

 
export async function getComments(postId) {

    const response = await fetch(`comments/${postId}`);
    //console.log("data",response.data);
    const data = await response.json();

    // 
    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch comments.');
    }
    const transformedComments = [];

    for (const key in data) {
      const commentObj = {
        id: key,
        ...data[key],
      };
      transformedComments.push(commentObj);
    }

    const comments = await map(transformedComments, async (curr) => {
      return {...curr, replies: await getReplies(curr.c_id)}
    })
    //console.log("comments", comments)

    return comments;
  }

  export async function getReplies(commentId) {

    const response = await fetch(`comments/replies/${commentId}`);
    //console.log("data",response.data);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch quotes.');
    }
    //console.log("data",data);
    const transformedComments = [];
  
    for (const key in data) {
      const commentObj  = {
        id: key,
        ...data[key],
      };
      transformedComments.push(commentObj );
    }

    return transformedComments;
  }

export async function addComment(requestData) {
  
  //
  const response = await fetch("comments/addComment", {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }
 

}
export const removeComment = async (commentId)=> {
  //console.log("commentId", commentId)
  try {
    
    if(window.confirm("Are you sure you want to remove comment?"))
    {
      const response = await fetch(`comments/${commentId}`, {
         method:'DELETE',
         credentials: "include"
      }) 
      //return await getComments(postId)
    }    
  } catch (err) {
    console.log(err);
  }
}
export const updateComment= async (requestData,commentId)=>{
    try {
      const response = await fetch(`comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(requestData),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || 'Could not add comment.');
      }
     
    } catch (err) {
        console.log(err);
    }
  };




