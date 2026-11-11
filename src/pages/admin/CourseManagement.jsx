
import { useMemo, useState } from "react";
import { courses as initial } from "../../data/courses";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  BookOpen,
  Clock3,
  Users,
  GraduationCap,
  ArrowUpRight,
  X,
  MoreHorizontal,
} from "lucide-react";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Badge from "../../components/common/Badge";

const emptyForm = {
  title: "",
  category: "Design",
  instructor: "",
  duration: "6h 00m",
};

const categories = [
  "Design",
  "Development",
  "Business",
  "Technology",
];

export default function CourseManagement() {
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredCourses = useMemo(() => {
    return items.filter((course) => {
      const searchText = query.toLowerCase().trim();

      const matchesSearch =
        course.title?.toLowerCase().includes(searchText) ||
        course.instructor?.toLowerCase().includes(searchText) ||
        course.category?.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        course.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [items, query, categoryFilter]);

  const totalStudents = items.reduce(
    (total, course) => total + (Number(course.students) || 0),
    0
  );

  const openCreateModal = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const edit = (course) => {
    setEditing(course.id);

    setForm({
      title: course.title || "",
      category: course.category || "Design",
      instructor: course.instructor || "",
      duration: course.duration || "6h 00m",
    });

    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const save = () => {
    if (!form.title.trim() || !form.instructor.trim()) return;

    if (editing !== null) {
      setItems((current) =>
        current.map((course) =>
          course.id === editing
            ? { ...course, ...form }
            : course
        )
      );
    } else {
      setItems((current) => [
        ...current,
        {
          ...form,
          id:
            current.length > 0
              ? Math.max(...current.map((course) => Number(course.id) || 0)) + 1
              : 1,
          level: "Beginner",
          lessons: 12,
          progress: 0,
          color: "from-violet-500 to-fuchsia-500",
          students: "0",
          rating: 5,
          description: "A new course on the platform.",
        },
      ]);
    }

    closeModal();
  };

  const removeCourse = () => {
    setItems((current) =>
      current.filter((course) => course.id !== deleteId)
    );
    setDeleteId(null);
  };

  const stats = [
    {
      label: "Total courses",
      value: items.length,
      icon: BookOpen,
      color: "violet",
    },
    {
      label: "Total students",
      value: totalStudents.toLocaleString(),
      icon: Users,
      color: "blue",
    },
    {
      label: "Categories",
      value: new Set(items.map((course) => course.category)).size,
      icon: GraduationCap,
      color: "emerald",
    },
    {
      label: "Total lessons",
      value: items.reduce(
        (total, course) => total + (Number(course.lessons) || 0),
        0
      ),
      icon: Clock3,
      color: "orange",
    },
  ];

  return (
    <div className="course-management mx-auto max-w-[1450px] space-y-7 pb-8">

      {/* Page heading */}
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              Content library
            </p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Course management
            <span className="text-violet-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create, edit, and organize your learning content.
          </p>
        </div>

        <Button onClick={openCreateModal}>
          <Plus size={15} />
          Add course
        </Button>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          const colors = {
            violet: "bg-violet-400/10 text-violet-300",
            blue: "bg-blue-400/10 text-blue-300",
            emerald: "bg-emerald-400/10 text-emerald-300",
            orange: "bg-orange-400/10 text-orange-300",
          };

          return (
            <div
              key={stat.label}
              className="course-stat-card group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:shadow-xl hover:shadow-violet-500/[0.06]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.025] blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-center justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg] ${colors[stat.color]}`}>
                  <Icon size={19} />
                </div>

                <MoreHorizontal size={18} className="text-slate-600" />
              </div>

              <p className="relative mt-5 text-2xl font-semibold text-white">
                {stat.value}
              </p>

              <p className="relative mt-1 text-xs text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* Course table */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920] shadow-[0_10px_35px_rgba(0,0,0,0.08)]">

        {/* Table header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">
                All courses
              </h2>

              <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                {filteredCourses.length}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Manage your courses and instructors.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">

            {/* Search */}
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-3 text-xs text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/15 focus:border-violet-400/40 focus:bg-white/[0.05] sm:w-52"
              />
            </div>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-xl border border-white/[0.08] bg-[#191920] px-3 py-2.5 text-xs text-slate-300 outline-none transition-all hover:border-white/20 focus:border-violet-400/40"
            >
              <option value="All">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">

            <thead className="border-y border-white/[0.06] bg-white/[0.025] text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                {[
                  "Course",
                  "Category",
                  "Instructor",
                  "Duration",
                  "Students",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="px-5 py-4 font-medium sm:px-6">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="course-table-row group border-b border-white/[0.045] transition-all duration-200 hover:bg-violet-400/[0.035]"
                  >
                    {/* Course */}
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.color || "from-violet-500 to-fuchsia-500"} text-sm font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]`}>
                          {course.title?.charAt(0)?.toUpperCase() || "C"}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-200 transition-colors group-hover:text-white">
                            {course.title}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-600">
                            {course.lessons || 0} lessons
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <Badge>{course.category}</Badge>
                    </td>

                    {/* Instructor */}
                    <td className="px-5 py-4 text-slate-400">
                      {course.instructor || "Not assigned"}
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock3 size={13} className="text-slate-600" />
                        {course.duration}
                      </div>
                    </td>

                    {/* Students */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Users size={13} className="text-slate-600" />
                        {course.students ?? "0"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => edit(course)}
                          aria-label={`Edit ${course.title}`}
                          className="rounded-lg p-2 text-slate-500 transition-all duration-200 hover:bg-violet-400/10 hover:text-violet-300"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(course.id)}
                          aria-label={`Delete ${course.title}`}
                          className="rounded-lg p-2 text-slate-500 transition-all duration-200 hover:bg-rose-400/10 hover:text-rose-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] text-slate-500">
                      <BookOpen size={21} />
                    </div>

                    <p className="mt-3 text-sm font-medium text-slate-300">
                      No courses found
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try changing your search or category filter.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setCategoryFilter("All");
                      }}
                      className="mt-4 text-xs font-medium text-violet-300 hover:text-violet-200"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6">
          <p className="text-[10px] text-slate-600">
            Showing {filteredCourses.length} of {items.length} courses
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="group flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            Add new course
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </section>

      {/* Create / Edit Modal */}
      <Modal
        open={open}
        onClose={closeModal}
        title={editing !== null ? "Edit course" : "Create a course"}
      >
        <div className="space-y-5">

          <div>
            <p className="mb-1 text-xs text-slate-500">
              Course information
            </p>
            <p className="text-sm text-slate-300">
              Enter the details for your learning content.
            </p>
          </div>

          <Input
            label="Course title"
            placeholder="e.g. Advanced UI Design"
            value={form.title}
            onChange={(value) =>
              setForm((current) => ({ ...current, title: value?.target ? value.target.value : value }))
            }
          />

          <label className="block text-xs font-medium text-slate-300">
            Category

            <select
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#17161e] px-4 py-3 text-sm text-slate-200 outline-none transition-all hover:border-white/20 focus:border-violet-400/50"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="Instructor"
            value={form.instructor}
            onChange={(value) =>
              setForm((current) => ({ ...current, instructor: value?.target ? value.target.value : value }))
            }
            placeholder="Instructor name"
          />

          <Input
            label="Duration"
            value={form.duration}
            onChange={(value) =>
              setForm((current) => ({ ...current, duration: value?.target ? value.target.value : value }))
            }
            placeholder="e.g. 6h 30m"
          />

          <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-4">
            <Button variant="soft" onClick={closeModal}>
              Cancel
            </Button>

            <Button
              onClick={save}
              disabled={!form.title.trim() || !form.instructor.trim()}
            >
              {editing !== null ? "Update course" : "Create course"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete course"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-400/10 text-rose-300">
              <Trash2 size={19} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Are you sure you want to delete this course?
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                This removes the course from the current page state. It cannot be undone after confirming.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-4">
            <Button variant="soft" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>

            <button
              type="button"
              onClick={removeCourse}
              className="rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-rose-400 hover:shadow-lg hover:shadow-rose-500/20"
            >
              Delete course
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
