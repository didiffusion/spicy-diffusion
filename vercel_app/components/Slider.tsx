import { FC } from "react";

interface SliderProps {
    midi: number[];
}

const SliderComponent: FC<SliderProps> = ({ midi }) => {
    const handleSlider = () => {};
    const handleClick = (value) => {};

    return (
        <div>
            <input type="text" placeholder="var" />
            <input type="range" onChange={handleSlider} value={midi[2]} />
            <button onClick={handleClick(midi[1])}>Map</button>
        </div>
    );
};

export default SliderComponent;
