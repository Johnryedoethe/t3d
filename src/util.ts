import { Point3D, scene3D, Shape3D } from "./types";


export function findMidpoint(obj3d: Shape3D): Point3D {
  let midpoint: Point3D = {x: 0, y: 0, z: 0}

    const points: Point3D[] = obj3d.points
  
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

export function isIdxInSelectedObjMap(id: number, scene3D: scene3D): boolean {
  for (let i = 0; i < scene3D.editor.selectedObjsMap.length - 1; i++) {
    if (scene3D.editor.selectedObjsMap[i] === id) {
      return true
    }
  }

  return scene3D.editor.selectedObjsMap[scene3D.editor.selectedObjsMap.length - 1] === id
}
