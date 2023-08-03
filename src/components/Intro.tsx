import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/logo.png'

export default function Intro() {
  return(
    <div className='mt-5'>
      <div className='flex justify-center gap-2 text-xs font-bold text-violet-400'>
        <span>THIS IS A DEMO. PLEASE</span>
        <Link 
          href="https://isabella-laschi.vercel.app/"  
          className="text-pink-200 transition hover:text-pink-400" 
          target="_blank"
        >VISIT MY PORTFOLIO</Link>
        <span>FOR MORE.</span>
      </div>

      <Image 
        src={logo} 
        width={200} 
        height={100} 
        alt="" 
        className="mx-auto my-5"
      />
    </div>
  )
}