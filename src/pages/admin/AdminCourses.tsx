import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layouts/AdminLayout";

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  category: string;
  status: "published" | "pending" | "draft" | "rejected";
  price: number;
  enrollments: number;
  revenue: number;
  rating: number;
  reviewCount: number;
  completionRate: number;
  createdAt: string;
  modules: number;
  duration: string;
}

const mockCourses: Course[] = [
  { id: "1", title: "React Complete Guide 2024", instructor: "Sarah Johnson", category: "Web Development", status: "published", price: 89.99, enrollments: 2450, revenue: 220455, rating: 4.9, reviewCount: 312, completionRate: 78, createdAt: "2024-01-15", modules: 24, duration: "32h" },
  { id: "2", title: "Python for Data Science", instructor: "Emily Davis", category: "Data Science", status: "published", price: 79.99, enrollments: 1890, revenue: 151181, rating: 4.8, reviewCount: 245, completionRate: 72, createdAt: "2024-02-10", modules: 18, duration: "28h" },
  { id: "3", title: "Machine Learning A-Z", instructor: "David Lee", category: "AI & ML", status: "pending", price: 129.99, enrollments: 0, revenue: 0, rating: 0, reviewCount: 0, completionRate: 0, createdAt: "2024-03-01", modules: 32, duration: "45h" },
  { id: "4", title: "JavaScript Fundamentals", instructor: "Michael Brown", category: "Web Development", status: "published", price: 49.99, enrollments: 3200, revenue: 159968, rating: 4.7, reviewCount: 456, completionRate: 85, createdAt: "2023-11-20", modules: 12, duration: "18h" },
  { id: "5", title: "UI/UX Design Masterclass", instructor: "Jennifer White", category: "Design", status: "draft", price: 99.99, enrollments: 0, revenue: 0, rating: 0, reviewCount: 0, completionRate: 0, createdAt: "2024-03-05", modules: 20, duration: "25h" },
  { id: "6", title: "AWS Cloud Practitioner", instructor: "Robert Chen", category: "Cloud Computing", status: "published", price: 119.99, enrollments: 1450, revenue: 173985, rating: 4.8, reviewCount: 189, completionRate: 68, createdAt: "2024-01-28", modules: 16, duration: "22h" },
  { id: "7", title: "Flutter Mobile Development", instructor: "Lisa Anderson", category: "Mobile Development", status: "published", price: 89.99, enrollments: 980, revenue: 88190, rating: 4.6, reviewCount: 134, completionRate: 71, createdAt: "2024-02-15", modules: 22, duration: "30h" },
  { id: "8", title: "Ethical Hacking Basics", instructor: "James Wilson", category: "Cybersecurity", status: "rejected", price: 149.99, enrollments: 0, revenue: 0, rating: 0, reviewCount: 0, completionRate: 0, createdAt: "2024-02-28", modules: 28, duration: "38h" },
];

const categories = ["All Categories", "Web Development", "Data Science", "AI & ML", "Design", "Cloud Computing", "Mobile Development", "Cybersecurity"];

export default function AdminCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: courses.length,
    published: courses.filter((c) => c.status === "published").length,
    pending: courses.filter((c) => c.status === "pending").length,
    totalEnrollments: courses.reduce((sum, c) => sum + c.enrollments, 0),
    totalRevenue: courses.reduce((sum, c) => sum + c.revenue, 0),
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse({ ...course });
    setIsEditDialogOpen(true);
  };

  const handleSaveCourse = () => {
    if (!editingCourse) return;
    setCourses(courses.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
    setIsEditDialogOpen(false);
    toast({
      title: "Course updated",
      description: `${editingCourse.title} has been updated.`,
    });
  };

  const handleDeleteCourse = () => {
    if (!deletingCourse) return;
    setCourses(courses.filter((c) => c.id !== deletingCourse.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Course deleted",
      description: `${deletingCourse.title} has been removed.`,
      variant: "destructive",
    });
  };

  const handleApprove = (course: Course) => {
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, status: "published" as const } : c)));
    toast({
      title: "Course approved",
      description: `${course.title} is now published.`,
    });
  };

  const handleReject = (course: Course) => {
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, status: "rejected" as const } : c)));
    toast({
      title: "Course rejected",
      description: `${course.title} has been rejected.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-success/15 text-success border-success/30"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>;
      case "pending":
        return <Badge className="bg-warning/15 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-muted-foreground border-border bg-muted/50"><Edit className="w-3 h-3 mr-1" />Draft</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/15 text-destructive border-destructive/30"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
            <p className="text-muted-foreground mt-1">Manage all platform courses</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Courses", value: stats.total, icon: BookOpen, iconBg: "bg-primary", iconFg: "text-primary-foreground" },
            { label: "Published", value: stats.published, icon: CheckCircle, iconBg: "bg-success", iconFg: "text-success-foreground" },
            { label: "Pending Review", value: stats.pending, icon: Clock, iconBg: "bg-warning", iconFg: "text-warning-foreground" },
            { label: "Enrollments", value: stats.totalEnrollments.toLocaleString(), icon: Users, iconBg: "bg-accent", iconFg: "text-accent-foreground" },
            { label: "Revenue", value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, iconBg: "bg-success", iconFg: "text-success-foreground" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg ring-1 ring-border/20`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconFg}`} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Courses ({filteredCourses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Course</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Enrollments</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Revenue</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">Rating</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <motion.tr
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate max-w-[200px]">{course.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{course.instructor}</span>
                              <span>•</span>
                              <span>${course.price}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <Badge variant="outline" className="font-normal">{course.category}</Badge>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(course.status)}</td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{course.enrollments.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-foreground">${course.revenue.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden xl:table-cell">
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium text-foreground">{course.rating}</span>
                            <span className="text-muted-foreground text-sm">({course.reviewCount})</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">No reviews</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />View Course
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                              <Edit className="w-4 h-4 mr-2" />Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />View Analytics
                            </DropdownMenuItem>
                            {course.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleApprove(course)} className="text-emerald-600">
                                  <CheckCircle className="w-4 h-4 mr-2" />Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleReject(course)} className="text-red-600">
                                  <XCircle className="w-4 h-4 mr-2" />Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setDeletingCourse(course);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No courses found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Course Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>Update course information.</DialogDescription>
            </DialogHeader>
            {editingCourse && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingCourse.category}
                    onValueChange={(value) => setEditingCourse({ ...editingCourse, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingCourse.status}
                    onValueChange={(value: "published" | "pending" | "draft" | "rejected") =>
                      setEditingCourse({ ...editingCourse, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveCourse}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Course</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deletingCourse?.title}"? This action cannot be undone and will remove all course data including enrollments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteCourse}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
