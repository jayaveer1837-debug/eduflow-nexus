import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Activity,
  DollarSign,
  UserPlus,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

// Mock real-time data
const generateMockData = () => ({
  totalUsers: Math.floor(Math.random() * 100) + 12400,
  activeStudents: Math.floor(Math.random() * 50) + 8900,
  totalInstructors: Math.floor(Math.random() * 10) + 340,
  totalCourses: Math.floor(Math.random() * 5) + 520,
  revenue: Math.floor(Math.random() * 1000) + 89000,
  newSignups: Math.floor(Math.random() * 20) + 45,
  activeNow: Math.floor(Math.random() * 100) + 1200,
  avgSessionTime: Math.floor(Math.random() * 5) + 18,
});

const weeklyData = [
  { day: "Mon", users: 1200, enrollments: 85, revenue: 4500 },
  { day: "Tue", users: 1350, enrollments: 92, revenue: 5200 },
  { day: "Wed", users: 1180, enrollments: 78, revenue: 4100 },
  { day: "Thu", users: 1420, enrollments: 105, revenue: 5800 },
  { day: "Fri", users: 1580, enrollments: 118, revenue: 6200 },
  { day: "Sat", users: 980, enrollments: 65, revenue: 3200 },
  { day: "Sun", users: 850, enrollments: 52, revenue: 2800 },
];

const recentActivity = [
  { user: "John Smith", action: "enrolled in", target: "React Masterclass", time: "2 min ago", type: "enrollment" },
  { user: "Sarah Johnson", action: "completed", target: "JavaScript Basics", time: "5 min ago", type: "completion" },
  { user: "Mike Chen", action: "started teaching", target: "Python for AI", time: "12 min ago", type: "course" },
  { user: "Emily Davis", action: "earned certificate", target: "Data Science Pro", time: "18 min ago", type: "certificate" },
  { user: "Alex Wilson", action: "signed up as", target: "Instructor", time: "25 min ago", type: "signup" },
];

const topCourses = [
  { name: "React Complete Guide", students: 2450, rating: 4.9, revenue: 24500 },
  { name: "Python for Data Science", students: 1890, rating: 4.8, revenue: 18900 },
  { name: "JavaScript Fundamentals", students: 1650, rating: 4.7, revenue: 16500 },
  { name: "Machine Learning A-Z", students: 1420, rating: 4.9, revenue: 21300 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(generateMockData());
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setStats(generateMockData());
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Users,
      iconBg: "bg-primary",
      iconFg: "text-primary-foreground",
    },
    {
      title: "Active Students",
      value: stats.activeStudents.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: GraduationCap,
      iconBg: "bg-accent",
      iconFg: "text-accent-foreground",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses.toLocaleString(),
      change: "+5.1%",
      trend: "up",
      icon: BookOpen,
      iconBg: "bg-success",
      iconFg: "text-success-foreground",
    },
    {
      title: "Revenue",
      value: `$${(stats.revenue / 1000).toFixed(1)}K`,
      change: "+18.3%",
      trend: "up",
      icon: DollarSign,
      iconBg: "bg-warning",
      iconFg: "text-warning-foreground",
    },
  ];

  const liveStats = [
    {
      label: "Active Now",
      value: stats.activeNow,
      icon: Activity,
      iconBg: "bg-primary",
      iconFg: "text-primary-foreground",
    },
    {
      label: "New Signups Today",
      value: stats.newSignups,
      icon: UserPlus,
      iconBg: "bg-accent",
      iconFg: "text-accent-foreground",
    },
    {
      label: "Avg. Session",
      value: `${stats.avgSessionTime}m`,
      icon: Clock,
      iconBg: "bg-success",
      iconFg: "text-success-foreground",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Platform overview and real-time analytics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={isLive ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setIsLive(!isLive)}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${isLive ? "bg-green-400 animate-pulse" : "bg-muted-foreground"}`} />
              {isLive ? "Live" : "Paused"}
            </Badge>
          </div>
        </div>

        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-2xl p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {liveStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg ring-1 ring-border/20`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconFg}`} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <motion.p
                    key={stat.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-xl font-bold text-foreground"
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <motion.p
                        key={stat.value}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-foreground mt-1"
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-14 h-14 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg ring-1 ring-border/20`}>
                      <stat.icon className={`w-7 h-7 ${stat.iconFg}`} strokeWidth={2.5} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="hsl(173, 58%, 39%)"
                      strokeWidth={2}
                      fill="url(#userGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
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
                    <Bar dataKey="revenue" fill="hsl(12, 76%, 61%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md ${
                      activity.type === "enrollment" ? "bg-primary text-white" :
                      activity.type === "completion" ? "bg-emerald-500 text-white" :
                      activity.type === "course" ? "bg-accent text-white" :
                      activity.type === "certificate" ? "bg-amber-500 text-white" :
                      "bg-purple-500 text-white"
                    }`}>
                      {activity.type === "enrollment" && <BookOpen className="w-5 h-5" />}
                      {activity.type === "completion" && <GraduationCap className="w-5 h-5" />}
                      {activity.type === "course" && <TrendingUp className="w-5 h-5" />}
                      {activity.type === "certificate" && <Activity className="w-5 h-5" />}
                      {activity.type === "signup" && <UserPlus className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{course.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{course.students.toLocaleString()} students</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">${(course.revenue / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-muted-foreground">revenue</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
