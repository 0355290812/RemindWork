import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import AddButton from "../components/AddButton";
import Loading from "../components/Loading";
import { getProject, updateProject, leaveProject, deleteProject } from "../api/project";
import Project from "../components/Project";
import { getTasksFromProject } from "../api/task";
import AddUserToProjectModal from "../components/AddUserToProjectModal";
import { useAuth } from "../context/AuthContext";
import SpeedDial from "../components/SpeedDial";
import EditProject from "../components/EditProject";
import ConfirmModal from "../components/ConfirmModal";

const ProjectPage = () => {
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [isOpenAddUsersToProjectModal, setIsOpenAddUsersToProjectModal] = useState(false);
    const [isOpenEditProjectModal, setIsOpenEditProjectModal] = useState(false);
    const [isOpenDeleteProjectModal, setIsOpenDeleteProjectModal] = useState(false);
    const [isOpenLeaveProjectModal, setIsOpenLeaveProjectModal] = useState(false);
    const [role, setRole] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectAndTasks = async () => {
            try {
                setIsLoading(true);

                const [projectRes, tasksRes] = await Promise.all([
                    getProject(projectId),
                    getTasksFromProject(projectId),
                ]);

                setProject(projectRes);
                setTasks(tasksRes);

                if (projectRes?.members && user?._id) {
                    const userRole = projectRes.members.find(
                        (member) => member?.user?._id === user._id
                    )?.role;
                    setRole(userRole || null);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProjectAndTasks();
        }
    }, [projectId, user?._id]);

    return (
        <div className="relative">
            <NavBar />

            <div className="flex pt-20">
                <Sidebar />

                {isLoading ? <div className="ml-64 flex-grow flex"> <Loading /> </div>
                    : <div className="ml-64 flex-grow flex">
                        <Project project={project} tasks={tasks} />
                        {isOpenAddUsersToProjectModal && <AddUserToProjectModal isOpen={true} project={project} onClose={() => setIsOpenAddUsersToProjectModal(false)} />}
                        {isOpenEditProjectModal &&
                            <EditProject
                                onClose={() => setIsOpenEditProjectModal(false)}
                                project={project}
                                onSubmit={async (data) => {
                                    await updateProject(project._id, data)
                                    const newProject = { ...project, ...data }
                                    setProject(newProject);
                                }
                                }
                            />
                        }
                        {isOpenDeleteProjectModal && <ConfirmModal
                            title="Xác nhận xóa dự án"
                            content="Bạn có chắc chắn muốn xóa dự án này không? Tất cả các công việc và thành viên trong dự án cũng sẽ bị xóa."
                            labelButton={"Xóa dự án"}
                            onClose={() => setIsOpenDeleteProjectModal(false)}
                            onConfirm={async () => {
                                try {
                                    const response = await deleteProject(project._id);
                                    console.log(response);

                                    if (response.status === 400) {
                                        alert(response.data.message || "Đã xảy ra lỗi khi xóa dự án");
                                    } else {
                                        alert("Xoá dự án thành công");
                                    }

                                    navigate("/home");
                                } catch (error) {
                                    console.error("Error deleting project:", error);
                                    alert("Đã xảy ra lỗi không mong muốn 2");
                                }
                            }}
                            isDelete={true}
                        />}

                        {isOpenLeaveProjectModal && <ConfirmModal
                            title="Xác nhận rời dự án"
                            content="Bạn có chắc chắn muốn rời dự án này không? Bạn sẽ không thể truy cập vào dự án sau khi rời."
                            labelButton={"Rời dự án"}
                            onClose={() => setIsOpenLeaveProjectModal(false)}
                            onConfirm={async () => {
                                try {
                                    const response = await leaveProject(project._id);

                                    if (response.status === 400) {
                                        alert(response.data.message || "Đã xảy ra lỗi khi rời dự án");
                                    } else {
                                        alert("Đã rời dự án thành công");
                                    }

                                    navigate("/home");
                                } catch (error) {
                                    console.error("Error deleting project:", error);
                                    alert("Đã xảy ra lỗi không mong muốn 2");
                                }
                            }}
                            isDelete={true}
                        />}

                        <SpeedDial
                            role={role}
                            onAdd={() => setIsOpenAddUsersToProjectModal(true)}
                            onEdit={() => { setIsOpenEditProjectModal(true) }}
                            onRemove={() => { setIsOpenDeleteProjectModal(true) }}
                            onLeft={() => { setIsOpenLeaveProjectModal(true) }}
                        />
                    </div>
                }
            </div>
        </div >
    );
}

export default ProjectPage;