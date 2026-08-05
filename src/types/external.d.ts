declare module 'playcanvas' {
  export const DEVICETYPE_WEBGPU: string;
  export const DEVICETYPE_WEBGL2: string;
  export const FILLMODE_FILL_WINDOW: string;
  export const RESOLUTION_AUTO: string;
  export function createGraphicsDevice(canvas: HTMLCanvasElement, options?: unknown): Promise<any>;
  export const Application: any;
  export const Entity: any;
  export const StandardMaterial: any;
  export const Color: any;
}
