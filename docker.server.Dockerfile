# 使用 Node.js 官方镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/app

# 复制文件
COPY ./ ./

# 暴露应用端口
EXPOSE 3100

# 运行 NestJS 应用
CMD [ "yarn", "start:server" ]
