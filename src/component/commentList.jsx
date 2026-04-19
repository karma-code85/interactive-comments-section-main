import { useState } from "react"



export default function Comment({id,
   content,
   createdAt,
    score,
    currentUser,
    user,
    onUpVote,
    onDownVote,
    onDelete,
    onEdit

  })
  {
    const [isEditing, setIsEditing]=useState(false)
    const [text, setText]=useState(content)
  const isMe=user.username===currentUser.username

  return(
    <div className="bg-white shadow-xl p-4 rounded  space-y-6 w-full max-w-2xl ">
      <div></div>
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4">
        <img src={user.image.png} alt="profile"  className="w-8 h-8 rounded-full "/>
        <h1>{user.username}</h1>
        {isMe&& <span className="text-white px-2 h-6  rounded  text-center bg-[hsl(238,40%,52%)]">you</span>}
        </div>
        <h1>{createdAt}</h1>
      </div>
      {isEditing?(
        <div >
          <textarea
          className="shadow p-2 mr-4"
           type="text"
           placeholder="wrote the new comment"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          />
          <button onClick={()=>{
            onEdit(id, text)
            setIsEditing(false)
          }}
          className="bg-sky-500 p-2 rounded text-white"

          >Save</button>
        </div>
      ):(
      <p className="text-slate-500 leading-6 ">{content}</p>
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-[hsl(238,40%,52%)] font-bold bg-gray-100 p-2 rounded-lg text-white ">
          <button  onClick={()=>onUpVote(id)}>
          <img src="/images/icon-plus.svg" alt=""


          />
          </button>
          <h1 className="text-[hsl(238,40%,52%)]">{score}</h1>
          <button  onClick={()=>onDownVote(id)}>
            <img src="/images/icon-minus.svg" alt=""


            />
          </button>

        </div>
        <div className="flex gap-4">
          {isMe?(
            <div className="flex gap-2 items-center cursor-pointer">
          <div className="flex gap-2 items-center" onClick={()=>onDelete(id)}><img src="/images/icon-delete.svg" alt="" className="w-3 h-3" /><span className="text-rose-500 font-bold">Delete</span></div>
          <div className="flex gap-2 items-center" onClick={()=>setIsEditing(true)}><img src="/images/icon-edit.svg" alt="" className="w-3 h-3"/><span className="text-[hsl(238,40%,52%)] font-bold">Edit</span></div>
        </div>

          ):(

          <div className="flex gap-1 items-center justify-center cursor-pointer">
          <img src="/images/icon-reply.svg" alt="" className="h-3 w-3 " />
          <span className="font-bold text-[hsl(238,40%,52%)]">Reply</span>
        </div>
          )}

        </div>
      </div>

    </div>
  )
}