'use client'
import { SocialIcon } from 'react-social-icons'

import Line from './line'

const Footer = () => {
  return (
    <div>
        <Line />        
        <div className='footer grid grid-col-2 bg-forest-green text-black flex justify-center content-center h-48 p-2'>
        <div className='flex justify-center gap-4 p-4'>
            <SocialIcon bgColor='currentColor' fgColor='transparent' url='https://instagram.com' />
            <SocialIcon bgColor='currentColor' fgColor='transparent' url='https://linkedin.com' />
            <SocialIcon bgColor='currentColor' fgColor='transparent' url='https://tiktok.com' />
        </div>
        <div>
            <h1 className='text-center'>Copyright © CommUNIcate</h1>
        </div>
        </div>
    </div>
  )
}
export default Footer