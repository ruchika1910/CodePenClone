import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";

function Projects() {
  const projects = useSelector((state) => state.projects?.projects || []);
  const user = useSelector(state => state.user?.user);
  const [filtered, setFiltered] = useState(null);
  const searchTerm = useSelector(state => state.searchTerm?.searchTerm || "");

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filteredProjects);
    } else {
      setFiltered(null);
    }
  }, [searchTerm, projects]);

  return (
    <div className="text-primaryText w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {filtered ? (
        filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} user={user} />
        ))
      ) : (
        projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} user={user} />
        ))
      )}
    </div>
  );
}

const ProjectCard = ({ project, index, user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex-col items-center justify-center gap-4"
      key={index}
    >
      <div
        className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{
            border: "none",
            width: "110%",
            height: "100%",
            overflow: "auto",
          }}
        />
      </div>

      <div className="flex items-center justify-start gap-3 w-full">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.user?.photoURL ? (
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xl text-white font-semibold capitalize">
              {project?.user?.email[0]}
            </p>
          )}
        </div>

        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-sm text-primaryText">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer ml-auto"
        >
          <MdBookmark className="text-primaryText text-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;