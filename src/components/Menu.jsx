
function Menu({scenes,setIsExploring,setIndexXY,progression})
{
    const cells = []
    let numberOfRows = scenes[0] ? scenes[0].length : 0;

    for(let y=0;y<numberOfRows;y++)
    {
        {
            for(let x=0;x<scenes.length;x++)
                if(progression.includes(scenes[x][y].id))
                    cells.push(
                        <div>
                                <img onClick={()=>{setIsExploring(true);setIndexXY(x,y)}} className="h-screen w-screen max-w-25 max-h-25 object-cover rounded-sm transition-all duration-2000 hover:scale-105 hover:cursor-pointer" src={scenes[x][y].thumbnail} alt=""/>
                        </div>)
                else                     
                    cells.push(
                        <div>
                            <div className="h-screen w-screen max-w-25 max-h-25 bg-neutral-900 rounded-sm"/>
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