import ReactPlayer from 'react-player'
import { useState } from 'react'

function Player({src})
{
    const [play,setPlay] = useState(false);

    return (
        <div className='absolute w-full h-full top-0 left-0'>
            <ReactPlayer
                        src={src}
                        playing={play}
                        onReady={()=>setTimeout(()=>setPlay(true),1000)}
                        controls={false}
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