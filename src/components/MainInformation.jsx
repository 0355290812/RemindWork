import React, { useState } from "react";
import moment from "moment";
import formatDate from "../utils/formatDate";
import { IoSendSharp } from "react-icons/io5";
import Comment from "./Comment";
import { MdOutlineFileDownload, MdOutlineDeleteOutline } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const MainInformation = ({ task, onDeleteComment, onAddComment, onUploadFiles, onDeleteFile }) => {
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment({ comment: newComment });
            setNewComment("");
        }
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;

        const formData = new FormData();

        Array.from(files).forEach((file) => {
            formData.append("files", file);
        }
        );

        onUploadFiles(formData);
    };

    const getTaskStatus = (task) => {
        const now = moment();
        const endDate = moment(task.endDate);

        if (task.status === "completed") {
            return { status: "Hoàn thành", day: 0 };
        }

        if (task.status === "paused") {
            return { status: "Tạm dừng", day: 0 };
        }

        if (now.isAfter(endDate)) {
            const daysLate = now.diff(endDate, "days");
            if (daysLate < 1) {
                const hoursLate = now.diff(endDate, "hours");
                if (hoursLate < 1) {
                    const minutesLate = now.diff(endDate, "minutes");
                    return { status: `Trễ hạn`, day: `${minutesLate} phút` };
                }
                return { status: `Trễ hạn`, day: `${hoursLate} giờ` };
            }
            return { status: `Trễ hạn`, day: `${daysLate} ngày` };
        }

        const daysLeft = endDate.diff(now, "days");
        if (daysLeft < 1) {
            const hoursLeft = endDate.diff(now, "hours");
            if (hoursLeft < 1) {
                const minutesLeft = endDate.diff(now, "minutes");
                return { status: `Còn hạn`, day: `${minutesLeft} phút` };
            }
            return { status: `Còn hạn`, day: `${hoursLeft} giờ` };
        }
        return { status: `Còn hạn`, day: `${daysLeft} ngày` };
    };


    function getFileTag(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();

        switch (extension) {
            case 'pdf':
                return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">PDF</span>;
            case 'doc':
            case 'docx':
                return <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Word</span>;
            case 'xls':
            case 'xlsx':
                return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Excel</span>;
            case 'ppt':
            case 'pptx':
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">PowerPoint</span>;
            case 'txt':
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Text</span>;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Image</span>;
            default:
                return <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">File</span>;
        }

    }

    const taskStatus = getTaskStatus(task);

    return (
        <div className="flex flex-col justify-start">
            <div className="flex flex-col justify-start">
                <div className="rounded-md border-2 border-blue-400">
                    <div className="flex flex-col items-center m-4">
                        <span className={`my-2 ${taskStatus.status === 'Hoàn thành' ? 'text-xl font-bold text-blue-400' : ''} ${taskStatus.status === "Tạm dừng" ? 'text-xl font-bold text-yellow-400' : ''}`}>
                            {taskStatus.status}
                        </span>
                        <span
                            className={`my-2 text-2xl font-bold ${taskStatus.status === "Trễ hạn" ? "text-red-400" : "text-blue-400"}`}
                        >
                            {(task.status === "completed" || task.status === "paused") ? "" : taskStatus.day}
                        </span>
                        <span className="text-sm my-2">
                            Từ {formatDate(task.startDate)}
                        </span>
                        <span className="text-sm my-2">
                            Đến {formatDate(task.endDate)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <div className="flex flex-row items-end justify-between">
                    <div className="flex flex-row items-center">
                        <span className="font-bold">Tệp đính kèm</span>

                    </div>
                    <label
                        htmlFor="file-upload-button"
                        className="bg-blue-400 hover:bg-blue-500 text-white text-sm py-1 px-3 rounded-lg cursor-pointer"
                    >
                        Tải lên tệp
                    </label>
                    <input
                        id="file-upload-button"
                        className="hidden w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-blue-400 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        onChange={handleFileUpload}
                        multiple
                    ></input>
                </div>
                {task.files && task.files.length > 0 && (
                    <div className="flex flex-col space-y-1 mt-4">
                        {task.files.map((file, index) => (
                            <div key={file._id} className="flex flex-row items-center justify-between">
                                <div className="flex flex-col mx-2">
                                    <div className="flex flex-row items-center">
                                        <div className="mr-2 text-sm text-gray-800 hover:text-gray-900 font-semibold">
                                            {file.name.slice(0, file.name.lastIndexOf('.'))}
                                        </div>
                                        {getFileTag(file.name)}
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        {formatDate(file.createdAt)}
                                    </span>
                                </div>
                                <div className="flex flex-row">
                                    <a href={file.url} download={file.name}>
                                        <MdOutlineFileDownload className="w-5 h-5" />
                                    </a>
                                    {file.user.toString() === user._id && <MdOutlineDeleteOutline
                                        className="text-red-400 cursor-pointer hover:text-red-500 w-5 h-5"
                                        onClick={() => onDeleteFile(file._id)}
                                    />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <span className="mt-8 mb-2 font-bold">
                    Thảo luận mới nhất
                </span>
                <div className="flex flex-row items-center">
                    <textarea
                        id="message"
                        rows="4"
                        className="mr-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Viết bình luận..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <IoSendSharp
                        className="text-blue-400 hover:text-blue-500 hover:cursor-pointer"
                        onClick={handleAddComment}
                    />
                </div>
                {task.comments && task.comments.length > 0 && (
                    task.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} onDeleteComment={() => onDeleteComment(comment._id)} />
                    ))
                )}

            </div>
        </div>
    );
};

export default MainInformation;
