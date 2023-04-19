import * as React from "react";
import { Range } from "react-range";
import { FC, useEffect, useState } from "react";
import { image_matrix } from "@/pages";

interface SliderProps {
    midi: number[];
    setImageLoad: Function;
}

const SuperSimple: FC<SliderProps> = ({ midi, setImageLoad }) => {
    //state = { values: [50] };

    const [values, setValues] = useState(0);
    const [command, setCommand] = useState(0);
    const [note, setNote] = useState(0);
    const [velocity, setVelocity] = useState();

    useEffect(() => {
        if (midi[1] == note) {
            setValues(midi[2]);
        }

        return () => {};
    }, [midi]);

    const handleClick = () => {
        setNote(midi[1]);
    };

    useEffect(() => {
        console.log(values)
    }, [values]);

    useEffect(() => {
        setImageLoad(image_matrix[values])
    }, [values]);

    return (
        <>
            <Range
                step={1}
                min={0}
                max={3}
                values={[values]}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            backgroundColor: "#ccc",
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "42px",
                            width: "42px",
                            backgroundColor: "#999",
                        }}
                    />
                )}
            />
            <button type="button" onClick={handleClick}>
                {note ? note : "MAP"}
            </button>
            {values}
        </>
    );
};

export default SuperSimple;
