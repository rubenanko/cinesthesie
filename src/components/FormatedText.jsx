
function FormatedText({text})
{
    const lines = text.split("\n");
    const formatedText = [];

    for(let line of lines)
    {
        formatedText.push(line);
        formatedText.push(<br />);
    }

    return (
        <>
            {formatedText}
        </>
    )
}

export default FormatedText;