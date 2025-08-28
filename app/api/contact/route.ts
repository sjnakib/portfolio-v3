import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body
    
    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      )
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      )
    }
    
    // In a real implementation, you would send an email here using a service like Resend
    // For now, we'll just simulate a successful response
    
    console.log("Contact form submission:", {
      name,
      email,
      subject: subject || "Portfolio Contact Form",
      message,
      timestamp: new Date().toISOString(),
    })
    
    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: "Thank you for your message! I'll get back to you soon." 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    )
  }
}
