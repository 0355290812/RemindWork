import React from "react";
import { FaGoogle } from "react-icons/fa";
import LoginImage from "../assets/images/LoginImage.webp";

const Login = ({ email, setEmail, password, setPassword, handleLogin, error, loading }) => {

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src={LoginImage}
                    alt="Sample image"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="text-center md:text-left flex items-center">
                    <label className="mr-1">Sign in with</label>
                    <button
                        type="button"
                        className="inline-block mx-1 h-9 w-9 rounded-full bg-blue-400 hover:bg-blue-500 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                    >
                        <FaGoogle
                            size={20}
                            className="flex justify-center items-center w-full"
                        />
                    </button>
                </div>
                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                        Or
                    </p>
                </div>
                {error && <p className="text-red-600 text-sm text-center">{error}</p>} { }
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Remember Me</span>
                    </label>
                    <a
                        className="text-blue-400 hover:text-blue-500 hover:underline hover:underline-offset-4"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
                <div className="text-center md:text-left">
                    <button
                        className={`mt-4 bg-blue-400 hover:bg-blue-500 px-4 py-2 text-white uppercase rounded text-xs tracking-wider ${loading ? 'opacity-50 cursor-not-allowed' : ''} w-3/12 h-10`} // Thêm lớp cho trạng thái loading
                        type="submit"
                        onClick={handleLogin}
                    // disabled={loading}
                    >
                        <div className="flex items-center justify-center">
                            {loading ? (
                                <div role="status" className="mr-2">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : 'Login'}
                        </div>
                    </button>

                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don&apos;t have an account?{" "}
                    <a
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        href="/register"
                    >
                        Register
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Login;