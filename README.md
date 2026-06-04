# Comenius.cn — 全部文件

## 文件夹说明

| 文件夹 | 内容 | 位置 |
|--------|------|------|
| `online-proctoring/` | **主项目源码**（当前版本，无 node_modules） | 本地 Desktop/Comenius academy |
| `online-proctoring-server-snapshot/` | 服务器当前部署的快照 | 服务器 /opt/online-proctoring |
| `all-projects-online-proctoring/` | 另一个本地副本 | Desktop/All-Projects |
| `comenius-academy-old/` | 旧项目副本 | ~/comenius-academy |
| `comenius-website/` | 旧版网站 HTML | Desktop/All-Projects/Comenius Website |
| `amos-ai/` | Amos AI 容器代码 | 服务器 /opt/amos |
| `papers/` | TMUA + CIE 试卷 PDF | 服务器 /opt/papers |
| `documents/` | John Locke、Econ PDF、请假单等 | 桌面零散文件 |

## 关键信息

- **域名**: comenius.cn
- **服务器**: 阿里云 ECS 47.100.86.4
- **数据库**: Supabase (xudhsltojyyzamhmmcei)
- **GitHub**: https://github.com/dongyuming0717-ctrl/Comenius_academy

## 恢复方式

```bash
cd online-proctoring/client
npm install
npm run dev    # 开发
npm run build  # 构建
```
