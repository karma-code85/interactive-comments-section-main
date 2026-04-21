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
    onEdit,
    onAddReply,
    onEditReply,
    onUpvoteReply,
    onDownvoteReply,
    onDeleteReply,
    replies=[]
  })
  {
    const [isEditing, setIsEditing]=useState(false)
    const [text, setText]=useState(content)
    const [showReplyBox, setShowReplyBox]=useState(false)
    const [replyInput, setReplyInput]=useState("")
  const isMe=user.username===currentUser.username

  function submitReply(){
    if(!replyInput.trim()) return
    onAddReply(id,replyInput )
    setReplyInput("")
    setShowReplyBox(false)
  }

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

        {replies.length >0 && (
            <div className="md:ml-6 md:pl-2 border-l-2 border-gray-500">
              {replies.map(reply=>(
                <div className="bg-white p-4 rounded shadow space-6" key={reply.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <img src={reply.user.image.png} alt=""
                      className="h-4 w-4 rounded-full "
                      />
                      <span>{reply.user.username}</span>
                      {reply.user.username===currentUser.username &&
                        <span>you</span>
                      }
                    </div>
                    <span>{reply.createdAt}</span>
                  </div>
                  <p><span className="text-[hsl(238,40%,52%)] font-bold">@{reply.replyingTo}</span>
                    {reply.content}
                  </p>
                  <div>
                    <div className="flex gap-4 items-center bg-gray-100 p-2 rounded">
                      <button onClick={()=>onUpvoteReply(id, reply.id)}>
                        <img src="/images/icon-plus.svg" alt="" />
                      </button>
                      <span>{reply.score}</span>
                      <button onClick={()=>onDownvoteReply(id, reply.id)}>
                        <img src="icon-minus.svg" alt="" />
                      </button>
                    </div>
                    <div className="flex gap-4">
                      {reply.user.username===currentUser.username ?(
                        <div>
                          <button onClick={()=>onDeleteReply(id, reply.id)}>
                            <img src="/images/icon-delete.svg" alt="" />delete
                          </button>
                          <button onClick={()=>onEditReply(id, reply.id)}>
                            <img src="/images/icon-edit.svg" alt="" />
                            Edit
                            </button>
                        </div>
                      ):(
                        <div onClick={()=> setShowReplyBox(!showReplyBox)}>
                          {showReplyBox &&(
                              <div>

                                <input
                                value={replyInput}
                                 type="text"
                                  onChange={(e)=>replyInput(e.target.value)}
                                 className="border p-2 flex-1"
                                  placeholder="Write a reply..."

                                  />

                              </div>
                            )}
                          <button onClick={submitReply}>

                            <img src="/images/icon-reply.svg" alt="" />
                            Reply
                            </button>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )

              )}

            </div>
          )}




    </div>
  )
}