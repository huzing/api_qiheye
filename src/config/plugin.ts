import { EggPlugin } from 'egg';
export default {
  // static: false,
  cors: {
    enable: true,
    package: 'egg-cors',
  },
} as EggPlugin;
