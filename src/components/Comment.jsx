import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Comment = ({ comment, onDeleteComment }) => {
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const commentTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now - commentTime) / 1000);

        const MINUTE = 60;
        const HOUR = MINUTE * 60;
        const DAY = HOUR * 24;
        const MONTH = DAY * 30;
        const YEAR = DAY * 365;

        if (diffInSeconds < MINUTE) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < HOUR) {
            const minutes = Math.floor(diffInSeconds / MINUTE);
            return `${minutes} phút trước`;
        } else if (diffInSeconds < DAY) {
            const hours = Math.floor(diffInSeconds / HOUR);
            return `${hours} giờ trước`;
        } else if (diffInSeconds < MONTH) {
            const days = Math.floor(diffInSeconds / DAY);
            return `${days} ngày trước`;
        } else if (diffInSeconds < YEAR) {
            const months = Math.floor(diffInSeconds / MONTH);
            return `${months} tháng trước`;
        } else {
            const years = Math.floor(diffInSeconds / YEAR);
            return `${years} năm trước`;
        }
    };
    return (
        <div className="flex flex-row mt-4 items-center">
            <img className="w-10 h-10 rounded-full" src={comment.user.avatar} alt="Rounded avatar"></img>
            <div className="flex flex-col ml-2 bg-gray-100 rounded-lg p-2">
                <div className="flex flex-row items-center">
                    <span className="font-semibold">{comment.user.name}</span>
                    <span className="text-black-400 text-xs ml-2">{getTimeAgo(comment.timestamps)}</span>
                </div>
                <p className="text-sm">{comment.comment}</p>
            </div>
            <AiOutlineDelete
                className="text-red-400 cursor-pointer ml-2 text-xl"
                onClick={onDeleteComment}
            />
        </div>
    );
}

export default Comment;