import React, { useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

const LogList = ({ logs }) => {
    const [visibleLogs, setVisibleLogs] = useState(5);

    const handleExpand = () => {
        setVisibleLogs((prev) => prev + 5);
    };

    const handleExpandLess = () => {
        setVisibleLogs((prev) => Math.max(prev - 5, 5)); // Giới hạn không cho nhỏ hơn 5
    };

    return (
        <div className="flex flex-col items-center">
            <ol className="relative border-s border-gray-200 dark:border-gray-700 w-full">
                {logs.slice(0, visibleLogs).map((log, index) => (
                    <li key={index} className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {new Date(log.timestamps).toLocaleString()}
                        </time>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {log.user.name}
                        </h3>
                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                            {log.action}
                        </p>
                    </li>
                ))}
            </ol>
            <div className="flex flex-row space-x-2">
                <MdOutlineExpandMore
                    onClick={() => {
                        if (logs.length <= visibleLogs) {
                            return;
                        }
                        handleExpand();
                    }
                    }
                    className={`w-6 h-6 text-gray-500 cursor-pointer rounded-full border-2 border-blue-400 ${logs.length <= visibleLogs ? 'opacity-50 cursor-default' : ''}`}
                />
                <MdOutlineExpandLess
                    onClick={() => {
                        if (logs.length <= 5) {
                            return;
                        }
                        handleExpandLess();
                    }
                    }
                    className={`w-6 h-6 text-gray-500 cursor-pointer rounded-full border-2 border-blue-400 ${visibleLogs <= 5 ? 'opacity-50 cursor-default' : ''}`}
                />
            </div>
        </div>
    );
};

export default LogList;
