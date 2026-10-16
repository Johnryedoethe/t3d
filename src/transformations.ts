import { Scene3D, Shape3D } from "./types"

import { rotateObject3D } from "./transformImplementations/rotations"
import { translateObject3D } from "./transformImplementations/translations"

export function transformScene3D(scene: Scene3D): Shape3D[] {
  const newShapes: Shape3D[] = []

  // duplicate objects
  for (let i = 0; i < scene.objects.length; i++) {
    let objCopy = {...scene.objects[i]}
    objCopy.shape = rotateObject3D(objCopy)
    objCopy.shape = translateObject3D(objCopy)

    newShapes.push(objCopy.shape)
  }

  // scale shape later implement
  

  return newShapes
}