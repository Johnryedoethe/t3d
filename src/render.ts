import { Point2D, Point3D, Shape3D, Shape2D, Scene3D, Object3D } from "./types";
import { transformShape } from "./transformations";

export function renderScene3D(ctx: CanvasRenderingContext2D, scene3D: Scene3D, eye: Point3D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const newScene2d: Shape2D[] = []

  for (let i = 0; i < scene3D.objects.length; i++) {
    const curShape = transformShape(scene3D.objects[i])

    const curShape2D = project3DTo2D(curShape, eye)
    newScene2d.push(curShape2D)
  }

  // console.log(transformShape(scene3D.objects[1]).points)

  drawObject2D(ctx, newScene2d)
}


function project3DTo2D(shape: Shape3D, eye: Point3D): Shape2D {
  // assume that values have already shifted and the value has to be calculated 
  const points3D: Point3D[] = shape.points
  const projectedPoints2D: Point2D[] = calculateProjection(points3D, eye)
 
  const obj2D: Shape2D = {
    points: projectedPoints2D,
    edges: shape.edges
  }

  return obj2D;
}

function drawObject2D(ctx: CanvasRenderingContext2D, obj2D: Shape2D[]) {
  for (let j = 0; j < obj2D.length; j++) {
    for (let i = 0; i < obj2D[j].edges.length; i++) {
      const edge = obj2D[j].edges[i]

      const p1Idx = edge.pointIdx1
      const p2Idx = edge.pointIdx2

      const p1 = obj2D[j].points[p1Idx]
      const p2 = obj2D[j].points[p2Idx]
      drawLineSegment(ctx, p1, p2)
    }
  }
  
}

function calculateProjection(points3D: Point3D[], eye: Point3D): Point2D[] {
  const projectedPoints2D: Point2D[] = []

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
