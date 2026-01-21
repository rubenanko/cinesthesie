
function Menu({scenes,setIsExploring,setIndexXY,progression})
{
    const cells = []
    let numberOfRows = scenes[0] ? scenes[0].length : 0;

    for(let y=0;y<numberOfRows;y++)
    {
        {
            for(let x=0;x<scenes.length;x++)
                if(progression.filter(element=>{return (element[0]==x) && (element[1]==y)}).length)
                    cells.push(
                        <div>
                                <img onClick={()=>{setIsExploring(true);setIndexXY(x,y)}} className="h-25 w-25 object-cover rounded-sm transition-all duration-2000 hover:scale-105 hover:cursor-pointer" src={scenes[x][y].thumbnail} alt=""/>
                        </div>)
                else                     
                    cells.push(
                        <div>
                            <div className="h-25 w-25 bg-transparent rounded-sm"/>
                        </div>)
        }
    }              

    return (
            <div className="grid gap-2 m-25 max-w-fit place-self-center" style={{"gridTemplateColumns":`repeat(${scenes.length}, minmax(0, 1fr))`}}>
                {cells}
            </div>
    )
}

export default Menu;