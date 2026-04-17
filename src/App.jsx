import { use, useState } from "react";
import Comment from "./component/commentList";

export default function App(){

  const [input, setInput]=useState("")
  const [comment, setComment]=useState([])

  function handleAdd(){
    if(!input.trim()) return
    const newComment={
      id:Date.now(),
      text:input,
      username: "marwan",
      url: "/images/avatars/image-amyrobson.png",
      publishTime: "Today",
      score: 0,


    }
    setComment([...comment, newComment])
    setInput("")

  }
  return(
    <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4 space-y-6">
      <div  className="space-y-6">
        {comment.length===0?(

          <p className="bg-white  p-2 rounded shadow text-slate-500 ">no comments add yet...</p>
        ):(
          comment.map((c)=>(
            <Comment
            key={c.id}
        url={c.url}
        username={c.username}
        publishTime={c.publishTime}
        score={c.score}
        text={c.text}
        />

          ))





        )}

       <div className="bg-white p-4 shadow rounded  w-full space-y-4">
        <textarea placeholder="Add Comment...." className="w-full shadow focus:outline-none border border-1 border-gray-300 p-2 rounded"
        onChange={(e)=>setInput(e.target.value)}
        value={input}

        ></textarea>
        <div className="flex justify-between">
          <img src="/images/avatars/image-amyrobson.png" alt="" className="w-8 h-8"/>
          <button
          onClick={handleAdd}
          className="bg-[hsl(238,40%,52%)] font-bold text-white p-2 text-center  rounded">Send</button>
        </div>

       </div>


      </div>

    </div>
  )
}