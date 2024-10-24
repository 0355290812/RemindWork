import React from "react";
import MembersInformation from "./MembersInformation";

const MembersManage = ({ project, setProject }) => {

    return (
        <div className="block p-4 w-full">
            <MembersInformation project={project} setProject={setProject} />
        </div>
    );
}

export default MembersManage;