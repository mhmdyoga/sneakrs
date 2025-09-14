import React from 'react'

const Footer = () => {
  return (
    <div className='flex md:p-12 p-4 md:-ml-10 -ml-40 md:flex-row flex-col items-center justify-between gap-2'>
        <div className='flex flex-col gap-2'>
        <h2 className='font-bold text-3xl text-slate-900'>Sneakers.co</h2>
        <span className='font-semibold text-slate-400'>Banten, Indonesia</span>
        </div>
        <div className='md:-ml-20 -ml-10 gap-2  grid grid-cols-2 md:grid-cols-5 items-center justify-center'>
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:415536565. */}
            <p className='hover:scale-110 transition-all duration-300'>Shop</p>
            <p className='hover:scale-110 transition-all duration-300'>FAQ</p>
            <p className='hover:scale-110 transition-all duration-300'>About-us</p>
            <p className='hover:scale-110 transition-all duration-300'>Collaboration</p>
            <p className='hover:scale-110 transition-all duration-300'>Carrier</p>
        </div>
    </div>
  )
}

export default Footer