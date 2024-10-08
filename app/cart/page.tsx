"use client";

import Image from "next/image";
import Link from 'next/link';
import '@/app/globals.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import {loadStripe} from "@stripe/stripe-js"

export default function CartDetails() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(20);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(true)
  const [totalPrice, setTotal] = useState(0)
  const observer = useRef();

  useEffect(() => 
    {
        if (localStorage.getItem("Cart") != null)
        {
            let holder = JSON.parse(localStorage.getItem("Cart"));

            let count = 0
            for (const [key, value] of Object.entries(holder))
            {
                count += (value.price * value.quantity)
            }
            setTotal(count)


            let current = Object.entries(holder)
            setCards(current)
        }
    }, []);

    const redirectToCheckout = async () => {
        try {
        const stripe = await loadStripe("pk_live_51PQlcqRsYE4iOwmAYRRGhtl24Vnvc9mkZ37LB5PlJl8XcHVbTf0B0T3h7Ey7y28URqdIITb48aM9jjZ7wjuCPKKb00utiqhUVv");

        let holder = JSON.parse(localStorage.getItem("Cart"));

        let details = {}

        for (const [key, value] of Object.entries(holder))
            {
                details[key] = {}
                details[key]["product"] = {}
                details[key]["product"]["price"] = value.priceID
                details[key]["product"]["quantity"] = value.quantity
                details[key]["stocktrack"] = {}
                details[key]["stocktrack"]["id"] = value.id
                details[key]["stocktrack"]["currpage"] = value.currpage
            }

        const checkoutResponse = await  fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({details}),
            });
            
        const ses = await checkoutResponse.json();
        const {sessionId} = ses

        if (ses.error == "At least one item isn't in stock!")
        {
          alert(ses.error)
        }
        stripe.redirectToCheckout({ sessionId }).then(function (result) {
          if (result.error) {
            console.error(result.error.message);
          }
       });

        if (stripeError) {
            console.error(stripeError);
            }
            } catch (error) {
            console.error(error);
        }
            
    }

  return (
    <div>
      <br />
      <br />
      <div className="flex justify-center">
        <div className="text-white text-4xl font-bold">Your Cart</div>
        {cards.length > 0 && <div id="products" className="absolute max-w-[1000px] w-[100%] pb-[50px] pt-[80px]">
          {cards.map((element, index) => (
            <Card
              key={element[0]}
              index={index + 1}
              name={element[1].name}
              price={element[1].price}
              quantity={element[1].quantity}
              image={element[1].image.replace("vintage-reptiles-storage.s3.us-east-2.amazonaws.com/", "d3ke37ygqgdiqe.cloudfront.net/")}
              id={element[0]}
            />
          ))}
          {cards.length > 0 && <div className="flex justify-center"><div className="w-[90%] max-w-[1000px] h-[1px] bg-gray-400"></div></div>}
          <div className="md:ml-auto md:w-[500px]">
            <div className="flex justify-center text-white text-xl pt-[40px]">Subtotal <span className="pl-[30px] text-lg">${totalPrice}.00 CAD</span></div>
            <div className="flex justify-center text-white text-sm pt-[15px]">Taxes and shipping are calculated during checkout</div>
            <div onClick={redirectToCheckout} className="flex justify-center text-white text-md pt-[45px]"><div className="w-[320px] bg-[#6d229b] text-center py-[10px] rounded-md font-bold transition ease-in-out duration-200 hover:bg-[#55197a] cursor-pointer">CHECK OUT</div></div>
          </div>
        </div>}
      </div>
      {cards.length == 0 && <div className="flex justify-center text-white text-3xl pt-[40px]">...is empty!</div>}
    </div>
  );
}

const Card = ({ index, name, price, quantity, image, issale, oldprice, id}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [itemPrice, setPrice] = useState(price)

  function handleChange(e)
  {
    let holder = JSON.parse(localStorage.getItem("Cart"))
    holder[id].quantity = e.target.value
    localStorage.setItem("Cart", JSON.stringify(holder))
    setPrice(price)
    location.reload()
  }

  function handleDelete()
  {
    let holder = JSON.parse(localStorage.getItem("Cart"))
    delete holder[id]
    localStorage.setItem("Cart", JSON.stringify(holder))
    location.reload()
  }

  return (
    <div className="">
        <div className="flex justify-center"><div className="w-[90%] max-w-[1000px] h-[1px] bg-gray-400"></div></div>
        <div className="flex" id={`card-${index}`}>
            <div className="flex mr-auto pl-[40px] pt-[25px] pb-[15px]">
                <img className="w-[70px] h-[70px] rounded-lg outline outline-white outline-3" src={image}></img>
                <div className="text-white text-md pl-[20px] max-w-[100px] mb-[10px]">{name}</div>
            </div>
            <div className="ml-auto">
                <div className="pr-[40px] pt-[20px] text-white text-lg text-right">${itemPrice}.00</div>
                <div className="pr-[40px] pt-[15px] text-white text-sm">Qty <input type="number" min={1} step={1} defaultValue={quantity} className="w-[60px] ml-[5px] rounded-sm text-black text-lg text-center" onBlur={handleChange}></input></div>
            </div>
        </div>
        <div className="text-[#9d00ff] font-bold underline underline-offset-[5px] ml-[130px] mb-[15px] w-[60px] h-[30px] cursor-pointer hover:text-[#6d229b]" onClick={handleDelete}>Remove</div>
    </div>
  );
};