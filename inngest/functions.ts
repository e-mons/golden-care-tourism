import { inngest } from "./client";
import { createClient } from "@/lib/supabase/server";

interface BookingDetails {
  profiles: {
    email: string;
    full_name: string;
  };
  tour_slots: {
    tours: {
      title: string;
    };
  };
}

export const sendBookingConfirmation = inngest.createFunction(
  { id: "send-booking-confirmation", triggers: [{ event: "booking/created" }] },
  async ({ event, step }) => {
    const bookingId = event.data.bookingId;
    
    // Simulate fetching the booking details
    const bookingDetails = await step.run("fetch-booking-details", async () => {
      const supabase = await createClient();
      const { data } = await supabase
        .from("bookings")
        .select("*, profiles(email, full_name), tour_slots(tours(title))")
        .eq("id", bookingId)
        .single();
      return data;
    });

    if (!bookingDetails) {
      return { status: "skipped", reason: "Booking not found" };
    }

    // Step 2: Send Email (Mocked)
    const emailResult = await step.run("send-email", async () => {
      // In production, integrate Resend or SendGrid here
      const details = bookingDetails as unknown as BookingDetails;
      console.log(`[Email Sent] Confirmation to ${details.profiles?.email} for ${details.tour_slots?.tours?.title}`);
      return { success: true, deliveredAt: new Date().toISOString() };
    });

    return { bookingId, emailResult };
  }
);

export const processVisaStatusUpdate = inngest.createFunction(
  { id: "process-visa-status-update", triggers: [{ event: "visa/status.updated" }] },
  async ({ event, step }) => {
    const { applicationId, newStatus, email } = event.data;

    // Send a notification to the user about their visa application
    await step.run("notify-user", async () => {
      console.log(`[Notification Sent] Visa application ${applicationId} status updated to: ${newStatus}. Email sent to ${email}`);
      // Integrate actual email/whatsapp sender here
    });

    // If approved, trigger the generation of the visa PDF document asynchronously
    if (newStatus === "approved") {
      await step.run("generate-visa-document", async () => {
        console.log(`[PDF Generator] Generating official Visa PDF for application ${applicationId}`);
        // Render PDF and upload to Supabase Storage
      });
    }

    return { success: true };
  }
);
