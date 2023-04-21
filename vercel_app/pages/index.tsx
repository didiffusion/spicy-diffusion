import Image from "next/image";
import { Inter } from "next/font/google";
import SuperSimple from "@/components/SuperSimple";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const image_matrix = [
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, orange, grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), orange, grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), orange, grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), orange, grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), orange, grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), orange, grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), orange, grapes.png',
    ],
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, (orange_1.1), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), (orange_1.1), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), (orange_1.1), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), (orange_1.1), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), (orange_1.1), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), (orange_1.1), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), (orange_1.1), grapes.png',
    ],
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, (orange_1.2), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), (orange_1.2), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), (orange_1.2), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), (orange_1.2), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), (orange_1.2), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), (orange_1.2), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), (orange_1.2), grapes.png',
    ],
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, (orange_1.3), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), (orange_1.3), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), (orange_1.3), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), (orange_1.3), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), (orange_1.3), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), (orange_1.3), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), (orange_1.3), grapes.png',
    ],
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, (orange_1.4), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), (orange_1.4), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), (orange_1.4), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), (orange_1.4), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), (orange_1.4), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), (orange_1.4), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), (orange_1.4), grapes.png',
    ],
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, (orange_1.5), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), (orange_1.5), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), (orange_1.5), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), (orange_1.5), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), (orange_1.5), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), (orange_1.5), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), (orange_1.5), grapes.png',
    ],
    [
    '/test_images/bowl_of_fruits/a bowl of fruits including apple, (orange_1.6), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.1), (orange_1.6), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.2), (orange_1.6), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.3), (orange_1.6), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.4), (orange_1.6), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.5), (orange_1.6), grapes.png',
    '/test_images/bowl_of_fruits/a bowl of fruits including (apple_1.6), (orange_1.6), grapes.png',
    ],

]

export let image_matrix_index = [0,0]

export default function Home() {
    const [midiMessage, setMidiMessage] = useState({channel:0,value:0});
    const [imageLoad, setImageLoad] = useState(image_matrix[image_matrix_index[0]][image_matrix_index[1]]);

    let CC = midiMessage.value;

    // User prompt input
    const [userInput, setUserInput] = useState("");
    const [prompt, setPrompt] = useState([]);

    function storePositivePromptKeywords (e: any) {
        e.preventDefault();

        let results = [];

        let startIndex = userInput.indexOf("__");

        while (startIndex !== -1) {
            const endIndex = userInput.indexOf("__", startIndex + 2);
            if (endIndex === -1 || results.length >= 3) break;

            const foundString = userInput.slice(startIndex + 2, endIndex);
            results.push(foundString);

            startIndex = userInput.indexOf("__", endIndex + 2);
        }
        setPrompt(results);
    }

    function updateMatrixIndex(dimension, value){
        image_matrix_index[dimension] = value;
    }


    const handleMidi = () => {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(success, failure);
        }
        function success(midiAccess: any) {
            midiAccess.addEventListener("statechange", updateDevices);
            const inputs = midiAccess.inputs;
            inputs.forEach((input: any) => {
                input.addEventListener("midimessage", handleInput);
            });
        }

        function handleInput(input: any) {
            setMidiMessage({channel:input.data[1], value:input.data[2]});
        }
        function updateDevices(event: any) {
            // console.log(`name: ${event.port.name} `);
        }

        function failure() {
            console.log("Could not connect MIDI");
        }

    };

    useEffect(() => {
        console.log("PROMPT:", prompt)
    }, [prompt]);

    useEffect(() => {
        handleMidi();
        setImageLoad(image_matrix[image_matrix_index[0]][image_matrix_index[1]]);
        return () => {};
    }, [CC]);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                        <a
                            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            By{" "}
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                className="dark:invert"
                                width={100}
                                height={24}
                                priority
                            />
                        </a>
                    </div>
                </div>
                <div>
                    <form>
                        <label htmlFor="positive">Positive Prompt:</label>
                        <input style={{ color: "black" }} onChange={(e: any) => setUserInput(e.target.value)} type="text" id="positive" name="positive" />
                        <button onClick={(e: any) => storePositivePromptKeywords(e)} style={{ border: "1px solid white", margin: 20, fontSize: 26, padding: 32 }} type="submit">Generate</button>
                        <div>Slider 1</div>
                        <SuperSimple midiMessage={midiMessage} updateMatrixIndex={updateMatrixIndex} setImageLoad={setImageLoad}></SuperSimple>
                        <div>Slider 2</div>
                        <SuperSimple midiMessage={midiMessage} updateMatrixIndex={updateMatrixIndex} setImageLoad={setImageLoad}></SuperSimple>
                        <div>Result Image</div>
                        <Image
                            src={imageLoad}
                            alt="Bowl"
                            className=""
                            width={512}
                            height={512}
                            priority
                        />
                    </form>
                </div>

                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                    <footer>Footer</footer>
                </div>
            </main>
        </>
    );
}
