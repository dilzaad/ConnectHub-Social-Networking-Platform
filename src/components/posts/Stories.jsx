import { useState } from "react";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";

const initialStories = [
  { id: 1, name: "Sophia", img: 44, text: "Working on something amazing! ✨" },
  { id: 2, name: "James", img: 33, text: "Learning React every day 🚀" },
  { id: 3, name: "Emma", img: 47, text: "Creative minds create magic 🎨" },
  { id: 4, name: "Oliver", img: 12, text: "Building my next project 💻" },
  { id: 5, name: "Ava", img: 25, text: "Enjoying the little moments ❤️" },
  { id: 6, name: "Noah", img: 51, text: "Keep moving forward!" },
];

function Stories() {
  const [stories, setStories] = useState(initialStories);
  const [activeStory, setActiveStory] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [storyText, setStoryText] = useState("");

  const handleCreateStory = (e) => {
    e.preventDefault();

    if (!storyText.trim()) return;

    const newStory = {
      id: Date.now(),
      name: "You",
      img: 12,
      text: storyText,
    };

    setStories((prev) => [newStory, ...prev]);
    setStoryText("");
    setShowCreate(false);
  };

  const nextStory = () => {
    setActiveStory((current) => {
      const index = stories.findIndex((story) => story.id === current.id);
      return stories[(index + 1) % stories.length];
    });
  };

  const previousStory = () => {
    setActiveStory((current) => {
      const index = stories.findIndex((story) => story.id === current.id);
      return stories[(index - 1 + stories.length) % stories.length];
    });
  };

  return (
    <>
      {/* Stories Section */}
      <div className="glass rounded-2xl p-5 mb-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="font-bold text-white text-lg">Stories</h2>
            <p className="text-xs text-gray-500 mt-1">
              See what's happening around you
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="text-purple-400 text-sm hover:text-pink-400 transition"
          >
            Create Story
          </button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-3">

          {/* Your Story */}
          <button
            onClick={() => setShowCreate(true)}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="w-[62px] h-[62px] rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center group-hover:bg-purple-500/20 transition">
              <Plus className="text-purple-400" size={27} />
            </div>

            <span className="text-xs text-gray-400">Your Story</span>
          </button>

          {/* Other Stories */}
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className="p-[3px] rounded-full premium-gradient group-hover:scale-105 transition">
                <div className="p-[2px] bg-[#1f130b] rounded-full">
                  <img
                    src={`https://i.pravatar.cc/100?img=${story.img}`}
                    alt={story.name}
                    className="w-[54px] h-[54px] rounded-full object-cover"
                  />
                </div>
              </div>

              <span className="text-xs text-gray-400">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Story Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Create Your Story
              </h2>

              <button
                onClick={() => setShowCreate(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleCreateStory}>
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="What's happening today?"
                maxLength={180}
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none resize-none focus:border-purple-500 placeholder:text-gray-500"
              />

              <p className="text-right text-xs text-gray-500 mt-2">
                {storyText.length}/180
              </p>

              <button
                type="submit"
                disabled={!storyText.trim()}
                className="w-full mt-4 premium-gradient py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Send size={17} />
                Share Story
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Story Viewer */}
      {activeStory && (
        <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md h-[650px] max-h-[90vh] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 to-[#120a06] border border-white/10">

            <div className="absolute inset-0 opacity-30">
              <img
                src={`https://i.pravatar.cc/600?img=${activeStory.img}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 p-5 h-full flex flex-col">

              {/* Progress Bar */}
              <div className="h-1 bg-white/30 rounded-full mb-5 overflow-hidden">
                <div className="h-full w-full bg-white rounded-full" />
              </div>

              {/* Story Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?img=${activeStory.img}`}
                    alt={activeStory.name}
                    className="w-10 h-10 rounded-full border-2 border-purple-400"
                  />

                  <span className="font-bold text-white">
                    {activeStory.name}
                  </span>
                </div>

                <button
                  onClick={() => setActiveStory(null)}
                  className="text-white"
                >
                  <X size={25} />
                </button>
              </div>

              {/* Story Content */}
              <div className="flex-1 flex items-center justify-center text-center px-8">
                <p className="text-2xl font-bold text-white leading-relaxed">
                  {activeStory.text}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={previousStory}
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <ChevronLeft size={25} />
                </button>

                <button
                  onClick={nextStory}
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <ChevronRight size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stories;