import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your platform configuration</p>
        </div>
      </div>
    </AdminLayout>
  );
}
