import nodemailer from "nodemailer";

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (Number(process.env.SMTP_PORT) || 465) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!transporter) return;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "Agence HDS <noreply@agencehds.fr>",
    to,
    subject,
    html,
  });
}

export function passwordChangedEmail(userName: string) {
  return {
    subject: "Votre mot de passe a été modifié — Agence HDS",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #111; margin-bottom: 16px;">Mot de passe modifié</h2>
        <p style="color: #555; line-height: 1.6;">
          Bonjour ${userName || ""},<br><br>
          Votre mot de passe a été modifié avec succès. Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 13px;">Agence HDS — Aix-en-Provence</p>
      </div>
    `,
  };
}

export function welcomeEmail(userName: string) {
  return {
    subject: "Bienvenue sur l'espace Agence HDS",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #111; margin-bottom: 16px;">Bienvenue ${userName || ""} !</h2>
        <p style="color: #555; line-height: 1.6;">
          Votre compte a été créé sur la plateforme Agence HDS. Vous pouvez maintenant vous connecter à votre espace.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 13px;">Agence HDS — Aix-en-Provence</p>
      </div>
    `,
  };
}
