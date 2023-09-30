import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';
import { bindEnv } from '../biz-config/env';

export type DefaultConfig = PowerPartial<EggAppConfig>;

/**
 * Place dotenv here.
 *
 * @link https://eggjs.org/en/advanced/loader.html#file-order
 * @link https://github.com/eggjs/egg/issues/3958
 */
bindEnv();

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1695566208674_2398';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.orm = {
    type: 'mysql',
    host: global.QIHEYE_ENV.QHY_MYSQL_HOST, // 主机
    port: global.QIHEYE_ENV.QHY_MYSQL_PORT, // 端口
    username: global.QIHEYE_ENV.QHY_MYSQL_USERNAME, // 用户名
    password: global.QIHEYE_ENV.QHY_MYSQL_PASSWORD, // 密码
    database: global.QIHEYE_ENV.QHY_MYSQL_DATABASE, // 数据库
    synchronize: global.QIHEYE_ENV.QHY_TYPEORM_SYNC, // 是否同步 ； 正式环境 不要打开， 因为 它会干掉你的数据 // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: 'all',
    maxQueryExecutionTime: 1000,
  } as ConnectionOptions;

  config.security = {
    csrf: false,
    domainWhiteList: ['localhost', 'www.huzing.cn'],
  };

  return config;
};
