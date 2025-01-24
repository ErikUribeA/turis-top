import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const intl = createNextIntlPlugin()
const nextConfig = {
    images: {},
};  

export default intl(nextConfig);
