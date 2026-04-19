import {  useState } from "react";
import Comment from "./component/commentList";
import data from "./data.json"


export default function App(){

  const [input, setInput]=useState("")
  const [comments, setComments]=useState(data.comments)
  const [currentUser]=useState(data.currentUser)
  const [replys, setReplys]=useState(data.replys)
  const [editText, setEditText]=useState("")
  const [deleteDev, setDeleteDev]=useState(null)

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
    setDeleteDev(null)
  }
  function handleDeleteClick(id){
    setDeleteDev(id)
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
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4 space-y-6">
      <div  className="space-y-6 w-full">
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
        />

          ))





        )}

       <div className="bg-white p-4 shadow rounded  w-full space-y-4">
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