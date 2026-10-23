import type { EcardMotif } from '@/data/ecard';

export const CARD_W = 1080;
export const CARD_H = 1350;

const SANS = '"Noto Sans Devanagari","Nirmala UI","Mangal","Segoe UI",Arial,sans-serif';
const SERIF = '"Newsreader","Playfair Display",Georgia,"Noto Serif Devanagari","Nirmala UI",serif';

export interface CardSpec {
  title: string;
  pill: string;
  main: string;
  sub: string;
  colors: [string, string];
  accent: string;
  motif: EcardMotif;
}

export interface DrawInput {
  spec: CardSpec;
  locale: 'en' | 'hi';
  leaderName: string;
  leaderLine: string;
  footer: string;
  senderName: string;
  senderLine: string;
  withRegards: string;
  leader: HTMLImageElement | null;
  guest: HTMLImageElement | null;
  /** Portrait of the remembered personality (tribute cards). */
  portrait?: HTMLImageElement | null;
}

type Ctx = CanvasRenderingContext2D;

/* ---------- small helpers ---------- */

function radial(ctx: Ctx, x: number, y: number, r: number, inner: string, outer: string) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function ellipse(ctx: Ctx, x: number, y: number, rx: number, ry: number, rot: number, fill: string | CanvasGradient) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
}

function star(ctx: Ctx, x: number, y: number, r: number, fill: string, points = 5) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function crescent(ctx: Ctx, x: number, y: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.arc(x + r * 0.42, y - r * 0.12, r * 0.86, 0, Math.PI * 2, true);
  ctx.fillStyle = fill;
  ctx.fill('evenodd');
}

function diamond(ctx: Ctx, x: number, y: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function wrap(ctx: Ctx, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draw `img` to fill the rectangle, cropping from `focusY` (0 = top, 1 = bottom). */
function cover(ctx: Ctx, img: HTMLImageElement, x: number, y: number, w: number, h: number, focusY = 0.25) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) * focusY, sw, sh, x, y, w, h);
}

/* ---------- motifs (drawn in the band y 120-430) ---------- */

function diya(ctx: Ctx, x: number, y: number, s: number) {
  radial(ctx, x, y - s * 0.7, s * 2.6, 'rgba(255,200,90,0.55)', 'rgba(255,200,90,0)');
  const bowl = ctx.createLinearGradient(x, y, x, y + s * 0.6);
  bowl.addColorStop(0, '#F59A2B');
  bowl.addColorStop(1, '#8A3A08');
  ctx.beginPath();
  ctx.ellipse(x, y, s, s * 0.6, 0, 0, Math.PI);
  ctx.closePath();
  ctx.fillStyle = bowl;
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x, y, s, s * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFCB6B';
  ctx.fill();
  const flame = ctx.createLinearGradient(x, y - s * 1.5, x, y - s * 0.1);
  flame.addColorStop(0, '#FFF6C7');
  flame.addColorStop(0.5, '#FFC93C');
  flame.addColorStop(1, '#FF7A00');
  ctx.beginPath();
  ctx.moveTo(x, y - s * 1.6);
  ctx.quadraticCurveTo(x + s * 0.5, y - s * 0.7, x, y - s * 0.12);
  ctx.quadraticCurveTo(x - s * 0.5, y - s * 0.7, x, y - s * 1.6);
  ctx.fillStyle = flame;
  ctx.fill();
}

function motifDiyas(ctx: Ctx, accent: string, moon: boolean) {
  if (moon) {
    radial(ctx, 800, 215, 170, 'rgba(255,240,200,0.35)', 'rgba(255,240,200,0)');
    crescent(ctx, 800, 215, 62, '#FFF1CC');
    star(ctx, 640, 190, 9, '#FFF1CC', 4);
    star(ctx, 930, 160, 7, '#FFF1CC', 4);
    star(ctx, 720, 320, 6, '#FFF1CC', 4);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.moveTo(70 + i * 22, 412 + i * 10);
    ctx.lineTo(1010 - i * 22, 412 + i * 10);
    ctx.stroke();
  }
  for (let i = 0; i < 9; i += 1) {
    const x = 105 + i * 108;
    diya(ctx, x, 385 - (i % 2) * 14, 28);
  }
  ctx.fillStyle = accent;
  for (let i = 0; i < 18; i += 1) {
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(80 + ((i * 197) % 920), 180 + ((i * 83) % 150), 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function motifSun(ctx: Ctx, accent: string) {
  radial(ctx, 540, 290, 280, 'rgba(255,214,120,0.55)', 'rgba(255,214,120,0)');
  ctx.strokeStyle = accent;
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  for (let i = 0; i < 20; i += 1) {
    const a = (Math.PI * 2 * i) / 20;
    ctx.beginPath();
    ctx.moveTo(540 + Math.cos(a) * 118, 290 + Math.sin(a) * 118);
    ctx.lineTo(540 + Math.cos(a) * (i % 2 ? 150 : 168), 290 + Math.sin(a) * (i % 2 ? 150 : 168));
    ctx.stroke();
  }
  radial(ctx, 540, 290, 98, '#FFF0A8', '#FF9F1C');
  ctx.strokeStyle = 'rgba(255,225,150,0.6)';
  ctx.lineWidth = 4;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    for (let x = 160; x <= 920; x += 8) {
      const y = 405 + i * 14 + Math.sin((x + i * 40) / 28) * 5;
      if (x === 160) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function motifSplash(ctx: Ctx) {
  const blobs: Array<[number, number, number, string]> = [
    [190, 270, 92, '#FF2D87'], [390, 190, 72, '#FFD400'], [570, 300, 104, '#25C1FF'],
    [770, 200, 82, '#7CFF3A'], [900, 310, 96, '#B14CFF'], [330, 370, 54, '#FF7A1A'], [720, 390, 58, '#FF2D87'],
  ];
  ctx.globalAlpha = 0.8;
  for (const [x, y, r, c] of blobs) radial(ctx, x, y, r, c, `${c}00`);
  ctx.globalAlpha = 1;
  for (const [x, y, r, c] of blobs) {
    ctx.fillStyle = c;
    for (let i = 0; i < 6; i += 1) {
      const a = i * 1.1 + x;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * (r + 22), y + Math.sin(a) * (r + 22), 5 + (i % 3) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function motifRakhi(ctx: Ctx, accent: string) {
  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  for (const [x0, x1, dir] of [[60, 450, 1], [1020, 630, -1]] as const) {
    ctx.beginPath();
    ctx.moveTo(x0, 215);
    ctx.quadraticCurveTo((x0 + x1) / 2, 160 + dir * 8, x1, 210);
    ctx.stroke();
  }
  for (let i = 0; i < 12; i += 1) {
    ctx.save();
    ctx.translate(540, 225);
    ctx.rotate((Math.PI * 2 * i) / 12);
    ellipse(ctx, 0, -92, 32, 78, 0, i % 2 ? '#FF8A2B' : '#FFC03A');
    ctx.restore();
  }
  radial(ctx, 540, 225, 60, '#E0307A', '#A00F4D');
  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(540, 225, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = accent;
  for (let i = 0; i < 12; i += 1) {
    const a = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.arc(540 + Math.cos(a) * 36, 225 + Math.sin(a) * 36, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function kite(ctx: Ctx, x: number, y: number, w: number, h: number, rot: number, c1: string, c2: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(w / 2, 0);
  ctx.lineTo(0, h / 2);
  ctx.closePath();
  ctx.fillStyle = c1;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(-w / 2, 0);
  ctx.lineTo(0, h / 2);
  ctx.closePath();
  ctx.fillStyle = c2;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(0, h / 2);
  ctx.moveTo(-w / 2, 0);
  ctx.lineTo(w / 2, 0);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.bezierCurveTo(-30, h / 2 + 40, 30, h / 2 + 70, 0, h / 2 + 110);
  ctx.stroke();
  ctx.restore();
}

function motifKites(ctx: Ctx) {
  kite(ctx, 250, 240, 120, 160, -0.35, '#FF3D71', '#FFD23F');
  kite(ctx, 540, 200, 140, 180, 0.1, '#2EC4B6', '#FFFFFF');
  kite(ctx, 830, 250, 120, 160, 0.4, '#7B2CBF', '#FF9F1C');
  radial(ctx, 540, 400, 320, 'rgba(255,230,150,0.25)', 'rgba(255,230,150,0)');
}

function motifBow(ctx: Ctx, accent: string) {
  radial(ctx, 540, 275, 240, 'rgba(255,214,120,0.5)', 'rgba(255,214,120,0)');
  radial(ctx, 540, 275, 95, '#FFF0A8', '#FF9F1C');
  ctx.lineCap = 'round';
  ctx.strokeStyle = accent;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(470, 125);
  ctx.quadraticCurveTo(330, 275, 470, 425);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(470, 125);
  ctx.lineTo(430, 275);
  ctx.lineTo(470, 425);
  ctx.stroke();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(400, 275);
  ctx.lineTo(760, 275);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(790, 275);
  ctx.lineTo(745, 252);
  ctx.lineTo(745, 298);
  ctx.closePath();
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(405 + i * 16, 275);
    ctx.lineTo(425 + i * 16, 255);
    ctx.moveTo(405 + i * 16, 275);
    ctx.lineTo(425 + i * 16, 295);
    ctx.stroke();
  }
}

function motifFeather(ctx: Ctx, accent: string) {
  radial(ctx, 540, 270, 250, 'rgba(120,190,255,0.35)', 'rgba(120,190,255,0)');
  ctx.save();
  ctx.translate(540, 275);
  ctx.rotate(-0.12);
  ctx.strokeStyle = '#2B8C5A';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 150);
  ctx.quadraticCurveTo(10, 40, 0, -40);
  ctx.stroke();
  ellipse(ctx, 0, -50, 78, 128, 0, '#1E9E6A');
  ellipse(ctx, 0, -50, 60, 108, 0, '#2FD3A2');
  ellipse(ctx, 0, -40, 44, 76, 0, '#2563EB');
  ellipse(ctx, 0, -40, 26, 48, 0, '#0B2E8A');
  ellipse(ctx, 0, -40, 11, 22, 0, accent);
  ctx.restore();
  ctx.save();
  ctx.translate(700, 360);
  ctx.rotate(-0.5);
  const g = ctx.createLinearGradient(0, -12, 0, 12);
  g.addColorStop(0, '#FFE08A');
  g.addColorStop(1, '#B8801A');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(-200, -12, 400, 24, 12);
  ctx.fill();
  ctx.fillStyle = '#6B4306';
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.arc(-110 + i * 38, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function motifCrescent(ctx: Ctx, accent: string) {
  radial(ctx, 540, 270, 260, 'rgba(255,240,190,0.4)', 'rgba(255,240,190,0)');
  crescent(ctx, 520, 270, 130, accent);
  star(ctx, 640, 235, 30, accent);
  for (const [x, y, r] of [[250, 200, 12], [330, 340, 9], [830, 330, 12], [900, 190, 9], [160, 320, 7]]) star(ctx, x, y, r, accent, 4);
  for (const x of [250, 830]) {
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, 120);
    ctx.lineTo(x, 175);
    ctx.stroke();
    radial(ctx, x, 235, 52, 'rgba(255,214,120,0.9)', 'rgba(255,170,40,0.25)');
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.ellipse(x, 235, 36, 56, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function motifOm(ctx: Ctx, accent: string) {
  radial(ctx, 540, 275, 250, 'rgba(160,170,255,0.35)', 'rgba(160,170,255,0)');
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(540, 285, 118, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(540, 285, 132, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.textAlign = 'center';
  ctx.font = `700 150px ${SANS}`;
  ctx.fillText('ॐ', 540, 335);
  crescent(ctx, 540, 140, 30, '#FFF1CC');
  for (const x of [270, 810]) {
    ctx.strokeStyle = accent;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(x, 420);
    ctx.lineTo(x, 190);
    ctx.moveTo(x - 36, 215);
    ctx.quadraticCurveTo(x - 36, 275, x, 275);
    ctx.quadraticCurveTo(x + 36, 275, x + 36, 215);
    ctx.stroke();
    for (const dx of [-36, 0, 36]) {
      ctx.beginPath();
      ctx.moveTo(x + dx, 190 + (dx === 0 ? 0 : 25));
      ctx.lineTo(x + dx - 8, 215 + (dx === 0 ? 0 : 25));
      ctx.lineTo(x + dx + 8, 215 + (dx === 0 ? 0 : 25));
      ctx.closePath();
      ctx.fillStyle = accent;
      ctx.fill();
    }
  }
}

function lotus(ctx: Ctx, cx: number, cy: number, s: number) {
  const angles = [-72, 72, -50, 50, -28, 28, 0];
  angles.forEach((deg, i) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((deg * Math.PI) / 180);
    const g = ctx.createLinearGradient(0, 0, 0, -s * 1.4);
    g.addColorStop(0, '#FFE9F2');
    g.addColorStop(1, i < 2 ? '#F58AB5' : '#F0538F');
    ellipse(ctx, 0, -s * 0.7, s * 0.27, s * 0.72, 0, g);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.7, s * 0.27, s * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });
  radial(ctx, cx, cy - 8, s * 0.16, '#FFE08A', '#F59E0B');
}

function motifLotus(ctx: Ctx, accent: string) {
  radial(ctx, 540, 300, 280, 'rgba(255,200,120,0.4)', 'rgba(255,200,120,0)');
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  for (const [x, dir] of [[250, 1], [830, -1]] as const) {
    ctx.beginPath();
    ctx.arc(x, 270, 90, 0, Math.PI * 2);
    ctx.globalAlpha = 0.45;
    ctx.stroke();
    ctx.globalAlpha = 1;
    lotus(ctx, x, 300, 60 * dir * dir);
  }
  lotus(ctx, 540, 385, 190);
  star(ctx, 540, 150, 16, accent, 8);
}

function motifTree(ctx: Ctx, accent: string) {
  radial(ctx, 540, 280, 260, 'rgba(255,230,140,0.3)', 'rgba(255,230,140,0)');
  ctx.fillStyle = '#6B3F1D';
  ctx.fillRect(520, 395, 40, 36);
  const tiers: Array<[number, number, number]> = [[190, 115, 280], [250, 150, 340], [310, 185, 400]];
  tiers.forEach(([top, half, bottom], i) => {
    const g = ctx.createLinearGradient(0, top, 0, bottom);
    g.addColorStop(0, i === 0 ? '#2E9E5B' : '#26874C');
    g.addColorStop(1, '#0F5A2E');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(540, top - 60);
    ctx.lineTo(540 + half, bottom);
    ctx.lineTo(540 - half, bottom);
    ctx.closePath();
    ctx.fill();
  });
  star(ctx, 540, 132, 30, accent);
  const orn: Array<[number, number, string]> = [[500, 250, '#FF4B5C'], [585, 280, '#FFD23F'], [470, 330, '#3DA5FF'], [610, 355, '#FF4B5C'], [540, 310, '#FFD23F'], [430, 395, '#FFD23F'], [655, 400, '#3DA5FF']];
  for (const [x, y, c] of orn) radial(ctx, x, y, 11, '#FFFFFF', c);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let i = 0; i < 40; i += 1) {
    ctx.beginPath();
    ctx.arc(60 + ((i * 263) % 960), 130 + ((i * 97) % 300), 2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
}

function motifChakra(ctx: Ctx) {
  radial(ctx, 540, 275, 260, 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)');
  ctx.lineWidth = 16;
  ctx.lineCap = 'butt';
  ctx.strokeStyle = '#FF9933';
  ctx.beginPath();
  ctx.arc(540, 275, 150, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#138808';
  ctx.beginPath();
  ctx.arc(540, 275, 150, 0, Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(540, 275, 128, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#1F3FA0';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(540, 275, 110, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  for (let i = 0; i < 24; i += 1) {
    const a = (Math.PI * 2 * i) / 24;
    ctx.beginPath();
    ctx.moveTo(540, 275);
    ctx.lineTo(540 + Math.cos(a) * 110, 275 + Math.sin(a) * 110);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(540 + Math.cos(a + 0.13) * 100, 275 + Math.sin(a + 0.13) * 100, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#1F3FA0';
    ctx.fill();
  }
  radial(ctx, 540, 275, 12, '#1F3FA0', '#1F3FA0');
}

function motifFireworks(ctx: Ctx) {
  const bursts: Array<[number, number, number, string]> = [
    [290, 230, 120, '#FFD166'], [560, 190, 150, '#FF6B9D'], [820, 260, 125, '#7DF9FF'], [430, 345, 70, '#FFFFFF'], [700, 370, 65, '#FFD166'],
  ];
  ctx.lineCap = 'round';
  for (const [x, y, r, c] of bursts) {
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.lineWidth = 4;
    for (let i = 0; i < 18; i += 1) {
      const a = (Math.PI * 2 * i) / 18;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * r * 0.3, y + Math.sin(a) * r * 0.3);
      ctx.lineTo(x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    radial(ctx, x, y, 18, '#FFFFFF', `${c}00`);
  }
}

function motifBalloons(ctx: Ctx, accent: string) {
  const balloons: Array<[number, number, string]> = [[250, 230, '#FF4B6E'], [400, 190, '#FFD23F'], [540, 235, '#3DA5FF'], [690, 190, '#7CE06A'], [830, 235, '#C06BFF']];
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 3;
  for (const [x, y] of balloons) {
    ctx.beginPath();
    ctx.moveTo(x, y + 88);
    ctx.bezierCurveTo(x - 30, y + 150, x + 30, y + 190, 540, 430);
    ctx.stroke();
  }
  for (const [x, y, c] of balloons) {
    const g = ctx.createRadialGradient(x - 22, y - 28, 8, x, y, 90);
    g.addColorStop(0, '#FFFFFF');
    g.addColorStop(0.25, c);
    g.addColorStop(1, c);
    ellipse(ctx, x, y, 66, 84, 0, g);
    ctx.beginPath();
    ctx.moveTo(x, y + 82);
    ctx.lineTo(x - 9, y + 98);
    ctx.lineTo(x + 9, y + 98);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
  }
  ctx.fillStyle = accent;
  for (let i = 0; i < 24; i += 1) {
    ctx.save();
    ctx.translate(70 + ((i * 211) % 940), 140 + ((i * 71) % 290));
    ctx.rotate(i);
    ctx.globalAlpha = 0.8;
    ctx.fillRect(-5, -2, 10, 4);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function motifPortrait(ctx: Ctx, accent: string, img: HTMLImageElement | null | undefined) {
  radial(ctx, 540, 285, 290, 'rgba(255,214,140,0.45)', 'rgba(255,214,140,0)');
  lotus(ctx, 330, 360, 70);
  lotus(ctx, 750, 360, 70);
  const r = 135;
  const cx = 540;
  const cy = 275;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 26;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  if (img) cover(ctx, img, cx - r, cy - r, r * 2, r * 2, 0.15);
  else {
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
  ctx.restore();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
  ctx.stroke();
  star(ctx, cx, 105, 14, accent, 8);
}

function drawMotif(ctx: Ctx, motif: EcardMotif, accent: string, portrait?: HTMLImageElement | null) {
  ctx.save();
  // Keep the artwork clear of the header text above and the pill below.
  ctx.translate(540, 430);
  ctx.scale(0.9, 0.9);
  ctx.translate(-540, -430);
  switch (motif) {
    case 'diyas': motifDiyas(ctx, accent, false); break;
    case 'diyas-moon': motifDiyas(ctx, accent, true); break;
    case 'sun': motifSun(ctx, accent); break;
    case 'splash': motifSplash(ctx); break;
    case 'rakhi': motifRakhi(ctx, accent); break;
    case 'kite': motifKites(ctx); break;
    case 'bow': motifBow(ctx, accent); break;
    case 'feather': motifFeather(ctx, accent); break;
    case 'crescent': motifCrescent(ctx, accent); break;
    case 'ghat': break;
    case 'om': motifOm(ctx, accent); break;
    case 'lotus': motifLotus(ctx, accent); break;
    case 'tree': motifTree(ctx, accent); break;
    case 'chakra': motifChakra(ctx); break;
    case 'fireworks': motifFireworks(ctx); break;
    case 'balloons': motifBalloons(ctx, accent); break;
    case 'portrait': motifPortrait(ctx, accent, portrait); break;
  }
  ctx.restore();
}

/* ---------- card ---------- */

/** Dev Deepawali: a different layout, with the ghats scene inside an arch and the leader standing in it. */
function drawArchCard(ctx: Ctx, input: DrawInput) {
  const { spec, locale } = input;
  const hi = locale === 'hi';
  const W = CARD_W;
  const H = CARD_H;
  const accent = spec.accent;

  // Background: deep violet with a soft glow behind the arch
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, spec.colors[0]);
  bg.addColorStop(1, spec.colors[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  radial(ctx, 540, 480, 620, 'rgba(255,140,90,0.22)', 'rgba(255,140,90,0)');
  ctx.fillStyle = 'rgba(255,214,140,0.10)';
  for (let i = 0; i < 40; i += 1) {
    ctx.beginPath();
    ctx.arc((i * 337) % W, (i * 211) % H, 1.5 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  // Header
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 34px ${SANS}`;
  ctx.fillText(input.leaderName, 78, 92, 760);
  ctx.fillStyle = accent;
  ctx.font = `500 21px ${SANS}`;
  ctx.fillText(input.leaderLine, 78, 126, 760);
  ctx.textAlign = 'center';

  // Arch window
  const ax0 = 190;
  const ax1 = 890;
  const aTop = 165;
  const aBottom = 800;
  const ar = (ax1 - ax0) / 2;
  const archPath = (inset = 0) => {
    ctx.beginPath();
    ctx.moveTo(ax0 + inset, aBottom);
    ctx.lineTo(ax0 + inset, aTop + ar);
    ctx.arc(540, aTop + ar, ar - inset, Math.PI, 0);
    ctx.lineTo(ax1 - inset, aBottom);
    ctx.closePath();
  };
  ctx.save();
  ctx.shadowColor = 'rgba(255,150,70,0.45)';
  ctx.shadowBlur = 50;
  archPath();
  ctx.fillStyle = '#1B0B45';
  ctx.fill();
  ctx.restore();
  ctx.save();
  archPath();
  ctx.clip();

  // Sky
  const sky = ctx.createLinearGradient(0, aTop, 0, aBottom);
  sky.addColorStop(0, '#1B0B45');
  sky.addColorStop(0.42, '#6A2470');
  sky.addColorStop(0.72, '#E9733A');
  sky.addColorStop(0.9, '#FFC060');
  ctx.fillStyle = sky;
  ctx.fillRect(ax0, aTop, ax1 - ax0, aBottom - aTop);
  for (const [x, y, r] of [[300, 300, 3], [480, 235, 4], [690, 270, 3], [800, 360, 3], [380, 420, 2.5], [610, 215, 2.5]]) {
    star(ctx, x, y, r * 2.4, '#FFF1CC', 4);
  }

  // Moon
  radial(ctx, 380, 330, 190, 'rgba(255,241,204,0.45)', 'rgba(255,241,204,0)');
  ctx.beginPath();
  ctx.arc(380, 330, 52, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF3D2';
  ctx.fill();
  ctx.fillStyle = 'rgba(214,176,110,0.35)';
  for (const [dx, dy, r] of [[-16, -12, 11], [14, 8, 14], [-6, 22, 7]]) {
    ctx.beginPath();
    ctx.arc(380 + dx, 330 + dy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Temple on the far bank
  const tx = 760;
  const base = 700;
  ctx.fillStyle = '#2A0F3F';
  ctx.beginPath();
  ctx.moveTo(ax0, base - 10);
  ctx.quadraticCurveTo(480, base - 40, tx - 130, base - 24);
  ctx.lineTo(tx + 150, base - 24);
  ctx.lineTo(ax1, base - 6);
  ctx.lineTo(ax1, aBottom);
  ctx.lineTo(ax0, aBottom);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(tx - 80, base - 80, 160, 60);
  ctx.fillRect(tx - 58, base - 118, 116, 42);
  ctx.beginPath();
  ctx.moveTo(tx - 48, base - 118);
  ctx.quadraticCurveTo(tx - 40, base - 170, tx, base - 205);
  ctx.quadraticCurveTo(tx + 40, base - 170, tx + 48, base - 118);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(tx - 3, base - 232, 6, 30);
  ctx.beginPath();
  ctx.moveTo(tx + 3, base - 230);
  ctx.lineTo(tx + 40, base - 219);
  ctx.lineTo(tx + 3, base - 208);
  ctx.closePath();
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.fillStyle = 'rgba(255,194,77,0.95)';
  for (const dx of [-40, 0, 40]) {
    ctx.beginPath();
    ctx.roundRect(tx + dx - 8, base - 70, 16, 28, [8, 8, 0, 0]);
    ctx.fill();
  }

  // Ganga: glowing water with floating diyas
  const water = ctx.createLinearGradient(0, 715, 0, aBottom);
  water.addColorStop(0, 'rgba(255,176,80,0.55)');
  water.addColorStop(1, 'rgba(40,10,70,0.85)');
  ctx.fillStyle = water;
  ctx.fillRect(ax0, 715, ax1 - ax0, aBottom - 715);
  ctx.strokeStyle = 'rgba(255,230,170,0.35)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(ax0 + 40 + i * 30, 730 + i * 14);
    ctx.lineTo(ax1 - 40 - i * 30, 730 + i * 14);
    ctx.stroke();
  }
  for (let i = 0; i < 11; i += 1) {
    const x = 235 + i * 61;
    const back = i % 2 === 1;
    diya(ctx, x, back ? 750 : 772, back ? 12 : 17);
  }

  // The leader stands in the arch
  radial(ctx, 540, 560, 330, 'rgba(255,225,170,0.35)', 'rgba(255,225,170,0)');
  if (input.leader) {
    const sx = 330;
    const sy = 80;
    const sw = 790;
    const sh = 1006;
    const dh = 610;
    const dw = (sw / sh) * dh;
    ctx.drawImage(input.leader, sx, sy, sw, sh, 540 - dw / 2, aBottom - dh + 36, dw, dh);
  }
  ctx.restore();

  // Arch rims
  ctx.strokeStyle = accent;
  ctx.lineWidth = 7;
  archPath();
  ctx.stroke();
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  archPath(16);
  ctx.stroke();
  ctx.globalAlpha = 1;
  diamond(ctx, 540, aTop, 13, accent);

  // Leader name plate across the foot of the arch
  const plateW = 600;
  const plateH = 78;
  const plateY = aBottom - 30;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = 'rgba(255,255,255,0.97)';
  ctx.beginPath();
  ctx.roundRect(540 - plateW / 2, plateY, plateW, plateH, plateH / 2);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#151210';
  ctx.font = `800 32px ${SANS}`;
  ctx.fillText(input.leaderName, 540, plateY + 36, plateW - 60);
  ctx.fillStyle = '#5A4E44';
  ctx.font = `500 19px ${SANS}`;
  ctx.fillText(input.leaderLine, 540, plateY + 62, plateW - 60);

  // Pill
  ctx.font = `800 21px ${SANS}`;
  ctx.letterSpacing = hi ? '1px' : '4px';
  const pillText = hi ? spec.pill : spec.pill.toUpperCase();
  const pillW = ctx.measureText(pillText).width + 66;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect((W - pillW) / 2, 906, pillW, 40, 20);
  ctx.fill();
  ctx.fillStyle = '#3A1700';
  ctx.fillText(pillText, W / 2, 934);
  ctx.letterSpacing = '0px';

  // Title
  ctx.fillStyle = '#FFE9B8';
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;
  let size = hi ? 84 : 94;
  const weight = hi ? 800 : 600;
  ctx.font = `${weight} ${size}px ${hi ? SANS : SERIF}`;
  while (ctx.measureText(spec.title).width > 900 && size > 52) {
    size -= 4;
    ctx.font = `${weight} ${size}px ${hi ? SANS : SERIF}`;
  }
  ctx.fillText(spec.title, W / 2, 1022, 900);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Message
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 180, 1050);
  ctx.lineTo(W / 2 - 22, 1050);
  ctx.moveTo(W / 2 + 22, 1050);
  ctx.lineTo(W / 2 + 180, 1050);
  ctx.stroke();
  diamond(ctx, W / 2, 1050, 8, accent);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 33px ${SANS}`;
  const mainLines = wrap(ctx, spec.main, W - 200).slice(0, 2);
  mainLines.forEach((line, i) => ctx.fillText(line, W / 2, 1096 + i * 40, W - 160));
  ctx.fillStyle = accent;
  ctx.font = `500 22px ${SANS}`;
  const subLines = wrap(ctx, spec.sub, W - 200);
  ctx.fillText(subLines[0] ?? '', W / 2, 1096 + mainLines.length * 40 + 2, W - 160);

  // Sender: photo and wishes in one row under the message
  if (input.senderName || input.guest) {
    const rowY = 1236;
    const textW = 520;
    const photoR = input.guest ? 40 : 0;
    const gap = input.guest ? 22 : 0;
    const total = (input.guest ? photoR * 2 + gap : 0) + textW;
    const left = (W - total) / 2;
    if (input.guest) {
      const cx = left + photoR;
      ctx.beginPath();
      ctx.arc(cx, rowY, photoR + 5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, rowY, photoR, 0, Math.PI * 2);
      ctx.clip();
      cover(ctx, input.guest, cx - photoR, rowY - photoR, photoR * 2, photoR * 2, 0.3);
      ctx.restore();
    }
    const textX = left + (input.guest ? photoR * 2 + gap : 0);
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = `500 21px ${SANS}`;
    ctx.fillText(input.withRegards, textX, rowY - 14, textW);
    ctx.fillStyle = '#FFFFFF';
    let nameSize = 36;
    ctx.font = `800 ${nameSize}px ${SANS}`;
    while (ctx.measureText(input.senderName).width > textW && nameSize > 22) {
      nameSize -= 2;
      ctx.font = `800 ${nameSize}px ${SANS}`;
    }
    ctx.fillText(input.senderName, textX, rowY + 22, textW);
    if (input.senderLine) {
      ctx.fillStyle = accent;
      ctx.font = `500 20px ${SANS}`;
      ctx.fillText(input.senderLine, textX, rowY + 48, textW);
    }
    ctx.textAlign = 'center';
  }

  // Frame and footer
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(26, 26, W - 52, H - 52, 20);
  ctx.stroke();
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(40, 40, W - 80, H - 80, 14);
  ctx.stroke();
  ctx.globalAlpha = 1;
  for (const [x, y] of [[26, 26], [W - 26, 26], [26, H - 26], [W - 26, H - 26]]) diamond(ctx, x, y, 12, accent);
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.font = `500 20px ${SANS}`;
  ctx.fillText(input.footer, W / 2, H - 44);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(26, H - 36, W - 52, 10, 5);
  ctx.clip();
  ['#FF9933', '#FFFFFF', '#138808'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.fillRect(26 + ((W - 52) / 3) * i, H - 36, (W - 52) / 3 + 1, 10);
  });
  ctx.restore();
}


export function drawCard(canvas: HTMLCanvasElement, input: DrawInput) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { spec, locale } = input;
  const hi = locale === 'hi';
  const W = CARD_W;
  const H = CARD_H;
  ctx.clearRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.letterSpacing = '0px';

  if (spec.motif === 'ghat') {
    drawArchCard(ctx, input);
    return;
  }

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, spec.colors[0]);
  bg.addColorStop(1, spec.colors[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  radial(ctx, 540, 820, 560, 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0)');
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  for (let i = 0; i < 46; i += 1) {
    ctx.beginPath();
    ctx.arc((i * 337) % W, (i * 211) % H, 2 + (i % 4), 0, Math.PI * 2);
    ctx.fill();
  }

  // Header
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 34px ${SANS}`;
  ctx.fillText(input.leaderName, 78, 92, 760);
  ctx.fillStyle = spec.accent;
  ctx.font = `500 21px ${SANS}`;
  ctx.fillText(input.leaderLine, 78, 126, 760);
  ctx.textAlign = 'center';

  drawMotif(ctx, spec.motif, spec.accent, input.portrait);

  // Pill
  ctx.font = `800 22px ${SANS}`;
  ctx.letterSpacing = hi ? '1px' : '4px';
  const pillText = hi ? spec.pill : spec.pill.toUpperCase();
  const pillW = ctx.measureText(pillText).width + 70;
  ctx.fillStyle = spec.accent;
  ctx.beginPath();
  ctx.roundRect((W - pillW) / 2, 432, pillW, 44, 22);
  ctx.fill();
  ctx.fillStyle = '#3A1700';
  ctx.fillText(pillText, W / 2, 463);
  ctx.letterSpacing = '0px';

  // Title
  ctx.fillStyle = '#FFE9B8';
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;
  let size = hi ? 92 : 104;
  const weight = hi ? 800 : 600;
  ctx.font = `${weight} ${size}px ${hi ? SANS : SERIF}`;
  while (ctx.measureText(spec.title).width > 900 && size > 52) {
    size -= 4;
    ctx.font = `${weight} ${size}px ${hi ? SANS : SERIF}`;
  }
  const ruleY = 598;
  if (ctx.measureText(spec.title).width > 900) {
    ctx.font = `${weight} 64px ${hi ? SANS : SERIF}`;
    const lines = wrap(ctx, spec.title, 900).slice(0, 2);
    lines.forEach((line, i) => ctx.fillText(line, W / 2, 546 + i * 62 - (lines.length - 1) * 40));
  } else {
    ctx.fillText(spec.title, W / 2, hi ? 572 : 560);
  }
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Rule
  ctx.strokeStyle = spec.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 220, ruleY);
  ctx.lineTo(W / 2 - 24, ruleY);
  ctx.moveTo(W / 2 + 24, ruleY);
  ctx.lineTo(W / 2 + 220, ruleY);
  ctx.stroke();
  diamond(ctx, W / 2, ruleY, 9, spec.accent);

  // Message box
  const boxY = 622;
  const boxH = 150;
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.roundRect(90, boxY, W - 180, boxH, 26);
  ctx.fill();
  ctx.strokeStyle = spec.accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 36px ${SANS}`;
  const mainLines = wrap(ctx, spec.main, W - 260).slice(0, 2);
  const mainStart = mainLines.length === 1 ? boxY + 66 : boxY + 54;
  mainLines.forEach((line, i) => ctx.fillText(line, W / 2, mainStart + i * 44));
  ctx.fillStyle = spec.accent;
  ctx.font = `500 23px ${SANS}`;
  const subLines = wrap(ctx, spec.sub, W - 260).slice(0, 2);
  const subStart = boxY + (mainLines.length === 1 ? 112 : 126);
  ctx.fillText(subLines[0] ?? '', W / 2, subStart, W - 240);
  if (subLines[1] && mainLines.length === 1) ctx.fillText(subLines[1], W / 2, subStart + 28, W - 240);

  // Leader photo: moves right to make room when a sender name or photo is added
  const hasSender = !!input.senderName || !!input.guest;
  const leaderX = hasSender ? 745 : W / 2;
  radial(ctx, leaderX, 1000, 330, 'rgba(255,255,255,0.22)', 'rgba(255,255,255,0)');
  if (input.leader) {
    const sx = 330;
    const sy = 80;
    const sw = 790;
    const sh = 1006;
    const dh = 550;
    const dw = (sw / sh) * dh;
    ctx.drawImage(input.leader, sx, sy, sw, sh, leaderX - dw / 2, H - 12 - dh + 30, dw, dh);
  }

  // Soft shade so the footer stays readable over the photo
  const shade = ctx.createLinearGradient(0, H - 150, 0, H);
  shade.addColorStop(0, 'rgba(0,0,0,0)');
  shade.addColorStop(1, 'rgba(0,0,0,0.65)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, H - 150, W, 150);

  // Frame
  ctx.strokeStyle = spec.accent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(26, 26, W - 52, H - 52, 20);
  ctx.stroke();
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(40, 40, W - 80, H - 80, 14);
  ctx.stroke();
  ctx.globalAlpha = 1;
  for (const [x, y] of [[26, 26], [W - 26, 26], [26, H - 26], [W - 26, H - 26]]) diamond(ctx, x, y, 12, spec.accent);

  // Leader name pill
  const pillH = 92;
  const pw = hasSender ? 520 : 640;
  const px = leaderX - pw / 2;
  const py = H - 164;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = 'rgba(255,255,255,0.97)';
  ctx.beginPath();
  ctx.roundRect(px, py, pw, pillH, pillH / 2);
  ctx.fill();
  ctx.restore();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#151210';
  ctx.font = `800 36px ${SANS}`;
  ctx.fillText(input.leaderName, leaderX, py + 42, pw - 60);
  ctx.fillStyle = '#5A4E44';
  ctx.font = `500 21px ${SANS}`;
  ctx.fillText(input.leaderLine, leaderX, py + 72, pw - 60);

  // Sender block (left side): circular photo, "With best wishes", name, designation
  if (hasSender) {
    const sx = 290;
    const colW = 400;
    let y = 1040;
    if (input.guest) {
      const r = 112;
      const cy = 1000;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(sx, cy, r + 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.arc(sx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      cover(ctx, input.guest, sx - r, cy - r, r * 2, r * 2, 0.3);
      ctx.restore();
      ctx.strokeStyle = spec.accent;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(sx, cy, r + 8, 0, Math.PI * 2);
      ctx.stroke();
      y = cy + r + 56;
    } else {
      y = 1090;
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.font = `500 25px ${SANS}`;
    ctx.fillText(input.withRegards, sx, y, colW);
    if (input.senderName) {
      ctx.fillStyle = '#FFFFFF';
      let nameSize = 42;
      ctx.font = `800 ${nameSize}px ${SANS}`;
      while (ctx.measureText(input.senderName).width > colW && nameSize > 24) {
        nameSize -= 2;
        ctx.font = `800 ${nameSize}px ${SANS}`;
      }
      ctx.fillText(input.senderName, sx, y + 48, colW);
    }
    if (input.senderLine) {
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = `500 24px ${SANS}`;
      ctx.fillText(input.senderLine, sx, y + 84, colW);
    }
  }

  // Footer
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.font = `500 20px ${SANS}`;
  ctx.fillText(input.footer, W / 2, H - 44);
  const bar = [['#FF9933', 0], ['#FFFFFF', 1], ['#138808', 2]] as const;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(26, H - 36, W - 52, 10, 5);
  ctx.clip();
  for (const [c, i] of bar) {
    ctx.fillStyle = c;
    ctx.fillRect(26 + ((W - 52) / 3) * i, H - 36, (W - 52) / 3 + 1, 10);
  }
  ctx.restore();
}
