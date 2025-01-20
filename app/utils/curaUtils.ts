interface CuraResponse {
  flavor: String;
  printTime: number;
  material1Usage: number;
  material2Usage: number;
  nozzleSize: number;
  filamentUsage: number;
}

function convertToArrayBuffer(buffer: Buffer): ArrayBuffer {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

/*const DefaultCuraSettings: override[] = [
  {
    scope: "e0",
    key: "roofing_layer_count",
    value: "3",
  },
  {
    scope: "e0",
    key: "support_enable",
    value: "True",
  },
  {
    scope: "e0",
    key: "support_density",
    value: "0.1",
  },
  {
    scope: "e0",
    key: "support_pattern",
    value: "Triangles",
  },
  {
    scope: "e0",
    key: "support_z_seam_away_from_model",
    value: "True",
  },
  {
    scope: "e0",
    key: "layer_height",
    value: "0.2",
  },
  {
    scope: "e0",
    key: "infill_enable_travel_optimization",
    value: "True",
  },
  {
    scope: "e0",
    key: "infill_line_distance",
    value: "6.0",
  },
  {
    scope: "e0",
    key: "infill_sparse_thickness",
    value: "0.2",
  },
  {
    scope: "e0",
    key: "material_guid",
    value: "e0f1d581-cc6b-4e36-8f3c-3f5601ecba5f",
  },
];*/

export default CuraResponse;
export { convertToArrayBuffer };
