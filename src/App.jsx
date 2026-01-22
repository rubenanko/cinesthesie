import './App.css';
import Explorer from "./pages/Explorer"
import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import FormatedText from './components/FormatedText';
import InfoText from './components/InfoText';

function getScenes(setScenes)
{
  fetch(import.meta.env.VITE_SCENES_URL, {method:"GET", headers: {"Accept":"application/json"}}).then((response)=> {
    response.json().then((json)=>setScenes(json))
    
  })
}


function App() 
{
  const [scenes,setScenes] = useState([]);

  useEffect(() =>{
    getScenes(setScenes);

  }, [])

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

  const [lastSeen,setLastSeen] = useState(
                                        window.localStorage.getItem("last_seen") ? 
                                        JSON.parse(
                                          atob(window.localStorage.getItem("last_seen"))
                                        ) : []);

  const setIndexX = (index) => {
    _setIndexX(index)

    // update progression if needed
    if(!progression.includes(scenes[index][indexY].id))
    {
      let newProgression = [...progression,scenes[index][indexY].id]
      setProgression(newProgression)
      window.localStorage.setItem("progression",btoa(JSON.stringify(newProgression)))
    }

    // update last seen video if needed
    let newLastSeen = [index,indexY];
    setLastSeen(newLastSeen);
    window.localStorage.setItem("last_seen",btoa(JSON.stringify(newLastSeen)))
  }

  
  const setIndexY = (index) => {
    _setIndexY(index)
    // update progression if needed
    if(!progression.includes(scenes[indexX][index].id))
    {
      let newProgression = [...progression,scenes[indexX][index].id]
      setProgression(newProgression)
      window.localStorage.setItem("progression",btoa(JSON.stringify(newProgression)))
    }

    // update last seen video if needed
    let newLastSeen = [indexX,index];
    setLastSeen(newLastSeen);
    window.localStorage.setItem("last_seen",btoa(JSON.stringify(newLastSeen)))
  }

  const setIndexXY = (x,y) => {
      _setIndexX(x)
      _setIndexY(y)
      // update progression if needed
      if(!progression.includes(scenes[x][y].id))
      {
        let newProgression = [...progression,scenes[x][y].id]
        setProgression(newProgression)
        window.localStorage.setItem("progression",btoa(JSON.stringify(newProgression)))
      }

    // update last seen video if needed
    let newLastSeen = [x,y];
    setLastSeen(newLastSeen);
    window.localStorage.setItem("last_seen",btoa(JSON.stringify(newLastSeen)))
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

  const welcomeText = import.meta.env.VITE_WELCOME_TEXT ?
    <p style={{color:import.meta.env.VITE_WELCOME_TEXT_COLOR}} className="text-2xl font-medium px-8 py-1 mt-5 text-justify leading-10">
      <FormatedText text={import.meta.env.VITE_WELCOME_TEXT}/>
    </p> : <></>

  let returned = isExploring ?
    <Explorer
      scenes={scenes} 
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
        scenes={scenes}
        setIsExploring={setIsExploring}
        setIndexXY={setIndexXY}
        progression={progression}/>

        {welcomeText}

        <div className="m-25 justify-center flex">
          <div onClick={()=>{setShowMenuSection(false);setTimeout(()=>{
              if(lastSeen.length)
                setIndexXY(lastSeen[0],lastSeen[1])
              else
              {
                let firstX = Math.floor((scenes.length-1)/2)
                setIndexXY(firstX,Math.floor((scenes[firstX].length-1)/2))
              }
              setIsExploring(true)},500)}} className="cursor-pointer text-2xl text-red-400 hover:text-black ring-1 ring-red-400 hover:bg-red-400 focus:bg-red-300 focus:ring-red-300 focus:text-black focus:shadow-lg focus:shadow-red-300/100 focus:outline-none hover:shadow-lg hover:shadow-red-500/50 font-medium rounded-lg px-8 py-5 text-center leading-5 transition-all duration-500 max-w-fit">
            {import.meta.env.VITE_BUTTON_TEXT}
          </div>  
        </div>
        <footer style={{color:import.meta.env.VITE_FOOTER_COLOR}} className="fixed left-0 bottom-0 flex gap-10 flex-row-reverse w-full text-md font-medium px-8 py-5">
            <InfoText text={import.meta.env.VITE_CONTACT_EMAIL} />
            <InfoText text={import.meta.env.VITE_CONTACT_INSTAGRAM} icon="/assets/instagram.svg"/>
        </footer>
      </div>


    return (
      <div onKeyDown={()=>handleKeyDown(event)} tabIndex="0" className='focus:outline-none'>
        {returned}
        </div>
    )
}

export default App
