import './App.css';
import Player from './components/Player';
import { useState } from 'react';
import scenes from "./scenes.json"

function App() 
{
  const [scrollXPosition, setScrollXPosition] = useState(0);
  const [scrollYPosition, setScrollYPosition] = useState(0);

  const handleScroll = (event) => {
      const newScrollXPosition = Math.max(0,scrollXPosition + event.deltaX);
      const newScrollYPosition = Math.max(0,scrollYPosition + event.deltaY);
      setScrollXPosition(newScrollXPosition);
      setScrollYPosition(newScrollYPosition);
  };

  const sceneRange = 10000;
  let index = Math.round(scrollYPosition/sceneRange)
  let blur = Math.abs((index*sceneRange - scrollYPosition)/100)
  let volume = 1 - blur/50
  let preambule = ""

  return (
    <div onWheel={() => {handleScroll(event);console.log(blur)}}>
      <Player src={scenes[index]}
              blur={blur}
              volume={volume}
              preambule={preambule}/>
    </div>
  )
}

export default App
