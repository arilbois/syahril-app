// ProjectTag.tsx
import React from "react";

interface ProjectTagProps {
  onClick: (tag: string) => void;
  name: string;
  isSelected: boolean;
}

const ProjectTag: React.FC<ProjectTagProps> = ({
  onClick,
  name,
  isSelected,
}) => {
  const handleClick = () => {
    onClick(name);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-full ${
        isSelected ? "bg-primary-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
