import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminCourses() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage all platform courses</p>
        </div>
      </div>
    </AdminLayout>
  );
}
