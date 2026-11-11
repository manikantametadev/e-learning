import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  PlayCircle,
  ClipboardCheck,
  Award,
  ChartNoAxesCombined,
  UserRound,
  GraduationCap,
  Settings,
  LifeBuoy,
  ShieldCheck,
  X,
} from "lucide-react";

const mainLinks = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Explore courses", to: "/courses", icon: Compass },
  { label: "My courses", to: "/my-courses", icon: BookOpen },
  { label: "My learning", to: "/learning", icon: PlayCircle },
  { label: "Quizzes", to: "/quizzes", icon: ClipboardCheck },
  { label: "Certificates", to: "/certificates", icon: Award },
  { label: "Learning progress", to: "/progress", icon: ChartNoAxesCombined },
  { label: "My profile", to: "/profile", icon: UserRound },
];

const adminLinks = [
  { label: "Admin dashboard", to: "/admin", icon: ShieldCheck, end: true },
  { label: "Course management", to: "/admin/courses", icon: Settings },
];

function SidebarLink({ item, onClose }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClose}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3 py-[11px]
        text-[13px] font-medium transition-all duration-200
        ${
          isActive
            ? "bg-violet-500/15 text-violet-200 shadow-sm"
            : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-violet-400" />
          )}

          <Icon
            size={17}
            strokeWidth={isActive ? 2.2 : 1.8}
            className={`shrink-0 transition-colors ${
              isActive
                ? "text-violet-300"
                : "text-slate-500 group-hover:text-slate-300"
            }`}
          />

          <span className="truncate">{item.label}</span>

          {isActive && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
          )}
        </>
      )}
    </NavLink>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="mb-2 mt-7 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
      {children}
    </p>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-[250px] shrink-0 flex-col
          border-r border-white/[0.06]
          bg-[#15151c]
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.05] px-5">
          <div className="flex items-center gap-3">

            <div className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-xl font-extrabold text-white">E</span>
              </div>

              <div>
                <h2 className="text-[16px] font-bold tracking-tight text-white">
                  E{" "}
                  <span className="font-medium text-violet-400">
                    - Learning
                  </span>
                </h2>
                <p className="mt-0.5 text-[10px] font-medium tracking-wider text-slate-500">
                  YOUR LEARNING SPACE
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="soft-scroll min-h-0 flex-1 overflow-y-auto px-3 py-2">
          <SectionTitle>Workspace</SectionTitle>

          <div className="space-y-1">
            {mainLinks.map((item) => (
              <SidebarLink key={item.to} item={item} onClose={onClose} />
            ))}
          </div>

          <SectionTitle>Management</SectionTitle>

          <div className="space-y-1">
            {adminLinks.map((item) => (
              <SidebarLink key={item.to} item={item} onClose={onClose} />
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-white/[0.05] p-4">
          {/* Learning Card */}
          <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/15 via-violet-500/[0.06] to-fuchsia-500/[0.04] p-3.5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
              <GraduationCap size={19} />
            </div>

            <h3 className="text-[13px] font-semibold text-slate-100">
              Keep growing
            </h3>

            <p className="mt-1.5 text-[11px] leading-[1.7] text-slate-400">
              You are making great progress. Keep your learning streak alive.
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
            </div>

            <p className="mt-2 text-[10px] text-slate-500">
              75% weekly goal completed
            </p>
          </div>

          {/* Help Center */}
          <button className="mt-4 flex w-full items-center gap-2 rounded-lg px-1 py-2 text-[11px] text-slate-500 transition hover:text-slate-200">
            <LifeBuoy size={15} />
            <span>Help center</span>
            <span className="ml-auto text-[10px] text-slate-600">v1.0.0</span>
          </button>
        </div>
      </aside>
    </>
  );
}
