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
                    <img onClick={()=>{setIsExploring(true);setIndexX(x);setIndexY(y)}} className="h-50 w-50 object-cover rounded-lg transition-all duration-500 hover:scale-110 hover:cursor-pointer" src={scenes[x][y].thumbnail} alt=""/>
            </div>)
        }
    }              

    return (
        <div>
            <div class="grid grid-cols-2 md:grid-cols-2 gap-4 m-25">
                {cells}
            </div>
        </div>
    )
}

export default Menu;