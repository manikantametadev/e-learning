
import { useState } from "react";
import {
  Compass,
  BookOpen,
  Sparkles,
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

import useCourses from "../../hooks/useCourses";
import CourseGrid from "../../components/courses/CourseGrid";
import CourseFilters from "../../components/courses/CourseFilters";
import SearchBar from "../../components/common/SearchBar";

export default function CourseCatalogue() {
  const {
    courses,
    query,
    setQuery,
    category,
    setCategory,
  } = useCourses();

  const [showFilters, setShowFilters] = useState(true);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  const hasFilters = query.trim() !== "" || category !== "All";

  return (
    <div className="catalogue-page mx-auto max-w-[1500px] space-y-7">

      {/* PAGE HEADER */}
      <section className="catalogue-enter flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              <Compass size={17} />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-violet-300">
              Discover something new
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Explore courses
            <span className="ml-2 text-slate-500">.</span>
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Learn from industry experts, discover new opportunities,
            and build skills that move you forward.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 sm:flex">
            <Sparkles size={15} className="text-violet-300" />
            <span className="text-xs text-slate-400">
              Learn at your own pace
            </span>
          </div>
        </div>

      </section>

      {/* SEARCH AND FILTER PANEL */}
      <section className="catalogue-enter catalogue-delay-1 panel rounded-2xl border border-white/[0.06] p-4 md:p-5">

        <div className="flex flex-col gap-4">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                <SlidersHorizontal size={17} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200">
                  Find your course
                </h3>
                <p className="text-[11px] text-slate-500">
                  Search and filter the catalogue
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-white/[0.07] px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-200"
            >
              <SlidersHorizontal size={14} />
              {showFilters ? "Hide filters" : "Show filters"}
            </button>

          </div>

          {/* Search */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            <div className="w-full lg:flex-1">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search courses, topics or skills..."
              />
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-medium text-violet-300 transition hover:bg-violet-400/10 hover:text-violet-200"
              >
                <RotateCcw size={14} />
                Clear filters
              </button>
            )}

          </div>

          {/* Category Filters */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              showFilters
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-white/[0.06] pt-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.15em] text-slate-500">
                  Browse by category
                </p>

                <CourseFilters
                  category={category}
                  onChange={setCategory}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* COURSE RESULTS HEADER */}
      <section className="catalogue-enter catalogue-delay-2">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={17} className="text-violet-300" />

              <h2 className="text-base font-semibold text-white">
                Available courses
              </h2>

              <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                {courses.length}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {courses.length > 0
                ? `Showing ${courses.length} ${courses.length === 1 ? "course" : "courses"} to explore`
                : "Try another search or category"}
            </p>
          </div>

          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2">

              {query.trim() && (
                <span className="max-w-[180px] truncate rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] text-slate-300">
                  Search: {query}
                </span>
              )}

              {category !== "All" && (
                <span className="rounded-lg border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[10px] text-violet-300">
                  {category}
                </span>
              )}

            </div>
          )}

        </div>

      </section>

      {/* COURSE GRID */}
      <section className="catalogue-enter catalogue-delay-3 min-w-0">

        {courses.length > 0 ? (
          <div className="course-results">
            <CourseGrid courses={courses} />
          </div>
        ) : (
          <div className="empty-courses panel flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-12 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
              <Search size={28} />
            </div>

            <h3 className="text-lg font-semibold text-slate-200">
              No courses found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find any courses matching your search.
              Try changing your keywords or selecting another category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-400 hover:shadow-violet-500/30 active:scale-95"
            >
              <RotateCcw size={14} />
              Reset all filters
            </button>

          </div>
        )}

      </section>

      {/* BOTTOM LEARNING CTA */}
      <section className="catalogue-enter catalogue-delay-4 flex flex-col justify-between gap-4 rounded-2xl border border-violet-400/10 bg-gradient-to-r from-violet-500/[0.09] via-[#1b1928] to-fuchsia-500/[0.06] p-5 sm:flex-row sm:items-center md:p-6">

        <div className="flex items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 sm:flex">
            <Sparkles size={22} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Not sure where to start?
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Explore courses and find the right learning path for your goals.
            </p>
          </div>
        </div>

        <Link
          to="/my-courses"
          className="group inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-violet-300 transition-colors hover:text-violet-200"
        >
          My learning
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>

      </section>

    </div>
  );
}
