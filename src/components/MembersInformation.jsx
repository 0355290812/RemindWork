import React, { useState, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChooseRoleModal from "./ChooseRoleModal";
import Action from "./Action";
import { updateRoleMember, removeUserFromProject } from "../api/project";
import { useAuth } from "../context/AuthContext";


const MembersInformation = ({ project, setProject }) => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [userChoose, setUserChoose] = useState(null);
    const { user } = useAuth();

    const roleInProject = project?.members?.find(member => member.user._id === user._id).role;

    const onChangeRole = (user) => {
        setIsOpenModal(true);
        setUserChoose(user);
    }

    const onSubmit = (role) => {
        updateRoleMember(project._id, userChoose.user._id, { role: role })
            .then(res => {
                project.members.forEach(member => {
                    if (member.user._id === userChoose.user._id) {
                        member.role = role;
                    }
                }
                )
                setProject({ ...project });
            })
            .catch(err => {
                alert(err.message)
            })

    }

    const onDelete = (user) => {
        const res = removeUserFromProject(project._id, user._id)
            .then(res => {
                if (res.status === 200) {
                    project.members = project.members.filter(member => member.user._id !== user._id);
                    setProject({ ...project });
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                alert(err.message);
            })
    }

    return (
        <div className="flex flex-col bg-base p-3 space-y-3 ml-2 w-full">

            <button className="flex flex-row mb-4 items-center" onClick={() => navigate(`/projects/${project._id}`)}>
                <IoArrowBackCircleOutline className="text-3xl text-blue-400 mr-2" />
                <span className="text-lg ">Trở lại</span>
            </button>
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Danh sách nhân viên</h2>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Ảnh đại diện
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Chức vụ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                            {roleInProject === 'admin' && (
                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {project?.members?.map((member, index) => (
                            <tr
                                key={member.user._id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4 text-center">{index + 1}</td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {member.user.name}
                                </th>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {member.user.email}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={member.user.avatar}
                                            alt={`Avatar of ${member.user.name}`}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {member.role === 'admin' ? 'Trưởng dự án' : member.role === 'teamlead' ? 'Trưởng nhóm' : 'Nhân viên'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {member.status === 'accepted' ? 'Đã tham gia' : 'Chờ phê duyệt'}
                                    </span>
                                </td>
                                {roleInProject === 'admin' && (
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            <Action onChangeRole={() => { onChangeRole(member) }} onDelete={() => { onDelete(member.user) }} />
                                        </span>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ChooseRoleModal
                isModalOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                user={userChoose?.user}
                onSubmit={onSubmit}
                defaultRole={userChoose?.role}
            />
        </div>
    );
}

export default MembersInformation;