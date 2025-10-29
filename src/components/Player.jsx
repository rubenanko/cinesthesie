import ReactPlayer from 'react-player'
import { useState } from 'react'

function Player({src,blur,volume})
{
    const [play,setPlay] = useState(false);

    return (
        <div className='absolute w-full h-full top-0 left-0'>
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