import { useRouter } from "next/router"

export default function Index() {
    const router = useRouter()
    return (
        <div class='flex flex-col justify-center items-center h-screen w-screen'>
            <div class='text-3xl font-bold'>Oliver's Chess Project</div>
            <div class='flex flex-row mt-4 gap-x-4'>
                <button 
                    class='bg-orange-600 hover:bg-orange-700 outline outline-orange-800 text-white px-4 py-2 rounded-lg'
                    onClick={() => {router.push('/randomvsrandom')}}
                >
                    Random vs. Random
                </button>
            </div>
        </div>
    )
}