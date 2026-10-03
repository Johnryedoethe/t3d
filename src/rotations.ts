import { Object3D, Point2D, Point3D, Shape3D } from "./types";
import { originalShape3DToDeltaPoints, combineDPointsAndPointsIntoShape3D } from "./util"

export function rotateObject3D(obj3D: Object3D, Theta: number, axis: string, pivot: Point3D): Object3D {
  // currently assume the user is not doing anything and in the preview automatically will an object rotate

  // assume the current state is that they are holding the object and rotating.
  // once they are going to release the difference from the original position the current value will be saved in the saved position

  // ran once per frame to calculate based on angle/radian from each saved position position
  // when the user is holding the cube the angle of rotation will be stored
  if (Theta === 0) {
    return obj3D
  }

  const combinedShape3D: Shape3D = combineDPointsAndPointsIntoShape3D(obj3D)

  // midpoint will be given in function arg later

  const rotatedVal: Point3D[] = rotateOnAnAxis(combinedShape3D, Theta, axis, pivot)
  const dPoints: Point3D[] = originalShape3DToDeltaPoints(obj3D.shape, rotatedVal)

  const newShape: Shape3D = {
    points: obj3D.shape.points,
    edges: obj3D.shape.edges
  }

  return {
    shape: newShape,
    dPoints: dPoints,
    midpoint: pivot
  }


} 

function rotateOnAnAxis(obj3D: Shape3D, Theta: number, axis: string, pivot: Point3D): Point3D[] {
  const points3d: Point3D[] = obj3D.points

  const rTheta: number = Theta * (Math.PI / 180)


  // refactor later
  if (axis === "x") {
    return rotateOnXAxis(pivot, rTheta, points3d)
  }

  if (axis === "y") {
    return rotateOnYAxis(pivot, rTheta, points3d)
  }

  return rotateOnZAxis(pivot, rTheta, points3d)
}

function rotateOnXAxis(pivot: Point3D, rTheta: number, Points: Point3D[]): Point3D[] {
  // axis {z, y} are used
  const newPoints3d: Point3D[] = []
  const pivot2d: Point2D = {x: pivot.z, y: pivot.y}

  for (let i = 0; i < Points.length; i++) {
    const z: number = Points[i].z
    const y: number = Points[i].y

    const rotatedPoint: Point2D = calculateRotation(z, y, pivot2d, rTheta)
    const dz = rotatedPoint.x
    const dy = rotatedPoint.y

    newPoints3d.push({x: Points[i].x, y: dy, z: dz})
  }

  return newPoints3d
}

function rotateOnYAxis(pivot: Point3D, rTheta: number, Points: Point3D[]): Point3D[] {
  // axis {z, x} are used
  const newPoints3d: Point3D[] = []
  const pivot2d: Point2D = {x: pivot.z, y: pivot.x}

  for (let i = 0; i < Points.length; i++) {
    const z: number = Points[i].z
    const x: number = Points[i].x

    const rotatedPoint: Point2D = calculateRotation(z, x, pivot2d, rTheta)
    const dz = rotatedPoint.x
    const dx = rotatedPoint.y

    newPoints3d.push({x: dx, y: Points[i].y, z: dz})
  }

  return newPoints3d
}

function rotateOnZAxis(pivot: Point3D, rTheta: number, Points: Point3D[]): Point3D[] {
  // axis {x, y} are used
  const newPoints3d: Point3D[] = []
  const pivot2d: Point2D = {x: pivot.x, y: pivot.y}

  for (let i = 0; i < Points.length; i++) {
    const x: number = Points[i].x
    const y: number = Points[i].y

    const rotatedPoint: Point2D = calculateRotation(x, y, pivot2d, rTheta)
    const dx = rotatedPoint.x
    const dy = rotatedPoint.y

    newPoints3d.push({x: dx, y: dy, z: Points[i].y})
  }

  return newPoints3d
}

function calculateRotation(x: number, y: number, center: Point2D, rTheta: number): Point2D {
  // run math here

  // math is simplified to 2 dimensions of x and y as a generalised way to calculate
  // z is always on x or horizontal axis unless you are rotating on z axis 

  const rotx: number = ( (y - center.y) * Math.sin(rTheta) ) + ( (x - center.x) * Math.cos(rTheta) )
  const roty: number = ( (y - center.y) * Math.cos(rTheta) ) - ( (x - center.x) * Math.sin(rTheta) )

  const fixedX: number = Number(rotx.toFixed(1))
  const fixedY: number = Number(roty.toFixed(1))

  return {x: fixedX, y: fixedY}
}
