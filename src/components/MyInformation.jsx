import React, { useState, useRef } from 'react';
import Alert from './Alert';

const MyInformation = ({
    information,
    changeInformation,
    changePassword,
    showAlert,
    setShowAlert,
    alertMessage,
    setAlertMessage
}) => {

    const [name, setName] = useState(information.name);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [avatar, setAvatar] = useState(information?.avatar);
    const fileInputRef = useRef(null);

    const handleChangeInformation = async () => {
        const data = new FormData();
        data.append('name', name);
        changeInformation(data);
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setAlertMessage("Mật khẩu mới không khớp. Vui lòng kiểm tra lại.");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
        } else if (password === newPassword) {
            setAlertMessage("Mật khẩu mới không được trùng với mật khẩu cũ.");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
        } else {
            changePassword({
                oldPassword: password,
                newPassword: newPassword
            });
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }
    }

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setAvatar(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('avatar', file);
        changeInformation(formData);
    };

    return (
        <div className="flex flex-col bg-base p-3 space-y-4 ml-2 w-full max-h-fit">
            <span className="text-xl font-bold">Thông tin cá nhân</span>
            <div className='flex flex-row'>
                <div className='flex flex-col items-center p-6 rounded-xl mr-4 cursor-pointer' onClick={handleDivClick}>
                    <img className='w-40 h-40 rounded-full mb-4' src={avatar?.includes('http') ? avatar : `http://localhost:3001/${avatar}`} alt='avatar' />
                    <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <span className='text-sm text-white bg-blue-400 hover:bg-blue-500 p-3 rounded-lg'>Thay đổi ảnh đại diện</span>
                </div>
                <div className='flex flex-col flex-grow'>
                    <div
                        className='flex-grow mr-8 bg-gray-50 p-4 mb-6 rounded-xl'
                    // onSubmit={changeInformation({ name })}
                    >
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Doe@gmail.com"
                                    value={information.email}
                                    disabled
                                    required
                                />
                            </div>
                        </div>
                        <button
                            className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleChangeInformation}
                        >
                            Lưu
                        </button>
                    </div>
                    <div
                        className='flex-grow mr-8 bg-gray-50 p-4 mb-6 rounded-xl'
                    >
                        <div className="mb-6">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label for="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                            <input
                                type="password"
                                id="new_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label for="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu mới</label>
                            <input
                                type="password"
                                id="new_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleChangePassword}
                        >
                            Thay đổi mật khẩu
                        </button>
                    </div>
                </div>
            </div>
            {showAlert && (<Alert message={alertMessage} />)}
        </div>
    );
};

export default MyInformation;
