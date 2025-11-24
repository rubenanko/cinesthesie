import ReactPlayer from 'react-player'
import { useState } from 'react'

function Player({src,blur,volume,text})
{
    const [play,setPlay] = useState(false);
    // const [transitionStart,setTransitionStart] = useState(null);
    const [volumeLowering,setVolumeLowering] = useState(1);
    const [lastBlur,setLastBlur] = useState(0);
    const [currentText,setCurrentText] = useState(text);

    let textBlur = (blur == 50) ? 1 : 0

    const handleTransitionStart = (event) => {
        let increment = -0.05
        let currentVolumeLowering = volumeLowering

        if(text)
            setCurrentText(text)
        
        if(lastBlur == 100)
            increment = 0.05

        if (blur == 0)
            increment = 0.05

        for(let i=0;i<10;i++)
        {
            setTimeout(()=>{
                currentVolumeLowering = Math.max(0,currentVolumeLowering + increment)
                setVolumeLowering(currentVolumeLowering)
            },i*100)
        }

        setLastBlur(blur);
    }

    return (
        <div className='absolute w-full h-full top-0 left-0'>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000" style={{opacity:textBlur}}>{currentText}</div>
            <div className='absolute top-0 left-0 w-full h-full transition-all duration-1000' style={{backdropFilter:`blur(${blur}px)`}}></div>
            <div onTransitionStart={()=>handleTransitionStart(event)} className='absolute top-0 left-0 w-full h-full bg-black transition-all duration-1000' style={{opacity:blur/100}}></div>
            <ReactPlayer
                        src={src}
                        playing={play}
                        onReady={()=>setTimeout(()=>setPlay(true),1000)}
                        controls={false}
                        volume={volume*volumeLowering}
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