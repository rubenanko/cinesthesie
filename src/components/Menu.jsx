
function Menu({scenes,setIsExploring,setIndexXY,progression})
{
    const cells = []
    let numberOfRows = scenes[0] ? scenes[0].length : 0;
    let cellIndex = 0;

    for(let y=0;y<numberOfRows;y++)
    {
        {
            for(let x=0;x<scenes.length;x++)
            {
                const i = cellIndex++;
                const style = {"--i": i};
                if(scenes[x][y].wip)
                    cells.push(
                        <div className="map-cell map-cell--wip" style={style} key={i}>
                            <div className="map-wip-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="13" r="8" />
                                    <path d="M12 9v4l2.5 2" />
                                    <path d="M9 2h6M12 5V2" />
                                </svg>
                            </div>
                            {/* <span className="map-wip-label">bientôt</span> */}
                        </div>)
                else
                    if(progression.includes(scenes[x][y].id))
                        cells.push(
                            <div className="map-cell map-cell--discovered" style={style} key={i}
                                 onClick={()=>{setIsExploring(true);setIndexXY(x,y)}}>
                                <img className="map-thumb" src={scenes[x][y].thumbnail} alt=""/>
                                <div className="map-overlay">
                                    <p className="map-title">{scenes[x][y].title}</p>
                                    <p className="map-year">{scenes[x][y].Year} · {scenes[x][y].Director}</p>
                                </div>
                                <span className="map-badge">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                            </div>)
                    else
                        cells.push(
                            <div className="map-cell map-cell--locked" style={style} key={i}>
                                <span className="map-mystery">?</span>
                            </div>)
            }
        }
    }              

    return (
            <div className="menu-grid" style={{"gridTemplateColumns":`repeat(${scenes.length}, minmax(0, 1fr))`}}>
                {cells}
            </div>
    )
}

export default Menu;