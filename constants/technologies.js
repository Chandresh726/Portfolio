import { AiFillHtml5, AiFillGithub } from "react-icons/ai";
import { SiMongodb, SiJira, SiFlask, SiSpring, SiExpress, SiCplusplus, SiNextdotjs, SiGradle, SiTypescript, SiTailwindcss, SiPostgresql, SiSplunk, SiRust, SiNestjs } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { DiCss3, DiVisualstudio } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaJava, FaPython, FaNpm, FaAws, FaDocker, FaJenkins, FaYarn } from "react-icons/fa";
import { BsBootstrap } from "react-icons/bs";
import { TbApi } from "react-icons/tb";

export const TECHNOLOGIES = [
	{
		category: "Programming Languages",
		items: [
			{ name: "Java", icon: <FaJava size={40} /> },
			{ name: "Python", icon: <FaPython size={40} /> },
			{ name: "JavaScript", icon: <IoLogoJavascript size={40} /> },
			{ name: "C++", icon: <SiCplusplus size={40} /> },
			{ name: "JavaScript", icon: <SiTypescript  size={40} /> },
			{ name: "Rust", icon: <SiRust  size={40} /> },
		]
	},
	{
		category: "Web Development",
		items: [
			{ name: "HTML", icon: <AiFillHtml5 size={40} /> },
			{ name: "CSS", icon: <DiCss3 size={40} /> },
			{ name: "React", icon: <FaReact size={40} /> },
			{ name: "Next", icon: <SiNextdotjs size={40} /> },
			{ name: "Spring Boot", icon: <SiSpring size={40} /> },
			{ name: "Bootstrap", icon: <BsBootstrap size={40} /> },
			{ name: "Tailwind", icon: <SiTailwindcss  size={40} /> },
			{ name: "Flask", icon: <SiFlask size={40} /> },
			{ name: "Express.js", icon: <SiExpress size={40} /> },
			{ name: "NestJS", icon: <SiNestjs size={40} /> },
			
		]
	},
	{
		category: "DevOps & DB",
		items: [
			
			{ name: "AWS", icon: <FaAws size={40} /> },
			{ name: "Docker", icon: <FaDocker size={40} /> },
			{ name: "Jenkins", icon: <FaJenkins size={40} /> },
			{ name: "MySQL", icon: <GrMysql size={40} /> },
			{ name: "MongoDB", icon: <SiMongodb size={40} /> },
			{ name: "Postgresql", icon: <SiPostgresql  size={40} /> }
		]
	},
	{
		category: "Tools",
		items: [
			{ name: "NPM", icon: <FaNpm size={40} /> },
			{ name: "Jira", icon: <SiJira size={30} /> },
			{ name: "Yarn", icon: <FaYarn size={40} /> },
			{ name: "Github", icon: <AiFillGithub size={40} /> },
			{ name: "VsCode", icon: <DiVisualstudio size={40} /> },
			{ name: "Gradle", icon: <SiGradle size={40} /> },
			{ name: "Splunk", icon: <SiSplunk  size={40} /> },
			{ name: "APIGEE", icon: <TbApi  size={40} /> }
		]
	}
];
