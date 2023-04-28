# [pnpm](https://pnpm.io/zh/feature-comparison)
1. 如果你用到了某依赖项的不同版本，只会将不同版本间有差异的文件添加到仓库。
2. 当软件包被被安装时，包里的文件会硬链接到这一位置[node_modules/.pnpm]，而不会占用额外的磁盘空间，可跨项目地共享同一版本的依赖。
```sh
pnpm install // 别名 pnpm i
pnpm add <pkg>
pnpm update // 别名 pnpm up
pnpm up xx@xx
pnpm remove // 别名 rm uninstall un
pnpm <cmd>
pnpm run <cmd>
pnpm start == pnpm run start
pnpm test == pnpm run test
pnpm create
```

## 配置
```sh
pnpm config list
pnpm config set
pnpm config get
```
