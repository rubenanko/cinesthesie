import ReactPlayer from 'react-player'
import { useState } from 'react'

function Player({src,blur,volume,text})
{
    const [play,setPlay] = useState(false);
    // const textBlur = Math.abs(Math.pow((Math.abs(blur/50-0.5))*2,0.2)-1)
    let textBlur = Math.exp(-Math.pow((blur/50-0.5)*2,4)*10)
    if(textBlur < 0.01)
        textBlur = 0

    return (
        <div className='absolute w-full h-full top-0 left-0'>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{opacity:textBlur}}>{text}</div>
            <div className='absolute top-0 left-0 w-full h-full' style={{backdropFilter:`blur(${blur}px)`}}></div>
            <div className='absolute top-0 left-0 w-full h-full bg-black' style={{opacity:blur/100}}></div>
            <ReactPlayer
                        src={src}
                        playing={play}
                        onReady={()=>setTimeout(()=>setPlay(true),1000)}
                        controls={false}
                        volume={volume}
                        style={{
                            width: "100%",
                            height: "100%",
                        "--controls": "none",
                        }} 
                        />
        </div>
    )
}

export default Player