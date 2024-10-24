import React from 'react';
import TaskList from './TaskList';
import Filter from './Filter';

const WorkUpdate = ({
    tasks,
    projects,
    onSelectProject,
    selectedProject,
    selectedStatus,
    setSelectedStatus,
    isImportant,
    setIsImportant,
    searchQuery,
    setSearchQuery,
    role,
}) => {

    return (
        <div className="flex flex-col bg-base p-3 space-y-4 ml-2 w-full max-h-fit">
            <div>
                <h1 className="text-xl font-bold">Việc mới cập nhật</h1>
                <p className="text-xs">
                    Những cập nhật mới nhất trong công việc của bạn quản lý, bạn tham gia.
                </p>
            </div>
            <div id="scrollableDiv" className="h-screen overflow-auto w-full flex flex-col">
                <Filter
                    projects={projects}
                    onSelectProject={onSelectProject}
                    selectedProject={selectedProject}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    isImportant={isImportant}
                    setIsImportant={setIsImportant}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <TaskList tasks={tasks} role={role} />
            </div>
        </div>
    );
};

export default WorkUpdate;
