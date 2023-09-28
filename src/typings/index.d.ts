namespace Enum {
  /**
   * 程序运行环境
   *
   * 与 package.json script 配置的 MIDWAY_SERVER_ENV 和 app.getEnv() 存在值保持一致
   */
  const enum Env {
    /**
     * 本地开发环境
     */
    local = 'local',
    /**
     * 生产环境
     */
    prod = 'prod',
  }

  /**
   * 中间件名
   *
   * - egg 方式定义的中间件引用名必须是文件名的 camelCase 写法
   * - midway 方式定义的中间件引用名必须是 \@Provide() 的类的标识名
   */
  const enum Middleware {
    errorHandler = 'errorHandlerMiddleware',
    jwtAuth = 'jwtAuthMiddleware',
    /**
     * 路由级中间件，用于 腾讯云验证码 验证请求是否合法
     *
     * 接收 request.body['ticket']、request.body['randstr'] 和 ctx.ip，且校验字段合法性（不能为空）
     *
     * 发送验证请求，请求成功后（无论验证成功或失败）记录一条 captcha 服务响应的数据日志
     *
     * 验证失败抛错 access forbidden
     */
    captcha = 'captchaMiddleware',
    // api 频率限制
    ratelimit = 'ratelimitMiddleware',
    // TODO: 权限系统实现后移除
    /**
     * 临时的 console 后台管理权限校验中间件
     */
    tempPermissions = 'tempPermissionsMiddleware',

    /**
     * 记录用户最后访问时间
     */
    latestVisitTime = 'latestVisitTimeMiddleware',

    /**
     * 用于在响应头中设置客户端当前版本号
     */
    clientVersion = 'clientVersionMiddleware',
  }

  /**
   * HTTP 响应状态码
   */
  const enum HTTPCode {
    ok = 200,

    /**
     * 服务器成功处理了请求，但没有返回任何内容。
     */
    noContent = 204,
    /**
     * 由于明显的客户端错误（例如，格式错误的请求语法，太大的大小，无效的请求消息或欺骗性路由请求），服务器不能或不会处理该请求。
     */
    badRequest = 400,
    /**
     * 参见：[HTTP基本认证](https://zh.wikipedia.org/wiki/HTTP%E5%9F%BA%E6%9C%AC%E8%AE%A4%E8%AF%81)、[HTTP摘要认证](https://zh.wikipedia.org/wiki/HTTP%E6%91%98%E8%A6%81%E8%AE%A4%E8%AF%81)
     *
     * 类似于403 Forbidden，401语义即“[未认证](https://zh.wikipedia.org/wiki/%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81)”，即用户没有必要的凭据。该状态码表示当前请求需要用户验证。该响应必须包含一个适用于被请求资源的WWW-Authenticate信息头用以询问用户信息。客户端可以重复提交一个包含恰当的Authorization头信息的请求。如果当前请求已经包含了Authorization证书，那么401响应代表着服务器验证已经拒绝了那些证书。如果401响应包含了与前一个响应相同的身份验证询问，且浏览器已经至少尝试了一次验证，那么浏览器应当向用户展示响应中包含的实体信息，因为这个实体信息中可能包含了相关诊断信息。
     *
     * 注意：当网站（通常是网站域名）禁止IP地址时，有些网站状态码显示的401，表示该特定地址被拒绝访问网站。
     */
    unauthorized = 401,
    /**
     * 该状态码是为了将来可能的需求而预留的。该状态码最初的意图可能被用作某种形式的数字现金或在线支付方案的一部分，但几乎没有哪家服务商使用，而且这个状态码通常不被使用。如果特定开发人员已超过请求的每日限制，[Google Developers API](https://zh.wikipedia.org/wiki/Google_Developers)会使用此状态码。
     */
    paymentRequired = 402,
    /**
     * 服务器已经理解请求，但是拒绝执行它。与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。如果这不是一个HEAD请求，而且服务器希望能够讲清楚为何请求不能被执行，那么就应该在实体内描述拒绝的原因。当然服务器也可以返回一个404响应，假如它不希望让客户端获得任何信息。
     */
    forbidden = 403,
    /**
     * 请求失败，请求所希望得到的资源未被在服务器上发现，但允许用户的后续请求。没有信息能够告诉用户这个状况到底是暂时的还是永久的。假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下。
     */
    notFound = 404,
    /**
     * 参见：[内容协商](https://zh.wikipedia.org/wiki/%E5%86%85%E5%AE%B9%E5%8D%8F%E5%95%86)请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体，该请求不可接受。除非这是一个HEAD请求，否则该响应就应当返回一个包含可以让用户或者浏览器从中选择最合适的实体特性以及地址栏表的实体。实体的格式由Content-Type头中定义的媒体类型决定。浏览器可以根据格式及自身能力自行作出最佳选择。但是，规范中并没有定义任何作出此类自动选择的标准。
     */
    notAcceptable = 406,
    /**
     * 请求存在冲突
     */
    conflict = 409,
    /**
     * **资源永久丢失，客户端会缓存，谨慎使用**
     *
     * 表示所请求的资源不再可用，将不再可用。当资源被有意地删除并且资源应被清除时，应该使用这个。在收到410状态码后，用户应停止再次请求资源。[[39]](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81#404)但大多数服务端不会使用此状态码，而是直接使用404状态码。
     */
    gone = 410,
    /**
     * 服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个。这个状态码允许客户端在获取资源时在请求的元信息（请求头字段数据）中设置先决条件，以此避免该请求方法被应用到其希望的内容以外的资源上。
     */
    preconditionFailed = 412,
    /**
     * 在请求头Expect中指定的预期内容无法被服务器满足，或者这个服务器是一个代理服显的证据证明在当前路由的下一个节点上，Expect的内容无法被满足。
     */
    expectationFailed = 417,
    /**
     * 非官方，Laravel 框架使用。
     *
     * The 419 HTTP Status Code is generated as a result of a CSRF token verification failure, a misconfigured cache, misconfigured permissions, incorrect session settings, and other factors. Laravel is designed to be an HTTP-driven application by default.
     */
    pageExpired = 419,
    /**
     * 请求格式正确，但是由于含有语义错误，无法响应
     *
     * 常用于字段校验
     */
    unprocessableEntity = 422,
    /**
     * 当前资源被锁定。
     */
    locked = 423,
    /**
     * 用户在给定的时间内发送了太多的请求
     */
    tooManyRequests = 429,
    /**
     * 包含敏感 | 违禁内容
     */
    includeSensitiveContent = 452,
    /**
     * 通用错误消息，服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。没有给出具体错误信息。
     *
     * error-handler 中间件针对请求的 500 错误做了特殊处理，会发送一条报错消息（给企业微信消息通知群）。
     */
    internalServerError = 500,
    /**
     * 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
     */
    badGateway = 502,
  }

  /**
   * 按使用平台定义身份认证的 jwt 名称
   *
   * 用于 cookie name 或其他标识 authentication jwt 的场景
   */
  const enum AuthJwtName {
    // at_<xx> means AuthToken_<console|www|client>
    console = 'at_cs',
    www = 'at_ww',
    pc = 'at_pc',
    app = 'at_app',
  }
}
