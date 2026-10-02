import Link from "next/link";
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import light_mode from "@/images/light_mode.png";
import dark_mode from "@/images/dark_mode.png";
import logo from "@/images/tyoleirifi.png";
import valikko from "@/images/menu_background.png";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";

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
    <PlausibleProvider src="https://analytics.motunix.fi/js/pa-mq8j4yK0ezZlwqjPDUBZR.js">
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
          <div
            className="backdrop-blur-sm"
            style={{
              position: "fixed",
              height: "101vh",
              zIndex: "-9",
              width: "100%",
            }}
          ></div>
          <Image
            src={light_mode}
            className="light-bg"
            alt="Taustakuvana maisema minecraft maailmasta"
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              position: "fixed",
              height: "101vh",
              zIndex: "-10",
            }}
          />
          <Image
            src={dark_mode}
            className="dark-bg"
            alt="Taustakuvana maisema minecraft maailmasta"
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              position: "fixed",
              height: "101vh",
              zIndex: "-10",
            }}
          />
          <div className="@container w-full flex flex-col items-center px-2 sm:px-4 py-6 gap-4">
            <Image
              src={logo}
              className={
                "max-h-[3rem] lg:max-h-[5rem] object-contain brightness-110 dark:brightness-90"
              }
              alt="Minecraft yhteisöpalvelimen logo"
            />

            <div className="w-full h-fit min-h-[calc(100dvh-10rem)] z-10 flex flex-col lg:flex-row lg:justify-center gap-8">
              <header className="w-full lg:max-w-sm">
                <div className="relative lg:aspect-square sm:aspect-auto lg:aspect-square w-full p-6 text-white rounded-sm shadow-lg justify-center sm:justify-start flex flex-col items-center overflow-hidden">
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
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center md:justify-normal text-xl lg:pt-18">
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
              </header>
              <main className="w-full h-fit min-h-60 py-8 px-8 flex flex-col gap-5 relative rounded-sm bg-white/80 dark:bg-[#0e0e0ed6] backdrop-blur-sm dark:backdrop-grayscale-0 overflow-hidden text-tumma dark:text-[#db9c5a] max-w-7xl">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </PlausibleProvider>
  );
}
