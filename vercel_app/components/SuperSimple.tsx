import * as React from "react";
import { Range } from "react-range";
import { FC, useEffect, useState } from "react";

interface SliderProps {
    midi: number[];
}

const SuperSimple: FC<SliderProps> = ({ midi }) => {
    //state = { values: [50] };

    const [values, setValues] = useState(50);
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

    return (
        <>
            <Range
                step={0.1}
                min={0}
                max={100}
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
        </>
    );
};

export default SuperSimple;
