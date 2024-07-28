import connect from "@/app/utils/startMongo"
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { type NextRequest } from 'next/server'
import { stringify } from "querystring";
import { ObjectId } from 'bson';
import { prisma } from "@/app/lib/prisma";

    
export async function GET() {
  const time = Date.now();
  
  const cursor = await prisma.plants.findMany({select: {id: true, name: true, price: true, image1: true , issale: true, oldprice: true, description: true}})
  const newvar = (Date.now() - time);
  console.log(String(newvar));
  
  return Response.json(cursor);
}


export async function POST(request: Request){
  const files = await request.formData()
  console.log("files are now uploading")

  const client = await connect;
  client.db("Products").collection("Plants").insertOne({
    name: files.get("name"),
    price: files.get("price"),
    description: files.get("description"),
    image1: files.get("image1"),
    image2: files.get("image2"),
    image3: files.get("image3"),
    image4: files.get("image4"),
    issale: files.get("issale"),
    oldprice: files.get("oldprice")
  })
  return Response.json({message: "successfully uploaded the gecko"})
}

export async function PUT(request: Request){
  const files = await request.formData()
  const url1 = files.get("image1")
  const url2 = files.get("image2")
  const url3 = files.get("image3")
  const url4 = files.get("image4")

  const client = await connect;

  const id = files.get("id2") as string
  if (await url1 != "")
    {
      client.db("Products").collection("Plants").findOneAndUpdate({"_id": new ObjectId(id)}, {$set: { "image1": await url1 }})
    }
  if (await url2 != "")
    {
      client.db("Products").collection("Plants").findOneAndUpdate({"_id": new ObjectId(id)}, {$set: { "image2": await url2 }})
    }
  if (await url3 != "")
    {
      client.db("Products").collection("Plants").findOneAndUpdate({"_id": new ObjectId(id)}, {$set: { "image3": await url3 }})
    }
  if (await url4 != "")
    {
      client.db("Products").collection("Plants").findOneAndUpdate({"_id": new ObjectId(id)}, {$set: { "image4": await url4 }})
    }

    client.db("Products").collection("Plants").findOneAndUpdate({"_id": new ObjectId(id)}, {$set: { "name": files.get("name"), "price": files.get("price"), "description": files.get("description"), "issale" : files.get("issale"), "oldprice" : files.get("oldprice") }})

  return Response.json({message: "successfully edited the gecko"})
}

export async function DELETE(request: Request)
{
  const client = await connect;
  const files = await request.formData()
  const id = files.get("id") as string
  client.db("Products").collection("Plants").findOneAndDelete({"_id": new ObjectId(id)})

  return Response.json({message: "successfully removed the gecko"})
}