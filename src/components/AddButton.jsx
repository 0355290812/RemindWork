import React from "react";

const AddButton = ({ onClick }) => {
    return (
        <>
            <div data-dial-init className="fixed end-6 bottom-6 group">
                <button
                    className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full shadow-lg transition duration-300 hover:bg-blue-700 focus:outline-none"
                    onClick={onClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default AddButton;
