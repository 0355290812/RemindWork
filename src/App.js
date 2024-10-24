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
import { set } from 'date-fns';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const App = () => {
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: "BOXJkAGA464w2OBoYtO-7JIyN9m1GmT_weNzUKkeTVGTxn-vyUESTh-wG_2wRkO8i6zs7J1qAXjm_dqBIyn3Dk8"
        }).then((currentToken) => {
          if (currentToken) {
            console.log('Token:', currentToken);
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
      setNotification(payload.notification);
      // setTimeout(() => {
      //   setNotification(null);
      // }, 4000);
    });
  }, []);
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/private-works/:id" element={<PrivateRoute component={TaskDetailPage} />} />
            <Route path="/projects/:projectId/members" element={<PrivateRoute component={MemberPage} />} />
            <Route path="/projects/:projectId" element={<PrivateRoute component={ProjectPage} />} />
            <Route path="/home" element={<PrivateRoute component={HomePage} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </AuthProvider>
      {notification && (
        <ToastNotification
          title={notification.title}
          message={notification.body}
          userImage={notification.image}
          isVisible={true}
          onClose={() => { setNotification(null) }}
        />
      )}
    </>
  );
};

export default App;
