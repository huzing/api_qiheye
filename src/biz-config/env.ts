import { strict as assert } from 'node:assert';
import { config as dotEnvConfig } from 'dotenv';

/**
 * 通过 `dotEnv` 获取 `.env` 文件中设置的变量并添加到全局
 *
 * 可通过 `global.QIHEYE_ENV` 访问
 */
export function bindEnv() {
  if (global.QIHEYE_ENV) {
    return;
  }

  const result = dotEnvConfig({
    path:
      process.env.MIDWAY_SERVER_ENV === Enum.Env.prod
        ? undefined
        : '.env.local',
  });

  if (result.error) {
    throw result.error;
  }

  const parsedResult = result.parsed as unknown as Record<
    keyof QiheyeEnv,
    string
  >;

  // parsedResult 中所有已定义名称的变量的值均为字符串，未定义值的变量 parse 后值为空字符串
  // 声明但未在 .env 定义的变量值将为 undefined，使用变量时会导致运行时错误
  // 通过枚举变量然后 assert，在编译期发现可能存在的未定义变量，确保运行时所有被使用的变量均已经定义
  global.QIHEYE_ENV = {
    QHY_MYSQL_HOST: parsedResult.QHY_MYSQL_HOST,
    QHY_MYSQL_PORT: toNumber(parsedResult.QHY_MYSQL_PORT, 'QHY_MYSQL_PORT'),
    QHY_MYSQL_USERNAME: parsedResult.QHY_MYSQL_USERNAME,
    QHY_MYSQL_PASSWORD: parsedResult.QHY_MYSQL_PASSWORD,
    QHY_MYSQL_DATABASE: parsedResult.QHY_MYSQL_DATABASE,
    QHY_TYPEORM_SYNC:
      parsedResult.QHY_TYPEORM_SYNC === '0' ||
      parsedResult.QHY_TYPEORM_SYNC === 'false'
        ? false
        : !!parsedResult.QHY_TYPEORM_SYNC,
    // QHY_PROXY_COUNT: toNumber(parsedResult.QHY_PROXY_COUNT, 'QHY_PROXY_COUNT'),
    // QHY_DATACENTER: toNumber(parsedResult.QHY_DATACENTER, 'QHY_DATACENTER'),
    // QHY_WORKER: toNumber(parsedResult.QHY_WORKER, 'QHY_WORKER'),
    // QHY_EGG_KEYS: parsedResult.QHY_EGG_KEYS,
    // QHY_REDIS_HOST: parsedResult.QHY_REDIS_HOST,
    // QHY_REDIS_PORT: toNumber(parsedResult.QHY_REDIS_PORT, 'QHY_REDIS_PORT'),
    // QHY_REDIS_PASSWORD: parsedResult.QHY_REDIS_PASSWORD,
    // QHY_REDIS_DB: toNumber(parsedResult.QHY_REDIS_DB, 'QHY_REDIS_DB'),
    // QHY_QYWEIXIN_CORPSECERT: parsedResult.QHY_QYWEIXIN_CORPSECERT,
    // QHY_WEIXIN_APPID: parsedResult.QHY_WEIXIN_APPID,
    // QHY_WEIXIN_APPSECRET: parsedResult.QHY_WEIXIN_APPSECRET,
  };

  for (const [key, value] of Object.entries(global.QIHEYE_ENV)) {
    assert(value !== undefined, `${key} is declared but not defined in .env`);
  }
}

function toNumber(value: string | undefined, key: string) {
  const ret = Number(value === '' ? undefined : value);
  assert(!isNaN(ret), `${key} is not a number`);
  return ret;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      /**
       * .env 设置的环境变量，未设置值为空字符串
       */
      QIHEYE_ENV: QiheyeEnv;
    }
  }
}

/**
 * .env 变量声明
 */
declare interface QiheyeEnv {
  /**
   * 数据库配置
   *
   * **强烈建议本地开发只用本地数据库**
   */
  QHY_MYSQL_HOST: string;
  QHY_MYSQL_PORT: number;
  QHY_MYSQL_USERNAME: string;
  QHY_MYSQL_PASSWORD: string;
  QHY_MYSQL_DATABASE: string;

  /**
   * 是否开启 typeorm 的 synchronize 选项，生产环境必须关闭
   *
   * 本地开发环境中，如果第一次使用，不存在表，有同步的需求可以写 true
   *
   * `.env` 文件定义 `0`, `false` 或不定义值为 false，否则为 true
   */
  QHY_TYPEORM_SYNC: boolean;

  /**
   * 数字字符串，表示位于几层代理之后，例如 nginx、阿里云 SLB、cloudflare、百度云加速等，用于获取请求真实 ip
   */
  // QHY_PROXY_COUNT: number;

  /**
   * 数据中心 id，主要用于 snowflake id 生成
   */
  // QHY_DATACENTER: number;
  /**
   * 机器 id，主要用于 snowflake id 生成
   */
  // QHY_WORKER: number;

  /**
   * egg keys for EggAppConfig.keys
   *
   * 开发环境/测试环境/生产环境密钥**禁止**相同，否则安全性难以保证
   */
  // QHY_EGG_KEYS: string;

  // QHY_REDIS_HOST: string;
  // QHY_REDIS_PORT: number;
  // QHY_REDIS_PASSWORD: string;
  // QHY_REDIS_DB: number;

  /**
   * **[保密]** 企业微信 corpsecret
   */
  // QHY_QYWEIXIN_CORPSECERT: string;

  /**
   * 微信公众号 - 开发者 ID
   */
  // QHY_WEIXIN_APPID: string;
  /**
   * **[保密]** 微信公众号 - 开发者密码
   */
  // QHY_WEIXIN_APPSECRET: string;
}
