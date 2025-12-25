import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Comprehensive platform performance metrics</p>
        </div>
      </div>
    </AdminLayout>
  );
}
