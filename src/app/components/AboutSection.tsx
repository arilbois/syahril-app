"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

type TabDataType = {
  title: string;
  id: string;
  content: JSX.Element;
};

const TAB_DATA: TabDataType[] = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Laravel</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Next Js</li>
        <li>ASP.Net</li>
        <li>Spring boot</li>
        <li>Node.js</li>
        <li>PostgreSQL</li>
        <li>Mysql</li>
        <li>Agile Scrum</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Piksi Ganesha Polytechnic</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
    ),
  },
];

const AboutSection: React.FC = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          width={500}
          height={500}
          alt="About image"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I&apos;m a skilled backend developer with two years of experience
            building web applications using popular frameworks like Laravel,
            Spring Boot, AngularJS, and Next.js. I&apos;m good at creating
            strong, reliable applications and working well with teams to get
            projects done on time. I&apos;m creative and enjoy solving problems.
            I&apos;m always looking for new challenges and can adapt to
            different work situations. I&apos;m a fast learner and work hard to
            improve my skills. I&apos;m committed to delivering high-quality
            work that meets my clients&apos; needs. I communicate clearly to
            understand what they want and make sure they&apos;re happy with the
            results. I&apos;m passionate about doing great work and always
            strive for excellence.
          </p>
          <div className="flex flex-row justify-start mt-8">
            {TAB_DATA.map((tabItem) => (
              <TabButton
                key={tabItem.id}
                selectTab={() => handleTabChange(tabItem.id)}
                active={tab === tabItem.id}
              >
                {tabItem.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
