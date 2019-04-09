module.exports = {
  apps : [{
    name: 'API',
    script: 'app/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'oleg',
      host : '95.216.221.24',
      ref  : 'origin/master',
      repo : 'git@github.com:oleglukashev/iwantjob_api.git',
      path : '/www/iwantjob_api',
      'post-deploy' : 'yarn && pm2 reload ecosystem.config.js --env production'
    }
  }
};
