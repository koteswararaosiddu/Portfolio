import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Siddu Koteswara Rao | Technical Lead & Senior Full Stack Developer",
  description:
    "Technical Lead and Senior Full Stack Developer with 6+ years of experience building scalable enterprise applications using React.js, Next.js, Node.js, NestJS, MongoDB, Microservices, Cloud Technologies, AI Automation, and DevOps. Specialized in enterprise architecture, workflow automation, API integrations, and high-performance web applications.",

  authors: [
    {
      name: "Siddu Koteswara Rao",
    },
  ],

  creator: "Siddu Koteswara Rao",

  openGraph: {
    title: "Siddu Koteswara Rao | Technical Lead & Senior Full Stack Developer",
    description:
      "Portfolio showcasing enterprise applications, microservices, AI automation, cloud solutions, workflow automation, and scalable web development projects.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
