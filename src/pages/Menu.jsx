import scenes from "../scenes.json"


function Menu({setIsExploring,setIndexX,setIndexY})
{
    const cells = []
    
    for(let x=0;x<scenes.length;x++)
    {
        for(let y=0;y<scenes[0].length;y++)
        {
            cells.push(
            <div>
                    <img onClick={()=>{setIsExploring(true);setIndexX(x);setIndexY(y)}} className="h-50 w-50 object-cover rounded-sm transition-all duration-2000 hover:scale-105 hover:cursor-pointer" src={scenes[x][y].thumbnail} alt=""/>
            </div>)
        }
    }              

    return (
        <div>
            <div class="grid grid-cols-2 md:grid-cols-2 gap-2 m-25">
                {cells}
            </div>
        </div>
    )
}

export default Menu;