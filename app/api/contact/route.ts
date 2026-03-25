import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, email, dogInfo, message } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!name) missing.push("name");
    if (!phone) missing.push("phone");
    if (!email) missing.push("email");
    if (!message) missing.push("message");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // In production: send email to business, save to CRM, auto-reply to customer
    console.log("New contact message:", {
      name,
      phone,
      email,
      dogInfo,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! We typically respond within a few hours during business hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
