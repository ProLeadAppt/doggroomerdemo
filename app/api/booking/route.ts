import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { service, dogName, breed, dogSize, notes, date, time, ownerName, email, phone } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!service) missing.push("service");
    if (!dogName) missing.push("dogName");
    if (!breed) missing.push("breed");
    if (!dogSize) missing.push("dogSize");
    if (!date) missing.push("date");
    if (!time) missing.push("time");
    if (!ownerName) missing.push("ownerName");
    if (!email) missing.push("email");
    if (!phone) missing.push("phone");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate phone (Australian format)
    const phoneClean = phone.replace(/[\s\-()]/g, "");
    if (!/^(\+?61|0)\d{9}$/.test(phoneClean)) {
      return NextResponse.json(
        { error: "Invalid phone number. Please use Australian format (e.g. 0412 345 678)" },
        { status: 400 }
      );
    }

    // In production, this is where you'd:
    // 1. Save to database (e.g. Supabase, Prisma)
    // 2. Send confirmation email (e.g. SendGrid, Resend)
    // 3. Send SMS notification (e.g. Twilio)
    // 4. Add to calendar (e.g. Google Calendar API)

    console.log("New booking received:", {
      service,
      dogName,
      breed,
      dogSize,
      notes,
      date,
      time,
      ownerName,
      email,
      phone,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Booking request received. We'll confirm via SMS within the hour.",
      booking: {
        service,
        dogName,
        date,
        time,
        ownerName,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
