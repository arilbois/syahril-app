"use client";

import React from "react";
import { useQuery } from "react-query";
import { decode } from "html-entities";
import api from "@/services/axios";
import {
  AboutMe,
  Skill,
  Experience,
  Certification,
  APIResponse
} from "./types";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// Fetch functions
const fetchAboutMe = async (): Promise<APIResponse<AboutMe>> => {
  const { data } = await api.get('/about-me/1');
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

const fetchExperiences = async (): Promise<APIResponse<Experience[]>> => {
  const { data } = await api.get('/experiences');
  return data;
};

const fetchCertifications = async (): Promise<APIResponse<Certification[]>> => {
  const { data } = await api.get('/certifications');
  return data;
};

const AboutSection: React.FC = () => {
  const { data: aboutMe, isLoading: aboutMeLoading, error: aboutMeError } = useQuery<APIResponse<AboutMe>, Error>('aboutMe', fetchAboutMe);
  const { data: hardSkills, isLoading: hardSkillsLoading, error: hardSkillsError } = useQuery<APIResponse<Skill[]>, Error>('hardSkills', fetchHardSkills);
  const { data: softSkills, isLoading: softSkillsLoading, error: softSkillsError } = useQuery<APIResponse<Skill[]>, Error>('softSkills', fetchSoftSkills);
  const { data: experiences, isLoading: experiencesLoading, error: experiencesError } = useQuery<APIResponse<Experience[]>, Error>('experiences', fetchExperiences);
  const { data: certifications, isLoading: certificationsLoading, error: certificationsError } = useQuery<APIResponse<Certification[]>, Error>('certifications', fetchCertifications);

  if (aboutMeLoading || hardSkillsLoading || softSkillsLoading || experiencesLoading || certificationsLoading) {
    return (
      <section className="text-white" id="about">
        <div className="flex justify-center items-center py-20">
          <p className="text-xl">Loading...</p>
        </div>
      </section>
    );
  }

  if (aboutMeError || hardSkillsError || softSkillsError || experiencesError || certificationsError) {
    return (
      <section className="text-white" id="about">
        <div className="flex justify-center items-center py-20">
          <p className="text-xl text-red-500">Error loading data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="text-white bg-black" id="about">
      <div className="max-w-5xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: About Me */}
          <div className="flex flex-col justify-start">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-base lg:text-lg">
              {aboutMe?.data?.description ? decode(aboutMe.data.description) : "Description not available."}
            </p>
          </div>

          {/* Right Column: Tabs */}
          <div className="flex flex-col">
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="flex space-x-1 rounded-md bg-gray-700 p-1">
                <TabsTrigger value="skills" className="flex-1 text-center">Skills</TabsTrigger>
                <TabsTrigger value="experience" className="flex-1 text-center">Experience</TabsTrigger>
                <TabsTrigger value="certifications" className="flex-1 text-center">Certifications</TabsTrigger>
              </TabsList>

              {/* Skills Tab */}
              <TabsContent value="skills" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Hard Skills Column */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Hard Skills</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {hardSkills?.data.map((skill: Skill) => (
                        <li key={skill.id}>
                          {skill.name} - <span className="italic">{skill.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Soft Skills Column */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Soft Skills</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {softSkills?.data.map((skill: Skill) => (
                        <li key={skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Experience Tab with Timeline Style */}
              <TabsContent value="experience" className="mt-4">
                <div className="relative border-l border-gray-200 dark:border-gray-700 ml-6">
                  {experiences?.data.map((exp, index) => (
                    <div key={exp.id} className="mb-10 ml-6 flex items-start relative">
                      <span
                        className={`absolute w-6 h-6 rounded-full -left-9 border-2 ${index === 0 ? "border-orange-500 bg-black" : "bg-black border-gray-500"
                          }`}
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">{exp.title} at {exp.company}</h3>
                        <p className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(exp.start_date))} -
                          {exp.end_date ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(exp.end_date)) : "Present"}
                        </p>
                        <p className="mt-2 text-base text-gray-300">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>


              {/* Certifications Tab */}
              <TabsContent value="certifications" className="mt-4">
                <ul className="list-disc pl-5 space-y-4">
                  {certifications?.data.map((cert: Certification) => (
                    <li key={cert.id}>
                      {cert.link ? (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                      {" - "}{cert.issuer}
                      <p className="mt-1">{cert.description}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
