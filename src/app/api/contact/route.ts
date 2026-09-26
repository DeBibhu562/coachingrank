import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, topic, institute, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO_EMAIL || 'info@coachingrank.in';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_FROM_EMAIL || smtpUser}>`,
        to: contactTo,
        replyTo: email,
        subject: `[CoachingRank Inquiry: ${topic || 'General'}] From ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nInstitute/Exam: ${institute || 'N/A'}\n\nMessage:\n${message}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been logged with our editorial desk. We will get back to you within 24–48 hours.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your message. Please email info@coachingrank.in directly.' },
      { status: 500 }
    );
  }
}
