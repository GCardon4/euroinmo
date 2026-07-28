import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://kpfvjnlclaucgmjkkyvh.supabase.co/storage/v1/object/public/**"),
    ],
  },
  async rewrites() {
    return [
      {
        // Keeps the original site's URL shape (e.g. /property-289) while the
        // actual route lives at the proper Next.js dynamic segment folder.
        source: "/property-:code",
        destination: "/property/:code",
      },
    ];
  },
};

export default nextConfig;
