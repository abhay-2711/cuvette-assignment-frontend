import React from 'react' 
const zuddlLogo = '/assets/zuddl__logo.png'
 
const Header = () => {

  return (
    <header>
    <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10'>

        <div 
            className='
                absolute
                top-0
                left-0
                w-full
                h-full
                bg-gradient-to-br
                from-pink-400
                to-[#0055d1]
                rounded-md
                filter
                blur-3xl
                opacity-50
                -z-50
            '
        />
      <div className='w-16'>
      <img
        src={zuddlLogo}
        alt='Zuddl'
        width={300}
        height={150}
        className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
      />
      </div>

      <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5 flex-1 justify-end w-full'>
      </div>
    </div>
    </header>
  )
}

export default Header
