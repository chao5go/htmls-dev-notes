const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Apple touch icon - 180x180
const size = 180;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// 背景 - 渐变
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');

// 圆角矩形背景 (Apple 推荐圆角)
const radius = 40;
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

// 保存
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '../public/apple-touch-icon.png');
fs.writeFileSync(outputPath, buffer);
console.log('✓ apple-touch-icon.png generated successfully!');
