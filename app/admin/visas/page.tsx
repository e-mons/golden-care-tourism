"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminVisasPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchVisas();
  }, []);

  async function fetchVisas() {
    setLoading(true);
    const { data } = await supabase
      .from("visa_applications")
      .select(`
        *,
        visa_documents (*)
      `)
      .order("created_at", { ascending: false });
    
    if (data) setApplications(data);
    setLoading(false);
  }

  async function handleUpdateStatus(id: string, newStatus: string, email: string = "user@example.com") {
    // We import the server action dynamically to avoid 'use client' conflicts or just import it at top.
    const { updateVisaStatus } = await import("@/app/actions/visas");
    await updateVisaStatus(id, newStatus, email);
    fetchVisas();
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Visa Applications</h1>
          <p className="text-muted-foreground text-lg">Review and process submitted visa applications.</p>
        </div>
      </div>

      <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 p-4 md:p-6">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Details</TableHead>
              <TableHead className="font-bold">AI Validation</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">Loading applications...</TableCell></TableRow>
            ) : applications.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">No applications found.</TableCell></TableRow>
            ) : (
              applications.map((app) => {
                const doc = app.visa_documents?.[0];
                const aiStatus = doc?.validation_status || "none";
                
                return (
                  <TableRow key={app.id}>
                    <TableCell className="font-bold uppercase text-xs tracking-wider">{app.type.replace('_', ' ')}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium truncate max-w-[200px] md:max-w-[300px]" title={app.notes}>
                        {app.notes}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">
                        {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {aiStatus === 'validated' && <Badge variant="default" className="bg-green-500 hover:bg-green-600 rounded-lg">AI Approved</Badge>}
                      {aiStatus === 'rejected' && <Badge variant="destructive" className="rounded-lg">AI Rejected</Badge>}
                      {aiStatus === 'pending' && <Badge variant="secondary" className="rounded-lg">Processing</Badge>}
                      {aiStatus === 'none' && <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-lg">No Doc</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={app.status === 'approved' ? 'default' : app.status === 'rejected' ? 'destructive' : 'outline'} className="rounded-lg px-3 py-1">
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" className="rounded-xl" onClick={() => doc?.file_url && window.open(doc.file_url, '_blank')}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 rounded-xl" onClick={() => handleUpdateStatus(app.id, 'approved')}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" className="rounded-xl" onClick={() => handleUpdateStatus(app.id, 'rejected')}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
