
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { currentUser } from "../data/profile";

// Create Context
const PostContext = createContext();

// Initial Posts
const initialPosts = [
  {
    id: 1,
    name: "Sophia Wilson",
    username: "@sophiawilson",
    avatar: "https://i.pravatar.cc/100?img=44",
    time: "2 hours ago",
    content:
      "Design is not just what it looks like. Design is how it works. Creating something amazing every single day! ✨",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
    feeling: "😊 Feeling Happy",
    location: "New York",
    likes: 245,
    liked: false,
    saved: false,
    comments: [
      {
        id: 101,
        name: "James Cooper",
        text: "Absolutely beautiful! 🔥",
      },
    ],
    verified: true,
  },
  {
    id: 2,
    name: "James Cooper",
    username: "@jamescooper",
    avatar: "https://i.pravatar.cc/100?img=33",
    time: "4 hours ago",
    content:
      "Just finished learning React Hooks! useState, useEffect and Context API are becoming my favorite concepts. Keep learning! 🚀",
    image: null,
    feeling: "🔥 Feeling Excited",
    location: "",
    likes: 128,
    liked: false,
    saved: false,
    comments: [],
    verified: false,
  },
];

// Provider
export function PostProvider({ children }) {
  // Load Posts from LocalStorage
  const [posts, setPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem("connecthub-posts");

      return savedPosts
        ? JSON.parse(savedPosts)
        : initialPosts;
    } catch (error) {
      console.error("Error loading posts:", error);
      return initialPosts;
    }
  });

  // Save Posts to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "connecthub-posts",
      JSON.stringify(posts)
    );
  }, [posts]);

  // Add New Post
  const addPost = ({ content, image, feeling, location }) => {
    const newPost = {
      id: Date.now(),
      name: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
      time: "Just now",
      content,
      image,
      feeling,
      location,
      likes: 0,
      liked: false,
      saved: false,
      comments: [],
      verified: currentUser.verified,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Delete Post
  const deletePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId)
    );
  };

  // Like / Unlike Post
  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? Math.max(0, (post.likes ?? 0) - 1)
                : (post.likes ?? 0) + 1,
            }
          : post
      )
    );
  };

  // Save / Unsave Post
  const toggleSave = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, saved: !post.saved }
          : post
      )
    );
  };

  // Add Comment
  const addComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      name: currentUser.name,
      text: commentText,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments ?? []), newComment],
            }
          : post
      )
    );
  };

  const value = {
    posts,
    addPost,
    deletePost,
    toggleLike,
    toggleSave,
    addComment,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}

// Custom Hook
export function usePosts() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error(
      "usePosts must be used inside PostProvider"
    );
  }

  return context;
}
