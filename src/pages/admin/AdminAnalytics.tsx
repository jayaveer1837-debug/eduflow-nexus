import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  GraduationCap,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
  Line,
} from "recharts";

// User Growth Data
const userGrowthData = [
  { month: "Jan", students: 8200, instructors: 280, total: 8480 },
  { month: "Feb", students: 8900, instructors: 295, total: 9195 },
  { month: "Mar", students: 9600, instructors: 310, total: 9910 },
  { month: "Apr", students: 10400, instructors: 325, total: 10725 },
  { month: "May", students: 11200, instructors: 338, total: 11538 },
  { month: "Jun", students: 12100, instructors: 352, total: 12452 },
  { month: "Jul", students: 12800, instructors: 365, total: 13165 },
  { month: "Aug", students: 13600, instructors: 378, total: 13978 },
  { month: "Sep", students: 14500, instructors: 392, total: 14892 },
  { month: "Oct", students: 15200, instructors: 405, total: 15605 },
  { month: "Nov", students: 16100, instructors: 420, total: 16520 },
  { month: "Dec", students: 17000, instructors: 435, total: 17435 },
];

// Revenue Data
const revenueData = [
  { month: "Jan", revenue: 45000, courses: 42, enrollments: 850 },
  { month: "Feb", revenue: 52000, courses: 48, enrollments: 920 },
  { month: "Mar", revenue: 58000, courses: 55, enrollments: 1050 },
  { month: "Apr", revenue: 64000, courses: 62, enrollments: 1180 },
  { month: "May", revenue: 72000, courses: 70, enrollments: 1320 },
  { month: "Jun", revenue: 78000, courses: 78, enrollments: 1450 },
  { month: "Jul", revenue: 85000, courses: 85, enrollments: 1580 },
  { month: "Aug", revenue: 92000, courses: 92, enrollments: 1720 },
  { month: "Sep", revenue: 98000, courses: 98, enrollments: 1850 },
  { month: "Oct", revenue: 105000, courses: 105, enrollments: 1980 },
  { month: "Nov", revenue: 112000, courses: 112, enrollments: 2120 },
  { month: "Dec", revenue: 120000, courses: 120, enrollments: 2280 },
];

// Course Performance Data
const coursePerformanceData = [
  { name: "Web Development", students: 4500, revenue: 180000, completion: 78, rating: 4.8 },
  { name: "Data Science", students: 3200, revenue: 145000, completion: 72, rating: 4.7 },
  { name: "Mobile Dev", students: 2800, revenue: 120000, completion: 75, rating: 4.6 },
  { name: "AI & ML", students: 2400, revenue: 135000, completion: 68, rating: 4.9 },
  { name: "Cloud Computing", students: 1900, revenue: 95000, completion: 70, rating: 4.5 },
  { name: "Cybersecurity", students: 1600, revenue: 85000, completion: 65, rating: 4.4 },
];

// Category Distribution
const categoryData = [
  { name: "Web Dev", value: 35, color: "hsl(173, 58%, 39%)" },
  { name: "Data Science", value: 25, color: "hsl(12, 76%, 61%)" },
  { name: "Mobile", value: 18, color: "hsl(142, 71%, 45%)" },
  { name: "AI/ML", value: 12, color: "hsl(45, 93%, 47%)" },
  { name: "Others", value: 10, color: "hsl(262, 83%, 58%)" },
];

// Engagement Data
const engagementData = [
  { day: "Mon", activeUsers: 2400, sessions: 3200, avgTime: 28 },
  { day: "Tue", activeUsers: 2800, sessions: 3600, avgTime: 32 },
  { day: "Wed", activeUsers: 2600, sessions: 3400, avgTime: 30 },
  { day: "Thu", activeUsers: 3000, sessions: 3900, avgTime: 35 },
  { day: "Fri", activeUsers: 3200, sessions: 4100, avgTime: 33 },
  { day: "Sat", activeUsers: 2100, sessions: 2800, avgTime: 42 },
  { day: "Sun", activeUsers: 1800, sessions: 2400, avgTime: 45 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("12m");

  const kpiCards = [
    { title: "Total Revenue", value: "$981K", change: "+24.5%", trend: "up", icon: DollarSign, iconBg: "bg-success", iconFg: "text-success-foreground" },
    { title: "Total Users", value: "17,435", change: "+18.2%", trend: "up", icon: Users, iconBg: "bg-primary", iconFg: "text-primary-foreground" },
    { title: "Course Enrollments", value: "16,300", change: "+32.1%", trend: "up", icon: GraduationCap, iconBg: "bg-accent", iconFg: "text-accent-foreground" },
    { title: "Active Courses", value: "520", change: "+12.8%", trend: "up", icon: BookOpen, iconBg: "bg-primary", iconFg: "text-primary-foreground" },
    { title: "Avg. Completion", value: "71.3%", change: "+5.2%", trend: "up", icon: Target, iconBg: "bg-warning", iconFg: "text-warning-foreground" },
    { title: "Avg. Rating", value: "4.7", change: "+0.3", trend: "up", icon: Award, iconBg: "bg-accent", iconFg: "text-accent-foreground" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Comprehensive platform performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="12m">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className={`w-11 h-11 rounded-xl ${kpi.iconBg} flex items-center justify-center mb-3 shadow-lg ring-1 ring-border/20`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.iconFg}`} strokeWidth={2.5} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mb-1">{kpi.title}</p>
                  <div className="flex items-center gap-1">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Growth Trends
              </CardTitle>
              <Badge variant="outline" className="text-emerald-600">+106% YoY</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="instructorsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(12, 76%, 61%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(12, 76%, 61%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                    <XAxis dataKey="month" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(210, 20%, 90%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="students" name="Students" stroke="hsl(173, 58%, 39%)" strokeWidth={2} fill="url(#studentsGradient)" />
                    <Area type="monotone" dataKey="instructors" name="Instructors" stroke="hsl(12, 76%, 61%)" strokeWidth={2} fill="url(#instructorsGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Revenue Over Time
              </CardTitle>
              <Badge variant="outline" className="text-emerald-600">+167% YoY</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                    <XAxis dataKey="month" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <YAxis yAxisId="left" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(210, 20%, 90%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === "Revenue") return [`$${value.toLocaleString()}`, name];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="enrollments" name="Enrollments" stroke="hsl(262, 83%, 58%)" strokeWidth={2} dot={{ fill: "hsl(262, 83%, 58%)" }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Course Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coursePerformanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                    <XAxis type="number" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(220, 10%, 50%)" fontSize={12} width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(210, 20%, 90%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="students" name="Students" fill="hsl(173, 58%, 39%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(0, 0%, 100%)",
                          border: "1px solid hsl(210, 20%, 90%)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend below chart */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground truncate">{item.name}</span>
                      <span className="font-semibold text-foreground ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Weekly User Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                    <XAxis dataKey="day" stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(210, 20%, 90%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="activeUsers" name="Active Users" fill="hsl(173, 58%, 39%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sessions" name="Sessions" fill="hsl(12, 76%, 61%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { label: "Course Completion Rate", value: 71.3, target: 75, color: "bg-primary" },
                  { label: "Student Satisfaction", value: 94, target: 90, color: "bg-emerald-500" },
                  { label: "Instructor Response Rate", value: 88, target: 85, color: "bg-accent" },
                  { label: "Content Engagement", value: 76, target: 80, color: "bg-amber-500" },
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{metric.value}%</span>
                        <span className="text-muted-foreground">/ {metric.target}%</span>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={metric.value} className="h-3" />
                      <div
                        className="absolute top-0 h-3 w-0.5 bg-foreground/50"
                        style={{ left: `${metric.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
