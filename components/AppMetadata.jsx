const author = "Chandresh";
const description = "Portfolio website of Chandresh Kumar - Software Developer, Frontend Developer, and Web3 Developer";
const url = "https://portfolio.slope726.in/";

export const viewport = {
    colorScheme: "dark"
};

export const AppMetadata = {
    metadataBase: new URL("https://portfolio.slope726.in/"),
    title: {
        default: `Portfolio | ${author}`,
        template: `%s | ${author}`
    },
    description: description,
    icons: {
        icon: "/favicon.png"
    },
    manifest: "/manifest.json",
    keywords: [
        "Chandresh Kumar",
        "Software Developer",
        "Frontend developer",
        "Portfolio website",
        "Freelancer",
        "Web3 Developer"
    ],
    creator: author,
    authors: [{ name: author, url: url }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: url,
    },
    openGraph: {
        title: `${author} | Portfolio`,
        description: description,
        url: url,
        siteName: `${author} | Portfolio`,
        images: [
            {
                url: "https://portfolio.slope726.in/screenshot.webp",
                width: 1800,
                height: 1600,
                alt: "My personal portfolio website",
                type: 'image/webp',
            }
        ],
        locale: "en-US",
        type: "website"
    },
    twitter: {
        card: 'summary_large_image',
        title: `${author} | Portfolio`,
        description: description,
        images: [
            {
                url: "https://portfolio.slope726.in/screenshot.webp",
                alt: "My personal portfolio website"
            }
        ],
        creator: `@${author}`,
    }
};
