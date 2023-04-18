import * as React from "react";
import { Range } from "react-range";
import { FC } from "react";



interface SliderProps {
    midi: number[];
}

const SuperSimple: FC<SliderProps> = ({ midi }) => {
    //state = { values: [50] };

    const handleSlider =()=>{

    }


    return (
        <Range
            step={0.1}
            min={0}
            max={100}
            values={[midi[2]]}
            //onChange={handleSlider()}
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
                    }} />
            )} onChange={function (values: number[]): void {
                throw new Error("Function not implemented.");
            } }        />
    );
};

export default SuperSimple;
