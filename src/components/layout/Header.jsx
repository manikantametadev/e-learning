
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
  X,
  Check,
  CheckCheck,
  UserRound,
  Settings,
  LogOut,
  BookOpen,
  GraduationCap,
  Clock3,
  ArrowUpRight,
  Command,
  CircleHelp,
} from "lucide-react";

import { currentUser } from "../../data/users";

const searchItems = [
  { title: "Dashboard", description: "Your learning overview", path: "/dashboard", icon: GraduationCap },
  { title: "Explore Courses", description: "Discover available courses", path: "/courses", icon: BookOpen },
  { title: "My Courses", description: "Your enrolled courses", path: "/my-courses", icon: BookOpen },
  { title: "My Learning", description: "Continue your lessons", path: "/learning", icon: GraduationCap },
  { title: "Quizzes", description: "Test your knowledge", path: "/quizzes", icon: Clock3 },
  { title: "Certificates", description: "Your earned certificates", path: "/certificates", icon: GraduationCap },
  { title: "Learning Progress", description: "Track your performance", path: "/progress", icon: Clock3 },
  { title: "My Profile", description: "Manage your account", path: "/profile", icon: UserRound },
  { title: "Admin Dashboard", description: "Platform administration", path: "/admin", icon: Settings },
  { title: "Course Management", description: "Manage learning content", path: "/admin/courses", icon: BookOpen },
];

const initialNotifications = [
  {
    id: 1,
    title: "New course available",
    message: "A new course has been added to your learning library.",
    time: "10 minutes ago",
    icon: BookOpen,
    color: "violet",
    read: false,
  },
  {
    id: 2,
    title: "Learning reminder",
    message: "Continue your learning journey and complete your next lesson.",
    time: "1 hour ago",
    icon: Clock3,
    color: "blue",
    read: false,
  },
  {
    id: 3,
    title: "Welcome back!",
    message: "Your learning dashboard is ready.",
    time: "Yesterday",
    icon: GraduationCap,
    color: "emerald",
    read: true,
  },
];

const dateOptions = [
  "Today",
  "This week",
  "This month",
  "This year",
];

export default function Header({ onMenu, onLogout, onDateRangeChange }) {
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedDate, setSelectedDate] = useState("This month");

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const userName = currentUser?.name || "Student";
  const userRole = currentUser?.role || "Student";
  const avatar = currentUser?.avatar;
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Search results
  const filteredResults = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return searchItems.slice(0, 5);

    return searchItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(value) ||
          item.description.toLowerCase().includes(value)
      )
      .slice(0, 6);
  }, [search]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setSearchOpen(false);
        setMobileSearchOpen(false);
      }
    };

    const handleShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  // Navigate to selected search result
  const handleSearchSelect = (path) => {
    navigate(path);
    setSearch("");
    setSearchOpen(false);
    setMobileSearchOpen(false);
    searchInputRef.current?.blur();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (filteredResults.length > 0) {
      handleSearchSelect(filteredResults[0].path);
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((current) =>
      current === name ? null : name
    );
    setSearchOpen(false);
  };

  // Notification actions
  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setActiveDropdown(null);
    onDateRangeChange?.(date);
  };

  const handleLogout = () => {
    setActiveDropdown(null);

    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#141319]/95 backdrop-blur-xl"
    >
      <div className="flex h-[76px] items-center justify-between gap-3 px-4 sm:px-5 md:px-8">

        {/* Left: Mobile menu and breadcrumb */}
        <div className="flex min-w-0 items-center gap-3">

          <button
            type="button"
            onClick={onMenu}
            aria-label="Open navigation menu"
            className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-white/[0.07] hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="hidden min-w-0 items-center gap-2 text-xs sm:flex md:text-sm">
            <span className="truncate font-medium text-slate-300">
              University of Emura
            </span>
            <span className="text-slate-700">/</span>
            <span className="truncate text-slate-500">
              Learning portal
            </span>
          </div>

          <div className="sm:hidden">
            <p className="text-sm font-semibold text-white">
              E <span className="text-violet-400">UI</span>
            </p>
            <p className="text-[9px] text-slate-500">
              Learning portal
            </p>
          </div>
        </div>

        {/* Right: Search, date, notifications and profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">

          {/* Desktop search */}
          <div ref={searchRef} className="relative hidden w-52 lg:block xl:w-64">
            <form
              onSubmit={handleSearchSubmit}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                searchOpen
                  ? "border-violet-400/40 bg-white/[0.06] shadow-[0_0_0_3px_rgba(167,139,250,0.06)]"
                  : "border-white/[0.07] bg-white/[0.035] hover:border-white/[0.14]"
              }`}
            >
              <Search size={15} className="shrink-0 text-slate-500" />

              <input
                ref={searchInputRef}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onFocus={() => {
                  setSearchOpen(true);
                  setActiveDropdown(null);
                }}
                placeholder="Search anything..."
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-600"
              />

              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-slate-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              ) : (
                <span className="flex shrink-0 items-center gap-1 rounded-md border border-white/[0.08] px-1.5 py-1 text-[9px] text-slate-500">
                  <Command size={10} /> K
                </span>
              )}
            </form>

            {/* Search results */}
            {searchOpen && (
              <div className="header-dropdown absolute right-0 top-[calc(100%+12px)] z-50 w-[320px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#1b1922] shadow-2xl shadow-black/40">
                <div className="border-b border-white/[0.06] px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {search ? "Search results" : "Quick navigation"}
                  </p>
                </div>

                <div className="max-h-[340px] overflow-y-auto p-2">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          type="button"
                          key={item.path}
                          onClick={() => handleSearchSelect(item.path)}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-violet-400/[0.09]"
                        >
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-slate-400 transition-colors group-hover:bg-violet-400/10 group-hover:text-violet-300">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-slate-200">
                              {item.title}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">
                              {item.description}
                            </p>
                          </div>

                          <ArrowUpRight
                            size={14}
                            className="text-slate-600 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                          />
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Search size={22} className="mx-auto text-slate-600" />
                      <p className="mt-3 text-xs text-slate-400">
                        No results found
                      </p>
                      <p className="mt-1 text-[10px] text-slate-600">
                        Try another keyword.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/[0.06] px-4 py-2.5">
                  <p className="text-[9px] text-slate-600">
                    Press Esc to close
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile search */}
          <button
            type="button"
            aria-label="Open search"
            onClick={() => {
              setMobileSearchOpen((value) => !value);
              setActiveDropdown(null);
            }}
            className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-white/[0.07] hover:text-white lg:hidden"
          >
            {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Date selector */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => toggleDropdown("date")}
              aria-expanded={activeDropdown === "date"}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition-all ${
                activeDropdown === "date"
                  ? "border-violet-400/30 bg-violet-400/10 text-white"
                  : "border-white/[0.07] bg-white/[0.035] text-slate-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
              }`}
            >
              <CalendarDays size={15} className="text-violet-300" />
              <span className="hidden md:inline">{selectedDate}</span>
              <ChevronDown
                size={13}
                className={`text-slate-500 transition-transform ${
                  activeDropdown === "date" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "date" && (
              <div className="header-dropdown absolute right-0 top-[calc(100%+12px)] z-50 w-48 rounded-2xl border border-white/[0.09] bg-[#1b1922] p-2 shadow-2xl shadow-black/40">
                <p className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                  Select period
                </p>

                {dateOptions.map((date) => (
                  <button
                    type="button"
                    key={date}
                    onClick={() => handleDateChange(date)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    {date}
                    {selectedDate === date && (
                      <Check size={14} className="text-violet-300" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("notifications")}
              aria-label="Notifications"
              aria-expanded={activeDropdown === "notifications"}
              className={`relative rounded-xl p-2.5 transition-all ${
                activeDropdown === "notifications"
                  ? "bg-violet-400/10 text-violet-300"
                  : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <Bell size={18} />

              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full border-2 border-[#141319] bg-violet-500 px-1 text-[8px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {activeDropdown === "notifications" && (
              <div className="header-dropdown absolute right-0 top-[calc(100%+12px)] z-50 w-[min(340px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#1b1922] shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {unreadCount} unread messages
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="flex items-center gap-1.5 text-[10px] font-medium text-violet-300 transition-colors hover:text-violet-200"
                    >
                      <CheckCheck size={13} />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-[330px] overflow-y-auto p-2">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;

                    const iconColors = {
                      violet: "bg-violet-400/10 text-violet-300",
                      blue: "bg-blue-400/10 text-blue-300",
                      emerald: "bg-emerald-400/10 text-emerald-300",
                    };

                    return (
                      <button
                        type="button"
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/[0.05] ${
                          notification.read ? "opacity-60" : ""
                        }`}
                      >
                        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconColors[notification.color]}`}>
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-medium text-slate-200">
                              {notification.title}
                            </p>

                            {!notification.read && (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                            )}
                          </div>

                          <p className="mt-1 text-[10px] leading-4 text-slate-500">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-[9px] text-slate-600">
                            {notification.time}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {notifications.length === 0 && (
                    <div className="py-10 text-center">
                      <Bell size={22} className="mx-auto text-slate-600" />
                      <p className="mt-3 text-xs text-slate-400">
                        You're all caught up!
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/[0.06] px-4 py-3">
                  <p className="text-center text-[10px] text-slate-600">
                    You're all up to date with your notifications.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("profile")}
              aria-expanded={activeDropdown === "profile"}
              className={`flex items-center gap-2 rounded-xl py-1 pl-1.5 pr-1.5 transition-all hover:bg-white/[0.06] sm:pl-2 ${
                activeDropdown === "profile" ? "bg-white/[0.06]" : ""
              }`}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={userName}
                  className="h-9 w-9 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-full border border-violet-400/20 bg-violet-400/10 text-xs font-semibold text-violet-300">
                  {initials}
                </div>
              )}

              <span className="hidden text-left md:block">
                <span className="block max-w-28 truncate text-xs font-medium text-slate-200">
                  {userName}
                </span>
                <span className="mt-0.5 block text-[10px] text-slate-500">
                  {userRole}
                </span>
              </span>

              <ChevronDown
                size={14}
                className={`hidden text-slate-500 transition-transform md:block ${
                  activeDropdown === "profile" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "profile" && (
              <div className="header-dropdown absolute right-0 top-[calc(100%+12px)] z-50 w-60 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#1b1922] shadow-2xl shadow-black/40">
                <div className="border-b border-white/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={userName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-400/10 text-sm font-semibold text-violet-300">
                        {initials}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">
                        {userName}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {userRole}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    to="/profile"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <UserRound size={15} className="text-slate-500" />
                    My profile
                    <ArrowUpRight size={13} className="ml-auto text-slate-600" />
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <Settings size={15} className="text-slate-500" />
                    Settings
                    <ArrowUpRight size={13} className="ml-auto text-slate-600" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      navigate("/help");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <CircleHelp size={15} className="text-slate-500" />
                    Help center
                    <ArrowUpRight size={13} className="ml-auto text-slate-600" />
                  </button>
                </div>

                <div className="border-t border-white/[0.06] p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-rose-300 transition-colors hover:bg-rose-400/10"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search panel */}
      {mobileSearchOpen && (
        <div className="header-dropdown border-t border-white/[0.06] bg-[#17151d] p-4 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              ref={searchInputRef}
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search courses, lessons..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-400/40"
            />
          </form>

          <div className="mt-3 space-y-1">
            {filteredResults.slice(0, 4).map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => handleSearchSelect(item.path)}
                  className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-white/[0.05]"
                >
                  <Icon size={15} className="text-violet-300" />
                  <span className="text-xs text-slate-300">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
