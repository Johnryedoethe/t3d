import { Point3D, Object3D } from "./types";

export function convertPointsToDeltaPoints(oldPoints3D: Point3D[], newPoints3D: Point3D[]): Point3D[] {
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

export function convertObject3DToDeltaPoints(obj3D: Object3D, newPoints3D: Point3D[]): Point3D[] {
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
