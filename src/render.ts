import { Point2D, Point3D, Shape3D, Shape2D, Scene3D, Camera } from "./types";
import { transformScene } from "./transformations";


  // fix edge case of depth bug

export function renderScene3D(ctx: CanvasRenderingContext2D, scene3D: Scene3D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const newShapes: Shape3D[] = transformScene(scene3D)

  for (let i = 0; i < newShapes.length; i++) {
    const curShape2D = project3DTo2D(newShapes[i], scene3D.eye)
    drawObject2D(ctx, curShape2D, newShapes[i], scene3D.eye)
  }
}

function project3DTo2D(shape: Shape3D, eye: Camera): Shape2D {
  // assume that values have already shifted and the value has to be calculated 
  const points3D: Point3D[] = shape.points
  const projectedPoints2D: Point2D[] = calculateProjection(points3D, eye)
 
  const obj2D: Shape2D = {
    points: projectedPoints2D,
    edges: shape.edges
  }

  return obj2D;
}

function drawObject2D(ctx: CanvasRenderingContext2D, shape2d: Shape2D, shape3d: Shape3D ,eye: Camera) {

  for (let i = 0; i < shape2d.edges.length; i++) {
    const edge = shape2d.edges[i]

    const p1Idx = edge.pointIdx1
    const p2Idx = edge.pointIdx2

    const p1 = shape2d.points[p1Idx]
    const p2 = shape2d.points[p2Idx]

    const p1z = shape3d.points[p1Idx].z
    const p2z = shape3d.points[p2Idx].z


    if (pointIsNotInView(eye, p1) && pointIsNotInView(eye, p2) || p1z <= eye.point.z && p2z <= eye.point.z) {
      continue
    }

    drawLineSegment(ctx, p1, p2)
  }  
}

function calculateProjection(points3D: Point3D[], eye: Camera): Point2D[] {
  const projectedPoints2D: Point2D[] = []

  for (let i = 0; i < points3D.length; i++) {
    if (eye.point.z - points3D[i].z === 0 ) {
      projectedPoints2D.push({x: eye.point.x - points3D[i].x, y: eye.point.y - points3D[i].y})
      continue
    }    
    
    const x1: number = points3D[i].x
    const y1: number = points3D[i].y
    const z1: number = points3D[i].z

    const x2: number = eye.point.x
    const y2: number = eye.point.y
    const z2: number = eye.point.z
  
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

function pointIsNotInView(eye: Camera, point: Point2D): boolean {
  return point.y > eye.point.y + ((eye.camHeight + 100) / 2) || 
    point.y < eye.point.y - ((eye.camHeight + 100)/ 2) ||
    point.x > eye.point.x + ((eye.camWidth + 100) / 2) ||
    point.x < eye.point.x - ((eye.camWidth + 100)/ 2)
}
