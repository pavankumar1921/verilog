export default function CursorOverlay({time}:any){

  return(

    <div className="absolute top-2 right-2 bg-slate-900 px-3 py-1 text-xs text-white">

      t = {time}ns

    </div>

  );

}