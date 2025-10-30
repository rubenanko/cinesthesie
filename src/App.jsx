import './App.css';
import Player from './components/Player';
import { useState } from 'react';
import scenes from "./scenes.json"

function App() 
{
  const sceneRange = 20000;
  const blurRange = sceneRange/100

  const [scrollXPosition, setScrollXPosition] = useState(0);
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [indexX, setIndexX] = useState(0);
  const [indexY, setIndexY] = useState(0);
  const [directionX, setDirectionX] = useState(0);
  const [directionY, setDirectionY] = useState(0);

  const handleScroll = (event) => {
      const newScrollXPosition = Math.min(Math.max(0,scrollXPosition + event.deltaX),(scenes.length-1)*sceneRange*5/4 - 1);
      const newScrollYPosition = Math.min(Math.max(0,scrollYPosition + event.deltaY),(scenes[indexX].length-1)*sceneRange*5/4 - 1);
      setScrollXPosition(newScrollXPosition);
      setScrollYPosition(newScrollYPosition);
  };

  // save the amount of re renders

  let tmpIndexY = Math.round(scrollYPosition/sceneRange)
  let tmpIndexX = Math.round(scrollXPosition/sceneRange)

  // update the index, and coming direction
  if(tmpIndexX != indexX)
  {
    setIndexX(tmpIndexX)
    setDirectionX(tmpIndexX*sceneRange - scrollXPosition)
    setDirectionY(0)
  }

  if(tmpIndexY != indexY)
  {
    setIndexY(tmpIndexY)
    setDirectionY(tmpIndexY*sceneRange - scrollYPosition)
    setDirectionX(0)
  }


  // recenter the scrolling on the current main axis
  if((indexX*sceneRange != scrollXPosition) && Math.abs(indexX*sceneRange - scrollXPosition)/Math.abs(indexY*sceneRange - scrollYPosition) < 0.5)
    setScrollXPosition(indexX*sceneRange)

  else
  {
    if((indexY*sceneRange != scrollYPosition) && Math.abs(indexY*sceneRange - scrollYPosition)/Math.abs(indexX*sceneRange - scrollXPosition) < 0.5)
      setScrollYPosition(indexY*sceneRange)
  }

  // calculate blur values
  let distance = Math.sqrt(Math.pow(indexY*sceneRange - scrollYPosition,2) + Math.pow(indexX*sceneRange - scrollXPosition,2))
  let blur = distance/blurRange
  let volume = Math.exp(-blur/20)

  // set up the text
  let text = null
  if((indexY*sceneRange - scrollYPosition)*directionY > 0 || (indexX*sceneRange-scrollXPosition)*directionX > 0)
    text = <>
              <h2 className="text-9xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}>{scenes[indexX][indexY].title}</h2>
              <p className="text-5xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}>{scenes[indexX][indexY].Director}</p>
              <p className="text-3xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}>{scenes[indexX][indexY].Year}</p>
          </>
  else
    text = <p className="text-5xl" style={{color:`#${scenes[indexX][indexY].textColor}`,fontFamily: scenes[indexX][indexY].font}}>{scenes[indexX][indexY].preambule}</p>

  return (
    <div onWheel={() => {handleScroll(event)}}>
      <Player src={scenes[indexX][indexY].video}
              blur={blur}
              volume={volume}
              text={text}/>
    </div>
  )
}

export default App
