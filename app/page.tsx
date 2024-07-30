"use client";

import Image from "next/image";
import Link from 'next/link'
import './globals.css'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { useEffect } from 'react'



export default function Home() {
  return (
    <div className="md:flex md:justify-center md:pt-[100px] mb-[75px]">
      <br />
      <div className="flex justify-center shrink-0 items-center">
        <Image src="/images/logo-bg.png" width = {400} height={330} className="max-w-[85%] md:w-[654px] md:h-[540px] drop-shadow-2xl" alt="Vintage Reptiles"></Image>
      </div>
      <div className="flex justify-center items-center shrink-0 pt-[40px] md:pt-0 text-left">
        <div className="text-white text-[1.4rem] max-w-[1000px] w-[90%]">
          Vintage Reptiles is based in Vaughan, Ontario, Canada.

          <br /><br />I am a small scale breeder focusing on crested geckos, gargoyle geckos and tropical plants. I currently only offer shipping across Canada.

          <br /><br />I’ve been a part of the reptile hobby for 10 years and have been breeding for 4 of those years!

          <br /><br />All inquiries will go through my Instagram page <a href="https://www.instagram.com/vintage_reptiles/" className="text-[#cb18db]">@vintage_reptiles</a> as I like to talk to the people who are interested in buying my geckos and plants.

          <br /><br />Please read my Terms of Service before making a purchase! My DMs are always open to questions and inquiries.
        </div>
      </div>
    </div>
  );
}
