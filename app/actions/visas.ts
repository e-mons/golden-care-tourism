"use server";

import { createClient } from "@/lib/supabase/server";
import { inngest } from "@/inngest/client";
import { revalidatePath } from "next/cache";

export async function updateVisaStatus(applicationId: string, newStatus: string, applicantEmail: string) {
  const supabase = await createClient();

  // 1. Update Database
  const { error } = await supabase
    .from("visa_applications")
    .update({ status: newStatus })
    .eq("id", applicationId);

  if (error) {
    throw new Error(error.message);
  }

  // 2. Trigger Inngest background workflow
  await inngest.send({
    name: "visa/status.updated",
    data: {
      applicationId,
      newStatus,
      email: applicantEmail,
    },
  });

  revalidatePath("/admin/visas");
}
