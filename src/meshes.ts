import { Shape3D, Object3D } from "./types"
import { findMidpoint } from "./util" 


const cube3DMesh: Shape3D = {
  points: [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 100, z: 0},
    {x: 100, y: 100, z: 0},
    {x: 100, y: 0, z: 0},

    {x: 0, y: 0, z: 100},
    {x: 0, y: 100, z: 100},
    {x: 100, y: 100, z: 100},
    {x: 100, y: 0, z: 100},
  ],

  edges: [
    {pointIdx1: 0, pointIdx2: 1},
    {pointIdx1: 1, pointIdx2: 2},
    {pointIdx1: 2, pointIdx2: 3},
    {pointIdx1: 3, pointIdx2: 0},

    {pointIdx1: 4, pointIdx2: 5},
    {pointIdx1: 5, pointIdx2: 6},
    {pointIdx1: 6, pointIdx2: 7},
    {pointIdx1: 7, pointIdx2: 4},

    {pointIdx1: 0, pointIdx2: 4},
    {pointIdx1: 1, pointIdx2: 5},
    {pointIdx1: 2, pointIdx2: 6},
    {pointIdx1: 3, pointIdx2: 7},
  ],
}
export const cube3D: Object3D = {
  shape: cube3DMesh,
  translation: {x: 0, y: 0, z: 0},
  rotation: {x: 0, y: 0, z: 0},
  midpoint: findMidpoint(cube3DMesh)
}