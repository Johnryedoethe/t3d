function main() {
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.beginPath();

  ctx.moveTo(50, 50);
  ctx.lineTo(200, 150);

  ctx.lineWidth = 5;          
  ctx.strokeStyle = '#007acc'; 

  ctx.stroke();
}

window.addEventListener("DOMContentLoaded", main);
