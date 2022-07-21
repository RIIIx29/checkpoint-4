/* eslint-disable import/no-unresolved */
import { NavLink, useLocation } from "react-router-dom";
import { useMemo, useContext, useEffect, useState } from "react";
import AdminHeader from "@components/Admin/AdminHeader";
import TabContent from "@components/Admin/Content/TabContent";
import TabDocument from "@components/Admin/Documents/TabDocument";
import TabUser from "@components/Admin/Users/TabUser";
import Popup from "@components/Admin/Popup";
import UserContext from "@contexts/UserContext";
import axios from "@services/axios";
import "@styles/Admin.scss";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function Admin() {
  const { Admin } = useContext(UserContext);
  const query = useQuery();
  const [projectsList, setProjectsList] = useState();
  const fetchProjects = async () => {
    try {
      const newProjectsList = await axios.get("projects").then((result) => {
        const projects = result.data;
        projects.forEach((project) => {
          return project;
        });
        return projects;
      });

      if (!newProjectsList) {
        return console.warn("Un problème est survenu");
      }
      setProjectsList(newProjectsList);
    } catch (err) {
      return err;
    }
    return null;
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="adminPage">
      <AdminHeader />
      {query.get("popup") && (
        <Popup
          content={query.get("popup")}
          currentTab={query.get("tab")}
          projectsList={projectsList}
          fetchProjects={fetchProjects}
          query={query}
        />
      )}
      <div className="container">
        <section className="adminBoard">
          <nav className="adminNav">
            <p className="welcomeUser">{`Welcome, `}</p>
            <NavLink
              to="/admin?tab=content"
              className={
                query.get("tab") === "content" ? "navTop navActive" : "navTop"
              }
            >
              Édition du contenu
            </NavLink>
            <NavLink
              to="/admin?tab=documents"
              className={
                query.get("tab") === "documents" ? "navTop navActive" : "navTop"
              }
            >
              Utilisateurs
            </NavLink>
            <NavLink to="/" className="navBottom">
              Retour au site
            </NavLink>
          </nav>
          <div className="bgContainer">
            <div className={`adminTab ${query.get("tab")}`}>
              <Tab
                tab={query.get("tab")}
                fetchProjects={fetchProjects}
                projectsList={projectsList}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const Tab = ({ tab, fetchProjects, projectsList }) => {
  // eslint-disable-next-line consistent-return
  const display = (tabname) => {
    // eslint-disable-next-line default-case
    switch (tabname) {
      case "content":
        return (
          <TabContent
            fetchProjects={fetchProjects}
            projectsList={projectsList}
          />
        );
    }
  };

  return display(tab);
};

export default Admin;
