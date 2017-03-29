'use strict';

let settings = {},
  env = process.env.NODE_ENV || 'development'
;

// Password should be min 8 max 30 character,
// should contains lower and uppercase characters
// and min one of !@#$%^&+_{}'";,?<>
settings.user = {
  passwordPattern: /(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;&quot;:;'?/&gt;.&lt;,]).*$/,
  saltRounds: 15
};

settings.app = {
  appName: 'MySql Sample Backend',
  port: process.env.PORT || 3000,
  env: env,
  secure: {
    jwt: 'jwt-password',
    prefix: ['/api/']
  }
};


switch (env) {
  case 'production':
    settings.db = {
      "client": "mysql",
      "connection": {
        "host": process.env.dbHost,
        "user": process.env.dbUser,
        "password": process.env.dbPassword,
        "database": process.env.database,
        "charset": "utf8",
        "timezone": "UTC",
      },
      "debug": false,
      pool: {
        min: 0,
        max: 10 ,
        evictionRunIntervalMillis: 1000 * 60 * 60,  // 1 hour
        softIdleTimeoutMillis: 1000 * 60 * 30, // 30 min
        idleTimeoutMillis: 1000 * 60 * 30 // 30 min
      }
    };

    break;

  default:
    settings.db = {
      "client": "mysql",
      "connection": {
        "host": process.env.dbHost,
        "user": process.env.dbUser,
        "password": process.env.dbPassword,
        "database": process.env.database,
        "charset": "utf8",
        "timezone": "UTC"
      },
      "debug": true,
      pool: {
        min: 0,
        max: 10 ,
        evictionRunIntervalMillis: 1000 * 60 * 60,  // 1 hour
        softIdleTimeoutMillis: 1000 * 60 * 30, // 30 min
        idleTimeoutMillis: 1000 * 60 * 30 // 30 min
      }
    };
    break;
}

exports = module.exports = settings;
