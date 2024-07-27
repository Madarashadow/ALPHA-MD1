const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUc3VzNxTmZrTU5WZCtwSitPTDY5VzA3T051WUd0dll0VFIwQXIvcVJYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3JNNks4NHJscy8vR0VzYTdFMmtYcjI0K2U2NzB2ajRGM0JnSitBQXVRWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TmJoMUY1OFludXZYL0UrT2dHVDcrMFVIRXJ3bGtjWEowa1lqcXpyREc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQOVd6MUtiNjNFbWlPQXRqWjFxL09BekxCRmRSaHRIa2t2bFppTkMra2pVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZHYTVxSzAvN1krUU44ZCtHZ0NSVm1STFEvY2g1YzlUWkQrWUdvMHZLbWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZrQllKYk1LT0Q4eWNXM0pyT0JuM2Z5NXJFaCtyVmdydTRRZmVuVDMrRGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVURlZmR3R1QrcWk5d3paTEJNWnpYb2NlWSt0ejZQMi9VOHhLQ1MvVlBsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWElWUjZNYU1XcnVsTnRkVUMyaWowY2lWaTc3M3JrSmgxMmMrd2NRcXJsYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InYveG1YN21OYjVNaTUrM1FOSGl1NU1hSm84WkJoWTlXZ0VrVllWcVN6bWFNVEtJdmltTW4xZElZeDd2TUF2T2lOL2VKOW11SVAzbXNqVEFObmhLTUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJtUnN4ZzhQeTM5dWVyUjdqMGxWTkgveTVPTnZ1SXk5RXNrdHZEQXpYR1dnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZNXhDZGhfNlRYLXlxV3hNelVWYXNBIiwicGhvbmVJZCI6IjYzOTc0NjFiLTBlYmEtNDQyOC1hNzdlLWNhYzUzMWFmMGUxMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNcjJRcHZldHNHUlJtbkoya1MxUmwvRCtxWU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDBSTUhDZ1pSQmM0ZThqMDBiMXpMVXo2eFVnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJLSEhZTkc2IiwibWUiOnsiaWQiOiIyMjU2ODQxNTE5NjoyM0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLqp4Hwk4qI8JKGnPCdkJLwnZqu8J2aq/CdkIPwnZqv8J2QliDwnZCD8J2atfCdm4HwnZqw8J2QiyfwnZCSIPCShpzwk4qJ6qeCIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPS0I2YndCRVAvdms3VUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3QlpSWnhGdGxhbVRWR2luYzU3Nit4V283a3Y5NEV4TnByaDNFNlZTUEE4PSIsImFjY291bnRTaWduYXR1cmUiOiJIWkN1WkRHVHFuUjhmdEdjQWhIY1FobmQramtRUlloN3czOHRZS0dMOSsrRXMxeDgrU2ZwSVZyY1FmR0UrMWMybUt0bEVMYTRMb1lidnQ4eExOWnpDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR0Z0cWcyZ09VTC9JQ2ZtSnJoc1EvSTMvTEdJZGR6UlRNcUV1NW9iL3NEenY1OGN1dFRTTll1MHpiK1VLbnFqVVhrOEhMbFV5eG1ZVzhOSDhWZlZkREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjU2ODQxNTE5NjoyM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJld1dVV2NSYlpXcGsxUm9wM09lK3ZzVnFPNUwvZUJNVGFhNGR4T2xVandQIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMDg3NDM3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJFcCJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "꧁𓊈𒆜𝐒𝚮𝚫𝐃𝚯𝐖 𝐃𝚵𝛁𝚰𝐋'𝐒 𒆜𓊉꧂",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2250768415196",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'oui',
    BOT : process.env.BOT_NAME || 'ALPHA-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
