import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';
import ProjectPage from './pages/ProjectPage';
import MemberPage from './pages/MemberPage';
import { messaging } from './services/firebase';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import ToastNotification from './components/ToastNotification';
import { updateDeviceToken } from './api/user';
import InformationPage from './pages/InformationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const App = () => {
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem('lastPath', window.location.pathname);
    };
  }, []);

  useEffect(() => {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          getToken(messaging, {
            vapidKey: "BOXJkAGA464w2OBoYtO-7JIyN9m1GmT_weNzUKkeTVGTxn-vyUESTh-wG_2wRkO8i6zs7J1qAXjm_dqBIyn3Dk8"
          }).then((currentToken) => {
            if (currentToken) {
              if (localStorage.getItem('token')) {
                updateDeviceToken(currentToken);
              }
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
        } else {
          console.log('Unable to get permission to notify.');
        }
      });
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        setNotification({ ...payload.notification, ...payload.data });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/information" element={<PrivateRoute component={InformationPage} />} />
            <Route path="/private-works/:id" element={<PrivateRoute component={TaskDetailPage} />} />
            <Route path="/projects/:projectId/members" element={<PrivateRoute component={MemberPage} />} />
            <Route path="/projects/:projectId" element={<PrivateRoute component={ProjectPage} />} />
            <Route path="/home" element={<PrivateRoute component={HomePage} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </AuthProvider>
      {notification && (
        <ToastNotification
          title={notification.title}
          message={notification.body}
          userImage={notification.avatar}
          isVisible={true}
          onClose={() => { }}
        />
      )}
    </>
  );
};

export default App;
