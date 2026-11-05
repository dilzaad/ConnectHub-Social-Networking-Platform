
import { useState } from "react";
import {
  TrendingUp,
  UserPlus,
  UserCheck,
  MoreHorizontal,
  ArrowUpRight,
  Hash,
  Sparkles,
} from "lucide-react";

const initialSuggestions = [
  { id: 1, name: "Sophia Wilson", user: "@sophia", img: 44, role: "UI/UX Designer" },
  { id: 2, name: "James Cooper", user: "@james", img: 33, role: "Frontend Developer" },
  { id: 3, name: "Emma Watson", user: "@emma", img: 47, role: "Product Designer" },
];

const trends = [
  { tag: "#WebDevelopment", posts: "12.5k posts" },
  { tag: "#ReactJS", posts: "8.2k posts" },
  { tag: "#DesignInspiration", posts: "5.7k posts" },
  { tag: "#JavaScript", posts: "4.3k posts" },
];

function RightSidebar() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleFollow = (id) => {
    setSuggestions((prev) =>
      prev.map((person) =>
        person.id === id
          ? { ...person, following: !person.following }
          : person
      )
    );
  };

  return (
    <aside className="hidden xl:block w-full p-5 space-y-5">

      {/* People Suggestions */}
      <div className="glass rounded-2xl p-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="font-bold text-white">
              People You May Know
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Expand your network
            </p>
          </div>

          <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <UserPlus size={19} className="text-purple-400" />
          </div>
        </div>

        <div className="space-y-5">
          {suggestions.map((person) => (
            <div key={person.id} className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/100?img=${person.img}`}
                alt={person.name}
                className="w-11 h-11 rounded-full border border-white/10"
              />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">
                  {person.name}
                </h4>

                <p className="text-xs text-gray-500">
                  {person.role}
                </p>
              </div>

              <button
                onClick={() => handleFollow(person.id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                  person.following
                    ? "bg-green-500/15 text-green-400"
                    : "bg-purple-500/15 text-purple-400 hover:bg-purple-500 hover:text-white"
                }`}
                title={person.following ? "Following" : "Follow"}
              >
                {person.following ? (
                  <UserCheck size={18} />
                ) : (
                  <UserPlus size={18} />
                )}
              </button>
            </div>
          ))}
        </div>

        <button className="w-full text-purple-400 text-sm mt-6 font-semibold hover:text-pink-400 transition flex items-center justify-center gap-2">
          View All People
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Trending Topics */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-white">Trending Topics</h3>
            <p className="text-xs text-gray-500 mt-1">
              What's happening today
            </p>
          </div>

          <TrendingUp size={20} className="text-pink-400" />
        </div>

        <div className="space-y-5">
          {trends.map((trend, index) => (
            <div
              key={trend.tag}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                <Hash size={17} className="text-purple-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-pink-400 transition">
                  {trend.tag}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {trend.posts}
                </p>
              </div>

              <span className="text-xs text-gray-600">
                {index + 1}
              </span>

              <button className="text-gray-500 hover:text-white">
                <MoreHorizontal size={19} />
              </button>
            </div>
          ))}
        </div>

        <button className="text-purple-400 text-sm mt-6 font-semibold hover:text-pink-400">
          Show More
        </button>
      </div>

      {/* Premium Explore Card */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-purple-900/60 to-pink-900/30 border border-purple-500/20">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

        <div className="relative">
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center mb-4">
            <Sparkles size={21} />
          </div>

          <h3 className="font-black text-white text-lg">
            Connect More.
            <span className="gradient-text"> Grow More.</span>
          </h3>

          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            Discover new people, explore communities and share your creativity with the world.
          </p>

          <button className="mt-5 w-full bg-white text-purple-900 px-4 py-3 rounded-xl text-sm font-bold hover:bg-purple-100 transition flex items-center justify-center gap-2">
            Explore Now
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 text-center">
        <p className="text-xs text-gray-600 leading-6">
          About · Privacy · Terms · Help
        </p>
        <p className="text-xs text-gray-600 mt-2">
          © 2026 ConnectHub
        </p>
      </div>

    </aside>
  );
}

export default RightSidebar;
