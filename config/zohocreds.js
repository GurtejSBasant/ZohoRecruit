const dotnev = require("dotenv")

dotnev.config()


console.log("Id:",process.env.ZOHO_CLIENT_ID)
console.log("secret:",process.env.ZOHO_CLIENT_SECRET)
console.log("token:",process.env.ZOHO_REFRESH_TOKEN)
console.log("test:",process.env.ZOHO_ACCOUNTS_URL)

module.exports = {
    ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
    ZOHO_RECRUIT_API_URL: process.env.ZOHO_RECRUIT_API_URL,
    ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL
};
