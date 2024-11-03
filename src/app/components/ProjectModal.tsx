"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from 'next/image';

type ProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    imgUrl: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl?: string;
};

const ProjectModal: React.FC<ProjectModalProps> = ({
    isOpen,
    onClose,
    imgUrl,
    title,
    description,
    gitUrl,
    previewUrl,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* Set full width for mobile, max width on larger screens */}
            <DialogContent className="w-full max-w-4xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
                <DialogHeader className="flex justify-between items-center">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                {/* Responsive Image */}
                <Image
                    src={imgUrl}
                    alt={title}
                    className="rounded-md my-4 object-cover w-full h-auto"
                    width={1920}
                    height={768}
                />

                <DialogDescription className="text-gray-700 dark:text-gray-300">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </DialogDescription>

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
                </div>

                <div className="mt-6 flex justify-end">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;
