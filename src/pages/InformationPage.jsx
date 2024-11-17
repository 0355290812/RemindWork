import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { getInformation, changeInformation, changePassword } from '../api/user';
import MyInformation from '../components/MyInformation';

const InformationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [information, setInformation] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserInformation = async () => {
            setIsLoading(true);
            const information = await getInformation();
            setInformation(information);
            setIsLoading(false);
        };

        fetchUserInformation();
    }, []);

    const handleChangeInformation = async (data) => {
        try {
            const newInformation = await changeInformation(data);
            setShowAlert(true);
            setAlertMessage("Thay đổi thông tin thành công");
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
            // console.log(newInformation);

            user.name = newInformation.user.name;
            user.email = newInformation.user.email;
            user.avatar = newInformation.user.avatar;
        } catch (error) {
            console.error("Error changing information:", error);
            setShowAlert(true);
            setAlertMessage("Thay đổi thông tin không thành công");
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
        }
    }

    const handleChangePassword = async (data) => {
        try {
            await changePassword(data);
            setShowAlert(true);
            setAlertMessage("Thay đổi mật khẩu thành công");
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
        } catch (error) {
            console.error("Error changing password:", error);
            setShowAlert(true);
            setAlertMessage("Thay đổi mật khẩu không thành công");
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);
        }
    }

    return (
        <div className="relative">
            <NavBar />

            <div className="flex pt-20">
                <Sidebar />
                {isLoading ? (<div className="ml-64 flex-grow flex h-screen"> <Loading /> </div>)
                    : <div className="ml-64 flex-grow flex relative">
                        <MyInformation
                            information={information}
                            changeInformation={handleChangeInformation}
                            showAlert={showAlert}
                            setAlertMessage={setAlertMessage}
                            setShowAlert={setShowAlert}
                            alertMessage={alertMessage}
                            changePassword={handleChangePassword}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default InformationPage;
