import { Users, UserPlus, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const staff = [
  { name: "Priya Sharma", role: "Head Chef", status: "available" as const, shift: "Morning", phone: "+91 98765 43210" },
  { name: "Rahul Patel", role: "Sous Chef", status: "occupied" as const, shift: "Morning", phone: "+91 98765 43211" },
  { name: "Anita Desai", role: "Server", status: "available" as const, shift: "Evening", phone: "+91 98765 43212" },
  { name: "Vikram Singh", role: "Server", status: "available" as const, shift: "Morning", phone: "+91 98765 43213" },
  { name: "Meera Joshi", role: "Bartender", status: "occupied" as const, shift: "Evening", phone: "+91 98765 43214" },
  { name: "Arjun Kumar", role: "Host", status: "available" as const, shift: "Morning", phone: "+91 98765 43215" },
];

export default function Staff() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Staff</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your team members and shifts.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <UserPlus className="h-4 w-4" /> Add Staff
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 font-medium text-muted-foreground">Name</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Role</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Shift</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Phone</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 font-medium">{s.name}</td>
                <td className="px-6 py-3 text-muted-foreground">{s.role}</td>
                <td className="px-6 py-3">{s.shift}</td>
                <td className="px-6 py-3">
                  <StatusBadge variant={s.status}>{s.status === "available" ? "On Duty" : "Busy"}</StatusBadge>
                </td>
                <td className="px-6 py-3 text-muted-foreground">{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
