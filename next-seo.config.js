import { websiteName, websiteUrl } from "lib/shared/sharedConstants";

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Rockethub",
  titleTemplate: "%s | ETH Entrepreneur Club",
  defaultTitle: "Rockethub",
  description: "Rockethub Startup Platform by ETH Entrepreneur Club",
  canonical: websiteUrl,
  openGraph: {
    url: websiteUrl,
    title: "Rockethub",
    description: "Rockethub Startup Platform by ETH Entrepreneur Club",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/rockethub-4e6bc.appspot.com/o/rockethubPageHeader.jpg?alt=media&token=9e979a63-ad3b-457a-b7d4-799f9036a633",
        alt: "rockethub og-image",
      },
    ],
    site_name: websiteName,
  },
};

export default defaultSEOConfig;
