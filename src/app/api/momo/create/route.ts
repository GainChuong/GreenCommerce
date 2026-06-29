import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// MoMo Sandbox Credentials
const PARTNER_CODE = "MOMO";
const ACCESS_KEY = "F8BBA842ECF85";
const SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const MOMO_ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, orderInfo, items } = body;

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields: amount, orderId" },
        { status: 400 }
      );
    }

    // Build URLs
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const redirectUrl = `${origin}/checkout/momo-return`;
    const ipnUrl = `${origin}/api/momo/ipn`; // IPN callback (server-to-server)

    const requestId = `${orderId}-${Date.now()}`;
    const requestType = "captureWallet";
    const extraData = "";
    const lang = "vi";
    const autoCapture = true;

    // Build signature string (sorted alphabetically by key)
    const rawSignature = [
      `accessKey=${ACCESS_KEY}`,
      `amount=${amount}`,
      `extraData=${extraData}`,
      `ipnUrl=${ipnUrl}`,
      `orderId=${orderId}`,
      `orderInfo=${orderInfo || "Thanh toan don hang ReFashion"}`,
      `partnerCode=${PARTNER_CODE}`,
      `redirectUrl=${redirectUrl}`,
      `requestId=${requestId}`,
      `requestType=${requestType}`,
    ].join("&");

    // HMAC SHA256 signature
    const signature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(rawSignature)
      .digest("hex");

    // Build MoMo request body
    const momoRequestBody = {
      partnerCode: PARTNER_CODE,
      accessKey: ACCESS_KEY,
      requestId,
      amount: Number(amount),
      orderId,
      orderInfo: orderInfo || "Thanh toan don hang ReFashion",
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang,
      autoCapture,
      items: items || [],
    };

    // Call MoMo API
    const momoResponse = await fetch(MOMO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(momoRequestBody),
    });

    const momoData = await momoResponse.json();

    if (momoData.resultCode === 0 && momoData.payUrl) {
      return NextResponse.json({
        success: true,
        payUrl: momoData.payUrl,
        deeplink: momoData.deeplink,
        qrCodeUrl: momoData.qrCodeUrl,
        orderId,
        requestId,
      });
    } else {
      console.error("MoMo API error:", momoData);
      return NextResponse.json(
        {
          success: false,
          error: momoData.message || "Không thể tạo thanh toán MoMo",
          resultCode: momoData.resultCode,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("MoMo payment creation error:", error);
    return NextResponse.json(
      { error: "Lỗi server khi tạo thanh toán MoMo" },
      { status: 500 }
    );
  }
}
