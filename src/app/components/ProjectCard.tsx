import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const maxDescriptionLength = 180;

  const truncateHtmlText = (htmlText: string, maxLength: number) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlText;
    const plainText = tempElement.textContent || tempElement.innerText || "";

    if (plainText.length > maxLength) {
      return {
        truncatedText: plainText.slice(0, maxLength),
        isTruncated: true,
      };
    }
    return { truncatedText: plainText, isTruncated: false };
  };

  const { truncatedText, isTruncated } = truncateHtmlText(description, maxDescriptionLength);

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
      ></div>
      <div className="text-white rounded-b-xl mt-3 py-6 px-4 flex-1 flex flex-col">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <div className="text-[#ADB7BE] flex-1">
          <span>{truncatedText}</span>
          {isTruncated && (
            <>
              ...<Button
                variant="link"
                onClick={openModal}
                aria-label="View More"
                className="inline text-blue-500"
              >
                View More
              </Button>
            </>
          )}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button variant="ghost" disabled className="cursor-not-allowed opacity-50">
                      <FaGithub className="mr-2" /> GitHub
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Link Not Available</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button variant="ghost" disabled className="cursor-not-allowed opacity-50">
                      <FaExternalLinkAlt className="mr-2" /> Live Preview
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Link Not Available</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imgUrl={imgUrl}
        title={title}
        description={description}
        gitUrl={gitUrl}
        previewUrl={previewUrl}
      />
    </div>
  );
};

export default ProjectCard;
