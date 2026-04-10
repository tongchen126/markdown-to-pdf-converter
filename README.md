# 快速开始指南

## 一分钟上手

### 步骤 1：进入工具目录

```bash
cd markdown-to-pdf-converter
```

### 步骤 2：转换文档

```bash
# 转换上级目录的 Markdown 文件
node md2pdf.js ../your_document.md

# 或使用 Windows 批处理
convert.bat ..\your_document.md
```

---

## 常用命令

### 基本转换

```bash
# 转换文件（PDF 与 MD 同目录同名）
node md2pdf.js ../document.md

# 指定输出文件名和路径
node md2pdf.js ../document.md ../output.pdf
```

### Windows 批处理

```bash
# 简单转换
convert.bat ..\document.md

# 指定输出
convert.bat ..\document.md ..\output.pdf
```

### Linux/Mac Bash 脚本

```bash
# 简单转换
./convert.sh ../document.md

# 指定输出
./convert.sh ../document.md ../output.pdf
```

### 使用绝对路径

```bash
node md2pdf.js C:\path\to\document.md
node md2pdf.js C:\path\to\document.md D:\output\result.pdf
```

---

## 示例

### 示例 1：转换教程文档

```bash
cd markdown-to-pdf-converter
node md2pdf.js ../my_document.md
```

生成：`my_document.pdf`（与 .md 文件同目录）

### 示例 2：批量转换（手动运行多次）

```bash
node md2pdf.js ../doc1.md
node md2pdf.js ../doc2.md
node md2pdf.js ../doc3.md
```

### 示例 3：自定义输出路径

```bash
node md2pdf.js ../source.md ../output/final.pdf
```

---

## 首次运行

首次运行时，工具会自动：

1. ⏬ 下载 Pandoc (~35MB)
2. ⏬ 安装 Puppeteer (~300MB)
3. ⚙️ 配置环境

**请耐心等待 2-5 分钟**。后续运行会很快（通常 5-10 秒）。

---

## 验证数学公式

打开生成的 PDF，检查以下内容是否正确显示：

✅ 希腊字母：α, β, π, θ, λ  
✅ 数学符号：×, ÷, ≤, ≥, ≠, ≈  
✅ 分数：正确的上下结构  
✅ 上下标：正确的位置  
✅ 括号：自动调整大小  

例如：`$-2 \times \log(\text{likelihood})$` 应该显示为 "-2 × log(likelihood)"

---

## 故障排除

### 问题 1：找不到 node 命令

**解决方法**：
1. 安装 Node.js：https://nodejs.org
2. 重启命令行窗口
3. 验证安装：`node --version`

### 问题 2：找不到输入文件

**解决方法**：
- 使用正确的相对路径：`../file.md`（上级目录）
- 或使用绝对路径：`C:\full\path\to\file.md`
- 检查文件名拼写和扩展名

### 问题 3：数学公式显示错误

**解决方法**：
1. 检查 LaTeX 语法
2. 行内公式用 `$...$`
3. 行间公式用 `$$...$$`
4. 特殊字符转义：`\{`, `\}`, `\_`

### 问题 4：首次运行失败

**解决方法**：
- 确保网络连接正常
- 关闭杀毒软件重试
- 手动安装：`npm install puppeteer`

---

## 目录结构说明

```
your_project/
├── markdown-to-pdf-converter/   ← 工具目录
│   ├── md2pdf.js               ← 主程序
│   ├── convert.bat             ← Windows 快捷方式
│   └── README.md               ← 详细文档
│
├── my_document.md                ← 你的 Markdown 文件
└── my_document.pdf               ← 生成的 PDF（自动创建）
```

从 `markdown-to-pdf-converter` 目录运行，使用 `../` 访问上级目录的文件。

---

## 数学公式快速参考

```markdown
# 行内公式
普通变量：$x$, $y$, $z$
希腊字母：$\alpha$, $\beta$, $\pi$
上标下标：$x^2$, $x_i$, $x_{ij}$
分数：$\frac{a}{b}$

# 行间公式
$$
\log\left(\frac{\pi_j}{\pi_J}\right) = \beta_{j0} + \beta_{j1}X_1
$$

# 常用符号
乘号：$\times$
小于等于：$\leq$
大于等于：$\geq$
求和：$\sum_{i=1}^{n}$
积分：$\int_{a}^{b}$
```

---

## 下一步

- 📖 查看 **README.md** 了解完整功能
- 🔧 根据需要自定义样式（编辑 `md2pdf.js` 中的 CSS）
- 📝 准备你的 Markdown 文档并开始转换！

---

**快速帮助**：
- 使用方法：`node md2pdf.js <input.md> [output.pdf]`
- 详细文档：查看 README.md
- 确保在 `markdown-to-pdf-converter` 目录中运行命令

祝使用愉快！🚀
