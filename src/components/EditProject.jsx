import React, { useState } from 'react';
import { Datepicker } from "flowbite-react";

const EditProject = ({ onClose, project, onSubmit }) => {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [startDate, setStartDate] = useState(new Date(project.startDate));
    const [endDate, setEndDate] = useState(new Date(project.endDate));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (startDate && endDate && new Date(startDate).getTime() >= new Date(endDate).getTime()) {
            alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
            return;
        }

        try {
            await onSubmit({ title, description, startDate, endDate });
            alert("Dự án đã được cập nhật thành công!");
        } catch (error) {
            console.log('Error updating project:', error);
        }

        onClose();
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
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50">
            <div className="bg-white rounded-lg shadow dark:bg-gray-500 w-full max-w-md p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chỉnh Sửa Dự Án</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:bg-gray-200 p-2 rounded-full">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên dự án</label>
                        <input
                            type="text"
                            className="block w-full p-2.5 border rounded-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tên dự án"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                        <textarea
                            className="block w-full p-2.5 border rounded-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-end">
                        <div className="relative w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu</label>
                            <Datepicker
                                theme={customTheme}
                                value={startDate}
                                onChange={setStartDate}
                                placeholder="Chọn ngày bắt đầu"
                                required
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <span className="mx-4 text-gray-500 mb-2">đến</span>
                        <div className="relative w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc</label>
                            <Datepicker
                                theme={customTheme}
                                value={endDate}
                                onChange={(newEndDate) => {
                                    if (new Date(startDate).getTime() >= new Date(newEndDate).getTime()) {
                                        alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
                                        return;
                                    }
                                    if (new Date(newEndDate) < new Date()) {
                                        alert("Ngày kết thúc phải lớn hơn ngày hiện tại!");
                                        return;
                                    }
                                    setEndDate(newEndDate);
                                }}
                                placeholder="Chọn ngày kết thúc"
                                required
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-400 text-white rounded-lg p-2.5 mt-3" onClick={handleSubmit}>
                        Cập nhật dự án
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProject;
