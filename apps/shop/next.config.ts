import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";



const nextConfig: NextConfig = {
    cacheComponents: false,
};

const configWithAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",

})(nextConfig);

export default configWithAnalyzer;
