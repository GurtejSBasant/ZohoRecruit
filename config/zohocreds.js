const dotnev = require("dotenv")

dotnev.config()


console.log("test:",process.env.ZOHO_CLIENT_ID)

module.exports = {
    ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
    ZOHO_RECRUIT_API_URL: process.env.ZOHO_RECRUIT_API_URL,
    ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL
};
