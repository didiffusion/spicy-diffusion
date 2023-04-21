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

export let matrix_index = [0,0]

export default function Home() {
    const [midiMessage, setMidiMessage] = useState({channel:0,value:0});
    const [imageLoad, setImageLoad] = useState(image_matrix[matrix_index[0]][matrix_index[1]]);
    
    let CC = midiMessage.value;


    function updateMatrixIndex(dimension, value){
        matrix_index[dimension] = value;
        console.log(matrix_index);
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
        handleMidi();
        setImageLoad(image_matrix[matrix_index[0]][matrix_index[1]]);
        return () => {};
    }, [CC]);

    useEffect(() => {
        console.log(imageLoad);
        return () => {};
    }, [imageLoad]);


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
                        <label for="positive">Positive Prompt:</label>
                        <input type="text" id="positive" name="positive" />
                        <label for="negative">Negative Prompt:</label>
                        <input type="text" id="negative" name="negative" />
                        <button type="submit">Generate</button>
                        <div>Slider 1</div>
                        <SuperSimple midiMessage={midiMessage} updateMatrixIndex={updateMatrixIndex}></SuperSimple>
                        <div>Slider 2</div>
                        <SuperSimple midiMessage={midiMessage} updateMatrixIndex={updateMatrixIndex}></SuperSimple>
                        <div>Result Image</div>
                        <Image
                            src={imageLoad}
                            alt="Bowl"
                            className=""
                            width={512}
                            height={512}
                            priority
                        />

                        <div>Memory loaded images</div>
                        <Image
                            src="/test_images/bowl_of_fruits/a bowl of fruits including apple, orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02713-64228577-a bowl of fruits including (apple_1.6), (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02659-64228577-a bowl of fruits including (apple_1.1), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02660-64228577-a bowl of fruits including (apple_1.2), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02661-64228577-a bowl of fruits including (apple_1.3), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02662-64228577-a bowl of fruits including (apple_1.4), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02663-64228577-a bowl of fruits including (apple_1.5), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02664-64228577-a bowl of fruits including (apple_1.6), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02665-64228577-a bowl of fruits including apple, (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02666-64228577-a bowl of fruits including (apple_1.1), (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02667-64228577-a bowl of fruits including (apple_1.2), (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02668-64228577-a bowl of fruits including (apple_1.3), (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02669-64228577-a bowl of fruits including (apple_1.4), (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02670-64228577-a bowl of fruits including (apple_1.5), (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02671-64228577-a bowl of fruits including (apple_1.6), (orange_1.1), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02672-64228577-a bowl of fruits including apple, (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02673-64228577-a bowl of fruits including (apple_1.1), (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02674-64228577-a bowl of fruits including (apple_1.2), (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02675-64228577-a bowl of fruits including (apple_1.3), (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02676-64228577-a bowl of fruits including (apple_1.4), (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02677-64228577-a bowl of fruits including (apple_1.5), (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02678-64228577-a bowl of fruits including (apple_1.6), (orange_1.2), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02679-64228577-a bowl of fruits including apple, (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02680-64228577-a bowl of fruits including (apple_1.1), (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02681-64228577-a bowl of fruits including (apple_1.2), (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02682-64228577-a bowl of fruits including (apple_1.3), (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02683-64228577-a bowl of fruits including (apple_1.4), (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02684-64228577-a bowl of fruits including (apple_1.5), (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02685-64228577-a bowl of fruits including (apple_1.6), (orange_1.3), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02686-64228577-a bowl of fruits including apple, orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02687-64228577-a bowl of fruits including (apple_1.1), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02688-64228577-a bowl of fruits including (apple_1.2), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02689-64228577-a bowl of fruits including (apple_1.3), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02690-64228577-a bowl of fruits including (apple_1.4), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02691-64228577-a bowl of fruits including (apple_1.5), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02692-64228577-a bowl of fruits including (apple_1.6), orange, grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02693-64228577-a bowl of fruits including apple, (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02694-64228577-a bowl of fruits including (apple_1.1), (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02695-64228577-a bowl of fruits including (apple_1.2), (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02696-64228577-a bowl of fruits including (apple_1.3), (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02697-64228577-a bowl of fruits including (apple_1.4), (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02698-64228577-a bowl of fruits including (apple_1.5), (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02699-64228577-a bowl of fruits including (apple_1.6), (orange_1.4), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02700-64228577-a bowl of fruits including apple, (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02701-64228577-a bowl of fruits including (apple_1.1), (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02702-64228577-a bowl of fruits including (apple_1.2), (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02703-64228577-a bowl of fruits including (apple_1.3), (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02704-64228577-a bowl of fruits including (apple_1.4), (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02705-64228577-a bowl of fruits including (apple_1.5), (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02706-64228577-a bowl of fruits including (apple_1.6), (orange_1.5), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02707-64228577-a bowl of fruits including apple, (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02708-64228577-a bowl of fruits including (apple_1.1), (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02709-64228577-a bowl of fruits including (apple_1.2), (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02710-64228577-a bowl of fruits including (apple_1.3), (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02711-64228577-a bowl of fruits including (apple_1.4), (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
                            priority
                        />
                        <Image
                            src="/test_images/bowl_of_fruits/02712-64228577-a bowl of fruits including (apple_1.5), (orange_1.6), grapes.png"
                            alt="Bowl"
                            className=""
                            width={100}
                            height={24}
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
