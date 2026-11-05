
import { useState } from "react";

import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
  Bookmark,
  Trash2,
  MapPin,
  Smile,
  CheckCircle2,
  Copy,
  X,
} from "lucide-react";

import { usePosts } from "../../context/PostContext";
import { currentUser } from "../../data/profile";

function PostCard({ post, onDeletePost }) {
  const {
    toggleLike,
    toggleSave,
    addComment,
  } = usePosts();

  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const liked = post.liked ?? false;
  const saved = post.saved ?? false;
  const comments = post.comments ?? [];

  // Check current user's post
  const isMyPost = post.username === currentUser.username;

  // Like / Unlike
  const handleLike = () => {
    toggleLike(post.id);
  };

  // Add Comment
  const handleComment = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    addComment(post.id, comment.trim());

    setComment("");
    setShowComments(true);
  };

  // Share Post
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/?post=${post.id}`
      );

      setShareMessage("Post link copied!");
    } catch {
      setShareMessage("Unable to copy link.");
    }

    setShowOptions(false);
    setTimeout(() => setShareMessage(""), 2000);
  };

  // Delete Post
  const handleDelete = () => {
    if (!onDeletePost || !isMyPost) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      onDeletePost(post.id);
    }

    setShowOptions(false);
  };

  return (
    <article className="glass rounded-2xl p-5 mb-5">

      {/* Post Header */}
      <div className="flex items-center gap-3">

        <img
          src={post.avatar}
          alt={post.name}
          className="w-12 h-12 rounded-full border border-purple-500 object-cover"
        />

        <div className="flex-1 min-w-0">

          <div className="flex items-center gap-1">

            <h3 className="text-white font-bold text-sm">
              {post.name}
            </h3>

            {post.verified && (
              <CheckCircle2
                size={15}
                className="text-blue-400"
              />
            )}

          </div>

          <p className="text-xs text-gray-500">
            {post.username} · {post.time}
          </p>

        </div>

        {/* More Options */}
        <div className="relative">

          <button
            onClick={() => setShowOptions((prev) => !prev)}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5"
            aria-label="Post options"
          >
            <MoreHorizontal size={22} />
          </button>

          {showOptions && (
            <div className="absolute right-0 top-10 z-20 w-48 glass rounded-xl p-2 shadow-2xl">

              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-300 hover:bg-white/10 rounded-lg"
              >
                <Copy size={16} />
                Copy Post Link
              </button>

              {isMyPost && (
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 size={16} />
                  Delete Post
                </button>
              )}

              <button
                onClick={() => setShowOptions(false)}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-400 hover:bg-white/10 rounded-lg"
              >
                <X size={16} />
                Close
              </button>

            </div>
          )}

        </div>

      </div>

      {/* Post Content */}
      {post.content && (
        <p className="text-gray-300 text-sm leading-7 mt-4 whitespace-pre-wrap break-words">
          {post.content}
        </p>
      )}

      {/* Feeling and Location */}
      {(post.feeling || post.location) && (
        <div className="flex flex-wrap items-center gap-4 mt-3">

          {post.feeling && (
            <span className="flex items-center gap-1 text-xs text-purple-300">
              <Smile size={15} />
              {post.feeling}
            </span>
          )}

          {post.location && (
            <span className="flex items-center gap-1 text-xs text-blue-400">
              <MapPin size={15} />
              {post.location}
            </span>
          )}

        </div>
      )}

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post attachment"
          className="w-full rounded-xl mt-4 max-h-[420px] object-cover border border-white/5"
        />
      )}

      {/* Like and Comment Counts */}
      <div className="flex justify-between text-xs text-gray-500 mt-4 pb-4 border-b border-white/10">

        <span>
          {post.likes ?? 0} Likes
        </span>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="hover:text-purple-400"
        >
          {comments.length} Comments
        </button>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center py-4 border-b border-white/10">

        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm transition ${
            liked
              ? "text-pink-500"
              : "text-gray-400 hover:text-pink-500"
          }`}
        >
          <Heart
            size={19}
            fill={liked ? "currentColor" : "none"}
          />

          <span className="hidden sm:inline">
            {liked ? "Liked" : "Like"}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 text-sm transition"
        >
          <MessageCircle size={19} />

          <span className="hidden sm:inline">
            Comment
          </span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-sm transition"
        >
          <Share2 size={19} />

          <span className="hidden sm:inline">
            Share
          </span>
        </button>

        {/* Save */}
        <button
          onClick={() => toggleSave(post.id)}
          className={`flex items-center gap-2 text-sm transition ${
            saved
              ? "text-purple-400"
              : "text-gray-400 hover:text-purple-400"
          }`}
          aria-label={saved ? "Unsave post" : "Save post"}
        >
          <Bookmark
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Share Feedback */}
      {shareMessage && (
        <p className="text-xs text-green-400 mt-3">
          {shareMessage}
        </p>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4">

          {comments.length > 0 ? (
            <div className="space-y-3 mb-4">

              {comments.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-xl p-3"
                >

                  <p className="text-xs font-bold text-purple-300">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-300 mt-1 break-words">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4 text-center">
              No comments yet. Be the first to comment!
            </p>
          )}

          {/* Comment Form */}
          <form
            onSubmit={handleComment}
            className="flex gap-2"
          >

            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              disabled={!comment.trim()}
              className="premium-gradient rounded-xl px-4 text-white disabled:opacity-40"
            >
              <Send size={17} />
            </button>

          </form>

        </div>
      )}

    </article>
  );
}

export default PostCard;
