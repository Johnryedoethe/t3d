import { Object3D, Shape3D } from "./types"

import { rotateObject3D } from "./transformImplementations/rotations"
import { translateObject3D } from "./transformImplementations/translations"

export function transformShape(obj3d: Object3D): Shape3D {
  // duplicate the obj3d to point to different memory
  const curObj3d = {...obj3d}

  // scale shape later implement
  curObj3d.shape = rotateObject3D(curObj3d)
  curObj3d.shape = translateObject3D(curObj3d)

  return curObj3d.shape
}