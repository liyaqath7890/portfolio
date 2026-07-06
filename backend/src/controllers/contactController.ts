import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendContactEmail } from '../utils/email';

const prisma = new PrismaClient();

// Submit contact form
export const submitContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Save contact to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    // Send email via Nodemailer
    try {
      await sendContactEmail(name, email, subject || 'Portfolio Contact', message);
    } catch (emailError) {
      // Log the email error but don't fail the request since database logging succeeded
      console.error('Nodemailer failed to send email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Submitting message failed',
    });
  }
};
