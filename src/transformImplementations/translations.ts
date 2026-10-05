import { Point3D, Shape3D } from "../types";


export function translateShape3D(shape3d: Shape3D, translation: Point3D): Shape3D {
  const { points, edges } = shape3d

  const newPoints: Point3D[] = []

  for (let i = 0; i < points.length; i++) {
    const x = points[i].x + translation.x
    const y = points[i].y + translation.y
    const z = points[i].z + translation.z

    newPoints.push({x, y, z})
  }

  return {
    points: newPoints,
    edges: edges
  }
}