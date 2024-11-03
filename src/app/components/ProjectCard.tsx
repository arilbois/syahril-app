"use client";

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt, FaEye } from "react-icons/fa";

type ProjectCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const maxDescriptionLength = 100; // Set the character limit here

  // Function to truncate HTML description text by plain text length
  const truncateHtmlText = (htmlText: string, maxLength: number) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlText;
    const plainText = tempElement.textContent || tempElement.innerText || "";

    if (plainText.length > maxLength) {
      return plainText.slice(0, maxLength) + "...";
    }
    return htmlText; // return full HTML if within length
  };

  // Truncated HTML description
  const truncatedDescription = truncateHtmlText(description, maxDescriptionLength);

  return (
    <div className="bg-[#181818] rounded-xl overflow-hidden shadow-lg flex flex-col">
      <div
        className="h-52 md:h-72 rounded-t-xl relative group cursor-pointer"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={openModal}
      >
        {/* Optional: Add overlay or hover effects here */}
      </div>
      <div className="text-white rounded-b-xl mt-3 py-6 px-4 flex-1 flex flex-col">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE] flex-1">
          <div dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
        </p>
        <div className="mt-4 flex space-x-4">
          {/* GitHub Button */}
          {gitUrl ? (
            <a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          ) : (
            <Button variant="ghost" disabled className="cursor-not-allowed opacity-50">
              <FaGithub className="mr-2" /> GitHub
            </Button>
          )}

          {/* Live Preview Button */}
          {previewUrl ? (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              <FaExternalLinkAlt className="mr-2" /> Live Preview
            </a>
          ) : (
            <Button variant="ghost" disabled className="cursor-not-allowed opacity-50">
              <FaExternalLinkAlt className="mr-2" /> Live Preview
            </Button>
          )}

          {/* View Details Button */}
          <Button
            variant="ghost"
            onClick={openModal}
            aria-label="View Details"
            className="flex items-center"
          >
            <FaEye className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imgUrl={imgUrl}
        title={title}
        description={description} // Pass full description to modal
        gitUrl={gitUrl}
        previewUrl={previewUrl}
      />
    </div>
  );
};

export default ProjectCard;
