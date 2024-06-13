import React from 'react'

const Footer = () => {
  return (
    <div className='flex p-12 -ml-16 md:flex-row flex-col items-center justify-between gap-2'>
        <div className='flex flex-col gap-2'>
        <h2 className='font-bold text-3xl text-slate-900'>Sneakers.co</h2>
        <span className='font-semibold text-slate-400'>Banten, Indonesia</span>
        </div>
        <div className='flex -ml-20 flex-col md:flex-row gap-2'>
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