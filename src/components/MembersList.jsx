import React, { useState, useEffect } from "react";
import { format, subDays, startOfMonth, endOfMonth, subMonths, set } from 'date-fns';

const MembersList = ({ project, tasks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date(project.startDate));
    const [endDate, setEndDate] = useState(new Date(project.endDate));
    const [selectedTime, setSelectedTime] = useState('');
    const [employees, setEmployees] = useState([]);

    const handleSelectDateRange = (range) => {
        let start, end;
        const today = new Date();

        switch (range) {
            case '7days':
                start = subDays(today, 7);
                end = today;
                setSelectedTime('7 ngày gần đây');
                break;
            case '30days':
                start = subDays(today, 30);
                end = today;
                setSelectedTime('30 ngày gần đây');
                break;
            case 'thisMonth':
                start = startOfMonth(today);
                end = endOfMonth(today);
                setSelectedTime(`Tháng ${format(startOfMonth(today), 'MM/yyyy')}`);
                break;
            case 'lastMonth':
                start = startOfMonth(subMonths(today, 1));
                end = endOfMonth(subMonths(today, 1));
                setSelectedTime(`Tháng ${format(startOfMonth(subMonths(today, 1)), 'MM/yyyy')}`);
                break;
            case 'twoMonthsAgo':
                start = startOfMonth(subMonths(today, 2));
                end = endOfMonth(subMonths(today, 2));
                setSelectedTime(`Tháng ${format(startOfMonth(subMonths(today, 2)), 'MM/yyyy')}`);
                break;
            default:
                break;
        }

        setStartDate(start);
        setEndDate(end);
        setIsOpen(false);

    };

    useEffect(() => {
        try {
            const acceptedMembers = project.members.filter(member => member.status === 'accepted');

            const newEmployees = acceptedMembers.reduce((result, member) => {
                const memberTasks = tasks.flatMap(task =>
                    task.assigness.filter(assignee => assignee.user._id === member.user._id)
                );

                const filteredTasks = memberTasks.filter(task => {
                    return !(new Date(task.endDate) <= new Date(startDate) || new Date(task.startDate) >= new Date(endDate));
                });

                const totalCompleted = filteredTasks.reduce((count, assignee) => {
                    const completedSubTasks = assignee.subTasks.filter(subTask => {
                        return subTask.completed &&
                            ((new Date(subTask.createdAt) >= new Date(startDate) && new Date(subTask.createdAt) <= new Date(endDate))
                                ||
                                (subTask.dueDate === null)
                                ||
                                (new Date(subTask.dueDate) >= new Date(startDate) && new Date(subTask.dueDate) <= new Date(endDate)));
                    });
                    return count + completedSubTasks.length;
                }, 0);

                const totalCompletedOnTime = filteredTasks.reduce((count, assignee) => {
                    const onTimeSubTasks = assignee.subTasks.filter(subTask => {
                        return (
                            (new Date(subTask.toggleAt) <= new Date(subTask.dueDate) || subTask.dueDate === null)
                            &&
                            ((new Date(subTask.createdAt) >= new Date(startDate) && new Date(subTask.createdAt) <= new Date(endDate))
                                ||
                                (subTask.dueDate === null)
                                ||
                                (new Date(subTask.dueDate) >= new Date(startDate) && new Date(subTask.dueDate) <= new Date(endDate))));
                    });
                    return count + onTimeSubTasks.length;
                }, 0);

                const totalSubTasks = filteredTasks.reduce((count, assignee) => {
                    return count + assignee.subTasks.length;
                }, 0);

                const newMember = {
                    name: member.user.name,
                    avatar: member.user.avatar,
                    completionRate: totalSubTasks > 0 ? Math.trunc(totalCompleted / totalSubTasks * 100) : 0,
                    role: member.role === 'admin' ? 'Trưởng dự án' : member.role === 'teamlead' ? 'Trưởng nhóm' : 'Nhân viên',
                    countTasks: totalSubTasks,
                    effience: totalSubTasks > 0 ? Math.trunc(totalCompletedOnTime / totalSubTasks * 100) : 0
                }
                result.push(newMember);
                return result;
            }, []);
            setEmployees(newEmployees);
        } catch (error) {
            console.log('Error fetching employees:', error);
        }
    }, [startDate, endDate, project.members, tasks]);

    return (
        <div className="flex flex-col bg-base p-3 space-y-3 ml-2 w-full xl:w-8/12 xxl:w-9/12 mr-4">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Danh sách nhân viên</h2>
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    >
                        {selectedTime || 'Chọn khoảng thời gian'}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <button onClick={() => handleSelectDateRange('7days')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        7 ngày gần đây
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleSelectDateRange('30days')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        30 ngày gần đây
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleSelectDateRange('thisMonth')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Tháng {format(startOfMonth(subMonths(new Date(), 0)), 'MM/yyyy')}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleSelectDateRange('lastMonth')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Tháng {format(startOfMonth(subMonths(new Date(), 1)), 'MM/yyyy')}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleSelectDateRange('twoMonthsAgo')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Tháng {format(startOfMonth(subMonths(new Date(), 2)), 'MM/yyyy')}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Ảnh đại diện
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Chức vụ
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Công việc
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Hoàn thành
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Hiệu suất
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr
                                key={employee.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4 text-center">{index + 1}</td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {employee.name}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={employee.avatar}
                                            alt={`Avatar of ${employee.name}`}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {employee.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400" >
                                        {employee.countTasks}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="radial-progress" style={{ "--value": employee.completionRate, "--size": "3rem", "--thickness": "5px" }} role="progressbar">
                                        {employee.completionRate}%
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="radial-progress" style={{ "--value": employee.effience, "--size": "3rem", "--thickness": "5px" }} role="progressbar">
                                        {employee.effience}%
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MembersList;