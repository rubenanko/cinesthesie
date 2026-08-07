import Player from '../components/Player';
import { useState,useEffect } from 'react';
import FormatedText from '../components/FormatedText';

function Explorer({scenes,indexX,setIndexX,indexY,setIndexY,changeNavigationDirection,isNavigationVertical,setIsNavigationVertical,onExit}) 
{
  const blurValue = 50;
  const STATE = {BLUR1:0,VIDEO:1,BLUR2:2,TRANSITION:3};

  const [sceneState,setSceneState] = useState(STATE.TRANSITION);
  const [coolDown,setCoolDown] = useState(false);

  useEffect(() =>{
    setCoolDown(true);
    setTimeout(()=>setSceneState(STATE.BLUR1),500)
    setTimeout(()=>setCoolDown(false),1000)
  }, [])

  const [touchPadX,setTouchPadX] = useState(null);
  const [touchPadY,setTouchPadY] = useState(null);
  const [lastTouchPadTimeStamp,setLastTouchPadTimeStamp] = useState(0);

  const [directionX,setDirectionX] = useState(1);
  const [directionY,setDirectionY] = useState(1);
  const [showTitle,setShowTitle] = useState(true);

  const handleNavigationBarClick = () => {
    setIsNavigationVertical(!isNavigationVertical)
  }

  // callback function on scroll
  const handleScroll = (event) => {
    event.preventDefault();
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

        // cooldown avant de pouvoir changer de state
        setCoolDown(true);

        if(nextState == STATE.TRANSITION)
        {
          // timeout de la barre verticale
          setTimeout(() => {
            let newIndex = index;
            let length = isNavigationVertical ? scenes[indexX].length : scenes.length
            let wip = true;

            while (wip)
            {
              newIndex += Math.sign(event.deltaY);
              if(newIndex >= length)
                newIndex = 0;
              if(newIndex < 0)
                newIndex = scenes[0].length-1;

              wip = isNavigationVertical ? scenes[indexX][newIndex].wip : scenes[newIndex][indexY].wip
            }

            setIndex(newIndex)
            },1000)

          setTimeout(() => {setSceneState(Math.abs((nextState+ Math.sign(event.deltaY)) % 4))},1000);
          setDirection(Math.sign(event.deltaY))
          setShowTitle(true);
          setTimeout(() => {setCoolDown(false)},1500)
        }
        else
        {
          setTimeout(() => {setCoolDown(false)},500)
        }

      }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    event.stopPropagation()
    const newTouchPadTimeStamp = Date.now();
    const deltaT = newTouchPadTimeStamp - lastTouchPadTimeStamp
    const deltaX = touchPadX - event.touches[0].clientX
    const deltaY = touchPadY - event.touches[0].clientY
    const deltaXYRatio = Math.abs(deltaX / deltaY);

    setIsNavigationVertical(deltaXYRatio < 1)

    if(deltaT < 500 && deltaT > 5)
    {
      handleScroll({ 
        deltaY: deltaXYRatio < 1 ? deltaY : deltaX
      })
    }
    
    setLastTouchPadTimeStamp(newTouchPadTimeStamp)
    setTouchPadX(event.touches[0].clientX)
    setTouchPadY(event.touches[0].clientY)
  }

  // set up the text
  let text = null
  if(sceneState == STATE.BLUR1 || sceneState == STATE.BLUR2)
    if(showTitle)
      text = <>
                <h2 className="explore-title text-9xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}><FormatedText text={scenes[indexX][indexY].title}/></h2>
                <p className="explore-director text-5xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}><FormatedText text={scenes[indexX][indexY].Director}/></p>
                <p className="explore-year text-3xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}>{scenes[indexX][indexY].Year}</p>
            </>
    else
        text = <p className="explore-preambule text-5xl text-justify" style={{lineHeight: "1.4em",color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}><FormatedText text={scenes[indexX][indexY].preambule}/></p>
  
    
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
        navigationBarStyle = 'explore-compass absolute z-10 right-[50px] bottom-[50px] opacity-255 transition-all duration-300'
      else
        navigationBarStyle = 'explore-compass rotate-90 absolute z-10 right-[50px] bottom-[50px] opacity-255 transition-all duration-300'      
    else
      if(isNavigationVertical)
        navigationBarStyle = 'explore-compass absolute z-10 right-[50px] bottom-[50px] opacity-0 hover:opacity-255 transition-all duration-300'
      else
        navigationBarStyle = 'explore-compass rotate-90 absolute z-10 right-[50px] bottom-[50px] opacity-0 hover:opacity-255 transition-all duration-300'
  else
    navigationBarStyle = 'explore-compass hidden absolute z-10 right-[50px] bottom-[50px] opacity-0 hover:opacity-255 transition-all duration-300'


    

  return (
    <div onWheel={(e) => {handleScroll(e);}} onTouchMoveCapture={(e) => handleTouchMove(e)} style={{position:'fixed',inset:0,overflow:'hidden',touchAction:'none'}}>
      <button className="explore-exit" onClick={onExit} aria-label="Quitter l'exploration">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
      <div className={navigationBarStyle} style={{color:`#${scenes[indexX][indexY].textColor}`}} onClick={handleNavigationBarClick}>
        <svg className="explore-compass-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 22.981l4.12-11.49L12 1.149 7.88 11.49zM9.125 12h5.75L12 20.019z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
      </div>
      <Player src={scenes[indexX][indexY].video}
              blur={blur}
              volume={0.30}
              text={text}/>
    </div>
  )
}

export default Explorer
