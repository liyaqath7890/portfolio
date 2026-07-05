"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = void 0;
const nodemailer = __importStar(require("nodemailer"));
const sendContactEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Standard configuration for Gmail
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // 1. Email to the Portfolio Owner (You)
        const mailToOwner = {
            from: process.env.EMAIL_USER,
            to: 'liyaqathali385@gmail.com', // Your receiving email
            replyTo: email,
            subject: `New Contact Form Submission: ${subject || 'Portfolio Inquiry'}`,
            html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f8fafc; border-radius: 8px; border-top: 5px solid #2563EB;">
          <h2 style="color: #0f172a; margin-top: 0;">New Message from Portfolio</h2>
          <p style="color: #475569; font-size: 16px;">You have received a new message via your portfolio contact form.</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 20px;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #334155;">Name:</strong> <span style="color: #0f172a;">${name}</span></p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #334155;">Email:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></p>
            ${subject ? `<p style="margin: 0 0 20px 0;"><strong style="color: #334155;">Subject:</strong> <span style="color: #0f172a;">${subject}</span></p>` : ''}
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            
            <h3 style="color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Message:</h3>
            <p style="color: #0f172a; white-space: pre-wrap; background-color: #f1f5f9; padding: 15px; border-radius: 4px; font-size: 15px; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
        };
        // 2. Auto-reply Email to the Sender (User)
        const mailToSender = {
            from: process.env.EMAIL_USER,
            to: email, // The person who filled out the form
            subject: `Thank you for contacting me, ${name}!`,
            html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f8fafc; border-radius: 8px; border-top: 5px solid #06B6D4;">
          <h2 style="color: #0f172a; margin-top: 0;">Thank You for Reaching Out!</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">I have successfully received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #e2e8f0; margin-top: 25px; margin-bottom: 25px;">
            <p style="color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 8px;"><strong>A copy of your message:</strong></p>
            <p style="color: #334155; white-space: pre-wrap; font-style: italic; margin: 0;">"${message}"</p>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Best regards,<br/><strong style="color: #0f172a;">Liyaqath Ali</strong><br/><span style="color: #64748b; font-size: 14px;">Full Stack Developer</span></p>
        </div>
      `,
        };
        // Send both emails
        await transporter.sendMail(mailToOwner);
        await transporter.sendMail(mailToSender);
        res.status(200).json({ success: true, message: 'Emails sent successfully!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
};
exports.sendContactEmail = sendContactEmail;
//# sourceMappingURL=contactController.js.map