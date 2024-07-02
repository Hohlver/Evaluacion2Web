require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 2000,
    },
    mysql: {
        host: process.env.MYSQL_HOST || "",
        user: process.env.MYSQL_USER || "",
        password: process.env.MYSQL_PASS || "",
        database: process.env.MYSQL_DATABASE || ""
    }
}