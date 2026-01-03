const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const pngToIco = require('png-to-ico').default;

// 创建不同尺寸的PNG
const sizes = [16, 32, 48, 64, 128, 256];
const pngBuffers = [];

for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // 背景 - 渐变
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');

  // 圆角矩形背景
  const radius = size * 0.225;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fillStyle = gradient;
  ctx.fill();

  // 代码括号
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.95;

  const centerX = size / 2;
  const centerY = size / 2;
  const scale = size / 512;

  // 左括号 <
  const leftBracketX = centerX - 76 * scale;
  const bracketY = centerY;
  const bracketSize = 96 * scale;
  const bracketWidth = 20 * scale;

  ctx.beginPath();
  ctx.moveTo(leftBracketX, bracketY - bracketSize/2);
  ctx.lineTo(leftBracketX - bracketWidth, centerY);
  ctx.lineTo(leftBracketX, bracketY + bracketSize/2);
  ctx.lineTo(leftBracketX + 4*scale, bracketY + bracketSize/2);
  ctx.lineTo(leftBracketX - bracketWidth + 4*scale, centerY);
  ctx.lineTo(leftBracketX + 4*scale, bracketY - bracketSize/2);
  ctx.closePath();
  ctx.fill();

  // 右括号 >
  const rightBracketX = centerX + 76 * scale;
  ctx.beginPath();
  ctx.moveTo(rightBracketX, bracketY - bracketSize/2);
  ctx.lineTo(rightBracketX + bracketWidth, centerY);
  ctx.lineTo(rightBracketX, bracketY + bracketSize/2);
  ctx.lineTo(rightBracketX - 4*scale, bracketY + bracketSize/2);
  ctx.lineTo(rightBracketX + bracketWidth - 4*scale, centerY);
  ctx.lineTo(rightBracketX - 4*scale, bracketY - bracketSize/2);
  ctx.closePath();
  ctx.fill();

  // 中间的竖线
  const barWidth = 36 * scale;
  const barHeight = 192 * scale;
  ctx.beginPath();
  ctx.roundRect(centerX - barWidth/2, centerY - barHeight/2, barWidth, barHeight, 4*scale);
  ctx.fill();

  // 装饰点
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.arc(100*scale, 420*scale, 12*scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(412*scale, 92*scale, 8*scale, 0, Math.PI * 2);
  ctx.fill();

  // 保存PNG
  const buffer = canvas.toBuffer('image/png');
  pngBuffers.push({ size, buffer });
}

// 保存单独的PNG文件
const pngDir = path.join(__dirname, '../public');
pngBuffers.forEach(({ size, buffer }) => {
  fs.writeFileSync(path.join(pngDir, `favicon-${size}x${size}.png`), buffer);
  console.log(`Generated favicon-${size}x${size}.png`);
});

// 创建 .ico 文件 (使用最大的几个尺寸以获得最佳质量)
const icoSizes = [32, 48, 256]; // ICO 文件中包含的尺寸
const icoBuffers = icoSizes.map(size => {
  const item = pngBuffers.find(p => p.size === size);
  return item.buffer;
});

pngToIco(icoBuffers).then(icoBuffer => {
  const icoPath = path.join(__dirname, '../public/favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log('\n✓ favicon.ico generated successfully!');
  console.log('✓ Contains multiple sizes for optimal display on different devices');
}).catch(err => {
  console.error('Error generating ICO:', err);
});
