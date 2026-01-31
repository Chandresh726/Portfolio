import personalData from "@/content/personal.json";
import seoData from "@/content/seo.json";

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: personalData.name,
	givenName: personalData.firstName,
	familyName: personalData.lastName,
	jobTitle: personalData.jobTitle,
	description: personalData.seoDescription,
	url: seoData.siteUrl,
	sameAs: ["https://github.com/Chandresh726", "https://linkedin.com/in/chandresh726"],
	knowsAbout: personalData.expertise,
	alumniOf: {
		"@type": "EducationalOrganization",
		name: personalData.education.institution,
		url: personalData.education.institutionUrl
	}
};

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: seoData.siteTitle,
	description: seoData.description,
	url: seoData.siteUrl,
	author: {
		"@type": "Person",
		name: personalData.name
	},
	creator: {
		"@type": "Person",
		name: personalData.name
	},
	inLanguage: "en-US"
};

export function JsonLd() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
		</>
	);
}
