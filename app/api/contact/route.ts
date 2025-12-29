import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, subject, message } = body;

    // Validate required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Email, subject, and message are required fields" },
        { status: 400 }
      );
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Validate message length (reasonable limit to prevent abuse)
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters" },
        { status: 400 }
      );
    }

    // Validate subject length
    if (subject.length < 3 || subject.length > 200) {
      return NextResponse.json(
        { error: "Subject must be between 3 and 200 characters" },
        { status: 400 }
      );
    }

    // Log the submission (for debugging/monitoring)
    console.log("Contact form submission received:", {
      email,
      subject,
      timestamp: new Date().toISOString(),
    });

    // Send email using the email service
    const result = await sendContactEmail({
      recipientEmail: email,
      subject,
      message,
    });

    if (!result.success) {
      console.error("Failed to send email:", result.error);
      return NextResponse.json(
        {
          error:
            result.error ||
            "Failed to send your message. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Your email has been sent successfully! I will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Don't expose internal error details
    return NextResponse.json(
      {
        error: "Failed to process your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
