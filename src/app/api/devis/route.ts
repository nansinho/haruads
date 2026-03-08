import { NextRequest } from "next/server";
import { quotesService } from "@/lib/supabase-admin";
import { sendEmail, newDevisNotificationEmail, devisConfirmationEmail } from "@/lib/email";
import type { DevisEmailData } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.description) {
      return Response.json({ error: "Nom, email et description requis" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return Response.json({ error: "Email invalide" }, { status: 400 });
    }

    const reference = await quotesService.getNextReference();

    const notes = JSON.stringify({
      selected_offer: body.selectedOffer || "",
      selected_options: body.selectedOptions || [],
      custom_options: body.customOptions || [],
    });

    const { data, error } = await quotesService.create({
      reference,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      // service_id references services table, not offers — offer info is stored in notes
      description: body.description,
      attachments: body.attachments || [],
      notes,
      status: "new",
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    const emailData: DevisEmailData = {
      reference,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      selectedOffer: body.selectedOffer || "Non spécifiée",
      selectedOptions: body.selectedOptions || [],
      customOptions: body.customOptions || [],
      description: body.description,
      attachmentsCount: (body.attachments || []).length,
    };

    const adminNotification = newDevisNotificationEmail(emailData);
    const clientConfirmation = devisConfirmationEmail(emailData);

    await Promise.allSettled([
      sendEmail({ to: "contact@agencehds.fr", ...adminNotification }),
      sendEmail({ to: "contact@harua-ds.com", ...adminNotification }),
      sendEmail({ to: body.email, ...clientConfirmation }),
    ]);

    return Response.json({ success: true, reference, id: data.id }, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
