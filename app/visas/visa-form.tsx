"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { UploadCloud, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  type: z.string().min(1, "Please select a visa type"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  nationality: z.string().min(2, "Nationality is required"),
  notes: z.string().optional(),
});

export function VisaForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      fullName: "",
      email: "",
      nationality: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const supabase = createClient();
    
    try {
      const { data: application, error: appError } = await supabase
        .from("visa_applications")
        .insert({
          type: values.type,
          status: "pending",
          notes: `Name: ${values.fullName}, Email: ${values.email}, Nationality: ${values.nationality}. Notes: ${values.notes || 'None'}`
        })
        .select()
        .single();

      if (appError || !application) throw appError;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${application.id}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('visas')
          .upload(fileName, file);
          
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('visas').getPublicUrl(fileName);
          
          await supabase.from("visa_documents").insert({
            application_id: application.id,
            document_type: "passport",
            file_url: publicUrl,
            validation_status: "pending"
          });
          
          // Trigger Gemini Validation Copilot via a backend API route (implemented in phase 4)
          fetch('/api/validate-visa-doc', {
            method: 'POST',
            body: JSON.stringify({ documentId: application.id, fileUrl: publicUrl })
          }).catch(console.error);
        }
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold">Application Received</h2>
        <p className="text-muted-foreground max-w-md">
          Your visa application has been securely submitted. Our team will review it and contact you via email shortly.
        </p>
        <Button className="mt-8" onClick={() => setIsSuccess(false)}>Submit Another Application</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50 border-border/50 rounded-2xl h-14 shadow-inner focus:ring-primary">
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="visit_30">30-Day Tourist Visa</SelectItem>
                    <SelectItem value="visit_60">60-Day Tourist Visa</SelectItem>
                    <SelectItem value="residency">Residency Visa</SelectItem>
                    <SelectItem value="golden">Golden Visa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. United Kingdom" {...field} className="bg-background/50 border-border/50 rounded-2xl h-14 shadow-inner focus-visible:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name (as on Passport)</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="bg-background/50 border-border/50 rounded-2xl h-14 shadow-inner focus-visible:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} className="bg-background/50 border-border/50 rounded-2xl h-14 shadow-inner focus-visible:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <FormLabel className="mb-2 block">Upload Passport Copy</FormLabel>
          <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-[2rem] p-10 text-center hover:bg-primary/10 transition-colors">
            <input 
              type="file" 
              id="passport" 
              className="hidden" 
              accept="image/*,.pdf" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label htmlFor="passport" className="cursor-pointer flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm font-medium mb-1">{file ? file.name : "Click to upload or drag and drop"}</p>
              <p className="text-xs text-muted-foreground">PDF, JPG or PNG (max. 10MB)</p>
            </label>
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any specific requirements or travel dates?" 
                  className="resize-none bg-background/50 border-border/50 rounded-2xl p-4 shadow-inner focus-visible:ring-primary min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold mt-8 shadow-xl shadow-primary/20" disabled={isSubmitting}>
          {isSubmitting ? "Submitting Application..." : "Submit Application securely"}
        </Button>
      </form>
    </Form>
  );
}
