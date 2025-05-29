import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const options = {
      amount: 100, // ₹500 in paise
      currency: 'INR',
      receipt: 'receipt_order_123',
      
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order }, { status: 200 });
  } catch (err: any) {
    console.error('RAZORPAY ERROR:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
