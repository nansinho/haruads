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

export interface DevisEmailData {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  selectedOffer: string;
  selectedOptions: string[];
  customOptions: string[];
  description: string;
  attachmentsCount: number;
}

export function newDevisNotificationEmail(data: DevisEmailData) {
  const optionsList = [...data.selectedOptions, ...data.customOptions.map((o) => `${o} (personnalisée)`)];
  return {
    subject: `Nouvelle demande de devis - ${data.reference}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #111; margin-bottom: 16px;">Nouvelle demande de devis</h2>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <p style="color: #333; margin: 0 0 8px;"><strong>Référence :</strong> ${data.reference}</p>
          <p style="color: #333; margin: 0 0 8px;"><strong>Client :</strong> ${data.name}</p>
          <p style="color: #333; margin: 0 0 8px;"><strong>Email :</strong> ${data.email}</p>
          ${data.phone ? `<p style="color: #333; margin: 0 0 8px;"><strong>Téléphone :</strong> ${data.phone}</p>` : ""}
          ${data.company ? `<p style="color: #333; margin: 0 0 8px;"><strong>Entreprise :</strong> ${data.company}</p>` : ""}
        </div>
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; font-size: 15px; margin-bottom: 8px;">Formule choisie</h3>
          <p style="color: #555; margin: 0;">${data.selectedOffer}</p>
        </div>
        ${optionsList.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; font-size: 15px; margin-bottom: 8px;">Options sélectionnées</h3>
          <ul style="color: #555; padding-left: 20px; margin: 0;">
            ${optionsList.map((o) => `<li style="margin-bottom: 4px;">${o}</li>`).join("")}
          </ul>
        </div>
        ` : ""}
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; font-size: 15px; margin-bottom: 8px;">Description du projet</h3>
          <p style="color: #555; line-height: 1.6; margin: 0;">${data.description}</p>
        </div>
        ${data.attachmentsCount > 0 ? `<p style="color: #555;"><strong>${data.attachmentsCount} pièce(s) jointe(s)</strong> attachée(s) à la demande.</p>` : ""}
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 13px;">Agence HDS — Consultez le détail dans l'espace admin.</p>
      </div>
    `,
  };
}

export function devisConfirmationEmail(data: DevisEmailData) {
  return {
    subject: `Votre demande de devis - ${data.reference} | Agence HDS`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #111; margin-bottom: 16px;">Demande de devis reçue</h2>
        <p style="color: #555; line-height: 1.6;">
          Bonjour ${data.name},<br><br>
          Nous avons bien reçu votre demande de devis <strong>${data.reference}</strong> pour la formule <strong>${data.selectedOffer}</strong>.
        </p>
        <p style="color: #555; line-height: 1.6;">
          Notre équipe va analyser votre projet et vous recontactera sous <strong>48 heures</strong>.
        </p>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="color: #333; font-size: 14px; margin: 0;"><strong>Récapitulatif :</strong></p>
          <p style="color: #555; font-size: 14px; margin: 8px 0 0;">Formule : ${data.selectedOffer}</p>
          <p style="color: #555; font-size: 14px; margin: 4px 0 0;">Options : ${data.selectedOptions.length + data.customOptions.length} sélectionnée(s)</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 13px;">Agence HDS — Aix-en-Provence</p>
      </div>
    `,
  };
}
