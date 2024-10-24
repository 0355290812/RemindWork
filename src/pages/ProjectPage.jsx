import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import AddButton from "../components/AddButton";
import Loading from "../components/Loading";
import { getProject } from "../api/project";
import Project from "../components/Project";
import { getTasksFromProject } from "../api/task";
import AddUserToProjectModal from "../components/AddUserToProjectModal";
import { useAuth } from "../context/AuthContext";

const ProjectPage = () => {
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isOpenAddUsersToProjectModal, setIsOpenAddUsersToProjectModal] = useState(false);
    const [role, setRole] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        try {
            setIsLoading(true);
            const fetchProjectAndTasks = async () => {
                const [projectRes, tasks] = await Promise.all([
                    getProject(projectId),
                    getTasksFromProject(projectId)
                ]);
                console.log(projectRes);
                console.log(tasks);

                setProject(projectRes);
                setTasks(tasks);
                setRole(projectRes.members.find(member => member.user._id === user._id).role);
                setIsLoading(false);
            };

            fetchProjectAndTasks();
        } catch (error) {
            console.log('Error fetching projects:', error);
        }

    }, [projectId]);

    return (
        <div className="relative">
            <NavBar />

            <div className="flex pt-20">
                <Sidebar />

                {isLoading ? <div className="ml-64 flex-grow flex"> <Loading /> </div>
                    : <div className="ml-64 flex-grow flex">
                        <Project project={project} tasks={tasks} />
                        {role === 'admin' ? <AddButton onClick={() => setIsOpenAddUsersToProjectModal(true)} /> : null}
                        {isOpenAddUsersToProjectModal && <AddUserToProjectModal isOpen={true} project={project} onClose={() => setIsOpenAddUsersToProjectModal(false)} />}
                    </div>
                }
            </div>
        </div >
    );
}

export default ProjectPage;