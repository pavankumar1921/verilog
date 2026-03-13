export default function Timeline(){

  const ticks = Array.from({length:20});

  return(

    <div className="h-10 border-b border-slate-800 flex text-xs text-gray-400">

      {ticks.map((_,i)=>(
        <div
          key={i}
          className="flex-1 text-center border-l border-slate-800"
        >
          {i*10}ns
        </div>
      ))}

    </div>

  );

}