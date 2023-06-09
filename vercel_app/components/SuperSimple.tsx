import * as React from "react";
import { Range } from "react-range";
import { FC, useEffect, useState } from "react";
import {image_matrix, image_matrix_index} from "@/pages";

interface SliderProps {
    midiMessage: {channel:number, value:number};
    updateMatrixIndex: Function;
    setImageLoad: Function;
    defaultNote: number;
}

const SuperSimple: FC<SliderProps> = ({ midiMessage, updateMatrixIndex, setImageLoad, defaultNote }) => {
    const [sliderValue, setSliderSliderValues] = useState(0);
    const [note, setNote] = useState(defaultNote);

    function clamp(input: number, min: number, max: number): number {
        return input < min ? min : input > max ? max : input;
      }

    function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        return clamp(mapped, out_min, out_max);
    }

    useEffect(() => {
        if (midiMessage.channel == note) {
            let mapped_value = map(midiMessage.value, 0,127,0,6)
            setSliderSliderValues(Math.floor(mapped_value));
        }

        return () => {};
    }, [midiMessage]);

    const handleClick = () => {
        setNote(midiMessage.channel);
    };

    useEffect(() => {
        let mapped_value = map(midiMessage.value, 0,127,0,6)
        //updateMatrixIndex(midiMessage.channel, Math.floor(mapped_value))
    }, [midiMessage]);

    useEffect(() => {
        if (sliderValue && image_matrix && image_matrix_index) {
            updateMatrixIndex(note, sliderValue)
            setImageLoad(image_matrix[image_matrix_index[0]][image_matrix_index[1]])
        }
    }, [sliderValue]);

    return (
        <>
            <Range
                step={1}
                min={0}
                max={6}
                values={[sliderValue]}
                onChange={(values: any) => setSliderSliderValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "8px",
                            width: "100%",
                            backgroundColor: "#ccc",
                            marginBottom: 15
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
                            height: 24,
                            width: 24,
                            borderRadius: 20,
                            backgroundColor: "#999",
                        }}
                    />
                )}
            />
            <button type="button" onClick={handleClick}>
                {note ? note : "MAP"}
            </button>
            {sliderValue}
        </>
    );
};

export default SuperSimple;
