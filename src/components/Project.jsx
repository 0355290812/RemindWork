import React from "react";
import MembersList from "./MembersList";
import ProjectInformation from "./ProjectInformation";

const Project = ({ project, tasks }) => {

    return (
        <div className="flex flex-row p-4 flex-grow">
            <MembersList project={project} tasks={tasks} />
            <ProjectInformation project={project} tasks={tasks} />
        </div>
    );
}

export default Project;