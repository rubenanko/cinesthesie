import Player from '../components/Player';
import { useState,useEffect } from 'react';
import scenes from "../scenes.json"
import FormatedText from '../components/FormatedText';

function Explorer({indexX,setIndexX,indexY,setIndexY,changeNavigationDirection,isNavigationVertical,setIsNavigationVertical}) 
{
  const blurValue = 50;
  const STATE = {BLUR1:0,VIDEO:1,BLUR2:2,TRANSITION:3};

  const [sceneState,setSceneState] = useState(STATE.TRANSITION);
  useEffect(() =>{
    setTimeout(()=>{setSceneState(STATE.BLUR1)},500)
  }, [])

  const [coolDown,setCoolDown] = useState(false);
  const [directionX,setDirectionX] = useState(1);
  const [directionY,setDirectionY] = useState(1);
  const [showTitle,setShowTitle] = useState(true);

  const handleNavigationBarClick = () => {
    setIsNavigationVertical(!isNavigationVertical)
  }

  // callback function on scroll
  const handleScroll = (event) => {
    if(!coolDown)
      if(event.deltaY != 0)
      {
        let nextState = (sceneState + Math.sign(event.deltaY));
        if (nextState > 3)
          nextState = 0
        else
          if (nextState < 0)
            nextState = 3

        setSceneState(nextState);

        let direction = isNavigationVertical ? directionY : directionX
        let setDirection = isNavigationVertical ? setDirectionY : setDirectionX
        let index = isNavigationVertical ? indexY : indexX
        let setIndex = isNavigationVertical ? setIndexY : setIndexX

        if(Math.sign(event.deltaY) == direction)
          setShowTitle(false)
        else
          setShowTitle(true)

        if(nextState == STATE.TRANSITION)
        {
          setTimeout(() => {
            let newIndex = index+Math.sign(event.deltaY);
            let length = isNavigationVertical ? scenes[indexX].length : scenes.length
            if(newIndex >= length)
              newIndex = 0;
            if(newIndex < 0)
              newIndex = scenes[0].length-1;
            setIndex(newIndex)
            },1000)
          setTimeout(() => {setSceneState(Math.abs((nextState+ Math.sign(event.deltaY)) % 4))},1000);
          setDirection(Math.sign(event.deltaY))
          setShowTitle(true);
        }

        
        setCoolDown(true);
        setTimeout(() => {setCoolDown(false)},500)
      }
  };

  // set up the text
  let text = null
  if(sceneState == STATE.BLUR1 || sceneState == STATE.BLUR2)
    if(showTitle)
      text = <>
                <h2 className="text-9xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}><FormatedText text={scenes[indexX][indexY].title}/></h2>
                <p className="text-5xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}><FormatedText text={scenes[indexX][indexY].Director}/></p>
                <p className="text-3xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}>{scenes[indexX][indexY].Year}</p>
            </>
    else
        text = <p className="text-5xl text-justify" style={{lineHeight: "1.4em",color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}><FormatedText text={scenes[indexX][indexY].preambule}/></p>
  
    
    // handle blur
  let blur = blurValue;
  
  if(sceneState == STATE.VIDEO)
    blur = 0
  else
    if(sceneState == STATE.TRANSITION)
      blur = 100



  // handle the navigation direction change

  let navigationBarStyle = null
  if(sceneState == STATE.VIDEO)
    if(changeNavigationDirection)
      if(isNavigationVertical)
        navigationBarStyle = 'absolute z-10 right-[50px] bottom-[50px] text-red-500 opacity-255 transition-all duration-300'
      else
        navigationBarStyle = 'rotate-90 absolute z-10 right-[50px] bottom-[50px] text-red-500 opacity-255 transition-all duration-300'      
    else
      if(isNavigationVertical)
        navigationBarStyle = 'absolute z-10 right-[50px] bottom-[50px] text-red-500 opacity-0 hover:opacity-255 transition-all duration-300'
      else
        navigationBarStyle = 'rotate-90 absolute z-10 right-[50px] bottom-[50px] text-red-500 opacity-0 hover:opacity-255 transition-all duration-300'
  else
    navigationBarStyle = 'hidden absolute z-10 right-[50px] bottom-[50px] text-red-500 opacity-0 hover:opacity-255 transition-all duration-300'


    

  return (
    <div onWheel={() => {handleScroll(event);}}>
      <div className={navigationBarStyle} onClick={handleNavigationBarClick}>
        <svg width="150px" height="150px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 22.981l4.12-11.49L12 1.149 7.88 11.49zM9.125 12h5.75L12 20.019z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
      </div>
      <Player src={scenes[indexX][indexY].video}
              blur={blur}
              volume={0.30}
              text={text}/>
    </div>
  )
}

export default Explorer
