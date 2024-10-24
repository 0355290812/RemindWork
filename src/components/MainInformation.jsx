import React, { useState } from "react";
import moment from "moment";
import formatDate from "../utils/formatDate";
import { IoSendSharp } from "react-icons/io5";
import Comment from "./Comment";

const MainInformation = ({ task, onDeleteComment, onAddComment }) => {
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment({ comment: newComment });
            setNewComment("");
        }
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
            <div className="flex flex-col">
                <span className="mt-8 mb-2">
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
