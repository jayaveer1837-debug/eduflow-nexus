import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
        </div>
      </div>
    </AdminLayout>
  );
}
