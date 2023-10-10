'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

const carouselImages = [
    {imageUrl: '/assets/images/hero-1.svg', alt: 'smartwatch'},
    {imageUrl: '/assets/images/hero-2.svg', alt: 'smartwatch'},
    {imageUrl: '/assets/images/hero-3.svg', alt: 'smartwatch'},
    {imageUrl: '/assets/images/hero-4.svg', alt: 'smartwatch'},
    {imageUrl: '/assets/images/hero-5.svg', alt: 'smartwatch'},
]

const HeroCarousel = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="hero-carousel carousel mt-5"
      >
        {carouselImages.map((image, index) => (
        <SwiperSlide key={index}>
          <Image src={image.imageUrl} width={484} height={484} className='object-contain' alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}       
      </Swiper>
      <Image src={"assets/icons/hand-drawn-arrow.svg"} width={175} height={175} alt='arrow' className='max-xl:hidden  left[-75%] absaolute bottom-0 z-0'/>
      </>
  
  );
}

export default HeroCarousel