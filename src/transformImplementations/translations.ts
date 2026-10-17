import { Object3D, Point3D, Shape3D } from "../types";


export function translateObject3D(obj3d: Object3D): Shape3D {
  const { points, edges } = obj3d.shape

  const shiftedPoints: Point3D[] = []

  for (let i = 0; i < points.length; i++) {
    const x = points[i].x + obj3d.translation.x
    const y = points[i].y + obj3d.translation.y
    const z = points[i].z + obj3d.translation.z

    shiftedPoints.push({x, y, z})
  }

  return {
    points: shiftedPoints,
    edges: edges
  }
}