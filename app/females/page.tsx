"use client";

import Image from "next/image";
import Link from 'next/link';
import '../globals.css';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Home() {
  console.log("page opened")
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(20);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("fetching")
      const result = await fetch('/api/forsale/females', {cache: 'force-cache'});
      console.log("fetched!")
      const data = await result.json();
      setCards(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadMoreCards = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCards((prevVisibleCards) => prevVisibleCards + 10);
          setLoading(false);
        }, 1000);
      }
    };

    observer.current = new IntersectionObserver(loadMoreCards, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    const target = document.querySelector(`#card-${visibleCards}`);
    if (target) {
      observer.current.observe(target);
    }

    return () => {
      if (observer.current && target) {
        observer.current.unobserve(target);
      }
    };
  }, [visibleCards, cards]);

  useEffect(() => {
    if (visibleCards > cards.length) {
      setLoading(false);
    }
  }, [visibleCards, cards.length]);

  return (
    <div>
      <br />
      <br />
      <div className="flex justify-center">
        <div id="products" className="absolute md:flex md:mt-[39px] max-w-[1000px] w-[90%] gap-[40px] md:flex-wrap">
          {cards.slice(0, visibleCards).map((element, index) => (
            <Card
              key={element.id}
              index={index + 1}
              name={element.name}
              price={element.price}
              image1={element.image1.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")}
              issale={element.issale}
              oldprice={element.oldprice}
              id={element.id}
            />
          ))}
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div role="status">
              <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

const Card = ({ index, name, price, image1, issale, oldprice, id}) => {
  const [isClicked, setIsClicked] = useState(false);
  const toListing = "/females/" + id

  return (
    <div id={`card-${index}`}>
      <div className="w-[200px] relative md:block left-1/2 -translate-x-1/2 scale-125 mb-[110px] md:left-0 md:-translate-x-0 md:scale-100 md:mb-[32px]">
        <div className="flex md:flex-wrap md:flex-row">
          <div className="relative translate ease-in-out hover:scale-105 duration-200">
            <div className="flex justify-center">
              <p className="text-center text-white text-lg pb-[5px] md:absolute md:top-0 md:-translate-y-[100%]">{name}</p>
            </div>
            <Link href={toListing}><Image src={image1} priority={true} width={200} height={200} alt="Listing" className="transition ease-in-out w-[200px] h-[200px] outline outline-4 outline-white rounded-lg cursor-pointer drop-shadow-xl duration-200"></Image></Link>
            {price !== "" && (<p className={(issale === "true") ? "text-center text-red-500 text-lg pt-[5px]" : "text-center text-white text-lg pt-[5px]"}>${price}.00</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};