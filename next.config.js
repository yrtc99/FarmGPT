/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_SECRET:"yMIEtJsTGoY7M2Oo0qrrJToAtN3OVmSYfopZOc3tamA=",
        API_URL_BLOOM: "https://uscc-farmgpt.ddnsking.com/qa_api/predict",
        // API_URL_GPT4ALL: "",
        API_CAL:"https://uscc-farmgpt.ddnsking.com/formula_api/formula/",
        VDB_URL: "https://uscc-farmgpt.ddnsking.com/vector_db/myPaperVDB",
      },
    experimental: {
        appDir: true,
    },
}


module.exports = nextConfig

