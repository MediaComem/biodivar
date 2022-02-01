export const setupConfig = () => {
    process.env.DATABASE_URL = "file:./test.db??timeout=5000";
    process.env.URL_PREFIX = "/api/v1";
}
