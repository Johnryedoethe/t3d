import { Point3D, Shape3D, Object3D } from "./types";

export function combineDPointsAndPointsIntoShape3D(Obj3d: Object3D): Shape3D {
  const { dPoints } = Obj3d
  const { points } = Obj3d.shape

  const combinedPoints: Point3D[] = []

  for (let i = 0; i < dPoints.length; i++) {
    const x = points[i].x + dPoints[i].x
    const y = points[i].y + dPoints[i].y
    const z = points[i].z + dPoints[i].z

    combinedPoints.push({x, y, z})
  }

  return {
    points: combinedPoints,
    edges: Obj3d.shape.edges
  }
}

export function originalPointsToDeltaPoints(oldPoints3D: Point3D[], newPoints3D: Point3D[]): Point3D[] {
  // implement later
  const dPoints3D: Point3D[] = []

  for (let i = 0; i < newPoints3D.length; i++) {
    const dx: number = newPoints3D[i].x - oldPoints3D[i].x
    const dy: number = newPoints3D[i].y - oldPoints3D[i].y
    const dz: number = newPoints3D[i].z - oldPoints3D[i].z

    dPoints3D.push({x: dx, y: dy, z: dz})
  }

  return dPoints3D
}

export function originalShape3DToDeltaPoints(obj3D: Shape3D, newPoints3D: Point3D[]): Point3D[] {
  // implement later

  const oldPoints3D: Point3D[] = obj3D.points
  const dPoints3D: Point3D[] = []

  for (let i = 0; i < newPoints3D.length; i++) {
    const dx: number = newPoints3D[i].x - oldPoints3D[i].x
    const dy: number = newPoints3D[i].y - oldPoints3D[i].y
    const dz: number = newPoints3D[i].z - oldPoints3D[i].z

    dPoints3D.push({x: dx, y: dy, z: dz})
  }

  return dPoints3D
}

export function findMidpoint(shape3d: Shape3D): Point3D {
  let midpoint: Point3D = {x: 0, y: 0, z: 0}
    const points: Point3D[] = shape3d.points
  
    for (let i = 0; i < points.length; i++) {
      midpoint.x += points[i].x
      midpoint.y += points[i].y
      midpoint.z += points[i].z
    }
  
    midpoint.x = midpoint.x / points.length
    midpoint.y = midpoint.y / points.length
    midpoint.z = midpoint.z / points.length

  return midpoint
}
