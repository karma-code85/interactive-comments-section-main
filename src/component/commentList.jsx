import { useState } from "react"


export default function Comment({url, username,publishTime, text, score}){
  const [count, setCount]=useState(1)
  return(
    <div className="bg-white shadow-xl p-4 rounded  space-y-6 w-full max-w-2xl ">
      <div></div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
        <img src={url} alt="profile"  className="w-8 h-8 rounded-full "/>
        <h1>{username}</h1>
        </div>
        <h1>{publishTime}</h1>
      </div>
      <p className="text-slate-500 leading-6 ">{text}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-[hsl(238,40%,52%)] font-bold bg-gray-100 p-2 rounded-lg text-white ">
          <button onClick={()=>setCount(count+1)}>
          <img src="/images/icon-plus.svg" alt="" />
          </button>
          <h1 className="text-[hsl(238,40%,52%)]">{count}</h1>
          <button onClick={()=>setCount(count-1)}>
            <img src="/images/icon-minus.svg" alt="" />
          </button>

        </div>
        <div className="flex gap-1 items-center justify-center">
          <img src="/images/icon-reply.svg" alt="" className="h-3 w-3 " />
          <span className="font-bold text-[hsl(238,40%,52%)]">Rply</span>
        </div>
      </div>

    </div>
  )
}