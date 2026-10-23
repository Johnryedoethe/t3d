import { Object3D, Point2D, Point3D, Shape3D, camera } from "../types";

export function rotateObject3D(obj3D: Object3D): Shape3D {
  const {shape, midpoint, rotation} = obj3D
  const origin = {x: midpoint.x, y: midpoint.y, z: midpoint.z}
  const rotatedPoints = shape.points.map((point) => rotate3D(point, origin, rotation))

  return {points: rotatedPoints, edges: shape.edges}
} 

function rotate3D(point: Point3D, origin: Point3D, rotation: Point3D): Point3D {
  let x = point.x
  let y = point.y
  let z = point.z

  const zrotationResult = rotate2D({x, y}, {x: origin.x, y: origin.y}, rotation.z)
  x = zrotationResult.x
  y = zrotationResult.y


  const xrotationResult = rotate2D({x: y, y: z}, {x: origin.y, y: origin.z}, rotation.x)
  y = xrotationResult.x
  z = xrotationResult.y
  

  const yrotationResult = rotate2D({x: z, y: x}, {x: origin.y, y: origin.z}, rotation.y)
  z = yrotationResult.x
  x = yrotationResult.y

  return {x, y, z};
}

function rotate2D(point: Point2D, center: Point2D, rot: number): Point2D {
  const Rrot = rot * (Math.PI) / 180

  const rotx: number = ( (point.y - center.y) * Math.sin(Rrot) ) + ( (point.x - center.x) * Math.cos(Rrot) ) + center.x
  const roty: number = ( (point.y - center.y) * Math.cos(Rrot) ) - ( (point.x - center.x) * Math.sin(Rrot) ) + center.y

  const fixedX: number = Number(rotx.toFixed(1))
  const fixedY: number = Number(roty.toFixed(1))

  return {x: fixedX, y: fixedY}
}
