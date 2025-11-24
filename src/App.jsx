import './App.css';
import Explorer from "./pages/Explorer"
import { useState } from 'react';
import Welcome from './pages/Welcome';

function App() 
{
  const [isExploring,setIsExploring] = useState(false);

  let returned = !isExploring ? <Explorer/> : <Welcome/>

    return (
      <>
        {returned}
      </>
    )
}

export default App
