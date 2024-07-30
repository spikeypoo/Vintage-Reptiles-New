"use client";

import Image from "next/image";
import Link from 'next/link';
import '@/app/globals.css';
import { useState, useEffect } from 'react';

export default function ListingDetails({ params }) {
    const [listingData, setData] = useState([]);
    const [focused, setFocused] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const body = new FormData();
            body.append("id", params.listing);
            body.append("sitePage", "TestGecko");
            fetch("/api/forsale/getlisting", {method: "POST", body, cache: 'force-cache'})
                .then(async function(result) {
                    const dat = await result.json();
                    const new_dat = await JSON.parse(JSON.stringify(dat));
                    setData(new_dat);
                    setFocused(new_dat.image1.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"));
                    setLoading(false); // Set loading to false after data is fetched
                });
        };
    
        fetchData();
    }, [params.listing]);

    const getBorderStyle = (imageUrl) => {
        return imageUrl === focused ? "outline outline-4 outline-white scale-105 brightness-50" : "outline outline-4 outline-white";
    };

    if (loading) {
        return (
            <div>
                <div className={"flex relative md:h-screen md:max-h-[1000px] justify-center md:pt-[150px] md:mb-0"}>
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
            <div className={"flex relative md:h-screen md:max-h-[1000px] justify-center md:pt-[150px] md:mb-0"}>
                <div className="flex justify-center md:scale-110">
                    <div className="absolute top-[-10px] md:static md:flex md:scale-90 scale-[80%] md:mt-0 md:pt-0 md:pb-0">
                        <div className="md:scale-110 scale-90">
                            <div className="relative w-[400px] h-[400px]">
                                <Image unoptimized loading="eager" src={focused} alt="Listing" width={400} height={400} className="table m-auto md:m-0 transition ease-in-out w-[400px] h-[400px] outline outline-4 outline-white rounded-xl drop-shadow-xl duration-200 md:mr-[100px] md:ml-[100px] md:w-400 md:h-400 md:inline"></Image>
                            </div>
                            <div className="flex pt-[20px] md:mr-[100px] md:ml-[100px] space-x-5 w-[400px] justify-center">
                                {listingData.image1 !== "" && (
                                    <Image priority={true} src={listingData.image1.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")} width={80} height={80} alt="Listing" className={`transition h-[80px] w-[80px] ease-in-out ${getBorderStyle(listingData.image1.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))} rounded-md drop-shadow-xl cursor-pointer hover:scale-105 hover:brightness-50 duration-200`} onClick={() => setFocused(listingData.image1.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))}></Image>
                                )}
                                {listingData.image2 !== "" && (
                                    <Image priority={true} src={listingData.image2.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")} width={80} height={80} alt="Listing" className={`transition h-[80px] w-[80px] ease-in-out ${getBorderStyle(listingData.image2.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))} rounded-md drop-shadow-xl cursor-pointer hover:scale-105 hover:brightness-50 duration-200`} onClick={() => setFocused(listingData.image2.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))}></Image>
                                )}
                                {listingData.image3 !== "" && (
                                    <Image priority={true} src={listingData.image3.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")} width={80} height={80} alt="Listing" className={`transition h-[80px] w-[80px] ease-in-out ${getBorderStyle(listingData.image3.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))} rounded-md drop-shadow-xl cursor-pointer hover:scale-105 hover:brightness-50 duration-200`} onClick={() => setFocused(listingData.image3.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))}></Image>
                                )}
                                {listingData.image4 !== "" && (
                                    <Image priority={true} src={listingData.image4.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")} width={80} height={80} alt="Listing" className={`transition h-[80px] w-[80px] ease-in-out ${getBorderStyle(listingData.image4.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))} rounded-md drop-shadow-xl cursor-pointer hover:scale-105 hover:brightness-50 duration-200`} onClick={() => setFocused(listingData.image4.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/"))}></Image>
                                )}
                            </div>
                        </div>
                        <div className="absolute md:static pr-[140px] md:pb-[80px]">
                            <div className="relative">
                                {listingData.issale === "true" && (
                                    <div className="absolute top-[29px] left-[315px] md:-top-[36px] md:left-[10px] scale-[150%] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                        Sale!
                                    </div>
                                )}
                            </div>
                            <p className={(listingData.issale === "true") ? "text-red-500 text-3xl" : "text-white text-3xl"}>${listingData.price}.00</p>
                            {listingData.issale === "true" && (
                                <div className="line-through text-white text-3xl">
                                    ${listingData.oldprice}.00
                                </div>
                            )}
                            <br />
                            <p className="text-white align-top text-4xl font-bold">{listingData.name}</p>
                            <br />
                            <p className="text-white align-top text-xl" dangerouslySetInnerHTML={{ __html: listingData.description.replace(/(\n)+/g, '<br />') }} />
                            <br /><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
