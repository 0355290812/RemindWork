import React, { useState } from "react";
import LogList from "./LogList";
import MainInformation from "./MainInformation";
import { _addCommentToTask, _deleteCommentFromTask } from "../api/task";
import { useAuth } from "../context/AuthContext";
import { _uploadFiles, _deleteFile } from "../api/task";

const InformationTask = ({ task, onTaskChange }) => {
    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState("all");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    const onAddComment = async (comment) => {
        const newTask = await _addCommentToTask(task._id, comment);
        task.comments.unshift({ ...comment, user: { name: user.name, avatar: user.avatar }, timestamps: new Date(Date.now() - 1000).toISOString(), _id: newTask.task.comments[0]._id });
        onTaskChange(task);
    }

    const onDeleteComment = async (commentId) => {
        const newTask = await _deleteCommentFromTask(task._id, commentId);
        task.comments = task.comments.filter(c => c._id !== commentId);
        onTaskChange(task);
    }

    const onUploadFiles = async (files) => {
        const res = await _uploadFiles(task._id, files);
        task.files = res.task.files;
        console.log(task.files);

        onTaskChange(task);
    }

    const onDeleteFile = async (fileId) => {
        try {
            const newTask = await _deleteFile(task._id, fileId);
            task.files = task.files.filter(f => f._id !== fileId);
            onTaskChange(task);
            alert("Xóa file thành công");
        } catch (error) {
            alert("Xóa file thất bại");
        }
    }

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
                            Tất cả
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
                            Nhật ký
                        </button>
                    </li>
                </ul>
            </div>

            <div id="default-styled-tab-content" className="overflow-y-auto h-full">
                {activeTab === "all" && (
                    <div className="p-4 rounded-lg" >
                        <MainInformation
                            task={task}
                            onAddComment={onAddComment}
                            onDeleteComment={onDeleteComment}
                            onUploadFiles={onUploadFiles}
                            onDeleteFile={onDeleteFile}
                        />
                    </div>
                )}
                {activeTab === "log" && (
                    <div className="p-4 rounded-lg" >
                        <LogList logs={task.log} />
                    </div>
                )}
            </div>
        </div >
    );
};

export default InformationTask;
