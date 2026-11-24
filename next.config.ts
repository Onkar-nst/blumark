import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Keep links to the old Wix site working
  async redirects() {
    const to = (category: string) => `/services?category=${category}`;
    return [
      { source: "/services-5", destination: to("pallet-trucks"), permanent: true },
      { source: "/stacker", destination: to("stackers"), permanent: true },
      { source: "/lift-tables-and-access-lift", destination: to("order-pickers"), permanent: true },
      { source: "/scissor-type-platform", destination: to("scissor-platforms"), permanent: true },
    ];
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
