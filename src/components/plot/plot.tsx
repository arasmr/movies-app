import { useEffect, useState } from "react";

interface PlotProps {
    text: string;
}

function Plot({ text }: PlotProps) {
    const [readMore, setReadMore] = useState<boolean>(false);

    useEffect(() => {
        setReadMore(false);
    }, [text])

    return (
        <div>
            {text.length > 200 && !readMore ? (
                <>
                    <p>{text.substring(0, 200)}...</p>
                    <button onClick={() => setReadMore(true)}>Read More</button>
                </>
            ) : (
                <p>{text}</p>
            )}
        </div>
    )
}

export default Plot;