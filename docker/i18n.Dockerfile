# 指定基础镜像版本，确保每次构建都是幂等的
FROM node:20.17-alpine

ARG APP=i18n
ENV APP=${APP}

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 添加依赖
RUN apk add curl vips-dev fftw-dev --update-cache

# 如果需要是用 TZ 环境变量 实现时区控制，需要安装 tzdata 这个包
# debian 的基础镜像默认情况下已经安装了 tzdata，而 ubuntu 并没有
# RUN apk add --no-cache tzdata

ENV NODE_ENV production

# Docker 容器不推荐用 root 身份运行
# 这边先建立一个特定的用户和用户组，为它分配必要的权限，使用 USER 切换到这个用户
# 注意，如果不是 root 权限，对于可执行文件，需要修改权限，确保文件可以执行
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 设置时区
# 在使用 Docker 容器时，系统默认的时区就是 UTC 时间（0 时区），和我们实际需要的北京时间相差八个小时
ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8 TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install -g pm2 pnpm

WORKDIR /app
COPY ./ ./

RUN pnpm install -y
RUN pnpm build:${APP}

USER nextjs

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# 默认暴露 80 端口
EXPOSE 3000

CMD ["sh", "-c", "pm2-runtime pnpm -- start:${APP}"]