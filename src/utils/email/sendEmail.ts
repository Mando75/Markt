import * as SendGrid from "@sendgrid/mail";
SendGrid.setApiKey(process.env.SENDGRID_API_KEY as string);
import playerWelcome from "./templates/playerWelcome.html";
// TODO move to another email
const fromEmail = "bryanmullerdev@gmail.com";

const sgMail =
  process.env.ENABLE_EMAIL === "true"
    ? SendGrid
    : {
        send: async (msg: any) => console.log("Faking email...", msg)
      };
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

export const sendGridPlayerWelcomeEmail = async (
  to: string,
  playerName: string,
  guideName: string,
  playerCode: string
) => {
  const msg = {
    to,
    from: fromEmail,
    subject: `Welcome to Markt!`,
    html: playerWelcome(playerName, guideName, playerCode)
  };
  return await sgMail.send(msg);
};
