import {NextRequest, NextResponse} from  "next/server";
import {headers} from  "next/headers";
import stripe from "@/app/lib/stripe"


export  async  function  POST(req: NextRequest, res: NextResponse) {
const headersList = headers();
const cartDetails = await req.json();

let lineItems = (Object.values(cartDetails.details))

console.log("testing")

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
}},
{shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 0,
          currency: 'cad',
        },
        display_name: 'E-Transfer: shop@vintagereptiles.com',
        delivery_estimate: {
        },
}}],
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