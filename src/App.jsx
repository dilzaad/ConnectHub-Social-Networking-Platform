
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import RightSidebar from "./components/layout/RightSidebar";

import Stories from "./components/posts/Stories";
import CreatePost from "./components/posts/CreatePost";
import PostCard from "./components/posts/PostCard";

import { usePosts } from "./context/PostContext";
import { useTheme } from "./context/ThemeContext";
import { currentUser } from "./data/profile";

function App() {
  const { posts, addPost, deletePost } = usePosts();
  const { theme } = useTheme();

  // Current User Name
  const name = currentUser.name.split(" ")[0];

  // Dynamic Greeting
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  // Scroll to Create Post
  const scrollToCreate = () =>
    document
      .getElementById("create-post")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#120a06] text-white"
          : "bg-[#fbf5ef] text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar />

      <div className="dashboard-layout">

        {/* Left Sidebar */}
        <div className="left-column">
          <Sidebar onCreatePost={scrollToCreate} />
        </div>

        {/* Main Feed */}
        <main className="center-column">

          {/* Welcome Banner */}
          <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-6 premium-gradient shadow-xl shadow-purple-900/30">

            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />

           <h1 className="relative text-2xl sm:text-3xl font-extrabold text-white">
  {greeting}, {name}!
</h1>

<p className="relative mt-2 text-white/85 text-sm sm:text-base max-w-md">
  Stay connected with your community, discover what's happening, and share your thoughts with the world.
</p>

<button
  onClick={scrollToCreate}
  className="relative mt-5 bg-white text-orange-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition"
>
  Create a Post
</button>

          </section>

          {/* Stories */}
          <Stories />

          {/* Create Post */}
          <div id="create-post">
            <CreatePost onAddPost={addPost} />
          </div>

          {/* Feed Heading */}
          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-bold">
                Your Feed
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {posts.length} posts in your feed
              </p>
            </div>

            <span className="text-xs text-purple-400 bg-purple-500/10 px-3 py-2 rounded-lg">
              Latest Posts
            </span>

          </div>

          {/* Posts */}
          {posts.length > 0 ? (

            <div className="space-y-5">

              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeletePost={deletePost}
                />
              ))}

            </div>

          ) : (

            /* Empty Feed */
            <div className="glass rounded-2xl p-10 text-center">

              <h3 className="text-lg font-bold">
                Abhi koi post nahi
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Sab se pehle apni community ke saath kuch share karein.
              </p>

              <button
                onClick={scrollToCreate}
                className="mt-5 premium-gradient px-5 py-2.5 rounded-xl text-sm font-bold"
              >
                Post likhein
              </button>

            </div>

          )}

        </main>

        {/* Right Sidebar */}
        <div className="right-column">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
}

export default App;
