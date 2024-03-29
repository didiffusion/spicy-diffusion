// TODO
// Obtener palabras claves del prompt al apreatar "Generate"
// Hacer un llamado a la API por cada permutacion de palabras claves
// Cargar la matriz con los resutlados de las imagenes

import Image from "next/image";
import {Inter} from "next/font/google";
import SuperSimple from "@/components/SuperSimple";
import {useEffect, useState} from "react";

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
    const [userApiKey, setUserApiKey] = useState("");

    const [imgExample, setImgExample] = useState("");

    let CC = midiMessage.value;

    // User prompt input
    const [userInput, setUserInput] = useState("");
    const [prompt, setPrompt] = useState([]);

    function storePositivePromptKeywords () {

        let results = [];
        const separator = '_'
        let startIndex = userInput.indexOf(separator);
        

        while (startIndex !== -1) {
            const endIndex = userInput.indexOf(separator, startIndex + 1);
            if (endIndex === -1 || results.length >= 2) break; // 2 is the max numbers of variables now

            const foundString = userInput.slice(startIndex + 1, endIndex);
            results.push(foundString);

            startIndex = userInput.indexOf(separator, endIndex + 1);
        }
        setPrompt(results);
    }

    function getPromptWithoutKeywords(){
        return userInput.replace(/ *\_[^)]*\_ */g, "")
    }

    function updateMatrixIndex(dimension, value) {
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
        handleMidi();
        setImageLoad(image_matrix[image_matrix_index[0]][image_matrix_index[1]]);
        return () => {};
    }, [CC]);


const weightsForPrompts = [0.8, 0.9, 1.2, 1.3, 1.4, 1.5, 1.6]



function handleGenerate(e:any){
    e.preventDefault();
    storePositivePromptKeywords()
    let promptWithoutKeywords = getPromptWithoutKeywords()
    //console.log(promptWithoutKeywords)

    let result  = []

    prompt.forEach(function (p){
        //console.log(p)
        let term_array = []
        weightsForPrompts.forEach(function (weight) {
            //console.log(weight);
            let prompt_string = "(" + p + "_" + weight + ")"
            //console.log(prompt_string)
            term_array.push({"text": p, "weight": weight })
        });
        result.push(term_array)
      });     

    //console.log(result)
    let pairs: any[]
    pairs = result[0]?.reduce(
         (p, c) => p.concat(
            result[1].map( v => [c].concat(v).
            concat({"x":result[0].indexOf(c),"y":result[1].indexOf(v)}))
        ), []
    )

    pairs?.forEach(item => {
        let text_prompts = [
            {"text": promptWithoutKeywords},
            {"text": item[0].text, "weight":item[0].weight},
            {"text": item[1].text, "weight":item[1].weight},
        ]
        console.log(text_prompts)
        console.log(item[2])
        generateImage(text_prompts, item[2].x, item[2].y)
    });

}

const generateImage = async (text_prompts, x, y) => {
    // text_prompts to send to the API
    // x, y position in the matrix to load the base64 image on
    const engineId = 'stable-diffusion-v1-6';
    // Available engines: stable-diffusion-v1-5 stable-diffusion-512-v2-1 stable-diffusion-768-v2-1
    const apiHost = 'https://api.stability.ai'; // ???
    const apiKey = userApiKey; // ???

    if (!apiKey) throw new Error('Missing Stability API key.')

    const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: text_prompts,
                cfg_scale: 7,
                clip_guidance_preset: 'FAST_BLUE',
                height: 512,
                width: 512,
                samples: 1,
                steps: 30,
                seed:123
            }),
        }
    );

    await response.json().then((data) => {
        if (data)
            setImgExample(data.artifacts[0].base64)
            image_matrix[x][y] = `data:image/jpg;base64,` + data.artifacts[0].base64

    }).catch((error) => {
        console.log(error);
    });
}

useEffect(() => {
    console.log("PROMPT", prompt)
}, []);

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
                    <h1 style={{ textAlign: "center", fontSize: 48 }}>Spicy Diffusion (by LAIA)</h1>
                    <form style={{ display: "flex", flexDirection: "column", width: "50vw" }}>
                        <div style={{ margin: 20, textAlign: "center" }}>
                            <label style={{ marginRight: 10 }} htmlFor="positive">Prompt</label>
                            <input style={{ color: "black", borderRadius: 2, width: "40%", padding: 5 }} onChange={(e: any) => setUserInput(e.target.value)} type="text" id="positive" name="positive" />
                        </div>
                        <div style={{ margin: 20, textAlign: "center" }}>
                            <label style={{ marginRight: 10 }} htmlFor="api-key">Api key</label>
                            <input style={{ color: "black", borderRadius: 2, width: "40%", padding: 5 }} onChange={(e: any) => setUserApiKey(e.target.value)} type="password" id="api-key" name="apiKey" />
                        </div>
                        <button disabled={!prompt || !userApiKey} style={{ border: "1px solid white", opacity: `${!prompt || !userApiKey ? 0.6 : 1}`, transition: "0.5s ease", fontSize: 26, padding: 10, width: "20%", margin: "auto", textAlign: "center" }} onClick={(e) => handleGenerate(e)} type="submit">Generate</button>
                        <div style={{ width: "55%", margin: "20px auto" }}>
                            <h2 style={{ marginBottom: 10, color: "white" }}>{prompt.length > 0 ? prompt[0] : "First value"}</h2>
                            <SuperSimple midiMessage={midiMessage} updateMatrixIndex={updateMatrixIndex} setImageLoad={setImageLoad} defaultNote={0}></SuperSimple>
                        </div>
                        <div style={{ width: "55%", margin: "20px auto" }}>
                            <h2 style={{ marginBottom: 10, color: "white" }}>{prompt.length > 1 ? prompt[1] : "Second value"}</h2>
                            <SuperSimple midiMessage={midiMessage} updateMatrixIndex={updateMatrixIndex} setImageLoad={setImageLoad} defaultNote={1}></SuperSimple>
                        </div>
                        <Image
                            style={{ margin: "auto", borderRadius: 2 }}
                            src={imageLoad}
                            alt="Bowl"
                            className=""
                            width={512}
                            height={512}
                            priority
                        />
                    </form>
                </div>
            </main>
        </>
    );
}
