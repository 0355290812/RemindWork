import React, { useState, useEffect } from "react";
import { validateResetToken, resetPassword } from "../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ResetPassword = () => {
    const [tokenIsValid, setTokenIsValid] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTokenStatus = async () => {
            try {
                const response = await validateResetToken(token);
                console.log(response);
                if (response.status === "valid") {
                    setTokenIsValid(true);
                } else {
                    setTokenIsValid(false);
                }
            } catch (error) {
                console.error("Error validating token:", error);
                setTokenIsValid(false);
            }
        };

        fetchTokenStatus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        try {
            await resetPassword(password, token);
            alert("Đặt lại mật khẩu thành công");
        } catch (error) {
            console.error("Error resetting password:", error);
        }

        setPassword("");
        setConfirmPassword("");
        navigate("/login");
    };

    if (tokenIsValid === null) {
        return (
            <div className="flex flex-col h-screen items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {
                !tokenIsValid ? (
                    <div className="flex flex-col h-screen items-center justify-center">
                        <h1 className="text-3xl font-semibold">Đặt lại mật khẩu</h1>
                        <div className="border-blue-400 border p-6 flex flex-col rounded-lg mt-4">
                            <p className="text-sm text-gray-500 w-96">
                                Liên kết đã hết hạn hoặc không hợp lệ. Vui lòng thử lại.</p>
                        </div>
                        <button className="mt-6">
                            <a href="/login" className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg mt-4 bg-blue-400 text-white">
                                Quay lại Đăng nhập
                            </a>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col h-screen items-center justify-center">
                        <h1 className="text-3xl font-semibold">Đặt lại mật khẩu</h1>
                        <input
                            className="text-sm w-full px-2 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className="text-sm w-full px-2 py-2 border border-solid border-gray-300 rounded mt-2"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg mt-4 bg-blue-400 text-white"
                            onClick={handleSubmit}
                        >
                            Đặt lại mật khẩu
                        </button>
                        <button className="z-50 fixed top-0 left-0 w-full flex items-center justify-start">
                            <a href="/login" className="flex flex-row items-center text-sm w-fit px-2 py-2 text-blue-400">
                                <IoArrowBackCircleOutline size={24} className="text-blue-400 mr-2" />
                                Quay lại Đăng nhập
                            </a>
                        </button>
                    </div>
                )
            }
        </>
    );
}

export default ResetPassword;
