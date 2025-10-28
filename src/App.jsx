import './App.css'
import Player from './components/Player'
import { useState } from 'react';

function App() {
  const [scrollXPosition, setScrollXPosition] = useState(0);
  const [scrollYPosition, setScrollYPosition] = useState(0);

  const handleScroll = (event) => {
      const newScrollXPosition = scrollXPosition + event.deltaX;
      const newScrollYPosition = scrollYPosition + event.deltaY;
      setScrollXPosition(newScrollXPosition);
      setScrollYPosition(newScrollYPosition);
  };

  return (
    <div onWheel={() => {handleScroll(event);console.log(scrollYPosition)}}>
      <Player src="src/videos/shesalady.mp4"/>

    </div>
  )
}

export default App
