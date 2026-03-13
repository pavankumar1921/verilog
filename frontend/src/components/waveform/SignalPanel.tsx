import React from "react";

export default function SignalPanel({
  signals,
  visibleSignals,
  toggleSignal
}:any){

  return(

    <div className="w-64 bg-slate-900 border-r border-slate-800 overflow-auto">

      {signals.map((sig:string,i:number)=>(
        <div
          key={`${sig}_${i}`}
          className="flex items-center gap-2 px-3 py-1 hover:bg-slate-800"
        >

          <input
            type="checkbox"
            checked={visibleSignals.includes(sig)}
            onChange={()=>toggleSignal(sig)}
          />

          <span className="text-xs font-mono text-white">
            {sig}
          </span>

        </div>
      ))}

    </div>

  );

}