import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <div class='flex flex-row'>
        <button class='flex flex-col items-center m-4 absolute' onClick={() => router.push('/')}>
          <img class='h-10' src='/imgs/pawn-icon.png'/>
        </button>
        <Component {...pageProps} />
      </div>
    </>
  )
}
