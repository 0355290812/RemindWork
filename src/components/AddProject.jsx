import React, { useState } from 'react';
import { Datepicker } from "flowbite-react";

const AddProject = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (startDate && endDate && new Date(startDate).getTime() >= new Date(endDate).getTime()) {
            alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
            return;
        }

        const formattedStartDate = startDate ? new Date(startDate).toISOString() : '';
        const formattedEndDate = endDate ? new Date(endDate).toISOString() : '';

        const projectData = {
            title,
            description,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        };

        onClose();
        onSubmit(projectData);

    };

    const customTheme = {
        "root": {
            "base": "relative"
        },
        "popup": {
            "root": {
                "base": "absolute bottom-12 z-50 block pt-2",
                "inline": "relative top-0 z-auto",
                "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-500",
            },
            "header": {
                "base": "",
                "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                "selectors": {
                    "base": "mb-2 flex justify-between",
                    "button": {
                        "base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400",
                        "prev": "",
                        "next": "",
                        "view": ""
                    }
                }
            },
            "view": {
                "base": "p-1"
            },
            "footer": {
                "base": "mt-2 flex space-x-2",
                "button": {
                    "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-blue-300",
                    "today": "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-cyan-500",
                    "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-400 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                }
            }
        },
        "views": {
            "days": {
                "header": {
                    "base": "mb-1 grid grid-cols-7",
                    "title": "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
                },
                "items": {
                    "base": "grid w-64 grid-cols-7",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-400",
                        "selected": "bg-blue-500 text-white hover:bg-blue-400",
                        "disabled": "text-gray-500"
                    }
                }
            },
            "months": {
                "items": {
                    "base": "grid w-64 grid-cols-4",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-400",
                        "selected": "bg-blue-500 text-white hover:bg-blue-400",
                        "disabled": "text-gray-500"
                    }
                }
            },
            "years": {
                "items": {
                    "base": "grid w-64 grid-cols-4",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-400",
                        "selected": "bg-blue-500 text-white hover:bg-blue-400",
                        "disabled": "text-gray-500"
                    }
                }
            },
            "decades": {
                "items": {
                    "base": "grid w-64 grid-cols-4",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-400",
                        "selected": "bg-blue-500 text-white hover:bg-blue-400",
                        "disabled": "text-gray-500"
                    }
                }
            }
        }
    }


    return (
        <div className="fixed -right-full left-full top-32 z-50 flex items-center justify-center overflow-y-auto bg-opacity-50">
            <div className="bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-500 w-full max-w-md p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tạo Dự Án Mới</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:bg-gray-200 p-2 rounded-full">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                        <input
                            type="text"
                            className="block w-full p-2.5 border rounded-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                        <textarea
                            className="block w-full p-2.5 border rounded-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả dự án"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="relative w-full mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu</label>
                        <Datepicker
                            theme={customTheme}
                            value={startDate}
                            onChange={date => {
                                if (endDate && new Date(date).getTime() >= new Date(endDate).getTime()) {
                                    const newEndDate = new Date(date);
                                    newEndDate.setDate(newEndDate.getDate() + 1);
                                    setEndDate(newEndDate);
                                    setStartDate(date);
                                }
                                setStartDate(date);
                            }}
                            placeholder="Chọn ngày bắt đầu"
                            required
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div className="relative w-full mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc</label>
                        <Datepicker
                            theme={customTheme}
                            value={endDate}
                            onChange={date => {
                                if (startDate && new Date(date).getTime() <= new Date(startDate).getTime()) {
                                    const newStartDate = new Date(date);
                                    newStartDate.setDate(newStartDate.getDate() - 1);
                                    setStartDate(newStartDate);
                                    setEndDate(date);
                                }
                                setEndDate(date);
                            }}
                            placeholder="Chọn ngày kết thúc"
                            required
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-400 text-white rounded-lg p-2.5 mt-3">
                        Tạo dự án
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
