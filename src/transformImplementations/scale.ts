import { Object3D, Shape3D, Point3D } from "../types";

export function scaleObject3D(obj3D: Object3D): Shape3D {
  const { points, edges } = obj3D.shape

  const scaledPoints: Point3D[] = []

  const scalex = obj3D.scale.x
  const scaley = obj3D.scale.y
  const scalez = obj3D.scale.z
  for (let i = 0; i < obj3D.shape.points.length; i++) {
    const x = obj3D.midpoint.x + scalex * (points[i].x - obj3D.midpoint.x)
    const y = obj3D.midpoint.y + scaley * (points[i].y - obj3D.midpoint.y)
    const z = obj3D.midpoint.z + scalez * (points[i].z - obj3D.midpoint.z)

    scaledPoints.push({x, y, z})
  }

  return {
    points: scaledPoints,
    edges: edges
  }
}
