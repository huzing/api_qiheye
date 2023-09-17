import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1694620834040_4838',
    egg: {
      port: 7001,
    },
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // orm: {
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 123456,
    //   database: 'qiheye',
    //   synchronize: false,
    //   logging: 'all',
    //   maxQueryExecutionTime: 1000,
    // },
    security: {
      csrf: false,
      domainWhiteList: ['localhost', 'huzing.cn'],
    },
  } as MidwayConfig;
};
