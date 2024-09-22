"use client";

import Image from "next/image";
import Link from 'next/link';
import '@/app/globals.css';
import { useState, useEffect } from 'react';

export default function ListingDetails({ params }) {
    const [listingData, setData] = useState([]);
    const [focused, setFocused] = useState();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0); // To track which image is focused

    useEffect(() => {
        const fetchData = async () => {
            const body = new FormData();
            let items = params.listing.split("-");
            body.append("id", items[1]);
            body.append("sitePage", items[0]);
            fetch("/api/forsale/getlisting", {method: "POST", body, cache: 'force-cache'})
                .then(async function(result) {
                    const dat = await result.json();
                    const new_dat = await JSON.parse(JSON.stringify(dat));
                    setData(new_dat);
                    setFocused(new_dat.image1.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"));
                    setLoading(false);
                });
        };
    
        fetchData();
    }, [params.listing]);

    const getBorderStyle = (imageUrl) => {
        return imageUrl === focused ? "outline outline-4 outline-white scale-105 brightness-50" : "outline outline-4 outline-white";
    };

    const handleAdd = () =>
    {
        document.getElementById("addbutton").innerHTML = "Adding..."
        document.getElementById("addbutton")?.classList.add("brightness-50")
        document.getElementById("addbutton")?.classList.remove("hover:brightness-75")
        document.getElementById("addbutton")?.classList.remove("cursor-pointer")
        let current = localStorage.getItem("Cart")
        if (current == null)
        {
            localStorage.setItem("Cart", "{}")
        }
        current = JSON.parse(localStorage.getItem("Cart"))
        
        if (params.listing.split("-")[1] in current)
        {
            current[params.listing.split("-")[1]].quantity += 1
            localStorage.setItem("Cart", JSON.stringify(current))
        }
        else
        {
            current[params.listing.split("-")[1]] = {name: listingData.name, price: listingData.price, image: listingData.image1, quantity: 1, priceID: listingData.priceid}
            console.log(current)
            localStorage.setItem("Cart", JSON.stringify(current))
        }

        console.log(localStorage.getItem("Cart"))

        location.reload()
    }

    const openModal = (index) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        setFocused(images[newIndex]);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        setFocused(images[newIndex]);
    };

    const images = [listingData.image1, listingData.image2, listingData.image3, listingData.image4].filter(image => image !== "");

    if (loading) {
        return (
            <div>
                <div className={"flex relative md:h-screen md:max-h-[1000px] justify-center md:pt-[100px] md:mb-0"}>
                    <div className="flex justify-center md:scale-110">
                        <div className="absolute top-[-10px] md:static md:flex md:scale-90 scale-[80%] md:mt-0 md:pt-0 md:pb-0">
                            <div className="md:scale-110 scale-90">
                                <div className="relative w-[400px] h-[400px]">
                                    <div className="table m-auto md:m-0 transition ease-in-out w-[400px] h-[400px] outline outline-4 outline-[#202020] bg-[#2c2c2c] rounded-xl drop-shadow-xl duration-200 md:mr-[100px] md:ml-[100px] animate-pulse"></div>
                                </div>
                                <div className="flex pt-[20px] md:mr-[100px] md:ml-[100px] space-x-5 w-[400px] justify-center">
                                    <div className={`transition h-[80px] w-[80px] ease-in-out rounded-md drop-shadow-xl outline-[#202020] bg-[#2c2c2c] animate-pulse`}></div>
                                    <div className={`transition h-[80px] w-[80px] ease-in-out rounded-md drop-shadow-xl outline-[#202020] bg-[#2c2c2c] animate-pulse`}></div>
                                    <div className={`transition h-[80px] w-[80px] ease-in-out rounded-md drop-shadow-xl outline-[#202020] bg-[#2c2c2c] animate-pulse`}></div>
                                    <div className={`transition h-[80px] w-[80px] ease-in-out rounded-md drop-shadow-xl outline-[#202020] bg-[#2c2c2c] animate-pulse`}></div>
                                </div>
                            </div>
                            <div className="absolute md:static pr-[140px] md:pb-[80px]">
                                <div className="w-[125px] h-[40px] rounded-lg bg-[#2c2c2c] animate-pulse"></div>
                                <br />
                                <p className="w-[330px] h-[40px] rounded-lg bg-[#2c2c2c] animate-pulse"></p>
                                <br />
                                <p className="w-[350px] h-[120px] rounded-lg bg-[#2c2c2c] animate-pulse"/>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className={"flex relative justify-center md:pt-[75px] md:mb-0"}>
                <div className="flex justify-center md:scale-110 mb-[150px]">
                    <div className="absolute top-[-30px] md:static md:flex md:scale-90 scale-[80%] md:mt-0 md:pt-0 md:pb-0">
                        <div className="md:scale-110 scale-90">
                            <div className="relative w-[400px] h-[400px]">
                                <img 
                                    src={focused} 
                                    alt="Listing" 
                                    width={400} 
                                    height={400} 
                                    className={`table m-auto md:m-0 transition ease-in-out w-[400px] h-[400px] outline outline-4 outline-white rounded-xl drop-shadow-xl duration-200 md:mr-[100px] md:ml-[100px] md:w-400 md:h-400 md:inline cursor-zoom-in`}
                                    onClick={() => openModal(currentIndex)}
                                />
                            </div>
                            <div className="flex pt-[20px] md:mr-[100px] md:ml-[100px] space-x-5 w-[400px] justify-center">
                                {images.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")} 
                                        width={80} 
                                        height={80} 
                                        alt="Thumbnail" 
                                        className={`transition h-[80px] w-[80px] ease-in-out ${getBorderStyle(image)} rounded-md drop-shadow-xl cursor-pointer hover:scale-105 hover:brightness-50 duration-200`}
                                        onClick={() => setFocused(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="absolute md:static md:pr-[140px] md:pb-[80px] pb-[140px]">
                            <div className="relative">
                                {listingData.issale === "true" && (
                                    <div className="absolute top-[29px] left-[315px] md:-top-[36px] md:left-[10px] scale-[150%] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                        Sale!
                                    </div>
                                )}
                            </div>
                            {listingData.price !== "" && (<p className={(listingData.issale === "true") ? "text-red-500 text-3xl" : "text-white text-3xl"}>${listingData.price}.00</p>)}
                            {listingData.issale === "true" && (
                                <div className="line-through text-white text-3xl">
                                    ${listingData.oldprice}.00
                                </div>
                            )}
                            <br />
                            <p className="text-white align-top text-4xl font-bold md:w-[200px]">{listingData.name}</p>
                            <div className="w-[100%] h-[1px] bg-white mt-[15px] mb-[15px]"></div>
                            <p className="text-white align-top text-xl w-[400px] w-[300px]" dangerouslySetInnerHTML={{ __html: listingData.description.replace(/(\n)+/g, '<br />') }} />
                            <br /><br />
                            {listingData.price !== "" && (<div id="addbutton" className="font-bold text-white bg-[#9d00ff] w-[175px] h-[50px] flex items-center justify-center rounded-full text-lg outline outline-3 scale-[110%] cursor-pointer hover:brightness-75" onClick={handleAdd}>Add to cart</div>)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <button className="absolute top-4 right-4 text-white text-4xl drop-shadow-lg" onClick={closeModal}>×</button>
                    <button className="absolute left-4 text-white text-4xl drop-shadow-lg py-[250px]" onClick={prevImage}>←</button>
                    <img 
                        src={focused} 
                        alt="Expanded Image" 
                        className={`transition ease-in-out duration-[1000ms] max-w-full max-h-full`}
                    />
                    <button className="absolute right-4 text-white text-4xl drop-shadow-lg py-[250px]" onClick={nextImage}>→</button>
                </div>
            )}
        </div>
    );
}
