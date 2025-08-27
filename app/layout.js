import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { dbConnect } from "@/service/mongo";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"], 
});

export const metadata = {
    title: "EduWeb - World of Education",
    description:
        "A platform for learning and education|| Explore|| Build || Share",
};

export default async function RootLayout({ children }) {

    return (
        <html lang="en">
            <body
                className={cn(inter.variable, poppins.variable, "antialiased")}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
