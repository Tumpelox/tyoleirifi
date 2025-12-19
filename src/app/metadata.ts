import { Metadata } from "next";

const metadata: Metadata = {
  title: "Työleiri.fi - Minecraft yhteisö",
  description:
    "Työleiri.fi on laajennetun kaveripiirin Minecraft yhteisöpalvelin, jossa vallitsee äärimmmäinen kapitalismi ja yhteisöllisyys.",
  authors: [{ name: "Pelipauppi" }],
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Työleiri.fi - Minecraft yhteisö",
    description:
      "Työleiri.fi on laajennetun kaveripiirin Minecraft yhteisöpalvelin, jossa vallitsee äärimmmäinen kapitalismi ja yhteisöllisyys.",
    siteName: "Työleiri.fi",
    // url: "https://www.tyoleiri.fi",
    locale: "fi_FI",
    type: "website",
  },
};

export default metadata;
