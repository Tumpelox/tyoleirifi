import Link from "next/link";
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import tausta from "@/images/2025.png";
import logo from "@/images/tyoleirifi.png";
import valikko from "@/images/menu_background.png";
import { Viewport } from "next";

const inter = Playfair_Display({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#503218" },
    { media: "(prefers-color-scheme: dark)", color: "#231912" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fi">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className}`}>
        <Image
          src={tausta}
          alt="Taustakuvana maisema minecraft maailmasta"
          sizes="(min-width: 808px) 50vw, 100vw"
          className="dark:brightness-50"
          style={{
            objectFit: "cover",
            position: "fixed",
            height: "101vh",
            zIndex: "-10",
          }}
        />
        <div className="absolute w-full h-fit min-h-screen backdrop-blur-sm dark:backdrop-brightness-50 dark:backdrop-saturate-0 z-10 flex flex-col lg:flex-row pt-8 gap-8 lg:gap-4">
          <div className="px-4 px-4 lg:top-8 lg:left-4 lg:pb-4 lg:pr-4 lg:pt-0 lg:pl-0 lg:sticky sm:px-8 h-fit w-auto lg:aspect-square">
            <div className="w-full h-fit aspect-square sm:aspect-auto lg:aspect-square p-8 backdrop-blur-sm text-white rounded-sm shadow-lg flex flex-col overflow-hidden relative items-center lg:items-start">
              <Image
                src={valikko}
                alt="Valikon taustalla kuva minecraft puusta"
                sizes="(min-width: 808px) 50vw, 100vw"
                fill
                className="dark:brightness-50"
                style={{
                  objectFit: "cover",
                  position: "absolute",
                  zIndex: "-1",
                }}
              />
              <Image
                src={logo}
                className={"max-w-[250px]"}
                alt="Minecraft yhteisöpalvelimen logo"
              />
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center md:justify-normal mt-8 dark:ba">
                <Link
                  href={"/"}
                  className={
                    "drop-shadow-md hover:text-[#ffff39] hover:drop-shadow-xl hover:shadow-black"
                  }
                >
                  Etusivu
                </Link>
                <Link
                  href={"/kategoriat"}
                  className={
                    "drop-shadow-md hover:text-[#ffff39] hover:drop-shadow-xl hover:shadow-black"
                  }
                >
                  Kategoriat
                </Link>
                <Link
                  href={"/pelaajat"}
                  className={
                    "drop-shadow-md hover:text-[#ffff39] hover:drop-shadow-xl hover:shadow-black"
                  }
                >
                  Pelaajat
                </Link>
                <Link
                  href={"https://kartta.työleiri.fi"}
                  className={
                    "drop-shadow-md hover:text-[#ffff39] hover:drop-shadow-xl hover:shadow-black"
                  }
                >
                  Kartta
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-center mb-16 mx-4">
              <main className="@container w-full py-8 px-8 flex flex-col gap-5 relative rounded-sm bg-white/80 dark:bg-[#0e0e0ed6] backdrop-blur-sm dark:backdrop-grayscale-0 overflow-hidden text-tumma dark:text-[#db9c5a] max-w-7xl">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
