"use client";

import Image from "next/image";
import Link from 'next/link'
import '../globals.css'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {
  return (
    <div>
      <div className="flex font-bold text-white text-4xl text-center pt-[50px] justify-center">
        2022 Pairs
      </div>

      <div className="flex justify-center space-y-10 pt-[49px]">
        <img src="/images/2022/ahsokaxmorpheus.jpg" width={500} height={500} alt="img" className="w-[80%] max-w-[500px] outline rounded-lg outline-white"></img>
      </div>

      <div className="flex justify-center space-y-10 pt-[49px]">
        <img src="/images/2022/IMG_4510.jpeg" width={500} height={500} alt="img" className="w-[80%] max-w-[500px] outline rounded-lg outline-white"></img>
      </div>

      <div className="flex justify-center space-y-10 pt-[49px]">
        <img src="/images/2022/maraxquigon.jpg" width={500} height={500} alt="img" className="w-[80%] max-w-[500px] outline rounded-lg outline-white"></img>
      </div>

      <div className="flex justify-center space-y-10 pt-[49px]">
        <img src="/images/2022/remixgoblin.jpg" width={500} height={500} alt="img" className="w-[80%] max-w-[500px] outline rounded-lg outline-white"></img>
      </div>

      <div className="flex justify-center space-y-10 pt-[49px]">
        <img src="/images/2022/texasxneri.jpg" width={500} height={500} alt="img" className="w-[80%] max-w-[500px] outline rounded-lg outline-white"></img>
      </div>

      <br></br><br></br><br></br><br></br><br></br>
      
    </div>
  );
}
