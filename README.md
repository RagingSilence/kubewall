# kubewall

[Install](https://github.com/kubewall/kubewall?tab=readme-ov-file#battery-install)
| [Guide](https://github.com/kubewall/kubewall?tab=readme-ov-file#books-guide)
| [Releases](https://github.com/kubewall/kubewall/releases)
| [Source Code](https://github.com/kubewall/kubewall)

A single binary to manage your multiple kubernetes clusters.

**kubewall** provides a simple and rich real time interface to manage and investigate your clusters.


**Key features of KubeWall include:**

* **Single binary deployment:** KubeWall can be easily deployed as a single binary, eliminating the need for complex configurations.
* **Browser-based access:** KubeWall can be accessed directly from your favorite web browser, providing a seamless user experience.
* **Real-time cluster monitoring:** KubeWall offers a rich, real-time interface that displays the current state of your Kubernetes clusters, allowing you to quickly identify and address issues.
* **Cluster management:** KubeWall enables you to manage multiple Kubernetes clusters from a single pane of glass, reducing the overhead of switching between different tools and interfaces.
* **Detailed cluster insights:** KubeWall provides comprehensive insights into your Kubernetes clusters, manifest info of your pods, services, config and others.

# :movie_camera: Intro

![kubewall](/media/readme.jpg)

> [!Important]
> Please keep in mind that kubewall is still under active development.

# :battery: Install

#### Docker

```shell
docker run -p 7080:7080 -v kubewall:/.kubewall ghcr.io/kubewall/kubewall:latest
```

> To access local kind cluster you can use "--network host" docker flag.

#### Helm

```bash
helm install kubewall oci://ghcr.io/kubewall/charts/kubewall -n kubewall-system --create-namespace
```

> With helm kubewall runs on port `8443` with self-signed certificates. [see charts](https://github.com/kubewall/kubewall/tree/main/charts/kubewall)

#### Homebrew

```shell
brew install kubewall/tap/kubewall
```

#### Snap

```shell
sudo snap install kubewall
```

#### Arch Linux

```shell
yay -S kubewall-bin
```

#### Winget 

```shell
winget install --id=kubewall.kubewall -e
```

#### Scoop

```shell
scoop bucket add kubewall https://github.com/kubewall/scoop-bucket.git
scoop install kubewall
```

#### Binary

**MacOS**
[Binary](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Darwin_all.tar.gz) ( Multi-Architecture )

**Linux (Binaries)**
[amd64](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Linux_x86_64.tar.gz) | [arm64](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Linux_arm64.tar.gz) | [i386](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Linux_i386.tar.gz)

**Windows (Exe)**
[amd64](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Windows_x86_64.zip) | [arm64](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Windows_arm64.zip) | [i386](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Windows_i386.zip)

**FreeBSD (Binaries)**
[amd64](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Freebsd_x86_64.tar.gz) | [arm64](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Freebsd_arm64.tar.gz) | [i386](https://github.com/kubewall/kubewall/releases/latest/download/kubewall_Freebsd_i386.tar.gz)

Manually
Download the pre-compiled binaries from the [Release!](https://github.com/kubewall/kubewall/releases) page and copy them to the desired location or system path.

> [!TIP] 
> After installation, you can access **kubewall** at `http://localhost:7080`
>
>  If you're running it in a Kubernetes cluster or on an on-premises server, we recommend using **HTTPS**.
>  When not used over HTTP/2 SSE suffers from a limitation to the maximum number of open connections. [Mozzila](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)⤴
>
>  You can start **kubewall** with **HTTPS** using the following command:
>
> ```
> $ kubewall --certFile=/path/to/cert.pem --keyFile=/path/to/key.pem
> ```

# :books: Guide

### Flags

Since kubewall runs as binary there are few of flag you can use.

```shell
> kubewall --help

Usage:
  kubewall [flags]
  kubewall [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  version     Print the version of kubewall

Flags:
      --certFile string        absolute path to certificate file
  -h, --help                   help for kubewall
      --k8s-client-burst int   Maximum burst for throttle (default 50)
      --k8s-client-qps int     maximum QPS to the master from client (default 50)
      --keyFile string         absolute path to key file
      --no-open-browser        Do not open the default browser
  -p, --port string            port to listen on (default ":7080")

Use "kubewall [command] --help" for more information about a command.
```

### Setting up HTTPS locally

You can use your own certificates or create new local trusted certificates using [mkcert](https://github.com/FiloSottile/mkcert)⤴.

> [!Important]
> You'll need to install [mkcert](https://github.com/FiloSottile/mkcert)⤴ separately.

1. Install mkcert on your computer.
2. Run the following command in your terminal or command prompt:

`mkcert kubewall.test localhost 127.0.0.1 ::1`

3. This command will generate two files: a certificate file and a key file (the key file will have `-key.pem` at the end of its name).
4. To use these files with **kubewall**, use `--certFile=` and `--keyFile=` flags.

```shell
kubewall --certFile=kubewall.test+3.pem --keyFile=kubewall.test+3-key.pem
```

**When using Docker**

When using Docker, you can attach volumes and provide certificates by using specific flags. 

In the following example, we mount the current directory from your host to the `/.certs` directory inside the Docker container:

```shell
docker run -p 7080:7080 \
    -v kubewall:/.kubewall \
    -v $(pwd):/.certs \
    ghcr.io/kubewall/kubewall:latest \
    --certFile=/.certs/kubewall.test+3.pem \
    --keyFile=/.certs/kubewall.test+3-key.pem
```

### Custom Port

You can run **kubewall** on any port you like. by using `-p` or `--port` flag

```shell
kubewall -p 7080
```

## 前端主要文件概述

### 主要文件和功能
1. **`/client/index.html`**
   - 前端的入口 HTML 文件。
   - 定义了一个 `div` 容器（`id="root"`），用于挂载 React 应用。
   - 加载了主脚本文件 `/src/main.tsx`。

2. **`/client/src/main.tsx`**
   - React 应用的主入口文件。
   - 配置了全局的 Redux 状态管理和路由。
   - 使用 `ThemeProvider` 提供主题支持，并通过 `Toaster` 提供全局通知功能。
   - 渲染了 `RouterProvider`，用于管理应用的路由。

3. **`/client/src/KubeWall.tsx`**
   - 应用的核心组件，负责整体布局和导航。
   - 包含侧边栏（`Sidebar`）和主内容区域（`App` 或 `Outlet`）。
   - 通过 Redux 管理集群数据，并动态加载集群相关信息。
   - 提供了顶部导航和集群切换功能。

### 文件关系
- **`index.html`** 是整个前端的入口文件，加载了 `main.tsx`。
- **`main.tsx`** 初始化了应用的全局配置，包括 Redux、路由和主题，并渲染了 `KubeWall` 组件。
- **`KubeWall.tsx`** 是应用的核心组件，负责整体布局和导航逻辑，集成了侧边栏和主内容区域。
- 这些文件共同构成了前端的基础架构，确保应用能够正常加载和运行。

# 启动步骤

## 前端开发模式

1. 进入前端目录并安装依赖：
   ```bash
   cd client
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中访问 `http://localhost:5173`。

## 后端开发模式

1. 进入后端目录并构建后端：
   ```bash
   cd backend
   go build -o kubewall main.go
   ```

2. 启动后端：
   ```bash
   ./kubewall
   ```

3. 在浏览器中访问 `http://localhost:7080`。

## 集成模式

1. 构建前端：
   ```bash
   cd client
   npm run build
   ```

2. 将前端静态文件移动到后端：
   ```bash
   mv client/dist backend/routes/static
   ```

3. 启动后端：
   ```bash
   cd backend
   ./kubewall
   ```

4. 在浏览器中访问 `http://localhost:7080`。



# Contribution

This project welcomes your PR and issues. For example, refactoring, adding features, correcting English, etc.

If you need any help, you can contact us from the above Developers sections.

Thanks to all the people who already contributed and using the project.


# License

kubewall is licensed under [Apache License, Version 2.0](./LICENSE)
