import React, { useState } from "react";
import { TbCheckbox } from "react-icons/tb";
import SubTask from "./SubTask";
import SubTaskModal from "./SubTaskModal";
import { addSubTask, completedSubTask, updateInfSubTask, _deleteSubTask } from "../api/task";
import { useAuth } from "../context/AuthContext";

const Assigne = ({ assigne, taskId, onSubTaskChange, onDeleteSubTask, onDeleteAssignee }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editingSubTask, setEditingSubTask] = useState('');
    const { user } = useAuth();

    const updateSubTask = async (data) => {
        try {
            if (editingSubTask) {
                const subTaskIndex = assigne.subTasks.findIndex(st => st.id === editingSubTask.id);
                if (subTaskIndex !== -1) {
                    assigne.subTasks[subTaskIndex] = { ...assigne.subTasks[subTaskIndex], ...data };
                }
                onSubTaskChange(assigne.subTasks[subTaskIndex]);
                await updateInfSubTask(taskId, assigne.user._id, assigne.subTasks[subTaskIndex]._id, data);

            } else {
                const response = await addSubTask(taskId, assigne.user._id, data);
                const newAssigne = response.task.assigness.find(a => a.user._id === assigne.user._id);
                assigne = newAssigne;
                assigne.subTasks[assigne.subTasks.length - 1].toggleBy = { name: user.name };

                onSubTaskChange(assigne.subTasks[assigne.subTasks.length - 1]);
            }
        } catch (error) {
            console.log(error);
        }
        setEditingSubTask(null);
    };

    const onEditSubTask = (subTask) => {
        setEditingSubTask(subTask.title);
        setIsOpenModal(true);
    };

    const onCompletedSubTask = async (subTaskId) => {
        try {
            await completedSubTask(taskId, assigne.user._id, subTaskId);

            const subTaskIndex = assigne.subTasks.findIndex(st => st._id === subTaskId);
            assigne.subTasks[subTaskIndex].completed = !assigne.subTasks[subTaskIndex].completed;

            onSubTaskChange(assigne.subTasks[subTaskIndex]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteSubTask = async (subTaskId) => {
        try {
            await _deleteSubTask(taskId, assigne.user._id, subTaskId);
            const subTaskIndex = assigne.subTasks.findIndex(st => st._id === subTaskId);
            assigne.subTasks.splice(subTaskIndex, 1);
            onDeleteSubTask(assigne.subTasks);
        } catch (error) {
            console.log(error);
        }
    }

    const taskCompleted = assigne.subTasks.filter(subTask => subTask.completed).length;
    const taskTotal = assigne.subTasks.length;

    return (
        <div className="flex flex-col space-x-2 items-stretch w-full h-fit rounded-md">
            <div className="flex flex-row space-x-2 items-stretch w-full h-fit rounded-md justify-between">
                <div className="flex flex-row items-center justify-center">
                    <img className="rounded-full w-9" src={assigne.user.avatar.includes('http') ? assigne.user.avatar : `http://localhost:3001/${assigne.user.avatar}`} alt={assigne.user.name} />
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <span className="text-lg font-bold text-blue-500 ml-2 mr-2">{assigne.user.name}</span>
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{`${taskCompleted}/${taskTotal}`}</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <span className="text-xs font-bold ml-2 mr-2">{assigne.user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-end">
                    <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        onClick={() => setIsOpenModal(true)}
                    >
                        <span className="flex flex-row items-center justify-center relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            <TbCheckbox className="mr-2 hover:text-white" />
                            Thêm đầu việc
                        </span>
                    </button>
                    <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-300 rounded-lg group bg-gradient-to-br from-red-200 to-red-500 group-hover:from-red-500 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-cyan-800"
                        onClick={() => onDeleteAssignee(assigne.user._id)}
                    >
                        <span className="flex flex-row items-center justify-center relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            X
                        </span>
                    </button>
                </div>
            </div>
            {assigne.subTasks && assigne.subTasks.length > 0 && (
                assigne.subTasks
                    .sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1)
                    .map((subTask) => (
                        <SubTask
                            key={subTask._id}
                            subTask={subTask}
                            onCompleted={(subTaskId) => onCompletedSubTask(subTaskId)}
                            onEdit={(subTask) => onEditSubTask(subTask)}
                            user={assigne.user.name}
                            onDelete={(subTaskId) => deleteSubTask(subTaskId)}
                        />
                    ))
            )}
            <SubTaskModal
                isOpen={isOpenModal}
                onClose={() => {
                    setIsOpenModal(false)
                    setEditingSubTask('');
                }}
                onSubmit={(data) => updateSubTask(data)}
                initialData={editingSubTask}
            />
        </div>
    )
}

export default Assigne;