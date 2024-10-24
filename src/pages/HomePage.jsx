import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import WorkUpdate from '../components/WorkUpdate';
import Statistics from '../components/Statistics';
import { getProjects } from '../api/project';
import { getTasksFromProject } from '../api/task';
import AddButton from '../components/AddButton';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { getInformation } from '../api/user';
import AddTask from '../components/AddTask';
import AddProject from '../components/AddProject';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({ title: 'Tất cả', value: '' });
    const [role, setRole] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const { user, setUser } = useAuth();

    useEffect(() => {
        const fetchUserInformation = async () => {
            const information = await getInformation();
            setUser({
                _id: information._id,
                email: information.email,
                name: information.name,
                avatar: information.avatar,
            });
        };

        if (!user) {
            fetchUserInformation();
        }
    }, [user, setUser]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const projectsRes = await getProjects();
                setProjects(projectsRes);

                if (projectsRes.length > 0) {
                    setSelectedProject(projectsRes[0]);
                }
            } catch (error) {
                console.log('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!selectedProject) return;

            try {
                setIsLoading(true);
                const tasksRes = await getTasksFromProject(selectedProject._id);
                setRole(selectedProject.members.find(member => member.user._id === user._id).role);
                setTasks(tasksRes);
                setFilteredTasks(tasksRes);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching tasks:', error);
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [selectedProject]);

    useEffect(() => {
        const filtered = tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = selectedStatus.value ? task.status === selectedStatus.value : true;
            const matchesImportant = isImportant ? task.isImportant : true;
            return matchesSearch && matchesStatus && matchesImportant;
        });
        setFilteredTasks(filtered);
    }, [searchQuery, selectedStatus, tasks, isImportant]);

    return (
        <div className="relative">
            <NavBar />

            <div className="flex pt-20">
                <Sidebar />
                {isLoading ? <div className="ml-64 flex-grow flex"> <Loading /> </div>
                    : <div className="ml-64 flex-grow flex">
                        <div className="flex-grow">
                            <WorkUpdate
                                tasks={filteredTasks}
                                projects={projects}
                                onSelectProject={setSelectedProject}
                                selectedProject={selectedProject}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                                setIsImportant={setIsImportant}
                                isImportant={isImportant}
                                role={role}
                            />
                        </div>
                        <div className="ml-4 mr-4">
                            <Statistics tasks={tasks} />
                        </div>
                        {role !== 'employee' && <AddButton onClick={() => setIsAdding(true)} />}
                        {isAdding && <AddTask onClose={() => setIsAdding(false)} projectId={selectedProject._id} onSubmit={() => { setSelectedProject({ ...selectedProject }) }} />}
                    </div>
                }
            </div>
        </div>
    );
};

export default HomePage;
