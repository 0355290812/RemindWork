import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, role }) => {
    return (
        <div className="flex flex-col space-y-5 pr-3 w-full">
            {tasks.map((task) => (
                <TaskItem task={task} role={role} />
            ))}
        </div>
    );
};

export default TaskList;
