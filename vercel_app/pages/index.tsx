import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
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
          <div>Positive Prompt</div>
          <div>Negative Prompt</div>
          <div>Generate Button</div>
          <div>Slider 1</div>
          <div>Slider 2</div>
          <div>Slider 3</div>
          <div>Image</div>
          <Image
              src="/test_images/bowl_of_fruits/02658-64228577-a bowl of fruits including apple, orange, grapes.png"
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
  )
}
