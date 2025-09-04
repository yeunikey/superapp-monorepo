import type { NextConfig } from "next";
import dotenv from 'dotenv';
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, './../../../.env') });


const nextConfig: NextConfig = {
    devIndicators: false
};

export default nextConfig;
