import { EggPlugin } from 'egg';
import 'reflect-metadata';
export default {
  // static: false,
  cors: {
    enable: true,
    package: 'egg-cors',
  },
} as EggPlugin;
