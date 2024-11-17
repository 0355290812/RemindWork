import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, role }) => {
    return (
        <div className="flex flex-col space-y-5 pr-3 w-full">
            {tasks.length > 0 ? tasks.map((task) => (
                <TaskItem task={task} role={role} key={task._id} />
            )) : <span className=''>Không có công việc nào trong dự án mà bạn tham gia hoặc quản lý</span>}
        </div>
    );
};

export default TaskList;
