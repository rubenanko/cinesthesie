
function InfoText({text,icon})
{
    const iconTag = icon ? <img className="max-w-6" src={icon} /> : <></>

    const returned = text ? 
    <div className="flex">
        {iconTag}
        <p className="mx-2">
            {text}
        </p>
    </div>
    :
    <></>

    return(
        <>
            {returned}
        </>
    )
}

export default InfoText;