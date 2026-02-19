import nodemailer from 'nodemailer';

let transporter;

export const getMailer = () => {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  return transporter;
};

export const sendMail = async ({ to, subject, html }) => {
  const mailer = getMailer();
  return mailer.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html
  });
};
