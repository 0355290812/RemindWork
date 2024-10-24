import React, { useState } from 'react';

const Dropdown = ({ projects, onSelectProject, selectedProject }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-400 dark:hover:bg-blue-500"
                type="button"
            >
                {projects.length > 0 ? `${selectedProject.title ?? projects[0].title}` : 'No Projects'}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2"
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {projects.map((project) => (
                            <li key={project.id}>
                                <div

                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        onSelectProject(project);
                                        setIsOpen(false);
                                    }}
                                >
                                    {project.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
