import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans, sfBold } from "@/config/fonts";
import NavbarC from "@/components/navbar/Navbar";
import StatusIsland from "@/components/statusIsland/StatusIsland";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-thin-rounded/css/uicons-thin-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
        ></link>
      </head>
      <body
        className={clsx("min-h-screen bg-bgMain antialiased", sfBold.variable)}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* <StatusIsland /> */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              <Toaster position="top-left" />
              {children}
            </main>
            <NavbarC />
          </div>
        </Providers>
      </body>
    </html>
  );
}
