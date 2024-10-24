import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const mapStatusToColorAndLabel = (status) => {
    switch (status) {
        case 'pending':
            return { color: 'rgba(239, 68, 68, 0.5)', label: 'Đang chờ' };
        case 'in-progress':
            return { color: 'rgba(37, 99, 235, 0.5)', label: 'Đang thực hiện' };
        case 'completed':
            return { color: 'rgba(34, 197, 94, 0.5)', label: 'Đã hoàn thành' };
        case 'paused':
            return { color: 'rgba(251, 191, 36, 0.5)', label: 'Tạm dừng' };
        case 'waiting-for-approval':
            return { color: 'rgba(167, 139, 250, 0.5)', label: 'Chờ phê duyệt' };
        default:
            return { color: 'rgba(156, 163, 175, 0.5)', label: 'Không xác định' };
    }
};

const getChartData = (response) => {
    const allStatuses = [
        'pending',
        'in-progress',
        'completed',
        'paused',
        'waiting-for-approval',
    ];

    const statusCount = response.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    const labels = allStatuses.map(status => mapStatusToColorAndLabel(status).label);
    const data = allStatuses.map(status => statusCount[status] || 0);
    const backgroundColor = allStatuses.map(status => mapStatusToColorAndLabel(status).color);

    return {
        labels: labels,
        datasets: [
            {
                label: 'Số lượng',
                data: data,
                backgroundColor: backgroundColor,
            },
        ],
    };
};


const Statistics = ({ tasks }) => {
    const data = getChartData(tasks);

    const totalTasks = data.datasets[0].data.reduce((a, b) => a + b, 0);
    const completedTasks = data.datasets[0].data[data.labels.indexOf('Đã hoàn thành')] || 0;
    const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Báo cáo công việc</h2>
            <Pie data={data} />
            <div className="mt-4 w-full max-w-md">
                <label className="label py-0">
                    <span className="label-text">Tỉ lệ hoàn thành </span>
                    <span className="label-text">{Math.trunc(completionRate)}%</span>
                </label>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                    <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
