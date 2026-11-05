
import { useEffect, useRef, useState } from "react";

import {
  Search,
  Bell,
  MessageCircle,
  Sparkles,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { currentUser } from "../../data/profile";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  // Ctrl/Cmd + K se search focus
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }

      if (e.key === "Escape") {
        setProfileOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Bahar click par dropdown band
  useEffect(() => {
    const onClick = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);

    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const iconBtn =
    "w-10 h-10 rounded-xl bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-300 hover:text-purple-400 transition relative";

  return (
    <nav className="nav-surface sticky top-0 z-50 border-b border-white/10 bg-[#1a0f09]/85 backdrop-blur-xl">

      <div className="h-[72px] px-4 md:px-8 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-300"
            aria-label="Menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-purple-900/40">
            <Sparkles size={22} />
          </div>

          <h1 className="text-2xl font-extrabold gradient-text hidden sm:block">
            ConnectHub
          </h1>

        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-96 focus-within:border-purple-500/60 focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.15)] transition">

          <Search size={18} className="text-gray-400" />

          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people, posts, topics..."
            className="bg-transparent outline-none px-3 text-sm w-full text-white placeholder:text-gray-500"
          />

          {search ? (
            <button
              onClick={() => setSearch("")}
              className="text-gray-400"
            >
              <X size={16} />
            </button>
          ) : (
            <kbd className="text-[11px] text-gray-500 border border-white/10 rounded px-1.5 py-0.5">
              Ctrl K
            </kbd>
          )}

        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className={iconBtn}
            title="Theme badlein"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Messages */}
          <button className={iconBtn} title="Messages">
            <MessageCircle size={20} />

            <span className="absolute -top-1 -right-1 w-4 h-4 premium-gradient text-[10px] rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Notifications */}
          <button className={iconBtn} title="Notifications">
            <Bell size={20} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="rounded-full"
              aria-label="Profile menu"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
              />
            </button>

            {profileOpen && (
              <div className="pop-in absolute right-0 top-14 w-56 glass bg-[#1f130b]/95 rounded-2xl p-3 shadow-2xl">

                <div className="px-3 py-2 border-b border-white/10 mb-2">

                  <p className="font-bold text-white">
                    {currentUser.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {currentUser.username}
                  </p>

                </div>

                <button
                  className="flex items-center gap-3 w-full p-3 rounded-xl text-sm text-gray-300 hover:bg-white/10"
                  onClick={() => setProfileOpen(false)}
                >
                  <User size={17} />
                  My Profile
                </button>

                <button
                  className="flex items-center gap-3 w-full p-3 rounded-xl text-sm text-gray-300 hover:bg-white/10"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings size={17} />
                  Settings
                </button>

                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full p-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 p-4 nav-surface bg-[#1a0f09]">

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-3">

            <Search size={18} className="text-gray-400" />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none px-3 text-sm w-full text-white"
            />

          </div>

          {[
            "Home Feed",
            "Explore",
            "Messages",
            "Notifications",
            "Saved Posts",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left p-3 rounded-xl text-gray-300 hover:bg-white/10"
            >
              {item}
            </button>
          ))}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
