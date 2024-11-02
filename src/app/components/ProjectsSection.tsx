"use client"

import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { useQuery } from "react-query";
import api from "@/services/axios";
import {
  Project,
  APIResponse,
} from "./types";

const fetchProjects = async (): Promise<APIResponse<Project[]>> => {
  const { data } = await api.get('/projects');
  return data;
};



const ProjectsSection: React.FC = () => {
  const [tag, setTag] = useState<string>("All");
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true });

  const { data: projectsData } = useQuery<APIResponse<Project[]>, Error>('projects', fetchProjects);

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  // Filter projects based on selected tag
  const filteredProjects = projectsData?.data.filter((project: Project) =>
    project.tag.includes(tag)
  ) || [];

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={() => handleTagChange("All")}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Fullstack")}
          name="Fullstack"
          isSelected={tag === "Fullstack"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Backend")}
          name="Backend"
          isSelected={tag === "Backend"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Frontend")}
          name="Frontend"
          isSelected={tag === "Frontend"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project: Project, index: number) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
