import React from 'react'
import Title from '../components/Title'
import { assets } from "../assets/assets";
import NewsLetterBox from '../components/NewsLetterBox'
function About() {
  return (
    <div >
        <div className='text-2xl text-center pt-8 border-t'>
           <Title text1={'ABOUT'} text2={'US'}/>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
              <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
              <div className='flex flex-col  justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus architecto adipisci autem animi aliquid eius numquam facilis totam, facere laudantium, esse nam tempora praesentium. Voluptatum accusamus aliquid deleniti at quod?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem dolor porro natus nemo ut ex debitis, autem impedit ducimus reprehenderit dolorum consequatur voluptatibus unde praesentium. Enim ducimus veritatis facere libero?</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus explicabo fuga facilis exercitationem dignissimos tempora dolores. Quae qui quod totam sunt. Voluptates, laborum quis? Esse atque amet vel nam!</p>
              </div>
        </div>
        <div className='text-xl py-4'>
              <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
                <b>Quality Assurence</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, incidunt quo! Similique quae inventore optio accusantium fugiat aperiam tenetur illum reprehenderit, commodi iste porro, minus ipsum libero a sit. Tenetur.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
                <b>Convenience</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, incidunt quo! Similique quae inventore optio accusantium fugiat aperiam tenetur illum reprehenderit, commodi iste porro, minus ipsum libero a sit. Tenetur.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
                <b>Exceptional Customer Service</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, incidunt quo! Similique quae inventore optio accusantium fugiat aperiam tenetur illum reprehenderit, commodi iste porro, minus ipsum libero a sit. Tenetur.</p>
          </div>
        </div>
        <NewsLetterBox/>
    </div>
  )
}

export default About
