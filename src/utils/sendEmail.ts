import * as sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
// TODO move to another email
const fromEmail = "bryanmullerdev@gmail.com";

/**
 * Sends a confirmation email through the SendGrid API
 * @param to
 * @param link
 */
export const sendConfirmEmail = async ({
  to,
  link
}: {
  to: string;
  link: string;
}) => {
  const msg = {
    to,
    from: fromEmail,
    subject: "Please confirm your email",
    html: `<html>
             <body>
               <p>Thank you for signing up! Please click on the link below to confirm your email</p>
               <a href="${link}">Please confirm your email</a>
             </body>
           </html>`
  };
  return await sgMail.send(msg);
};

/**
 * Sends an email to reset password link
 * @param to
 * @param link
 */
export const sendGridForgotPasswordEmail = async ({
  to,
  link
}: {
  to: string;
  link: string;
}) => {
  const msg = {
    to,
    from: fromEmail,
    subject: "Password reset link",
    html: `<html><body><p>Click on the link below to reset your password</p><a href="${link}">Reset Password</a></body></html>`
  };
  return await sgMail.send(msg);
};
