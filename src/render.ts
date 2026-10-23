import { Point2D, Point3D, Shape3D, Shape2D, scene3D, camera } from "./types";
import { rotateObject3D } from "./transformations/rotations"
import { translateObject3D } from "./transformations/translations"
import { scaleObject3D } from "./transformations/scale"

function transformScene3D(scene: scene3D): Shape3D[] {
  const newShapes: Shape3D[] = []

  // duplicate objects
  for (let i = 0; i < scene.objects.length; i++) {
    let objCopy = {...scene.objects[i]}
    objCopy.shape = scaleObject3D(objCopy)
    objCopy.shape = rotateObject3D(objCopy)
    objCopy.shape = translateObject3D(objCopy)

    newShapes.push(objCopy.shape)
  }
  
  return newShapes
}

export function renderScene3D(ctx: CanvasRenderingContext2D, scene3D: scene3D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "#404040"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const newShapes: Shape3D[] = transformScene3D(scene3D)
  const projectedPoints2D: Shape2D[] = []

  for (let i = 0; i < newShapes.length; i++) {
    const curShape2D = project3DTo2D(newShapes[i], scene3D.eye)
    projectedPoints2D.push(curShape2D)
  }

  drawShape2D(ctx, projectedPoints2D, scene3D, newShapes)    
}

function project3DTo2D(shape: Shape3D, eye: camera): Shape2D {
  // assume that values have already shifted and the value has to be calculated 
  const points3D: Point3D[] = shape.points
  const projectedPoints2D: Point2D[] = calculateProjection(points3D, eye)
 
  const obj2D: Shape2D = {
    points: projectedPoints2D,
    edges: shape.edges
  }

  return obj2D;
}

function drawShape2D(ctx: CanvasRenderingContext2D, shape2d: Shape2D[], scene3D: scene3D, transformedShapes: Shape3D[]) {
  let selectedPoint = 0

  for (let j = 0; j < shape2d.length; j++) {
    const selected = scene3D.editor.selectedObjsMap[selectedPoint] === j

    for (let i = 0; i < shape2d[j].edges.length; i++) {
      const edge = shape2d[j].edges[i]

      const p1Idx = edge.pointIdx1
      const p2Idx = edge.pointIdx2

      const p1 = shape2d[j].points[p1Idx]
      const p2 = shape2d[j].points[p2Idx]

      const p1z = transformedShapes[j].points[p1Idx].z
      const p2z = transformedShapes[j].points[p1Idx].z

      if (pointIsNotInView(scene3D.eye, p1) && pointIsNotInView(scene3D.eye, p2)
         && p1z <= scene3D.eye.point.z || p2z <= scene3D.eye.point.z) {
        continue
      }

      if (selected) {
        drawLineSelectedSegment(ctx, p1, p2)
        
      } else {
        drawLineUnselectedSegment(ctx, p1, p2)
      }
    }  

    if (selected) {
      selectedPoint++
    }
  }
}

function calculateProjection(points3D: Point3D[], eye: camera): Point2D[] {
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

function drawLineUnselectedSegment(ctx: CanvasRenderingContext2D, p1: Point2D, p2: Point2D) {
  ctx.beginPath();

  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);

  ctx.lineWidth = 2;          
  ctx.strokeStyle = '#007acc'; 

  ctx.stroke();
}

function drawLineSelectedSegment(ctx: CanvasRenderingContext2D, p1: Point2D, p2: Point2D) {
  ctx.beginPath();

  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);

  ctx.lineWidth = 2;          
  ctx.strokeStyle = '#e09f26'; 

  ctx.stroke();
}

function pointIsNotInView(eye: camera, point: Point2D): boolean {
  return point.y > eye.point.y + ((eye.camHeight - 10) / 2) || 
    point.y < eye.point.y - ((eye.camHeight - 10) / 2) ||
    point.x > eye.point.x + ((eye.camWidth - 10) / 2) ||
    point.x < eye.point.x - ((eye.camWidth - 10) / 2)
}
