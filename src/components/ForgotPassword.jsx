import React, { useState } from "react";
import { forgotPassword } from "../api/auth";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (email === "") {
            alert("Vui lòng nhập địa chỉ email của bạn");
            setIsSubmitting(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Địa chỉ email không hợp lệ");
            setIsSubmitting(false);
            return;
        }

        try {
            await forgotPassword(email);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                isSubmitting ? (
                    <div className="flex flex-col h-screen items-center justify-center">
                        <h1 className="text-3xl font-semibold">Kiểm tra Email</h1>
                        <div className="border-blue-400 border p-6 flex flex-col rounded-lg mt-4">
                            <p className="text-sm text-gray-500 w-96">
                                Chúng tôi đã gửi một email đến <span className="font-semibold">{email}</span> với liên kết để đặt lại mật khẩu.</p>
                            <p className="text-sm text-gray-500 w-96 mt-4">
                                Nếu bạn không nhận được email trong vài phút, vui lòng kiểm tra thư mục spam.</p>
                        </div>
                        <button className="mt-6">
                            <a href="/login" className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg mt-4 bg-blue-400 text-white">
                                Quay lại Đăng nhập
                            </a>
                        </button>
                    </div>
                ) : (
                    <div className="flex relative flex-col h-screen items-center justify-center">
                        <h1 className="text-3xl font-semibold">Đặt lại mật khẩu</h1>
                        <p className="text-sm text-gray-500 w-96 mt-4">
                            Nhập email được liên kết với tài khoản của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.</p>
                        <input
                            className="text-sm w-full px-2 py-2 border border-solid border-gray-300 rounded mt-2"
                            type="text"
                            placeholder="Địa chỉ Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 bg-blue-400 rounded-lg mt-4 text-white"
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

export default ForgotPassword;
