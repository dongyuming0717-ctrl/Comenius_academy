module.exports = {
  apps: [{
    name: 'online-proctoring',
    cwd: '/opt/online-proctoring/server',
    script: 'dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: '3001',
      DB_PATH: '/opt/online-proctoring/server/proctoring.db',
    },
    autorestart: true,
    max_memory_restart: '500M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: '/opt/online-proctoring/logs/error.log',
    out_file: '/opt/online-proctoring/logs/out.log',
  }],
};
