import React from 'react'

const Navbar = () => {
    return (
        <nav className=' flex bg-slate-800 text-white justify-between py-3' >
            <div className="logo mx-10">
                <span className='font-bold text-xl ' >i-task</span>
            </div>
            <ul className='flex gap-6 mx-6 sm:gap-9 sm:mx-10'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar
