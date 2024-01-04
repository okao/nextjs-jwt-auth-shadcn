/** @type {import('next').NextConfig} */
const nextConfig = {
  // headers: async () => [
  //   {
  //     // matching all API routes
  //     source: '/api/:path*',
  //     headers: [
  //       { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //       { key: 'Access-Control-Allow-Origin', value: '*' },
  //       {
  //         key: 'Access-Control-Allow-Methods',
  //         value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  //       },
  //       {
  //         key: 'Access-Control-Allow-Headers',
  //         value:
  //           'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //       },
  //     ],
  //   },
  // ],
  // async redirects() {
  //   return [
  //     {
  //       source: '/api/google',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google/google`,
  //       permanent: false,
  //       basePath: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
