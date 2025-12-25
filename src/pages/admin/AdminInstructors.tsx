import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminInstructors() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Management</h1>
          <p className="text-muted-foreground mt-1">Manage platform instructors and their courses</p>
        </div>
      </div>
    </AdminLayout>
  );
}
