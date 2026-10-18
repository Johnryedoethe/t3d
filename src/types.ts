export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Edge {
  pointIdx1: number;
  pointIdx2: number;
}

export interface Shape3D {
  points: Point3D[];
  edges: Edge[];
}

export interface Object3D {
  name: string;
  shape: Shape3D;
  midpoint: Point3D;  // cache the original points
  translation: Point3D;
  rotation: Point3D;  // rotation around the midpoint in radians
  scale: Point3D;
}

export interface camera {
  point: Point3D;
  camWidth: number; // cam height and width are in px
  camHeight: number;
  translation: Point3D;
  rotation: Point3D;  // rotation around center of project
}

export interface Shape2D {
  points: Point2D[];
  edges: Edge[];
}

export interface scene3D {
  objects: Object3D[]; // edit the properties of Object3D which will be rendered
  eye: camera; // can be mutated
  editor: editor3D;
}

export interface editor3D {
  selectedObjsMap: number[];
  curEditorState: "idle" | "grab" | "rotate" | "scale";
  curAxis: "x" | "y" | "z" | null;
}
