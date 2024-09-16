/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "userSession",
            value: "authenticated", // or any condition indicating the user is logged in
          },
        ],
        destination: "/home",
        permanent: false,
      },
      // Add logic to prevent redirecting when already on the desired page
      {
        source: "/cadastro",
        has: [
          {
            type: "cookie",
            key: "userSession",
            value: "authenticated",
          },
        ],
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
