
import { X } from "lucide-react";

function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md"
}) {

    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl"
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >

            <div
                className={`relative w-full ${sizes[size]} bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Modal Content */}
                <div>
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Modal;
