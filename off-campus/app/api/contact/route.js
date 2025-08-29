import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, mobile, email, message } = await request.json();

    // Validation
    if (!name || !mobile || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Mobile validation (basic)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile.replace(/\s+/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid mobile number. Please enter 10 digits.' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'iifnitdgp@gmail.com',
      subject: `Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="margin: 0;">IIC Off-Campus Placements</h2>
            <p style="margin: 5px 0 0 0;">Contact Form Submission</p>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <h3 style="color: #1e3c72; margin-top: 0;">Contact Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Mobile:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${mobile}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${email}</td>
              </tr>
            </table>
            
            <h3 style="color: #1e3c72; margin-top: 20px;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2a5298;">
              <p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">This email was sent from the IIC Off-Campus Placements contact form</p>
            <p style="margin: 5px 0 0 0;">NIT Durgapur Industrial Interaction Cell</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
