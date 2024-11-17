import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

function timeDifference(timestamp) {
  const now = new Date();
  const inputTime = new Date(timestamp.toDate());
  const diffInSeconds = Math.floor((now - inputTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} giây trước`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} giờ trước`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ngày trước`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} năm trước`;
  }
}

const NotificationItem = ({ notification, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(notification.activeLink.split('http://localhost:3000')[1]);
    onClick();
  };
  return (
    <div
      onClick={handleClick}
      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
    >
      <div className="flex-shrink-0 relative h-fit">
        <img className="rounded-full w-11 h-11" src={notification.avatar.includes('http') ? notification.avatar : `http://localhost:3001/${notification.avatar}`} alt="User avatar" />
        {!notification.isRead && (
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 ms-6 -mt-5 bg-blue-400 border border-white rounded-full dark:border-gray-800">
            <GoDotFill className="absolute w-3 h-3 text-blue-400 bg-blue-400 rounded-full" />
          </div>
        )}
      </div>
      <div className="w-full ps-3">
        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
          <span className="font-semibold">{notification.userName}</span>
          {' ' + notification.body}
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-500">{timeDifference(notification.timestamp)}</div>
      </div>
    </div>
  )
};

const NotificationsDropdown = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const markAsRead = async (notificationId) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, { isRead: true });
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unread = notifications.filter((notification) => !notification.isRead);
    setUnreadCount(unread.length);
  }, [notifications]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownNotificationButton"
        onClick={toggleDropdown}
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        {unreadCount > 0 && (
          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
        )}
      </button>

      {isOpen && (
        <div
          id="dropdownNotification"
          className="absolute w-80 -left-80 z-50 max-w-sm mb-20 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Thông báo
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto" style={{ maxHeight: '40rem' }}>
            {notifications.length > 0 ? notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} onClick={() => markAsRead(notification.id)} />
            )) : (<span className="block px-4 py-3 text-center text-gray-500 dark:text-gray-400">Bạn chưa có thông báo nào</span>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
