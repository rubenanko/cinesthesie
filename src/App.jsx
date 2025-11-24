import './App.css';
import Explorer from "./pages/Explorer"
import { useState } from 'react';
import Menu from './pages/Menu';

function App() 
{
  const [isExploring,setIsExploring] = useState(false);
  const [showMenuSection,setShowMenuSection] = useState(true);
  const [isNavigationVertical,setIsNavigationVertical] = useState(true);
  const [changeNavigationDirection,setChangeNavigationDirection] = useState(false);
  const [indexX,setIndexX] = useState(0);
  const [indexY,setIndexY] = useState(0);

  const handleKeyDown = (event) => {

    if(event.code == "Space")
    {
      setChangeNavigationDirection(true)
      setTimeout(()=>setIsNavigationVertical(!isNavigationVertical),500)
      setTimeout(()=>setChangeNavigationDirection(false),1500)
    }

    if(event.code == "Escape")
    {
      setIsExploring(false)
      setShowMenuSection(true)
    }
  }

  let returned = isExploring ?
    <Explorer 
      indexX={indexX}
      setIndexX={setIndexX}
      indexY={indexY}
      setIndexY={setIndexY}
      changeNavigationDirection={changeNavigationDirection}
      setChangeNavigationDirection={setChangeNavigationDirection}
      isNavigationVertical={isNavigationVertical}
      setIsNavigationVertical={setIsNavigationVertical}/>
      :
      <div className="transition-all duration-500" style={{"opacity":showMenuSection ? "1" : "0"}}>
        <Menu
        setIsExploring={setIsExploring}
        setIndexX={setIndexX}
        setIndexY={setIndexY}/>
        <div className="m-25">
          <div type="button" onClick={()=>{setShowMenuSection(false);setTimeout(()=>{setIsExploring(true)},500)}} class="cursor-pointer text-2xl text-red-400 hover:text-black ring-1 ring-red-400 hover:bg-red-400 focus:bg-red-300 focus:ring-red-300 focus:text-black focus:shadow-lg focus:shadow-red-300/100 focus:outline-none hover:shadow-lg hover:shadow-red-500/50 font-medium rounded-lg px-8 py-5 text-center leading-5 transition-all duration-500">
            Zou !
          </div>  
        </div>
      </div>


    return (
      <div onKeyDown={()=>handleKeyDown(event)} tabIndex="0" className='focus:outline-none'>
        {returned}

        </div>
    )
}

export default App
