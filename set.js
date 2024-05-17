const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZMdWIwNGdtTVBUNDkyZE0xS0gyemMzTFd4dWovc2NFZXd6QWRmbU5tUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFJ6TzBnNkJ5NnRnYlA4YlFQZjlOckNJTFBneXJWenoyeFNHZG9IMURCND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTEhNZjc4OEdlT2VDQjAvSWllLzc2eVc1ZVdMS3N4ejdYQ0pkb1VLd21ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRdWxzTm5nem0ydkJLam1NWHZFd1BjejFPSTV1aXUxUStoUlNIVVp6dUVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJeThmcDlnWXRUWkx4UkljV3NwaHAzSW5FdUJBQVRZZVJ4STNENDRlVk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd0djNTZU5WcXhPcmJ5WXdtRVRibGJzR1Frc0ZueXdERDZMWGRrVDZxa009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0JwMkNYakkzMUQ1cDF5SWhWWnBnMkFmNHcyeHNVbGt3Q2hqV1RMNjExZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJtRUp4OEZtQ01LZE5HUElPQWltYVE5MnViWmpINCt3TXNsRWtISFNuTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNGZ2UrTFNOeUJZL2Zva1B1TENZNGxwcXRzVjlxYUNWM0pIbVRacDJ4UEhMSVdLeVNhZHBBMG82SkVTUEE1ZTQxeUpEMnBJYmw4cm85TFZQSEZyNWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMxLCJhZHZTZWNyZXRLZXkiOiJJb1JFaytxdGxFb0NORDRMR1l5eXlkOW83Qlp1SGN5NE1LS1VwOFdwWjdjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ1Wk5RR09DUFFnS01nWmNjVlE4Z3lRIiwicGhvbmVJZCI6ImZiYTYzZjc3LTkwNDItNGMwYi1iZjU4LWE4MGMxYjMwMjg4NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRkZuUTBwdFNFWjJnY0xjR3FwN0RHYjJKTEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVhXcjdYYlhLb3prTXcrSHUxVmVLeXl0cFhrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpZMjVMTFdMIiwibWUiOnsiaWQiOiIyNTQxMTUxMDU0ODA6MTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRCBDYXNoeSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTytMNUpRSEVLaUxuYklHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieDJyRkg5WUFSdW1Yc29idWh1WE53ZTY5R1RQOTZucHArUlFVMnQyNWhrdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVjAvczZVaXYrUmZNaDNkMWNqZGE3Wmc3R1VENmRqNjJRNERaNzR6SGdoSHZIOE94REtVblluUXRIbEVMN1YzUEc2SHpFSWNZV0ZKZzJOem54TU1VRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IjZnZVgyQ3VJUHpnYlVva0RGZ2FkclFvL1dXeE43cGIwVE1kRStVb0M0NU9oWERFNU5uM1lHcE5xTmYrYUR3aVNlZWtrKzExSFdqVHlXSVZ1OXMxZGpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTE1MTA1NDgwOjE1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNkcXhSL1dBRWJwbDdLRzdvYmx6Y0h1dlJrei9lcDZhZmtVRk5yZHVZWk0ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTU5NDY5MzUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTnFzIn0=',
    PREFIXE: "#",
    OWNER_NAME: process.env.OWNER_NAME || "CashyD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254115105480",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Skipper-Md',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
