export default function MarkerLayer({markers}:any){

  return(

    <div>

      {markers.map((m:number)=>(
        <div
          key={m}
          className="absolute bg-red-500 w-[2px]"
          style={{left:m}}
        />
      ))}

    </div>

  );

}