
import { useMemo, useState } from "react";
import {
  BookOpen,
  Users,
  Clock3,
  Target,
  ArrowUpRight,
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Clock,
  Play,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import StatsCard from "../../components/dashboard/StatsCard";
import RecentCourses from "../../components/dashboard/RecentCourses";
import LearningActivity from "../../components/dashboard/LearningActivity";
import RecommendedCourses from "../../components/dashboard/RecommendedCourses";
import { courses } from "../../data/courses";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const pad = (number) => String(number).padStart(2, "0");

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function StudentDashboard() {
  const today = useMemo(() => new Date(), []);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [calendarOpen, setCalendarOpen] = useState(true);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = Array.from(
    {
      length: Math.ceil((firstDay + daysInMonth) / 7) * 7,
    },
    (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    }
  );

  const isSameDay = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const goToMonth = (direction) => {
    setCurrentMonth(new Date(year, month + direction, 1));
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    setSelectedDate(new Date(year, month, day));
  };

  const isToday = (day) =>
    day && isSameDay(new Date(year, month, day), today);

  const isSelected = (day) =>
    day && isSameDay(new Date(year, month, day), selectedDate);

  const isSelectedToday = isSameDay(selectedDate, today);

  return (
    <div className="dashboard-page mx-auto max-w-[1500px] space-y-7">

      {/* WELCOME SECTION */}
      <section className="dashboard-enter flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-violet-300">
              {formatDate(today)}
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-[32px]">
            Hi, Vamshi!
            <span className="block text-slate-500 md:inline md:ml-2">
              What will you learn today?
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            A little progress each day adds up to big results.
          </p>
        </div>

        <Link
          to="/courses"
          className="primary-action group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-400 hover:shadow-violet-500/40 active:scale-95"
        >
          <Plus size={17} className="transition-transform duration-300 group-hover:rotate-90" />
          Explore courses
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </section>

      {/* STATISTICS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="dashboard-enter stagger-1">
          <StatsCard
            label="Enrolled courses"
            value="06"
            change="2 new"
            icon={BookOpen}
          />
        </div>

        <div className="dashboard-enter stagger-2">
          <StatsCard
            label="Learning hours"
            value="42.8h"
            change="18.4%"
            icon={Clock3}
          />
        </div>

        <div className="dashboard-enter stagger-3">
          <StatsCard
            label="Lessons completed"
            value="128"
            change="12.6%"
            icon={Target}
          />
        </div>

        <div className="dashboard-enter stagger-4">
          <StatsCard
            label="Learning rank"
            value="#08"
            change="Top 10%"
            icon={Users}
          />
        </div>
      </section>

      {/* FEATURED SECTION + CALENDAR */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.85fr)]">

        {/* FEATURED BANNER */}
        <div className="featured-banner glow-border group relative min-h-[300px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171a27] p-6 md:min-h-[340px] md:p-9">

          <div className="featured-orb absolute -right-10 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-[80px]" />
          <div className="featured-orb absolute -bottom-32 right-24 h-72 w-72 rounded-full bg-pink-500/20 blur-[80px]" />

          {/* Decorative floating shapes */}
          <div className="featured-art absolute -bottom-12 right-[-4%] h-52 w-[48%] rotate-[-12deg] rounded-[42%] bg-gradient-to-br from-amber-200 via-orange-400 via-pink-400 to-violet-500 opacity-90 shadow-[0_0_70px_#f472f655] transition-transform duration-700 group-hover:rotate-[-5deg] group-hover:scale-110 md:h-64" />

          <div className="featured-art-secondary absolute bottom-[-15px] right-[12%] h-44 w-[30%] rotate-[-12deg] rounded-[45%] border-[14px] border-white/20 bg-gradient-to-br from-yellow-200 via-orange-400 to-pink-500 opacity-80 transition-transform duration-700 group-hover:rotate-[-18deg]" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,#171a27_0%,rgba(23,26,39,.96)_36%,rgba(23,26,39,.2)_100%)]" />

          <div className="relative z-10 max-w-[65%] md:max-w-[55%]">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-200">
              <Sparkles size={13} className="animate-pulse" />
              Featured learning path
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight md:text-4xl">
              <span className="gradient-text">
                Campus Intelligence
              </span>
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-6 text-slate-400 md:text-sm">
              Build the skills to shape smarter digital experiences with our
              curated learning journey.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <BookOpen size={13} />
                12 Modules
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                8 Hours
              </span>
              <span className="flex items-center gap-1">
                <Zap size={13} />
                Beginner
              </span>
            </div>

            <Link
              to="/courses"
              className="group/btn mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-100 hover:shadow-xl hover:shadow-violet-500/20 active:scale-95"
            >
              Explore learning path
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
              />
            </Link>
          </div>

          <div className="absolute bottom-4 right-5 z-10 hidden items-center gap-1.5 text-[10px] text-white/50 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Curated for your growth
          </div>
        </div>

        {/* INTERACTIVE CALENDAR */}
        <div className="panel calendar-panel rounded-2xl p-5 transition-all duration-300 hover:border-violet-400/20">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">
                Your schedule
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Plan your learning sessions
              </p>
            </div>

            <button
              onClick={() => setCalendarOpen(!calendarOpen)}
              aria-label="Toggle calendar"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-400/10 hover:text-violet-300"
            >
              <CalendarDays size={17} />
            </button>
          </div>

          {/* Calendar navigation */}
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200">
              {monthLabel}
            </h4>

            <div className="flex gap-1">
              <button
                onClick={() => goToMonth(-1)}
                aria-label="Previous month"
                className="calendar-nav rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => goToMonth(1)}
                aria-label="Next month"
                className="calendar-nav rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {calendarOpen && (
            <div className="calendar-content">
              <div className="grid grid-cols-7 gap-1 text-center">
                {weekdays.map((day, index) => (
                  <span
                    key={`${day}-${index}`}
                    className="py-2 text-[10px] font-medium text-slate-600"
                  >
                    {day}
                  </span>
                ))}

                {calendarDays.map((day, index) => (
                  <button
                    key={`${year}-${month}-${index}`}
                    disabled={!day}
                    onClick={() => handleDateSelect(day)}
                    className={`
                      calendar-day relative grid h-9 place-items-center rounded-lg text-xs
                      transition-all duration-200
                      ${!day ? "pointer-events-none" : ""}
                      ${
                        isSelected(day)
                          ? "bg-violet-500 font-semibold text-white shadow-lg shadow-violet-500/30"
                          : isToday(day)
                            ? "border border-violet-400/50 text-violet-300"
                            : "text-slate-400 hover:bg-white/[0.08] hover:text-white"
                      }
                    `}
                  >
                    {day}

                    {day && isToday(day) && !isSelected(day) && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-violet-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected date schedule */}
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Selected day
              </span>

              <span className="text-[10px] text-violet-300">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {isSelectedToday ? (
              <div className="schedule-card flex items-center gap-3 rounded-xl border border-violet-400/10 bg-white/[0.035] p-3 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-400/[0.06]">
                <div className="rounded-xl bg-violet-400/10 p-2.5 text-violet-300">
                  <CalendarDays size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-200">
                    React components workshop
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Today · 10:30 AM
                  </p>
                </div>

                <span className="whitespace-nowrap text-[10px] text-slate-500">
                  45 min
                </span>
              </div>
            ) : (
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4 text-center">
                <CalendarDays
                  size={22}
                  className="mx-auto mb-2 text-slate-600"
                />
                <p className="text-xs font-medium text-slate-400">
                  No scheduled sessions
                </p>
                <p className="mt-1 text-[10px] text-slate-600">
                  {formatDate(selectedDate)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LEARNING OVERVIEW */}
      <section className="grid gap-5 xl:grid-cols-2">

        <div className="dashboard-enter stagger-2 min-w-0">
          <RecentCourses courses={courses} />
        </div>

        <div className="dashboard-enter stagger-3 min-w-0">
          <LearningActivity />
        </div>

      </section>

      {/* RECOMMENDED COURSES */}
      <section className="dashboard-enter stagger-4">
        <RecommendedCourses courses={courses} />
      </section>

    </div>
  );
}
