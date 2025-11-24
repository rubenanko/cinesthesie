import ReactPlayer from 'react-player'
import { useState } from 'react'

function Player({src,blur,volume,text})
{
    const [play,setPlay] = useState(false);
    let textBlur = (blur == 0) ? 0 : 1

    return (
        <div className='absolute w-full h-full top-0 left-0'>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000" style={{opacity:textBlur}}>{text}</div>
            <div className='absolute top-0 left-0 w-full h-full transition-all duration-1000' style={{backdropFilter:`blur(${blur}px)`}}></div>
            <div className='absolute top-0 left-0 w-full h-full bg-black transition-all duration-1000' style={{opacity:blur/100}}></div>
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