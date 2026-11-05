
import { useState } from "react";

import {
  Home,
  Compass,
  Users,
  MessageCircle,
  Bell,
  Bookmark,
  Settings,
  CircleHelp,
  Plus,
  ChevronRight,
} from "lucide-react";

import { currentUser } from "../../data/profile";

const menuItems = [
  { name: "Home Feed", icon: Home },
  { name: "Explore", icon: Compass },
  { name: "My Network", icon: Users },
  { name: "Messages", icon: MessageCircle },
  { name: "Notifications", icon: Bell, badge: "3" },
  { name: "Saved Posts", icon: Bookmark },
];

function Sidebar({ onCreatePost }) {
  const [activeItem, setActiveItem] = useState("Home Feed");

  return (
    <aside className="hidden lg:block w-full p-5">

      {/* Profile Card */}
      <div className="glass rounded-2xl p-5 mb-5">

        <div className="flex items-center gap-3">

          <div className="relative">

            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
            />

            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1f130b] rounded-full" />

          </div>

          <div className="min-w-0">

            <h3 className="font-bold text-white truncate">
              {currentUser.name}
            </h3>

            <p className="text-xs text-gray-400">
              {currentUser.username}
            </p>

            <p className="text-xs text-purple-400 mt-1">
              Premium Member ✨
            </p>

          </div>

        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-3 text-center mt-6 pt-4 border-t border-white/10">

          <div>
            <h4 className="font-bold text-white">245</h4>
            <p className="text-xs text-gray-500">Posts</p>
          </div>

          <div className="border-x border-white/10">
            <h4 className="font-bold text-white">12.8k</h4>
            <p className="text-xs text-gray-500">Followers</p>
          </div>

          <div>
            <h4 className="font-bold text-white">890</h4>
            <p className="text-xs text-gray-500">Following</p>
          </div>

        </div>

      </div>

      {/* Navigation Menu */}
      <div className="glass rounded-2xl p-3">

        <p className="text-xs uppercase tracking-widest text-gray-500 px-3 py-3">
          Main Menu
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "premium-gradient text-white shadow-lg shadow-purple-900/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >

                <Icon size={19} />

                <span>{item.name}</span>

                {item.badge && (
                  <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}

                {isActive && !item.badge && (
                  <ChevronRight size={16} className="ml-auto" />
                )}

              </button>
            );

          })}

        </div>

        {/* Other Options */}
        <div className="border-t border-white/10 mt-4 pt-4 space-y-2">

          <button
            onClick={() => setActiveItem("Settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              activeItem === "Settings"
                ? "bg-purple-500/20 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>

          <button
            onClick={() => setActiveItem("Help Center")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              activeItem === "Help Center"
                ? "bg-purple-500/20 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <CircleHelp size={19} />
            Help Center
          </button>

        </div>

      </div>

      {/* Create Post */}
      <button
        onClick={onCreatePost}
        className="w-full mt-5 premium-gradient rounded-xl py-3 font-bold text-white flex justify-center items-center gap-2 hover:opacity-90 hover:shadow-lg hover:shadow-purple-900/30 transition"
      >
        <Plus size={19} />
        Create Post
      </button>

      <p className="text-xs text-gray-600 text-center mt-8">
        © 2026 ConnectHub. All rights reserved.
      </p>

    </aside>
  );
}

export default Sidebar;
