
import { useState } from "react";
import {
    MessageCircle,
    Send,
    Trash2,
    User
} from "lucide-react";

function CommentSection({ postId }) {

    const [comments, setComments] = useState([]);

    const [commentText, setCommentText] = useState("");

    const handleAddComment = (e) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            postId,
            text: commentText,
            username: "You",
            createdAt: new Date().toLocaleString()
        };

        setComments((prev) => [...prev, newComment]);

        setCommentText("");
    };

    const handleDeleteComment = (id) => {
        setComments((prev) =>
            prev.filter((comment) => comment.id !== id)
        );
    };

    return (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">

            <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={19} />
                <h3 className="font-semibold">
                    Comments ({comments.length})
                </h3>
            </div>

            <form
                onSubmit={handleAddComment}
                className="flex gap-2 mb-4"
            >
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 outline-none text-sm"
                />

                <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50"
                >
                    <Send size={17} />
                </button>
            </form>

            <div className="space-y-3">

                {comments.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-3">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex items-start gap-3"
                        >
                            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <User size={18} />
                            </div>

                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">

                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-sm">
                                        {comment.username}
                                    </span>

                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>

                                <p className="text-sm mt-1">
                                    {comment.text}
                                </p>

                                <span className="text-xs text-gray-400 mt-2 block">
                                    {comment.createdAt}
                                </span>

                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default CommentSection;
