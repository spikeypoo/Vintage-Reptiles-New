"use client";

import Image from "next/image";
import Link from 'next/link'
import '../globals.css'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client';

import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1200,
      1200,
      "JPEG",
      75,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export default function Home() {
    const [formData, setFormData] = useState({name: "",description: "",price: ""});
    const [image1Data, setimg1Data] = useState()
    const [image2Data, setimg2Data] = useState()
    const [image3Data, setimg3Data] = useState()
    const [image4Data, setimg4Data] = useState()

    const [routeData, setRoute] = useState("/api/forsale/availability")

    const [isSale, setSale] = useState(false)
    const [olderPrice, setOldPrice] = useState("Not Used")

    useEffect(()=>{ 
        fetch(routeData).then(async function(result) {
          let dat = await result.json();
          console.log(JSON.stringify(dat))
          let dat_2 = await JSON.parse(JSON.stringify(dat));
          let cards = dat_2.map(element => (
            <Card
              key={element.id}
              name={element.name}
              description={element.description}
              price={element.price}
              image1={element.image1}
              image2={element.image2}
              image3={element.image3}
              image4={element.image4}
              issale={element.issale}
              oldprice={element.oldprice}
              id={element.id}
              routeData={routeData}
            />
          ));
          let container = document.getElementById("edit2")
          let to_inject = ReactDOM.createRoot(container);
          to_inject.render(cards);

          cards = dat_2.map(element => (
            <Card2
              key={element.id}
              name={element.name}
              description={element.description}
              price={element.price}
              image1={element.image1}
              image2={element.image2}
              image3={element.image3}
              image4={element.image4}
              issale={element.issale}
              oldprice={element.oldprice}
              id={element.id}
              routeData={routeData}
            />
          ));
          container = document.getElementById("remove2")
          to_inject = ReactDOM.createRoot(container);
          to_inject.render(cards);

          document.querySelector("div.location-group").addEventListener("click", function(evt){
            // Check if a radio button triggered the event
            if(evt.target.type === "radio"){
              // Populate the results area with the value of the clicked element
               setRoute(evt.target.value)
            }
          });
        })
      })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("submitted")
      let body = new FormData()

      let urls1 = ""
      let urls2 = ""
      let urls3 = ""
      let urls4 = ""

      if (image1Data)
        {
          body = new FormData()
          const extension = (Date.now() + image1Data.name) as string
          body.append("imagename", extension);

          const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
          const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

          let newimage = await resizeFile(image1Data)
          const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

          const fileUpload = await fetch(presignedUrl, {
            method: "PUT",
            body: base64Data,
          });

          urls1 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
        }
      if (image2Data)
        {
          body = new FormData()
          const extension = (Date.now() + image2Data.name) as string
          body.append("imagename", extension);

          const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
          const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

          let newimage = await resizeFile(image2Data)
          const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

          const fileUpload = await fetch(presignedUrl, {
            method: "PUT",
            body: base64Data,
          });

          urls2 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
        } 
      if (image3Data)
        {
          body = new FormData()
          const extension = (Date.now() + image3Data.name) as string
          body.append("imagename", extension);

          const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
          const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

          let newimage = await resizeFile(image3Data)
          const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

          const fileUpload = await fetch(presignedUrl, {
            method: "PUT",
            body: base64Data,
          });

          urls3 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
        } 
      if (image4Data)
        {
          body = new FormData()
          const extension = (Date.now() + image4Data.name) as string
          body.append("imagename", extension);

          const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
          const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

          let newimage = await resizeFile(image4Data)
          const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

          const fileUpload = await fetch(presignedUrl, {
            method: "PUT",
            body: base64Data,
          });

          urls4 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
        } 
      body = new FormData()
      body.append("name", formData.name)
      body.append("description", formData.description)
      body.append("price", formData.price)
      if (isSale)
        {
          body.append("issale", "true")
          body.append("oldprice", olderPrice)
        }
      else
      {
        body.append("issale", "false")
        body.append("oldprice", "Not Used")
      }
      body.append("image1", urls1);
      body.append("image2", urls2);
      body.append("image3", urls3);
      body.append("image4", urls4);
      console.log(await fetch(routeData, {method: "POST", body}))
      alert("Gecko Uploaded!")
    }

    function handleOptions(button: string)
    {
        document.getElementById("add")?.classList.add("hidden")
        document.getElementById("add")?.classList.add("pointer-events-none")
        document.getElementById("edit")?.classList.add("hidden")
        document.getElementById("edit")?.classList.add("pointer-events-none")
        document.getElementById("remove")?.classList.add("hidden")
        document.getElementById("remove")?.classList.add("pointer-events-none")
        document.getElementById(button)?.classList.remove("hidden")
        document.getElementById(button)?.classList.remove("pointer-events-none")
    }

    function handleSaleChange(event)
    {
      setSale(!isSale)
    }

    function handleSaleChange2(event)
    {
      const { name, value } = event.target;
      setOldPrice(value)
    }
    

    return (
        <div>
            <div className="flex justify-center">
              <div className="flex justify-center gap-10 mt-10 outline bg-gray-600 px-5 outline-white rounded-3xl py-5">
                  <img src="/images/add.png" width={50} height={50} alt="Add" className="transition ease-in-out w-[70px] hover:scale-105 cursor-pointer" onClick={() => handleOptions("add")}></img>
                  <img src="/images/edit.png" width={50} height={50} alt="Add" className="transition ease-in-out w-[50px] hover:scale-105 cursor-pointer" onClick={() => handleOptions("edit")}></img>
                  <img src="/images/remove.png" width={50} height={50} alt="Add" className="transition ease-in-out w-[70px] hover:scale-105 cursor-pointer" onClick={() => handleOptions("remove")}></img>
              </div>
            </div>
            
            <div className="flex justify-center w-screen">
              <div className="location-group flex justify-center gap-10 md:scale-[60%] mt-10 scale-[40%]">
                  <input type="radio" name="location" value="/api/forsale/availability" id="choice1" defaultChecked></input>
                  <label htmlFor="choice1" className="text-white text-3xl font-bold">Geckos</label>

                  <input type="radio" name="location" value="/api/forsale/males" id="choice2"></input>
                  <label htmlFor="choice2" className="text-white text-3xl font-bold">Males</label>

                  <input type="radio" name="location" value="/api/forsale/females" id="choice3"></input>
                  <label htmlFor="choice3" className="text-white text-3xl font-bold">Females</label>

                  <input type="radio" name="location" value="/api/forsale/plants" id="choice4"></input>
                  <label htmlFor="choice4" className="text-white text-3xl font-bold">Plants</label>
                  <input type="radio" name="location" value="/api/forsale/prints" id="choice5"></input>
                  <label htmlFor="choice5" className="text-white text-3xl font-bold">3D Prints</label>
              </div>
            </div>
            <div id="add" className="flex justify-center pt-10">
                <form onSubmit={handleSubmit} >
                    <div className="pb-1 text-white text-xl flex justify-center">Name</div>
                    <label className="flex justify-center">
                        <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="text" value={formData.name} name="name" onChange={handleChange}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">Price</div>
                    <label className="flex justify-center">
                        <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="text" value={formData.price} name="price" onChange={handleChange}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">Sale</div>
                    <label className="flex justify-center">
                      <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="checkbox" onChange={handleSaleChange}/>
                    </label>
                    <div className={isSale ? "" : "hidden"}>
                      <div className="text-white pb-1 text-xl pt-10 flex justify-center">Old Price</div>
                      <label className="flex justify-center">
                        <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="text" onChange={handleSaleChange2}/>
                      </label>
                    </div>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">Description</div>
                    <label className="flex justify-center">
                        <textarea className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" value={formData.description} name="description" onChange={handleChange}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Gecko</div>
                    <label className="flex justify-center">
                        <input accept="image/png" className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg1Data(event.target.files[0])}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Parents *optional*</div>
                    <label className="flex justify-center">
                        <input accept="image/png" className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg2Data(event.target.files[0])}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Grandparents 1 *optional*</div>
                    <label className="flex justify-center">
                        <input accept="image/png" className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg3Data(event.target.files[0])}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Grandparents 2 *optional*</div>
                    <label className="flex justify-center">
                        <input accept="image/png" className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg4Data(event.target.files[0])}/>
                    </label>
                    <br/><br/><div className="flex justify-center"><button className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="submit">Post</button></div>
                </form>
            </div>
            <div id="edit" className="flex justify-center hidden">
              <div id="edit2" className="absolute md:flex max-w-[1000px] w-[90%] gap-[40px] md:flex-wrap">
                Editing
              </div>  
            </div>
            
            <div id="remove" className="flex justify-center hidden">
              <div id="remove2" className="absolute md:flex max-w-[1000px] w-[90%] gap-[40px] md:flex-wrap">
                Editing
              </div>  
            </div>
          <br></br><br></br><br></br><br></br><br></br>
        </div>
  );
}

const Card = ({name, description, price, image1, image2, image3, image4, issale, oldprice, id, routeData}) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
      document.body.classList.add("overflow-hidden")
    };
  
    return (
      <div>
          <div className="w-[200px] relative md:block left-1/2 -translate-x-1/2 scale-125 mb-[80px] md:left-0 md:-translate-x-0 md:scale-100 md:mb-0 mt-10">
            <div className="flex md:flex-wrap md:flex-row">
              <div className="translate ease-in-out hover:scale-105 duration-200">
                <p className="text-center text-white text-lg pb-[5px]">{name}</p>
                <img onClick={handleClick} src={image1} width={200} height={200} alt="Listing" className="transition ease-in-out w-[200px] h-[200px] outline outline-4 outline-white rounded-lg cursor-pointer drop-shadow-xl duration-200"></img>
                <p className={issale ? "text-center text-white text-lg pt-[5px]" : "text-center text-white text-lg pt-[5px]"}>${price}.00</p>
              </div>
            </div>
          </div>
          <ModalEdit onClose={() => setIsClicked(false)} isClicked={isClicked} name={name} description={description} price={price} image1={image1} image2={image2} image3={image3} image4={image4} id={id} issale2={issale} routeData={routeData} oldprice={oldprice}/>
      </div>
    );
  }

  const Card2 = ({name, description, price, image1, image2, image3, image4, issale, oldprice, id, routeData}) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
      document.body.classList.add("overflow-hidden")
    };
  
    return (
      <div>
          <div className="w-[200px] relative md:block left-1/2 -translate-x-1/2 scale-125 mb-[80px] md:left-0 md:-translate-x-0 md:scale-100 md:mb-0 mt-10">
            <div className="flex md:flex-wrap md:flex-row">
              <div className="translate ease-in-out hover:scale-105 duration-200">
                <p className="text-center text-white text-lg pb-[5px]">{name}</p>
                <img onClick={handleClick} src={image1} width={200} height={200} alt="Listing" className="transition ease-in-out w-[200px] h-[200px] outline outline-4 outline-white rounded-lg cursor-pointer drop-shadow-xl duration-200"></img>
                <p className={issale ? "text-center text-white text-lg pt-[5px]" : "text-center text-white text-lg pt-[5px]"}>${price}.00</p>
              </div>
            </div>
          </div>
          <ModalRemove onClose={() => setIsClicked(false)} isClicked={isClicked} name={name} description={description} price={price} image1={image1} image2={image2} image3={image3} image4={image4} id={id} routeData={routeData} />
      </div>
    );
  }

  const ModalEdit = ({ onClose, isClicked, name, description, price, image1, image2, image3, image4, id, issale2, routeData, oldprice}) => {
    const [focused, setFocused] = useState(image1)

    const [formData, setFormData] = useState({name: name ,description: description,price: price, oldprice: oldprice});
    const [image1Data, setimg1Data] = useState()
    const [image2Data, setimg2Data] = useState()
    const [image3Data, setimg3Data] = useState()
    const [image4Data, setimg4Data] = useState()

    const [isSale, setSale] = useState(issale2 == "true")
    const [olderPrice, setOldPrice] = useState(oldprice)
    const [currentSale, setCurrentSale] = useState(false)
    
    const handleExit = () =>
      {
        document.body.classList.remove("overflow-hidden")
        onClose()
        setFocused(image1)
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        let body = new FormData()

        let urls1 = ""
        let urls2 = ""
        let urls3 = ""
        let urls4 = ""

        if (image1Data)
          {
            body = new FormData()
            const extension = (Date.now() + image1Data.name) as string
            body.append("imagename", extension);

            const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
            const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

            let newimage = await resizeFile(image1Data)
            const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

            const fileUpload = await fetch(presignedUrl, {
              method: "PUT",
              body: base64Data,
            });

            urls1 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
          }
        if (image2Data)
          {
            body = new FormData()
            const extension = (Date.now() + image2Data.name) as string
            body.append("imagename", extension);

            const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
            const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

            let newimage = await resizeFile(image2Data)
            const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

            const fileUpload = await fetch(presignedUrl, {
              method: "PUT",
              body: base64Data,
            });

            urls2 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
          } 
        if (image3Data)
          {
            body = new FormData()
            const extension = (Date.now() + image3Data.name) as string
            body.append("imagename", extension);

            const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
            const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

            let newimage = await resizeFile(image3Data)
            const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

            const fileUpload = await fetch(presignedUrl, {
              method: "PUT",
              body: base64Data,
            });

            urls3 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
          } 
        if (image4Data)
          {
            body = new FormData()
            const extension = (Date.now() + image4Data.name) as string
            body.append("imagename", extension);

            const signed1 = await fetch("/api/forsale/awsupload", {method: "POST", body})
            const { presignedUrl } = (await signed1.json()) as { presignedUrl: string };

            let newimage = await resizeFile(image4Data)
            const base64Data =  Buffer.from(newimage.replace(/^data:\w+\/[a-zA-Z+\-.]+;base64,/, ''), 'base64');

            const fileUpload = await fetch(presignedUrl, {
              method: "PUT",
              body: base64Data,
            });

            urls4 = "https://vintage-reptiles-storage.s3.us-east-2.amazonaws.com/" + extension
          } 
        body = new FormData()
        body.append("name", formData.name)
        body.append("description", formData.description)
        body.append("price", formData.price)
        if (isSale)
          {
            body.append("issale", "true")
            body.append("oldprice", olderPrice)
          }
        else
        {
          body.append("issale", "false")
          body.append("oldprice", "Not Used")
        }
        body.append("image1", urls1)
        body.append("image2", urls2)
        body.append("image3", urls3)
        body.append("image4", urls4)
        body.append("id2", id)
        fetch(routeData, {method: "PUT", body})
        alert("Gecko Edited!")
        handleExit()
      }

      function handleSaleChange(event)
      {
        setSale(!isSale)
      }

      function handleSaleChange2(event)
      {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setOldPrice(value)
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
  
    return (
      <div>
        <div className={isClicked ? 'transition ease-in-out flex w-screen h-screen fixed top-0 left-0 z-50 backdrop-blur-lg justify-center items-center opacity-100 duration-150' : 'transition ease-in-out flex w-screen h-screen fixed top-0 left-0 z-50 backdrop-blur-lg justify-center items-center opacity-0 pointer-events-none duration-150 hidden'}>
          <div className={isClicked ? "flex relative w-[90%] max-w-[600px] h-[70%] bg-[#1c1a1b] drop-shadow-xl outline outline-[#161414] rounded-3xl justify-center items-center overflow-auto" : "flex w-[90%] max-w-[600px] h-[70%] bg-[#1c1a1b] drop-shadow-xl outline outline-[#161414] rounded-3xl justify-center items-center overflow-hidden"}>
            <button onClick={handleExit} className="transition ease-in-out absolute scale-150 rounded-full w-6 text-[#808080] bg-[#161414] z-[80] right-7 top-7 outline outline-[#111010] outline-1 hover:bg-[#0e0c0c] hover:text-[#646464]">✕</button>
            <div className="md:flex items-center scale-[75%] md:mt-0 pt-[400px]">
                <form onSubmit={handleSubmit}>
                    <div className="pb-1 text-white text-xl flex justify-center">Name {id}</div>
                    <label className="flex justify-center">
                        <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="text" value={formData.name} name="name" onChange={handleChange}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">Price</div>
                    <label className="flex justify-center">
                        <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="text" value={formData.price} name="price" onChange={handleChange}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">Sale</div>
                    <label className="flex justify-center">
                      <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="checkbox" onChange={handleSaleChange} checked={isSale}/>
                    </label>
                    <div className={isSale ? "" : "hidden"}>
                      <div className="text-white pb-1 text-xl pt-10 flex justify-center">Old Price</div>
                      <label className="flex justify-center">
                        <input className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="text" value={formData.oldprice} name="oldprice" onChange={handleSaleChange2}/>
                      </label>
                    </div>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">Description</div>
                    <label className="flex justify-center">
                        <textarea className="rounded-lg pb-2 bg-gray-700 h-[200px] text-gray-200 border border-gray-600 p-2.5" value={formData.description} name="description" onChange={handleChange}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Gecko</div>
                    <label className="flex justify-center">
                        <input  accept="image/png"className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg1Data(event.target.files[0])}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Parents *optional*</div>
                    <label className="flex justify-center">
                        <input  accept="image/png"className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg2Data(event.target.files[0])}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Grandparents 1 *optional*</div>
                    <label className="flex justify-center">
                        <input  accept="image/png"className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg3Data(event.target.files[0])}/>
                    </label>
                    <div className="text-white pb-1 text-xl pt-10 flex justify-center">img of Grandparents 2 *optional*</div>
                    <label className="flex justify-center">
                        <input  accept="image/png"className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="file" name="image1" onChange={(event) => setimg4Data(event.target.files[0])}/>
                    </label>
                    <br/><br/><div className="flex justify-center"><button className="rounded-lg pb-2 bg-gray-700 text-gray-200 border border-gray-600 p-2.5" type="submit">Edit</button></div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ModalRemove = ({ onClose, isClicked, name, description, price, image1, image2, image3, image4, id, routeData}) => {
    const [focused, setFocused] = useState(image1)

    function handleDelete()
    {
      const body = new FormData()
      body.append("id", id)
      fetch(routeData, {method: "DELETE", body})
      alert("Gecko Deleted!")
      handleExit()
    }

    const [formData, setFormData] = useState({name: name ,description: description,price: price});
    const [image1Data, setimg1Data] = useState()
    const [image2Data, setimg2Data] = useState('')
    const [image3Data, setimg3Data] = useState('')
    const [image4Data, setimg4Data] = useState('')
    
    const handleExit = () =>
      {
        document.body.classList.remove("overflow-hidden")
        onClose()
        setFocused(image1)
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const body = new FormData()
        body.append("name", formData.name)
        body.append("description", formData.description)
        body.append("price", formData.price)
        if (image1Data) body.append("image1", image1Data);
        if (image2Data) body.append("image2", image2Data);
        if (image3Data) body.append("image3", image3Data);
        if (image4Data) body.append("image4", image4Data);
        body.append("id2", id)
        fetch(routeData, {method: "PUT", body})
        alert("Gecko Edited!")
        handleExit()
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
  
    return (
      <div>
        <div className={isClicked ? 'transition ease-in-out flex w-screen h-screen fixed top-0 left-0 z-50 backdrop-blur-lg justify-center items-center opacity-100 duration-150' : 'transition ease-in-out flex w-screen h-screen fixed top-0 left-0 z-50 backdrop-blur-lg justify-center items-center opacity-0 pointer-events-none duration-150 hidden'}>
          <div className={isClicked ? "flex relative w-[90%] max-w-[600px] h-[70%] bg-[#1c1a1b] drop-shadow-xl outline outline-[#161414] rounded-3xl justify-center items-center overflow-auto" : "flex w-[90%] max-w-[600px] h-[70%] bg-[#1c1a1b] drop-shadow-xl outline outline-[#161414] rounded-3xl justify-center items-center overflow-hidden"}>
            <button onClick={handleExit} className="transition ease-in-out absolute scale-150 rounded-full w-6 text-[#808080] bg-[#161414] z-[80] right-7 top-7 outline outline-[#111010] outline-1 hover:bg-[#0e0c0c] hover:text-[#646464]">✕</button>
            <div className="md:flex items-center scale-[200%] md:mt-0">
              <div onClick={handleDelete} className="transition ease-in-out duration-150 bg-[#161414] outline px-5 py-2 outline-[#111010] text-white rounded-lg text-2xl cursor-pointer hover:scale-110">
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
