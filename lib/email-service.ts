import nodemailer from "nodemailer";
import siteSettings from "../data/siteSettings.json";

/**
 * Email Service Configuration
 * Handles secur          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.6;">Regards,<br/><strong>${
              siteSettings.owner.name
            }</strong><br/>${siteSettings.owner.title}<br/>📍 ${
              siteSettings.owner.location
            }</p>
            
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 12px; color: #999; letter-spacing: 0.5px; text-transform: uppercase;">Connect</p>
              <p style="margin: 8px 0 0 0; font-size: 13px;">
                <a href="https://sjnakib.com" style="color: #667eea; text-decoration: none; font-weight: 500; margin-right: 12px; display: inline-block;">Website</a>
                ${siteSettings.social
                  .map(
                    (social: any) =>
                      `<a href="${social.url}" style="color: #667eea; text-decoration: none; font-weight: 500; margin-right: 12px; display: inline-block;">${social.platform}</a>`
                  )
                  .join("")}
              </p>
            </div>ia SMTP using nodemailer
 */

// Type definitions for email service
export interface EmailPayload {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  message: string;
}

export interface EmailServiceConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: {
    name: string;
    email: string;
  };
}

/**
 * Get email service configuration from environment variables
 * Ensures all required credentials are present
 */
function getEmailConfig(): EmailServiceConfig {
  const requiredVars = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_EMAIL_FROM",
  ];

  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(
        ", "
      )}. Please check your .env.local file.`
    );
  }

  return {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    from: {
      name: "Portfolio Contact",
      email: process.env.CONTACT_EMAIL_FROM!,
    },
  };
}

/**
 * Create and return a nodemailer transporter instance
 * Cached for performance to avoid creating multiple transporter instances
 */
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const config = getEmailConfig();
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }
  return transporter;
}

/**
 * Send contact form email to the portfolio owner and confirmation to sender
 * Both parties receive the SAME email content with unified threading
 */
export async function sendContactEmail(payload: EmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    // Validate input
    if (!payload.recipientEmail || !payload.subject || !payload.message) {
      return {
        success: false,
        error:
          "Missing required email fields: recipientEmail, subject, message",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.recipientEmail)) {
      return {
        success: false,
        error: "Invalid email address provided",
      };
    }

    const config = getEmailConfig();
    const transporter = getTransporter();

    // Format sender name safely
    const senderName = payload.recipientName || "You";

    // Create unified subject line that both parties see
    const unifiedSubject = `[Shafaat's Portfolio] ${payload.subject}`;

    // ========== UNIFIED EMAIL TEMPLATE ==========
    // Both parties receive the same professional email

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="padding: 40px 0;">
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6;">Hello,</p>
          
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6;">Thank you for reaching out. I received your message and appreciate you taking the time to connect with me.</p>
          
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6;"><strong>Here's your message:</strong></p>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1px; border-radius: 6px; margin: 20px 0;">
            <div style="background: white; padding: 16px; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #333;">${escapeHtml(
                payload.message
              )}</p>
            </div>
          </div>
          
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #667eea; font-weight: 600;">I will get back to you very shortly. Feel free to reply directly to this email thread, and we can continue our conversation here.</p>
          
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">Regards,<br/>${
              siteSettings.owner.name
            }<br/>${siteSettings.owner.title}<br/>📍 ${
      siteSettings.owner.location
    }</p>
            
            <p style="margin: 20px 0 10px 0; font-size: 13px; color: #666;">My Portfolio & Social Links:</p>
            <p style="margin: 5px 0; font-size: 13px;">
              <a href="https://sjnakib.com" style="color: #667eea; text-decoration: none; margin-right: 15px;">🌐 Website</a>
              ${siteSettings.social
                .map(
                  (social: any) =>
                    `<a href="${social.url}" style="color: #667eea; text-decoration: none; margin-right: 15px;">${social.platform}</a>`
                )
                .join("")}
            </p>
          </div>
        </div>
      </div>
    `;

    const textContent = `Hello!

Thank you for reaching out. I received your message and appreciate you taking the time to connect with me.

Here's what you shared:

Message:
${payload.message}

---

>> I will get back to you very shortly. You can also to reply directly to this email thread, and we can continue our conversation here.

Regards,
${siteSettings.owner.name}
${siteSettings.owner.title}
📍 ${siteSettings.owner.location}

—————————————

CONNECT

Website: https://sjnakib.com
${siteSettings.social
  .map((social: any) => `${social.platform}: ${social.url}`)
  .join("\n")}
    `.trim();

    // Send one email to visitor with portfolio owner as reply-to
    // This creates a proper thread where both parties can see the conversation
    const mailOptions = {
      from: `"Shafaat Jamil Nakib" <${config.from.email}>`,
      to: payload.recipientEmail,
      replyTo: config.from.email,
      cc: config.from.email, // Portfolio owner sees the email in their inbox too
      subject: unifiedSubject,
      text: textContent,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending contact emails:", error);

    // Don't expose internal error details to client
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email";
    return {
      success: false,
      error: `Email service error: ${errorMessage}`,
    };
  }
}

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
