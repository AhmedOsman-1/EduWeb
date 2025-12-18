/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
            {
                protocol: "https",
                hostname: "example.com",
            },
            {               
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

module.exports = nextConfig;
