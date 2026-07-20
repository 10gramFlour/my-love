import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: ["400", "500", "600", "700"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Für Nadia – von Jakob",
  description: "Eine persönliche Liebeserklärung von Jakob an Nadia.",
  applicationName: "Für Nadia",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
  openGraph: { title: "Für Nadia – von Jakob", description: "Eine persönliche Liebeserklärung von Jakob an Nadia.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#100b0d" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="de" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
