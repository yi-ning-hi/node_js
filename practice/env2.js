require('dotenv').config()
//dotenv 會尋找專案裡的.env
//require('dotenv').config({ path: '/custom/path/to/.env' })
//有可能有多個.env檔，path指定哪個.env的路徑

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
