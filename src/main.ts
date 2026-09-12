import { Point2D, Point3D, Object3D, Object2D } from "./types";

const cube3D: Object3D = {
  points: [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 100, z: 0},
    {x: 100, y: 100, z: 0},
    {x: 100, y: 0, z: 0},

    {x: 0, y: 0, z: 100},
    {x: 0, y: 100, z: 100},
    {x: 100, y: 100, z: 100},
    {x: 100, y: 0, z: 100},
  ],

  edges: [
    {pointIdx1: 0, pointIdx2: 1},
    {pointIdx1: 1, pointIdx2: 2},
    {pointIdx1: 2, pointIdx2: 3},
    {pointIdx1: 3, pointIdx2: 0},

    {pointIdx1: 4, pointIdx2: 5},
    {pointIdx1: 5, pointIdx2: 6},
    {pointIdx1: 6, pointIdx2: 7},
    {pointIdx1: 7, pointIdx2: 4},

    {pointIdx1: 0, pointIdx2: 4},
    {pointIdx1: 1, pointIdx2: 5},
    {pointIdx1: 2, pointIdx2: 6},
    {pointIdx1: 3, pointIdx2: 7},
  ],
};

function project3DTo2D(obj3D: Object3D): Object2D {
  const points3D = obj3D.points

  // const points2D: Point2D[] = []

  // for (let i = 0; i < points3D.length; i++) {
  //   points2D.push({x: points3D[i].x, y: points3D[i].y})
  // }

  // const points2D: Point2D[] = points3D.map(p => ({x: p.x, y: p.y}))
  const points2D: Point2D[] = points3D.map(({x, y}) => ({x, y}))

  const obj2D = {
    points: points2D,
    edges: obj3D.edges
  }

  return obj2D;
}

function drawLineSegment(ctx: CanvasRenderingContext2D, p1: Point2D, p2: Point2D) {
  ctx.beginPath();

  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);

  ctx.lineWidth = 2;          
  ctx.strokeStyle = '#007acc'; 

  ctx.stroke();
}

function drawObject2D(ctx: CanvasRenderingContext2D, obj2D: Object2D) {
  for (let i = 0; i < obj2D.edges.length; i++) {
    const edge = obj2D.edges[i]

    const p1Idx = edge.pointIdx1
    const p2Idx = edge.pointIdx2

    const p1 = obj2D.points[p1Idx]
    const p2 = obj2D.points[p2Idx]
    drawLineSegment(ctx, p1, p2)
  }
}


function main() {
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const cube2D = project3DTo2D(cube3D)

  drawObject2D(ctx, cube2D)


  drawLineSegment(ctx, {x: 0, y: 0}, {x: 200, y: 400});
}

window.addEventListener("DOMContentLoaded", main);
