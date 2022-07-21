/* eslint-disable import/no-unresolved */
import { NavLink, useNavigate } from "react-router-dom";
import axios from "@services/axios";
import "@styles/Popup.scss";
import AddProject from "./Content/Projects/AddProject";
import EditProject from "./Content/Projects/EditProject";

function Popup({ content, currentTab, projectsList, query }) => {
  const navigate = useNavigate();
      switch (content) {
        case "addProject":
        return (
          <AddProject
            missionsList={missionsList}
            projectsList={projectsList}
            fetchProjects={fetchProjects}
          />
        );
      case "editProject":
        return (
          <EditProject
            projectsList={projectsList}
            fetchProjects={fetchProjects}
            query={query}
          />
       );
   [];

  return (
    <div className="popup">
      <div className="popupCard">
        <NavLink to={`/admin?tab=${currentTab}`} className="closeButton">
          X
        </NavLink>
        {content && handleContent()}
      </div>
    </div>
  );
      }
export default Popup;
