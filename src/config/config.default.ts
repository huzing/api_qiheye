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
    security: {
      domainWhiteList: ['localhost', 'huzing.cn'],
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
