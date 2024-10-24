import React from "react";
import Dropdown from "./Dropdown";
import SearchForm from "./SearchForm";
import DropdownStatus from "./DropdownStatus";

const Filter = ({
    projects,
    onSelectProject,
    selectedProject,
    selectedStatus,
    setSelectedStatus,
    isImportant,
    setIsImportant,
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <div className="flex flex-row justify-between items-center my-4 mr-4">
            <Dropdown
                projects={projects}
                onSelectProject={onSelectProject}
                selectedProject={selectedProject}
            />
            <div className="flex flex-row items-center justify-center">
                <DropdownStatus
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
                <div className="flex items-center mx-4">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={isImportant}
                        onChange={() => setIsImportant(!isImportant)}
                        className="w-6 h-6 text-blue-400 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-white focus:border-blue-400"
                    />
                    <label
                        htmlFor="is-important"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Việc quan trọng
                    </label>
                </div>
                <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
        </div>
    );
}

export default Filter;
