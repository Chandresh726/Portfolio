import { AiFillHtml5 } from "react-icons/ai";
import {
	SiMongodb,
	SiVercel,
	SiFlask,
	SiSpring,
	SiExpress,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiPostgresql
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { DiCss3 } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import {
	FaReact,
	FaJava,
	FaPython,
	FaAws,
	FaDocker,
	FaJenkins
} from "react-icons/fa";
import { TbBrandTerraform } from "react-icons/tb";
import type { TechnologyCategory } from "types";
import { FaGolang } from "react-icons/fa6";

export const TECHNOLOGIES: TechnologyCategory[] = [
	{
		category: "Programming Languages",
		items: [
			{ name: "Java", icon: <FaJava size={40} />, color: "#ED8B00" },
			{ name: "Python", icon: <FaPython size={40} />, color: "#3776AB" },
			{ name: "JavaScript", icon: <IoLogoJavascript size={40} />, color: "#F7DF1E" },
			{ name: "TypeScript", icon: <SiTypescript size={40} />, color: "#3178C6" },
			{ name: "Golang", icon: <FaGolang size={40} />, color: "#00ADD8" }
		]
	},
	{
		category: "Web Development",
		items: [
			{ name: "HTML", icon: <AiFillHtml5 size={40} />, color: "#E34F26" },
			{ name: "CSS", icon: <DiCss3 size={40} />, color: "#1572B6" },
			{ name: "React", icon: <FaReact size={40} />, color: "#61DAFB" },
			{ name: "Next", icon: <SiNextdotjs size={40} />, color: "#808080" },
			{ name: "Spring Boot", icon: <SiSpring size={40} />, color: "#6DB33F" },
			{ name: "Tailwind", icon: <SiTailwindcss size={40} />, color: "#06B6D4" },
			{ name: "Flask", icon: <SiFlask size={40} />, color: "#808080" },
			{ name: "Express.js", icon: <SiExpress size={40} />, color: "#808080" },
			{ name: "AI SDK", icon: <SiVercel size={40} />, color: "#808080" }
		]
	},
	{
		category: "DevOps & DB",
		items: [
			{ name: "AWS", icon: <FaAws size={40} />, color: "#FF9900" },
			{ name: "Docker", icon: <FaDocker size={40} />, color: "#2496ED" },
			{ name: "Jenkins", icon: <FaJenkins size={40} />, color: "#D24939" },
			{ name: "MySQL", icon: <GrMysql size={40} />, color: "#4479A1" },
			{ name: "MongoDB", icon: <SiMongodb size={40} />, color: "#47A248" },
			{ name: "Postgresql", icon: <SiPostgresql size={40} />, color: "#4169E1" },
			{ name: "Terraform", icon: <TbBrandTerraform size={40} />, color: "#844FBA" }
		]
	}
];
