import { spawn } from 'node:child_process';

const child = spawn('npx', ['next', 'dev', '-p', '3000', '-H', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PORT: '3000',
    HOSTNAME: '0.0.0.0',
  },
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
