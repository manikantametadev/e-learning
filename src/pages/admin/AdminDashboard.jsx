
import { useMemo, useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  CalendarDays,
  Activity,
  Eye,
  Search,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

import { Link } from "react-router-dom";
import { students } from "../../data/users";
import { courses } from "../../data/courses";
import Badge from "../../components/common/Badge";

const activityData = [
  { month: "Jun", users: 240, lessons: 160 },
  { month: "Jul", users: 320, lessons: 220 },
  { month: "Aug", users: 280, lessons: 190 },
  { month: "Sep", users: 420, lessons: 300 },
  { month: "Oct", users: 390, lessons: 340 },
  { month: "Nov", users: 510, lessons: 410 },
];

const distributionData = [
  { name: "Design", value: 420 },
  { name: "Development", value: 610 },
  { name: "Business", value: 270 },
  { name: "Technology", value: 350 },
];

const stats = [
  {
    label: "Total students",
    value: "16,892",
    change: "+12.8%",
    positive: true,
    icon: Users,
    color: "violet",
    description: "Compared to last month",
  },
  {
    label: "Active courses",
    value: "248",
    change: "+8.2%",
    positive: true,
    icon: BookOpen,
    color: "blue",
    description: "Compared to last month",
  },
  {
    label: "Completion rate",
    value: "84.6%",
    change: "+5.4%",
    positive: true,
    icon: GraduationCap,
    color: "emerald",
    description: "Compared to last month",
  },
  {
    label: "Monthly revenue",
    value: "$24.8k",
    change: "+18.6%",
    positive: true,
    icon: TrendingUp,
    color: "orange",
    description: "Compared to last month",
  },
];

const chartTooltipStyle = {
  background: "#201e29",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
  boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
};

function StatCard({ stat, index }) {
  const Icon = stat.icon;

  const colorStyles = {
    violet: {
      icon: "bg-violet-400/10 text-violet-300",
      glow: "group-hover:shadow-violet-500/10",
      line: "bg-violet-400",
    },
    blue: {
      icon: "bg-blue-400/10 text-blue-300",
      glow: "group-hover:shadow-blue-500/10",
      line: "bg-blue-400",
    },
    emerald: {
      icon: "bg-emerald-400/10 text-emerald-300",
      glow: "group-hover:shadow-emerald-500/10",
      line: "bg-emerald-400",
    },
    orange: {
      icon: "bg-orange-400/10 text-orange-300",
      glow: "group-hover:shadow-orange-500/10",
      line: "bg-orange-400",
    },
  };

  const style = colorStyles[stat.color];

  return (
    <article
      className={`admin-stat-card group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-xl ${style.glow}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/[0.025] blur-2xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative flex items-center justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${style.icon}`}
        >
          <Icon size={21} />
        </div>

        <button
          type="button"
          aria-label={`More information about ${stat.label}`}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <div className="relative mt-5">
        <p className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
          {stat.value}
        </p>

        <p className="mt-1 text-xs font-medium text-slate-400">
          {stat.label}
        </p>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">
          <ArrowUpRight size={12} />
          {stat.change}
        </span>

        <span className="text-[10px] text-slate-600">
          {stat.description}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full">
        <div className={`h-full ${style.line}`} />
      </div>
    </article>
  );
}

function ChartLegend({ items, activeItems, onToggle }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => {
        const active = activeItems.includes(item.key);

        return (
          <button
            type="button"
            key={item.key}
            onClick={() => onToggle(item.key)}
            className={`flex items-center gap-2 text-xs transition-opacity ${
              active ? "text-slate-300" : "text-slate-600 opacity-50"
            }`}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export default function AdminDashboard() {
  const [activeMetrics, setActiveMetrics] = useState(["users", "lessons"]);
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students.slice(0, 6);

    return students
      .filter(
        (student) =>
          student.name?.toLowerCase().includes(query) ||
          student.email?.toLowerCase().includes(query) ||
          student.course?.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [search]);

  const toggleMetric = (key) => {
    setActiveMetrics((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  };

  return (
    <div className="admin-dashboard mx-auto max-w-[1450px] space-y-7 pb-8">

      {/* Header */}
      <section className="admin-enter flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              Administration
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Overview
            <span className="text-violet-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor your learning platform performance and activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-xs text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            <CalendarDays size={14} />
            Last 6 months
          </button>

          <Link
            to="/admin/courses"
            className="group flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-violet-500/30"
          >
            <Plus size={15} className="transition-transform group-hover:rotate-90" />
            Manage courses
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </section>

      {/* Charts */}
      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

        {/* Platform activity */}
        <div className="admin-panel admin-enter rounded-2xl border border-white/[0.07] bg-[#191920] p-5 sm:p-6">
          <SectionHeading
            title="Platform activity"
            subtitle="Student engagement over the last 6 months"
            action={
              <button
                type="button"
                aria-label="More platform activity options"
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <MoreHorizontal size={19} />
              </button>
            }
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-2xl font-semibold text-white">510</p>
              <p className="mt-1 text-[10px] text-slate-500">
                Active learners in November
              </p>
            </div>

            <ChartLegend
              items={[
                { key: "users", label: "Students", color: "#a78bfa" },
                { key: "lessons", label: "Lessons", color: "#45b7ff" },
              ]}
              activeItems={activeMetrics}
              onToggle={toggleMetric}
            />
          </div>

          <div className="mt-6 h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="lessonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#45b7ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#45b7ff" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(255,255,255,0.045)"
                  vertical={false}
                  strokeDasharray="4 5"
                />

                <XAxis
                  dataKey="month"
                  stroke="#666273"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  dy={10}
                />

                <YAxis
                  stroke="#666273"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                />

                <Tooltip
                  contentStyle={chartTooltipStyle}
                  cursor={{ stroke: "rgba(167,139,250,0.3)", strokeDasharray: "4 4" }}
                />

                {activeMetrics.includes("users") && (
                  <Area
                    type="monotone"
                    dataKey="users"
                    name="Students"
                    stroke="#a78bfa"
                    fill="url(#studentGradient)"
                    strokeWidth={2.5}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                )}

                {activeMetrics.includes("lessons") && (
                  <Area
                    type="monotone"
                    dataKey="lessons"
                    name="Lessons"
                    stroke="#45b7ff"
                    fill="url(#lessonGradient)"
                    strokeWidth={2.5}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course distribution */}
        <div className="admin-panel admin-enter rounded-2xl border border-white/[0.07] bg-[#191920] p-5 sm:p-6">
          <SectionHeading
            title="Course distribution"
            subtitle="Enrollment by category"
            action={
              <button
                type="button"
                aria-label="View course distribution details"
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <MoreHorizontal size={19} />
              </button>
            }
          />

          <div className="mt-5">
            <p className="text-2xl font-semibold text-white">1,650</p>
            <p className="mt-1 text-[10px] text-slate-500">
              Total category enrollments
            </p>
          </div>

          <div className="mt-5 h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distributionData}
                margin={{ top: 5, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="rgba(255,255,255,0.045)"
                  vertical={false}
                  strokeDasharray="4 5"
                />

                <XAxis
                  dataKey="name"
                  stroke="#666273"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 9 }}
                  interval={0}
                />

                <YAxis
                  stroke="#666273"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                />

                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "rgba(167,139,250,0.06)" }} />

                <Bar
                  dataKey="value"
                  name="Enrollments"
                  fill="#9b7af1"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={38}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 border-t border-white/[0.06] pt-4">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="text-[10px] text-slate-500">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent students */}
      <section className="admin-panel admin-enter overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920]">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">
                Recent students
              </h2>
              <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-[9px] font-semibold text-violet-300">
                {students.length} learners
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Latest learner activity on your platform
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-3 text-xs text-white outline-none transition-all placeholder:text-slate-600 focus:border-violet-400/40 focus:bg-white/[0.05] sm:w-48"
              />
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs text-slate-400 transition-all hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white"
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead className="border-y border-white/[0.06] bg-white/[0.025] text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium sm:px-6">Student</th>
                <th className="px-5 py-4 font-medium">Course</th>
                <th className="px-5 py-4 font-medium">Progress</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium sm:px-6">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.email}
                    className="group border-b border-white/[0.045] transition-colors duration-200 hover:bg-violet-400/[0.035]"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-violet-400/15 bg-gradient-to-br from-violet-400/20 to-blue-400/10 text-xs font-semibold text-violet-200 transition-transform duration-300 group-hover:scale-110">
                          {student.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>

                        <div>
                          <p className="font-medium text-slate-200 transition-colors group-hover:text-white">
                            {student.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-600">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {student.course}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400 transition-all duration-700 group-hover:brightness-125"
                            style={{
                              width: `${Math.min(100, Math.max(0, Number(student.progress) || 0))}%`,
                            }}
                          />
                        </div>

                        <span className="text-[10px] font-medium text-violet-300">
                          {student.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <Badge tone={student.status === "Active" ? "green" : "orange"}>
                        {student.status}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 text-right sm:px-6">
                      <button
                        type="button"
                        aria-label={`View ${student.name}`}
                        className="rounded-lg p-2 text-slate-600 opacity-60 transition-all hover:bg-violet-400/10 hover:text-violet-300 group-hover:opacity-100"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-xs text-slate-500">
                    No students found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6">
          <p className="text-[10px] text-slate-600">
            Showing {filteredStudents.length} of {students.length} students
          </p>

          <Link
            to="/admin/students"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            View all students
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* Footer insight */}
      <div className="flex items-center gap-3 rounded-2xl border border-violet-400/10 bg-gradient-to-r from-violet-500/[0.08] to-transparent p-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
          <Activity size={17} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-200">
            Platform overview
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            Review student engagement, course performance, and learning activity from one place.
          </p>
        </div>
      </div>
    </div>
  );
}
