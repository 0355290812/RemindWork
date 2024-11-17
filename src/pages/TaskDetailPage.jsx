import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import { getTask } from '../api/task';
import { getProject } from '../api/project';
import TaskDetail from '../components/TaskDetail';
import Loading from '../components/Loading';
import InformationTask from '../components/InformationTask';
import GroupButton from '../components/GroupButton';
import { _updateStatusTask, _deleteTask } from '../api/task';
import UpdateTaskModal from '../components/UpdateTaskModal';
import ConfirmModal from '../components/ConfirmModal';
import AddUserToTaskModal from '../components/AddUserToTaskModal';
import { useAuth } from '../context/AuthContext';
import SpeedDial from '../components/SpeedDial';

const TaskDetailPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenUpdateTask, setIsOpenUpdateTask] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [titleConfirm, setTitleConfirm] = useState('');
    const [contentConfirm, setContentConfirm] = useState('');
    const [labelButton, setLabelButton] = useState('');
    const [actionConfirm, setActionConfirm] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [isOpenAddUserToTaskModal, setIsOpenAddUserToTaskModal] = useState(false);
    const [project, setProject] = useState({});
    const [role, setRole] = useState('');
    const { user } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const onTaskChange = (task) => {
        const newTask = { ...task };

        setTask(newTask);
    }

    const onDelete = async () => {
        try {
            await _deleteTask(id);
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTask(id);
                const project = await getProject(response.project._id);
                const role = project?.members?.find(member => member?.user?._id === user?._id)?.role;
                setRole(role);
                setTask(response);
                setProject(response.project);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTask();
    }, [id]);

    return (
        <div className="relative">
            <NavBar />
            <div className="flex pt-20 h-screen">
                <Sidebar />
                <div className="ml-64 flex-grow flex h-screen">
                    {!isLoading ? (
                        <>
                            <TaskDetail task={task} onTaskChange={onTaskChange} onOpenAddMemberToTaskModal={() => setIsOpenAddUserToTaskModal(true)} role={role} />
                            <InformationTask task={task} onTaskChange={onTaskChange} />
                            <GroupButton
                                role={role}
                                taskStatus={task?.status}
                                onUpdate={() => setIsOpenUpdateTask(true)}
                                onDelete={() => setIsDelete(true)}
                                onAction={(status) => _updateStatusTask(task._id, { status }).then(onTaskChange({ ...task, status }))}
                                setContentModal={setContentConfirm}
                                setTitleModal={setTitleConfirm}
                                setLabelButton={setLabelButton}
                                setIsOpenModal={setIsOpenConfirm}
                                setPendingAction={setActionConfirm}
                                setIsDelete={setIsDelete}
                            />
                            <UpdateTaskModal
                                isOpen={isOpenUpdateTask}
                                onClose={() => setIsOpenUpdateTask(false)}
                                task={task}
                                onTaskChange={onTaskChange}
                            />
                            {isOpenConfirm && (
                                <ConfirmModal
                                    title={titleConfirm}
                                    content={contentConfirm}
                                    isDelete={isDelete}
                                    onConfirm={isDelete ? onDelete : actionConfirm}
                                    onClose={() => {
                                        setIsOpenConfirm(false)
                                        setIsDelete(false)
                                    }}
                                    labelButton={labelButton}
                                />
                            )}
                            {isOpenAddUserToTaskModal && (
                                <AddUserToTaskModal
                                    isOpen={isOpenAddUserToTaskModal}
                                    onClose={() => setIsOpenAddUserToTaskModal(false)}
                                    task={task}
                                    project={project}
                                    onTaskChange={onTaskChange}
                                />
                            )}

                        </>
                    ) : <Loading />}

                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
