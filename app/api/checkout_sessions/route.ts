import connect from "@/app/utils/startMongo"
import {NextRequest, NextResponse} from  "next/server";
import {headers} from  "next/headers";
import stripe from "@/app/lib/stripe"
import { prisma } from "@/app/lib/prisma";
import { ObjectId } from 'bson';


export  async  function  POST(req: NextRequest, res: NextResponse) {
const headersList = headers();
const cartDetails = await req.json();

let lineItems = []

for (let i = 0; i < (Object.values(cartDetails.details)).length; i++)
{
  let lineItems2 = [(Object.values(cartDetails.details))[i]["product"]]

  lineItems.push({"price" : (Object.values(cartDetails.details))[i]["product"].price, "quantity" : (Object.values(cartDetails.details))[i]["product"].quantity})

  console.log("testing")
  console.log((Object.values(cartDetails.details)))
  //console.log(lineItems)

  const client = await connect;

  let productid = (Object.values(cartDetails.details))[i]["stocktrack"].id
  let currpage = (Object.values(cartDetails.details))[i]["stocktrack"].currpage


  let isExist = await client.db("Products").collection(currpage.charAt(0).toUpperCase() + currpage.slice(1)).find({"_id": new ObjectId(productid)}).toArray()
  //console.log(isExist)

  if (isExist[0].stock < lineItems2[0].quantity)
  {
    console.log("not enough in stock")
    return  NextResponse.json({error: "At least one item isn't in stock!"});
  }
}

//console.log(lineItems)

try {
const session = await stripe.checkout.sessions.create({
shipping_address_collection: {allowed_countries: ['CA']},
shipping_options: [{
    shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 2500,
          currency: 'cad',
        },
        display_name: 'Canada MERCHANDISE Shipping. You will be contacted for a quote if your purchase includes a reptile.',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 1,
          },
          maximum: {
            unit: 'business_day',
            value: 3,
          },
        },
      },
},
{shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 0,
          currency: 'cad',
        },
        display_name: 'Canada REPTILE Shipping. You will be contacted for a shipping quote.',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 1,
          },
          maximum: {
            unit: 'business_day',
            value: 2,
          },
        },
}},],
payment_method_types: ["card", "afterpay_clearpay"],
line_items: lineItems,
mode: "payment",
success_url: `${headersList.get("origin")}/thank-you`,
cancel_url: `${headersList.get("origin")}/cart`,
});

return  NextResponse.json({sessionId: session.id});
} catch (err) {
console.log(err)
return  NextResponse.json({error: "Error creating checkout session"});
}
}