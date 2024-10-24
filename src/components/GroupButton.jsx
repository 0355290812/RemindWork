import React, { useState } from 'react';
import { MdOutlineExpandLess } from "react-icons/md";
import { IoPlayOutline, IoPlayForwardCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlinePauseCircle, MdOutlineModeEdit, MdOutlineRestartAlt } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircle } from "react-icons/pi";

const GroupButton = ({ taskStatus, role, onAction, onUpdate, onDelete, setTitleModal, setContentModal, setPendingAction, setLabelButton, setIsOpenModal }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleClick = () => {
        if (taskStatus === 'pending') {
            setTitleModal('Xác nhận thực hiện công việc');
            setContentModal('Công việc sẽ chuyển trạng thái sang đang thực hiện');
            setLabelButton('Thực hiện');
            setPendingAction(() => () => onAction('in-progress'));
            setIsOpenModal(true);
        } else if (taskStatus === 'in-progress') {
            if (role === 'employee') {
                setTitleModal('Xác nhận hoàn thành');
                setContentModal('Công việc chuyển trạng thái chờ duyệt (Người tạo việc sẽ kiểm tra lại để xác nhận hoàn thành)');
                setLabelButton('Báo hoàn thành');
                setPendingAction(() => () => onAction('waiting-for-approval'));
                setIsOpenModal(true);
            } else {
                setPendingAction(() => () => onAction('completed'));
                setTitleModal('Xác nhận hoàn thành');
                setContentModal('Công việc sẽ chuyển sang trạng thái hoàn thành');
                setLabelButton('Hoàn thành');
                setIsOpenModal(true);
            }
        } else if (taskStatus === 'waiting-for-approval' && role !== 'employee') {
            setPendingAction(() => () => onAction('completed'));
            setTitleModal('Xác nhận hoàn thành');
            setContentModal('Công việc sẽ chuyển sang trạng thái hoàn thành');
            setLabelButton('Hoàn thành');
            setIsOpenModal(true);
        } else if (taskStatus === 'completed' && role !== 'employee') {
            setPendingAction(() => () => onAction('in-progress'));
            setTitleModal('Xác nhận làm lại');
            setContentModal('Công việc sẽ trở lại trạng thái đang thực hiện');
            setLabelButton('Thực hiện');
            setIsOpenModal(true);
        } else if (taskStatus === 'paused') {
            setPendingAction(() => () => onAction('in-progress'));
            setTitleModal('Xác nhận tiếp tục');
            setContentModal('Công việc sẽ chuyển trạng thái đang thực hiện');
            setLabelButton('Tiếp tục');
            setIsOpenModal(true);
        }
    };

    const handleClickUpdate = () => {
        setIsOpen(false);
        onUpdate();
    };

    const handleClickDelete = () => {
        setIsOpen(false);
        onDelete();
        setTitleModal('Xác nhận xoá công việc');
        setContentModal('Bạn có chắc chắn muốn xoá công việc này?');
        setLabelButton('Xoá công việc');
        setIsOpenModal(true);
    };

    const renderButtonLabel = () => {
        if (taskStatus === 'pending') {
            return { label: 'Thực hiện', colorButton: 'bg-pink-400 hover:bg-pink-500', icon: <IoPlayOutline className="w-5 h-5 mr-2" /> };
        }
        if (taskStatus === 'in-progress') {
            return { label: 'Hoàn thành', colorButton: 'bg-green-400 hover:bg-green-500', icon: <FaRegCircleCheck className="w-5 h-5 mr-2" /> };
        }
        if (taskStatus === 'waiting-for-approval') {
            return role === 'employee' ? { label: 'Đang đợi duyệt', colorButton: 'bg-cyan-400 hover:bg-cyan-500', icon: <PiWarningCircle className="w-5 h-5 mr-2" /> } : { label: 'Duyệt hoàn thành', colorButton: 'bg-pink-400 hover:bg-pink-500', icon: <IoMdCheckmarkCircleOutline className="w-5 h-5 mr-2" /> };
        }
        if (taskStatus === 'completed') {
            return role === 'employee' ? { label: 'Công việc đã hoàn thành', colorButton: 'bg-green-400 hover:bg-green-500', icon: <FaRegCircleCheck className="w-5 h-5 mr-2" /> } : { label: 'Làm lại', colorButton: 'bg-green-400 hover:bg-green-500', icon: <MdOutlineRestartAlt className="w-5 h-5 mr-2" /> };
        }
        if (taskStatus === 'paused') {
            return role === 'employee' ? { label: 'Công việc đang tạm dừng', colorButton: 'bg-yellow-400 hover:bg-yellow-500', icon: <MdOutlinePauseCircle className="w-5 h-5 mr-2" /> } : { label: 'Tiếp tục công việc', colorButton: 'bg-yellow-400 hover:bg-yellow-500', icon: <IoPlayForwardCircleOutline className="w-5 h-5 mr-2" /> };
        }
        return {};
    };

    const { label, colorButton, icon } = renderButtonLabel();

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-row relative">
                <button
                    className={`flex flex-row text-sm px-5 py-2.5 w-fit text-white font-bold rounded-lg shadow-lg ${colorButton}`}
                    onClick={handleClick}
                    disabled={(taskStatus === 'paused' || taskStatus === 'completed' || taskStatus === 'waiting-for-approval') && role === 'employee'}
                >
                    {icon}
                    {label}
                </button>

                {role !== 'employee' && (
                    <div className="relative inline-block text-left ml-2">
                        <button
                            id="dropdownDefaultButton"
                            onClick={toggleDropdown}
                            className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm font-bold px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600"
                            type="button"
                        >
                            Thêm nữa
                            <MdOutlineExpandLess className="w-5 h-5 ml-2" />
                        </button>

                        {/* Dropdown menu */}
                        {isOpen && (
                            <div
                                id="dropdown"
                                className="absolute bottom-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    {taskStatus === "pending" && role !== "employee" && (
                                        <li>
                                            <div
                                                className="flex flex-row px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => {
                                                    setTitleModal('Xác nhận hoàn thành');
                                                    setContentModal('Công việc sẽ chuyển sang trạng thái hoàn thành');
                                                    setLabelButton('Hoàn thành');
                                                    setPendingAction(() => () => onAction('completed'));
                                                    setIsOpen(false);
                                                    setIsOpenModal(true);
                                                }}
                                            >
                                                <IoMdCheckmarkCircleOutline className="w-5 h-5 mr-2" />
                                                Hoàn thành
                                            </div>
                                        </li>
                                    )}
                                    {taskStatus === "waiting-for-approval" && (
                                        <li>
                                            <div
                                                className="flex flex-row px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => {
                                                    setTitleModal('Xác nhận yêu cầu làm lại');
                                                    setContentModal('Công việc sẽ trở lại trạng thái đang thực hiện');
                                                    setPendingAction(() => () => onAction('in-progress'));
                                                    setLabelButton('Thực hiện');
                                                    setIsOpen(false);
                                                    setIsOpenModal(true);
                                                }}
                                            >
                                                <MdOutlineRestartAlt className="w-5 h-5 mr-2" /> Yêu cầu làm lại
                                            </div>
                                        </li>
                                    )}
                                    {taskStatus !== "completed" && taskStatus !== "paused" && (
                                        <li>
                                            <div
                                                className="flex flex-row px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => {
                                                    setTitleModal('Xác nhận tạm dừng');
                                                    setContentModal('Công việc sẽ được tạm dừng');
                                                    setPendingAction(() => () => onAction('paused'));
                                                    setLabelButton('Tạm dừng');
                                                    setIsOpen(false);
                                                    setIsOpenModal(true);
                                                }}
                                            >
                                                <MdOutlinePauseCircle className="w-5 h-5 mr-2" />
                                                Tạm dừng
                                            </div>
                                        </li>
                                    )}
                                    {taskStatus !== "completed" && (
                                        <li>
                                            <div
                                                className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={handleClickUpdate}
                                            >
                                                <MdOutlineModeEdit className="w-5 h-5 mr-2" />
                                                Sửa
                                            </div>
                                        </li>
                                    )}
                                    <li>
                                        <div
                                            className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={handleClickDelete}
                                        >
                                            <TiDeleteOutline className="w-5 h-5 mr-2" />
                                            Xoá
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupButton;
