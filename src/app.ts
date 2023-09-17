import { createConnection } from 'typeorm';
import { UserEntity } from './entity/user';
createConnection({
  type: 'mysql',
  host: 'localhost', // 主机
  port: 3306, // 端口
  username: 'root', // 用户名
  password: 'admin123', // 密码
  database: 'qiheye', // 数据库
  synchronize: false, // 是否同步 ； 正式环境 不要打开， 因为 它会干掉你的数据
  entities: [UserEntity],
});
// .then(async (connect: Connection) => {
//   console.log('mysql connection succeeded !!', connect);
// })
// .catch(err => {
//   console.log(err);
// });
