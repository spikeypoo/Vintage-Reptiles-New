"use client";
import Image from "next/image";
import Link from 'next/link'
import "./globals.css"
import { useState } from 'react'
import Hamburger from './hamburger'

export default function MenuButton() {
    const [modalOpen, setModal] = useState(false)
    const [pairingsOpen, setPairings] = useState(false)

    function modalConfig() {
        setModal(!modalOpen)

        if (modalOpen) {
            document.body.classList.remove("overflow-hidden")
            setPairings(false)
        } else {
            document.body.classList.add("overflow-hidden")
        }
    }

    return (
        <div>
            <div className="-z-10">
                <ul className={modalOpen ? "transition ease-in-out duration-[500ms] absolute transform text-white opacity-100 shadow-xl bg-[#161414] w-screen left-0 h-screen top-0" : "transition ease-in-out duration-[500ms] absolute transform rounded-md text-white opacity-0 left-0 top-0 w-screen pointer-events-none blur-sm bg-[#1c1a1b]"}>
                    <div className="pt-[60px]">
                        <li><Link href="./"><div onClick={() => modalConfig()} className="relative left-1/2 -translate-x-1/2 w-96 h-16 pt-4 text-2xl rounded-t-md transition ease-in-out cursor-pointer">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Home
                                </div>
                            </div>
                        </div></Link></li>
                        <li><Link href="/tos"><div onClick={() => modalConfig()} className="relative left-1/2 -translate-x-1/2 w-96 h-16 pt-4 text-2xl transition ease-in-out cursor-pointer">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100 delay-[70ms]" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Terms of Service
                                </div>
                            </div>
                        </div></Link></li>
                        <li><Link href="/availability"><div onClick={() => modalConfig()} className="relative left-1/2 -translate-x-1/2 w-96 h-16 pt-4 text-2xl transition ease-in-out duration-150 delay-0 cursor-pointer hover:text-[#cb18db]">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100 delay-[140ms]" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Geckos
                                </div>
                            </div>
                        </div></Link></li>
                        <li><Link href="/plants"><div onClick={() => modalConfig()} className="relative left-1/2 -translate-x-1/2 w-96 h-16 pt-4 text-2xl transition ease-in-out duration-150 delay-0 cursor-pointer hover:text-[#cb18db]">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100 delay-[210ms]" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Plants
                                </div>
                            </div>
                        </div></Link></li>
                        <li><div onClick={() => setPairings(!pairingsOpen)} className="relative w-96 left-1/2 -translate-x-1/2 h-16 pt-4 text-2xl transition ease-in-out duration-150 delay-0 cursor-pointer hover:text-[#cb18db]">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100 delay-[280ms]" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Pairings
                                </div>
                            </div>
                        </div></li>
                        <div className="flex justify-center">
                            <li><Link href="/pairings2024"><div onClick={() => modalConfig()} className={pairingsOpen ? "relative w-24 h-16 text-2xl flex items-center transition ease-in-out duration-150 delay-0 cursor-pointer text-[#cb18db] opacity-100 hover:scale-110" : "relative w-32 h-16 text-2xl flex items-center transition ease-in-out duration-150 cursor-pointer text-[#cb18db] opacity-0 pointer-events-none hidden"}>
                                <div className="italic text-center w-full">
                                    2024
                                </div>
                            </div></Link></li>
                            <li><Link href="/pairings2023"><div onClick={() => modalConfig()} className={pairingsOpen ? "relative w-24 h-16 text-2xl flex items-center transition ease-in-out duration-150 delay-0 cursor-pointer text-[#cb18db] opacity-100 hover:scale-110" : "relative w-32 h-16 text-2xl flex items-center transition ease-in-out duration-150 cursor-pointer text-[#cb18db] opacity-0 pointer-events-none hidden"}>
                                <div className="italic text-center w-full">
                                    2023
                                </div>
                            </div></Link></li>
                            <li><Link href="/pairings2022"><div onClick={() => modalConfig()} className={pairingsOpen ? "relative w-24 h-16 text-2xl flex items-center transition ease-in-out duration-150 delay-0 cursor-pointer text-[#cb18db] opacity-100 hover:scale-110" : "relative w-32 h-16 text-2xl flex items-center transition ease-in-out duration-150 cursor-pointer text-[#cb18db] opacity-0 pointer-events-none hidden"}>
                                <div className="italic text-center w-full">
                                    2022
                                </div>
                            </div></Link></li>
                        </div>
                        <li><Link href="/males"><div onClick={() => modalConfig()} className="relative left-1/2 -translate-x-1/2 w-96 h-16 pt-4 text-2xl transition ease-in-out duration-150 delay-0 cursor-pointer hover:text-[#cb18db]">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100 delay-[350ms]" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Males
                                </div>
                            </div>
                        </div></Link></li>
                        <li><Link href="/females"><div onClick={() => modalConfig()} className="relative left-1/2 -translate-x-1/2 w-96 h-16 pt-4 text-2xl rounded-b-md transition ease-in-out duration-150 delay-0 cursor-pointer hover:text-[#cb18db]">
                            <div className={modalOpen ? "transition ease-out duration-[350ms] absolute left-1/2 -translate-x-1/2 opacity-100 delay-[420ms]" : "transition ease-out duration-[500ms] absolute left-1/2 -translate-x-1/2 -translate-y-10 opacity-0"}>
                                <div className="transition ease-in-out duration-150 text-white hover:text-[#cb18db]">
                                    Females
                                </div>
                            </div>
                        </div></Link></li>
                    </div>
                </ul>
                <div id="burger" className={modalOpen ? "absolute right-[35px] top-[23px] hamburger--spring cursor-pointer is-active" : "absolute right-[35px] top-[23px] hamburger--spring cursor-pointer ml-auto"} onClick={() => modalConfig()}>
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
