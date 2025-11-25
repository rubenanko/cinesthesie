import './App.css';
import Explorer from "./pages/Explorer"
import { useEffect, useState } from 'react';
import Menu from './components/Menu';

function App() 
{
  const [isExploring,setIsExploring] = useState(false);
  const [showMenuSection,setShowMenuSection] = useState(true);
  const [isNavigationVertical,setIsNavigationVertical] = useState(true);
  const [changeNavigationDirection,setChangeNavigationDirection] = useState(false);
  const [indexX,_setIndexX] = useState(0);
  const [indexY,_setIndexY] = useState(0);
  const [progression,setProgression] = useState(
                                        window.localStorage.getItem("progression") ? 
                                        JSON.parse(
                                          atob(window.localStorage.getItem("progression"))
                                        ) : []);

  const setIndexX = (index) => {
    _setIndexX(index)
    if(!progression.filter(element=>{return (element[0] == index) && (element[1] == indexY)}).length)
      {
      let newProgression = [...progression,[index,indexY]]
      setProgression(newProgression)
      window.localStorage.setItem("progression",btoa(JSON.stringify(newProgression)))
    }
  }

  
  const setIndexY = (index) => {
    _setIndexY(index)
    if(!progression.filter(element=>{return (element[0] == indexX) && (element[1] == index)}).length)
    {
      let newProgression = [...progression,[indexX,index]]
      setProgression(newProgression)
      window.localStorage.setItem("progression",btoa(JSON.stringify(newProgression)))
    }
  }

  const setIndexXY = (x,y) => {
      _setIndexX(x)
      _setIndexY(y)
      if(!progression.filter(element=>{return (element[0] == x) && (element[1] == y)}).length)
      {
        let newProgression = [...progression,[x,y]]
        setProgression(newProgression)
        window.localStorage.setItem("progression",btoa(JSON.stringify(newProgression)))
      }
  }

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
        setIndexXY={setIndexXY}
        progression={progression}/>
        <div className="m-25">
          <div onClick={()=>{setShowMenuSection(false);setTimeout(()=>{
              if(progression.length)
                setIndexXY(...progression[progression.length-1])
              else
                setIndexXY(0,0)
              setIsExploring(true)},500)}} class="cursor-pointer text-2xl text-red-400 hover:text-black ring-1 ring-red-400 hover:bg-red-400 focus:bg-red-300 focus:ring-red-300 focus:text-black focus:shadow-lg focus:shadow-red-300/100 focus:outline-none hover:shadow-lg hover:shadow-red-500/50 font-medium rounded-lg px-8 py-5 text-center leading-5 transition-all duration-500">
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
