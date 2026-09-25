# T3D

This app has been set up with Tauri + Vanilla TS.

To install dependencies:

```sh
npm install
```

To install dependencies for Android and iOS app:

```sh
npm run tauri android init
npm run tauri ios init
```

To start desktop app in development mode:

```sh
npm run tauri dev
```

To start desktop app in development mode:

```sh
npm run tauri android dev
npm run tauri ios dev
```

## simple APIs


### Converting 3D coordinates into 2D for canvas api on web

Assume you have a 3D object: 

```ts
function mystery() {
  const 2DValues = project3DTo2D(object3D)
}
```
Here the expected return value is an Object2D which contains Point2D[] which is calculated within the function, Edge[] remains the same.

### Drawing the shape based on existing values

Now that you have the Object2D which has converted values from the Object3D, you have the simulated perspective based on the z value for each Point3D -> (It looks like (x, y, z)). 

```ts
const ctx = ...

function mystery() {
  const obj2D = project3DTo2D(object3D)
  drawObject2D(ctx, obj2D)
}
```

You have to pass in the context of the canvas to call the methods in canvas api internally, with the drawObject2D() you are expected to have the values already converted to have the simulated perspective. In short it blindly draws the lines between the points based on the mapped Edges[] within Object2D


