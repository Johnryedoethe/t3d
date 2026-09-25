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

let savedObject3D: Object3D


function project3DTo2D(obj3D: Object3D, cWidth: number, cLength: number): Object2D {
  // assumed that values have already shifted and the value has to be calculated 
  const points3D: Point3D[] = obj3D.points
  const projectedPoints2D: Point2D[] = calculateProjection(points3D, cWidth, cLength)
 
  const obj2D: Object2D = {
    points: projectedPoints2D,
    edges: obj3D.edges
  }

  savedObject3D = {
    points: points3D,
    edges: obj3D.edges
  }

  return obj2D;
}

function calculateProjection(points3D: Point3D[], cWidth: number, cHeight: number): Point2D[] {
  const projectedPoints2D: Point2D[] = []

  // z value can be changed
  const eye: Point3D = {x: cWidth / 2, y: cHeight, z: -1500}

  for (let i = 0; i < points3D.length; i++) {
    if (eye.z - points3D[i].z === 0 ) {
      continue
    }    
    
    const x1: number = points3D[i].x
    const y1: number = points3D[i].y
    const z1: number = points3D[i].z

    const x2: number = eye.x
    const y2: number = eye.y
    const z2: number = eye.z
  

    const m1: number = (y2 - y1) / (z2 - z1)
    const m2: number = (x2 - x1) / (z2 - z1)
    // y = mz + c
    // y = (dy/dz)z + c
    // find c
    // y - z * dy/dz = c

    // similarly find x intercept to find the point where x and y are when z is 0, this is where the screen is

    const yInter: number = y1 - (z1 * m1)
    const xInter: number = x1 - (z1 * m2)

    projectedPoints2D.push({x: xInter, y: yInter})
  }

  // const projectedPoints2D: Point2D[] = projectedPoints3D.map(({x, y}) => ({x, y}))

  return projectedPoints2D
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
  // ctx.translate(canvas.width / 2, canvas.height / 2)

  const cube2D = project3DTo2D(cube3D, canvas.width, canvas.height)

  drawObject2D(ctx, cube2D)

  // drawLineSegment(ctx, {x: 0, y: 0}, {x: 200, y: 400});
}

window.addEventListener("DOMContentLoaded", main);
