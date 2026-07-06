import nodemailer from 'nodemailer';

export const sendContactEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Portfolio Contact Form <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject || 'No Subject'}`,
    text: `You have received a new contact message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
`,
    html: `
      <h2>New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
