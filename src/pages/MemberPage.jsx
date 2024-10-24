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
import MembersManage from "../components/MembersManage";

const MemberPage = () => {
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState([]);
    const [isOpenAddUsersToProjectModal, setIsOpenAddUsersToProjectModal] = useState(false);
    const [role, setRole] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        try {
            setIsLoading(true);
            const fetchProject = async () => {
                const projectRes = await getProject(projectId);
                setProject(projectRes);
                setRole(projectRes.members.find(member => member.user._id === user._id).role);
                setIsLoading(false);
            };

            fetchProject();
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
                        <MembersManage project={project} setProject={setProject} />
                        {role === 'admin' ?? <AddButton onClick={() => setIsOpenAddUsersToProjectModal(true)} />}
                        {isOpenAddUsersToProjectModal && <AddUserToProjectModal isOpen={true} project={project} onClose={() => setIsOpenAddUsersToProjectModal(false)} />}
                    </div>
                }
            </div>
        </div >
    );
}

export default MemberPage;