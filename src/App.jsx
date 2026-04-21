import {  useState } from "react";
import Comment from "./component/commentList";
import data from "./data.json"


export default function App(){

  const [input, setInput]=useState("")
  const [comments, setComments]=useState(data.comments)
  const [currentUser]=useState(data.currentUser)



  function handleAddReply(commentId, replyText){
    setComments(prev=>
      prev.map(c=>
      c.id===commentId
    ? {...c,
      replyes:[...(c.replyes|| []),{
        id:Date.now(),
        content: replyText,
        createdAt:"just now",
        scroe:0,
        replyingTo:c.user.username,
        user:currentUser

      }]
    }:c

    ))
  }
function handleEditReply(commentId, replyText,newReply){
  setComments(comments.map(c=>
    c.id===commentId
    ?{
      ...c,
      replies:c.replies.map(r=>
        r.id===replyText?{...r, content:newReply}:r
      )

    }:c

  ))
}
function handleDeleteReply(commentId,replyId){
  const confirm=window.confirm("are you sure wanna to delete your reply")
  if(!confirm)return
  setComments(commentId.map(c=>c.id===commentId
    ?{...c,   replies:c.replies.filter(r=>r.id !==replyId)}:c
  ))
}
function handleUpvoteToReply(commentId, replyId){
  setComments(commentId.map(c=>c.id===commentId
    ?{...c,replies:c.replies.map(r=>
      r.id===replyId?{...r, score:Math.max(0,r.score+1)}:r
    )}:
    c
  ))
}


function handleDownvoteToReply(commentId, replyId){
  setComments(commentId.map(c=>c.id===commentId
    ?{...c, replies:c.replies.map(r=>r.id===replyId
      ?{...r,score: Math.max(0, r.score-1)}:r

    )}:c
  ))
}





  function handleAdd(){
    if(!input.trim()) return
    const newComment={
      id:Date.now(),
      content:input,
      createdAt:"just now",
      score:0,
      user:currentUser,
      replyes:[]
    }
    setComments([...comments, newComment])
    setInput("")

  }
  function handleUpvote(id){
    setComments(
      comments.map(c=>
        c.id===id
        ?{...c, score: c.score+1}:c
      )
    )
  }

  function handleDownvote(id){
    setComments(
      comments.map(

       c=> c.id=== id
        ?{...c,  score: c.score-1}
        : c
      )
    )
  }
  function handleDelete(id){
    const cn=window.confirm("Are you sure you want to delete this comment? This will remove the comment and can't be")
    if(!cn)return
    setComments(
      comments.filter(
        c=>c.id !==id
      )
    )
    
  }

  function handleEdit(id, newText){
    setComments(
      comments.map(
        c=>c.id=== id
        ?{...c,content:newText}
        :c
      )
    )
  }
  return(
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4 space-y-6 ">
      <div  className="space-y-6 w-full mx-auto max-w-6xl">
        {comments.length===0?(

          <p className="bg-white  p-2 rounded shadow text-slate-500 ">no comments add yet...</p>
        ):(
          comments.map((comment)=>(
            <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            user={comment.user}
            currentUser={currentUser}
            onDownVote={handleDownvote}
            onUpVote={handleUpvote}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAddReply={handleAddReply}
            onDeleteReply={handleDeleteReply}
            onUpvoteReply={handleUpvoteToReply}
            onDownvoteReply={handleDownvoteToReply}
            onEditReply={handleEditReply}
            replies={comment.replies|| []}
        />

          ))





        )}

       <div className="bg-white p-4 shadow rounded  w-full space-y-4 max-w-2xl">
        <textarea placeholder="Add Comment...." className="w-full shadow focus:outline-none border border-1 border-gray-300 p-2 rounded"
        onChange={(e)=>setInput(e.target.value)}
        value={input}

        ></textarea>
        <div className="flex justify-between">
          <img src="/images/avatars/image-juliusomo.png" alt="" className="w-8 h-8"/>
          <button
          onClick={handleAdd}
          className="bg-[hsl(238,40%,52%)] font-bold text-white p-2 text-center  rounded">Send</button>
        </div>

       </div>


      </div>

    </div>
  )
}