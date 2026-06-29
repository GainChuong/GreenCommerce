import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ACCESS_KEY = "F8BBA842ECF85";
const SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = body;

    // Verify signature
    const rawSignature = [
      `accessKey=${ACCESS_KEY}`,
      `amount=${amount}`,
      `extraData=${extraData}`,
      `message=${message}`,
      `orderId=${orderId}`,
      `orderInfo=${orderInfo}`,
      `orderType=${orderType}`,
      `partnerCode=${partnerCode}`,
      `payType=${payType}`,
      `requestId=${requestId}`,
      `responseTime=${responseTime}`,
      `resultCode=${resultCode}`,
      `transId=${transId}`,
    ].join("&");

    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(rawSignature)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("IPN signature mismatch!");
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // Log the payment result
    console.log("MoMo IPN received:", {
      orderId,
      transId,
      resultCode,
      amount,
      message,
    });

    // resultCode === 0 means payment successful
    if (resultCode === 0) {
      console.log(`✅ Payment successful for order ${orderId}, transId: ${transId}`);
      // In production, update database here
    } else {
      console.log(`❌ Payment failed for order ${orderId}: ${message}`);
    }

    // Must return 204 to acknowledge receipt
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("IPN processing error:", error);
    return new NextResponse(null, { status: 204 });
  }
}
