import Navbar from "../components/Navbar"

function Home() {
  return (
  
    <div className="bg-[url('/assets/bg-image-1.png')] h-screen bg-center md:bg-cover text-white roboto px-5 md:px-32">
    <Navbar/>

    <div className="flex flex-col gap-12 justify-center items-center text-2xl h-[70%]">
        <p className="text-white md:text-auto text-center">Cooking made easier with tasty recipes!</p>

        <button className="bg-[#55E5A4] rounded-lg text-black text-md px-5 py-2">Get started</button>
    </div>
</div>

  )
}

export default Home
