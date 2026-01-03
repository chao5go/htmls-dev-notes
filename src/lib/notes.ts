// Note metadata and content types
export interface NoteMeta {
  id: string;
  title: string;
  category: string;
  tags: string[];
  date: string;
  excerpt: string;
}

export interface Note extends NoteMeta {
  content: string;
}

// Categories configuration
export const categories = [
  { id: 'html', name: 'HTML基础', icon: 'code', color: 'text-code-yellow' },
  { id: 'css', name: 'CSS样式', icon: 'palette', color: 'text-code-blue' },
  { id: 'javascript', name: 'JavaScript', icon: 'braces', color: 'text-code-pink' },
  { id: 'responsive', name: '响应式设计', icon: 'smartphone', color: 'text-terminal-green' },
  { id: 'performance', name: '性能优化', icon: 'zap', color: 'text-primary' },
  { id: 'tools', name: '开发工具', icon: 'wrench', color: 'text-muted-foreground' },
];

// Sample notes data
export const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'HTML5语义化标签详解',
    category: 'html',
    tags: ['HTML5', '语义化', '标签'],
    date: '2024-01-15',
    excerpt: '深入理解HTML5语义化标签的使用场景和最佳实践...',
    content: `# HTML5语义化标签详解

## 什么是语义化标签？

语义化标签是指能够清楚表达其内容含义的HTML标签。使用语义化标签可以让代码更具可读性，同时有利于SEO优化。

## 常用语义化标签

### header 标签
\`\`\`html
<header>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>
\`\`\`

### main 标签
用于包含页面的主要内容，每个页面只能有一个 \`<main>\` 标签。

### article 标签
表示独立的、完整的内容块，如博客文章、新闻报道等。

### section 标签
表示文档中的一个区域或章节。

### aside 标签
表示与页面主内容相关但可以独立存在的内容，如侧边栏。

### footer 标签
定义文档或区域的页脚。

## 使用建议

1. 根据内容含义选择合适的标签
2. 避免过度使用 \`<div>\` 和 \`<span>\`
3. 保持标签嵌套的逻辑性

> 语义化标签不仅让代码更清晰，还能提升网站的可访问性。
`
  },
  {
    id: '2',
    title: 'CSS Flexbox布局完全指南',
    category: 'css',
    tags: ['CSS', 'Flexbox', '布局'],
    date: '2024-01-12',
    excerpt: 'Flexbox是CSS3中强大的布局模式，让复杂布局变得简单...',
    content: `# CSS Flexbox布局完全指南

## Flex容器属性

### display: flex
将元素设置为flex容器：

\`\`\`css
.container {
  display: flex;
}
\`\`\`

### flex-direction
设置主轴方向：
- \`row\` - 水平方向（默认）
- \`column\` - 垂直方向

### justify-content
主轴对齐方式：
- \`flex-start\` - 起点对齐
- \`center\` - 居中对齐
- \`space-between\` - 两端对齐

### align-items
交叉轴对齐方式：
- \`stretch\` - 拉伸（默认）
- \`center\` - 居中

## Flex项目属性

### flex-grow
定义项目的放大比例：

\`\`\`css
.item {
  flex-grow: 1; /* 等分剩余空间 */
}
\`\`\`

### flex-shrink
定义项目的缩小比例。

### flex-basis
定义项目的初始大小。
`
  },
  {
    id: '3',
    title: 'JavaScript DOM操作入门',
    category: 'javascript',
    tags: ['JavaScript', 'DOM', '事件'],
    date: '2024-01-10',
    excerpt: '掌握DOM操作是前端开发的基础技能...',
    content: `# JavaScript DOM操作入门

## 选择元素

### getElementById
通过ID选择单个元素：

\`\`\`javascript
const element = document.getElementById('myId');
\`\`\`

### querySelector
使用CSS选择器选择元素：

\`\`\`javascript
const element = document.querySelector('.myClass');
const elements = document.querySelectorAll('div.item');
\`\`\`

## 修改元素

### 修改文本内容
\`\`\`javascript
element.textContent = '新内容';
element.innerHTML = '<strong>HTML内容</strong>';
\`\`\`

### 修改样式
\`\`\`javascript
element.style.color = 'red';
element.classList.add('active');
\`\`\`

## 事件处理

\`\`\`javascript
element.addEventListener('click', function(event) {
  console.log('元素被点击了');
});
\`\`\`
`
  },
  {
    id: '4',
    title: '移动端响应式设计技巧',
    category: 'responsive',
    tags: ['响应式', '移动端', 'Media Query'],
    date: '2024-01-08',
    excerpt: '创建适配各种设备的响应式网页设计方案...',
    content: `# 移动端响应式设计技巧

## 视口设置

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

## 媒体查询

### 基本语法
\`\`\`css
@media screen and (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
\`\`\`

### 常用断点
- 手机：< 640px
- 平板：640px - 1024px
- 桌面：> 1024px

## 弹性单位

使用相对单位代替固定像素：
- \`rem\` - 相对于根元素
- \`em\` - 相对于父元素
- \`%\` - 百分比
- \`vw/vh\` - 视口单位
`
  },
  {
    id: '5',
    title: '前端性能优化实践',
    category: 'performance',
    tags: ['性能', '优化', '加载速度'],
    date: '2024-01-05',
    excerpt: '提升网页加载速度和用户体验的关键优化策略...',
    content: `# 前端性能优化实践

## 资源优化

### 图片优化
- 使用WebP格式
- 实现懒加载
- 使用适当尺寸的图片

\`\`\`html
<img loading="lazy" src="image.webp" alt="描述">
\`\`\`

### 代码压缩
- 压缩JavaScript和CSS
- 移除未使用的代码
- 使用Tree Shaking

## 加载策略

### 预加载关键资源
\`\`\`html
<link rel="preload" href="critical.css" as="style">
\`\`\`

### 延迟非关键脚本
\`\`\`html
<script defer src="app.js"></script>
\`\`\`

## 缓存策略

合理设置HTTP缓存头，利用浏览器缓存提升重复访问速度。
`
  },
  {
    id: '6',
    title: 'VS Code前端开发配置',
    category: 'tools',
    tags: ['VS Code', '配置', '插件'],
    date: '2024-01-03',
    excerpt: '打造高效的前端开发环境，推荐必装插件和配置...',
    content: `# VS Code前端开发配置

## 必装插件

### 代码格式化
- **Prettier** - 代码格式化工具
- **ESLint** - JavaScript代码检查

### 开发效率
- **Auto Rename Tag** - 自动重命名配对标签
- **Path Intellisense** - 路径自动补全
- **Live Server** - 本地开发服务器

### 主题与图标
- **One Dark Pro** - 流行的深色主题
- **Material Icon Theme** - 文件图标

## 推荐配置

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
\`\`\`

## 快捷键

- \`Ctrl/Cmd + P\` - 快速打开文件
- \`Ctrl/Cmd + Shift + P\` - 命令面板
- \`Alt + 上/下\` - 移动行
`
  },
];

// Get notes by category
export function getNotesByCategory(categoryId: string): Note[] {
  if (categoryId === 'all') return sampleNotes;
  return sampleNotes.filter(note => note.category === categoryId);
}

// Get note by id
export function getNoteById(id: string): Note | undefined {
  return sampleNotes.find(note => note.id === id);
}

// Get category by id
export function getCategoryById(id: string) {
  return categories.find(cat => cat.id === id);
}
