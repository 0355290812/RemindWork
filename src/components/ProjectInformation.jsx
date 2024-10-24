import React, { useState } from "react";
import formatDate from "../utils/formatDate";
import Statistics from "./Statistics";
import { useNavigate } from "react-router-dom";

const ProjectInformation = ({ project, tasks }) => {

    const [activeTab, setActiveTab] = useState("all");
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    const membersAccepted = project.members.filter(member => member.status === "accepted");

    return (
        <div className="flex flex-col mr-2 flex-grow">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                    className="flex flex-row -mb-px text-sm font-medium text-center justify-start"
                    role="tablist"
                >
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "all"
                                ? "text-blue-400 border-blue-400"
                                : "text-gray-500 hover:text-gray-600 border-transparent hover:border-gray-300"
                                }`}
                            onClick={() => handleTabClick("all")}
                            type="button"
                            role="tab"
                        >
                            Tổng quan
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "log"
                                ? "text-blue-400 border-blue-400"
                                : "text-gray-500 hover:text-gray-600 border-transparent hover:border-gray-300"
                                }`}
                            onClick={() => handleTabClick("log")}
                            type="button"
                            role="tab"
                        >
                            Báo cáo
                        </button>
                    </li>
                </ul>
            </div>

            <div id="default-styled-tab-content" className="overflow-y-auto h-full">
                {activeTab === "all" && (
                    <div className="p-4 rounded-lg flex flex-col justify-start" style={{ maxWidth: 352 }} >
                        <div className="rounded-md border-2 border-blue-400">
                            <div className="flex flex-col items-center m-4">
                                <span className={`mt-2 text-2xl text-blue-400 font-bold`}>
                                    {project.title}
                                </span>
                                <span className={`mb-2 text-lg text-gray-400 text-center`}>
                                    {project.description}
                                </span>
                                <span className="text-sm my-2">
                                    Từ {formatDate(project.startDate)}
                                </span>
                                <span className="text-sm my-2">
                                    Đến {formatDate(project.endDate)}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-md border-2 border-blue-400 mt-4">
                            <div className="flex flex-row items-center m-4">
                                <div
                                    className="flex flex-col items-center bg-blue-400 rounded-md p-4 cursor-pointer"
                                    onClick={() => navigate(`/projects/${project._id}/members`)}
                                >
                                    <span className="text-xl font-bold text-white">
                                        {membersAccepted.length}
                                    </span>
                                    <span className="text-sm text-white">
                                        Thành viên
                                    </span>
                                </div>
                                <div className="flex flex-col ml-4">
                                    <div className="flex flex-row items-center">
                                        <span className="text-lg font-semibold mr-1">
                                            {membersAccepted.filter(member => member.role === "admin").length}
                                        </span>
                                        <span className="text-sm text-black">
                                            Trưởng dự án
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <span className="text-lg font-semibold mr-1">
                                            {membersAccepted.filter(member => member.role === "teamlead").length}
                                        </span>
                                        <span className="text-sm text-black">
                                            Trưởng nhóm
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <span className="text-lg font-semibold mr-1">
                                            {membersAccepted.filter(member => member.role === "employee").length}
                                        </span>
                                        <span className="text-sm text-black">
                                            Nhân viên
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "log" && (
                    <div className="p-4 rounded-lg" >
                        {tasks.length > 0 ? <Statistics tasks={tasks} /> : <div className="text-lg font-bold">Chưa có nhiệm vụ nào được tạo</div>}
                    </div>
                )}
            </div>
        </div >
    );
};

export default ProjectInformation;
