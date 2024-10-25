// src/components/AboutSection.tsx

"use client";

import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { useQuery } from "react-query";
import { decode } from 'html-entities';
import api from "@/services/axios";
import {
  AboutMe,
  Skill,
  Education,
  Certification,
  APIResponse
} from "./types";

const fetchAboutMe = async (): Promise<APIResponse<AboutMe>> => {
  const { data } = await api.get('/about-me');
  return data;
};

const fetchSoftSkills = async (): Promise<APIResponse<Skill[]>> => {
  const { data } = await api.get('/soft-skills');
  return data;
};

const fetchHardSkills = async (): Promise<APIResponse<Skill[]>> => {
  const { data } = await api.get('/hard-skills');
  return data;
};

const fetchEducations = async (): Promise<APIResponse<Education[]>> => {
  const { data } = await api.get('/educations');
  return data;
};

const fetchCertifications = async (): Promise<APIResponse<Certification[]>> => {
  const { data } = await api.get('/certifications');
  return data;
};

const AboutSection: React.FC = () => {
  const [tab, setTab] = useState<"hardSkills" | "softSkills" | "education" | "certifications">("hardSkills");
  const [, startTransition] = useTransition();

  // Fetching data using react-query
  const { data: aboutMe, isLoading: aboutMeLoading, error: aboutMeError } = useQuery<APIResponse<AboutMe>, Error>('aboutMe', fetchAboutMe);
  const { data: hardSkills, isLoading: hardSkillsLoading, error: hardSkillsError } = useQuery<APIResponse<Skill[]>, Error>('hardSkills', fetchHardSkills);
  const { data: softSkills, isLoading: softSkillsLoading, error: softSkillsError } = useQuery<APIResponse<Skill[]>, Error>('softSkills', fetchSoftSkills);
  const { data: educations, isLoading: educationsLoading, error: educationsError } = useQuery<APIResponse<Education[]>, Error>('educations', fetchEducations);
  const { data: certifications, isLoading: certificationsLoading, error: certificationsError } = useQuery<APIResponse<Certification[]>, Error>('certifications', fetchCertifications);

  // Handle tab change
  const handleTabChange = (id: "hardSkills" | "softSkills" | "education" | "certifications") => {
    startTransition(() => {
      setTab(id);
    });
  };

  // Handle loading states
  if (
    aboutMeLoading ||
    hardSkillsLoading ||
    softSkillsLoading ||
    educationsLoading ||
    certificationsLoading
  ) {
    return (
      <section className="text-white" id="about">
        <div className="flex justify-center items-center py-20">
          <p className="text-xl">Loading...</p>
        </div>
      </section>
    );
  }

  // Handle error states
  if (
    aboutMeError ||
    hardSkillsError ||
    softSkillsError ||
    educationsError ||
    certificationsError
  ) {
    return (
      <section className="text-white" id="about">
        <div className="flex justify-center items-center py-20">
          <p className="text-xl text-red-500">Error loading data. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (tab) {
      case "hardSkills":
        return (
          <ul className="list-disc pl-5">
            {hardSkills?.data.map((skill: Skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        );
      case "softSkills":
        return (
          <ul className="list-disc pl-5">
            {softSkills?.data.map((skill: Skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        );
      case "education":
        return (
          <ul className="list-disc pl-5">
            {educations?.data.map((edu: Education) => (
              <li key={edu.id}>
                <strong>{edu.institution}</strong> - {edu.degree} in {edu.field} (
                {edu.start_date} - {edu.end_date})
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </li>
            ))}
          </ul>
        );
      case "certifications":
        return (
          <ul className="list-disc pl-5">
            {certifications?.data.map((cert: Certification) => (
              <li key={cert.id}>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    {cert.name}
                  </a>
                ) : (
                  cert.name
                )}{" "}
                - {cert.issuer}
                <p className="mt-1">{cert.description}</p>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <section className="text-white bg-gray-800" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-16 px-4 xl:gap-16 sm:py-24 xl:px-16">
        <div className="flex justify-center">
          <Image
            src="/images/about-image.png" // Ensure this image exists in your public/images directory
            width={500}
            height={500}
            alt="About image"
            className="rounded-lg"
          />
        </div>
        <div className="mt-8 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-base lg:text-lg mb-6">
            {aboutMe?.data?.description
              ? decode(aboutMe.data.description)
              : "Description not available."}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <TabButton
              selectTab={() => handleTabChange("hardSkills")}
              active={tab === "hardSkills"}
            >
              Hard Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("softSkills")}
              active={tab === "softSkills"}
            >
              Soft Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
