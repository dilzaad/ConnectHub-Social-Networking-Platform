
import { useRef, useState } from "react";
import {
  Image,
  Smile,
  MapPin,
  Send,
  X,
  Camera,
  LoaderCircle,
} from "lucide-react";

const feelings = [
  "😊 Feeling Happy",
  "🔥 Feeling Excited",
  "💻 Working",
  "❤️ Feeling Loved",
  "🎯 Feeling Motivated",
  "😎 Feeling Cool",
];

function CreatePost({ onAddPost }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [feeling, setFeeling] = useState("");
  const [location, setLocation] = useState("");
  const [showFeelings, setShowFeelings] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    onAddPost({
      content: content.trim(),
      image,
      feeling,
      location,
    });

    setContent("");
    setImage(null);
    setFeeling("");
    setLocation("");
    setShowFeelings(false);
    setShowLocation(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="glass rounded-2xl p-5 mb-5">

      {/* Profile and Textarea */}
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
        />

        <form onSubmit={handleSubmit} className="flex-1">

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in your world?"
            maxLength={500}
            rows={3}
            className="w-full bg-white/5 rounded-xl p-4 text-white text-sm outline-none resize-none border border-white/5 focus:border-purple-500 placeholder:text-gray-500"
          />

          <p className="text-xs text-gray-500 text-right mt-1">
            {content.length}/500
          </p>

          {/* Image Preview */}
          {image && (
            <div className="relative mt-4">
              <img
                src={image}
                alt="Post preview"
                className="w-full max-h-80 object-cover rounded-xl border border-white/10"
              />

              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(image);
                  setImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-red-500 transition"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Selected Feeling */}
          {feeling && (
            <div className="mt-3 inline-flex items-center gap-2 bg-purple-500/15 text-purple-300 px-3 py-2 rounded-lg text-sm">
              {feeling}
              <button
                type="button"
                onClick={() => setFeeling("")}
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* Selected Location */}
          {location && (
            <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
              <MapPin size={15} />
              {location}
              <button
                type="button"
                onClick={() => setLocation("")}
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* Feeling Selector */}
          {showFeelings && (
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm font-semibold text-white mb-3">
                How are you feeling?
              </p>

              <div className="flex flex-wrap gap-2">
                {feelings.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFeeling(item);
                      setShowFeelings(false);
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-purple-500/15 text-purple-300 hover:bg-purple-500/30"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location Input */}
          {showLocation && (
            <div className="mt-4 flex gap-2">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location..."
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-purple-500"
              />

              <button
                type="button"
                onClick={() => setShowLocation(false)}
                className="text-purple-400 text-sm"
              >
                Done
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">

            <div className="flex items-center gap-4">

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-purple-400 flex items-center gap-2 text-sm"
              >
                <Image size={19} />
                <span className="hidden sm:inline">Photo</span>
              </button>

              {/* Feeling */}
              <button
                type="button"
                onClick={() => {
                  setShowFeelings(!showFeelings);
                  setShowLocation(false);
                }}
                className="text-gray-400 hover:text-pink-400 flex items-center gap-2 text-sm"
              >
                <Smile size={19} />
                <span className="hidden sm:inline">Feeling</span>
              </button>

              {/* Location */}
              <button
                type="button"
                onClick={() => {
                  setShowLocation(!showLocation);
                  setShowFeelings(false);
                }}
                className="text-gray-400 hover:text-blue-400 flex items-center gap-2 text-sm"
              >
                <MapPin size={19} />
                <span className="hidden sm:inline">Location</span>
              </button>
            </div>

            {/* Publish */}
            <button
              type="submit"
              disabled={!content.trim() && !image}
              className="premium-gradient text-white rounded-xl px-5 py-2.5 text-sm font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            >
              Post <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
