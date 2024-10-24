import React, { useEffect, useState } from 'react';
import { GoHome } from "react-icons/go";
import { MdOutlineGroup } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { getProjects } from '../api/project';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import AddProject from './AddProject';
import { createProject } from '../api/project';

const Sidebar = () => {
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsRes = await getProjects();
                setProjects(projectsRes);
            } catch (error) {
                console.log('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const onClose = () => {
        setIsAdding(false);
    }

    const onSubmit = async (data) => {
        setIsAdding(false);
        const res = await createProject(data);
        setProjects([...projects, res]);
    }

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            to="/home"
                            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                            ${location.pathname === '/home' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} 
                            group`}
                        >
                            <GoHome
                                size={20}
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            />
                            <span className="ms-3">Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <div
                            className={`flex flex-col items-start p-2 text-gray-900 rounded-lg dark:text-white group`}
                        >
                            <div className='flex flex-row justify-between items-center w-full mb-4'>
                                <div className='flex flex-row items-center'>
                                    <MdOutlineGroup
                                        size={20}
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    />
                                    <span className="ms-3">Dự án</span>
                                </div>

                                <div className='flex flex-row'>
                                    <IoIosAdd
                                        size={20}
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white cursor-pointer"
                                        onClick={() => setIsAdding(true)}
                                    />
                                    {isExpanded ? (
                                        <MdExpandLess
                                            size={20}
                                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white cursor-pointer"
                                            onClick={() => setIsExpanded(false)}
                                        />
                                    ) : (
                                        <MdExpandMore
                                            size={20}
                                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white cursor-pointer"
                                            onClick={() => setIsExpanded(true)}
                                        />
                                    )}
                                </div>
                            </div>

                            {projects.length > 0 && isExpanded && (
                                <ul className="space-y-2 font-medium w-full">
                                    {projects.map((project) => (
                                        <li key={project._id}>
                                            <Link
                                                to={`/projects/${project._id}`}
                                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer
                                                ${location.pathname.includes(`/projects/${project._id}`) ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} 
                                                group`}
                                            >
                                                <span className="ms-6">{project.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
            {isAdding && <AddProject onClose={onClose} onSubmit={(data) => onSubmit(data)} />}
        </aside>
    );
};

export default Sidebar;
