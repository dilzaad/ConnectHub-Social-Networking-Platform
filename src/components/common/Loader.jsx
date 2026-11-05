
import { Loader2 } from "lucide-react";

function Loader({
    size = "md",
    text = "Loading...",
    fullScreen = false,
    className = ""
}) {

    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    return (
        <div
            className={`flex flex-col items-center justify-center gap-3 ${
                fullScreen ? "min-h-screen w-full" : "py-6"
            } ${className}`}
        >

            <Loader2
                className={`${sizes[size]} text-blue-600 animate-spin`}
            />

            {text && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {text}
                </p>
            )}

        </div>
    );
}

export default Loader;
