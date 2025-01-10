import { inject } from "@adonisjs/core";
import { CuraWASM } from "cura-wasm";
import { resolveDefinition } from "cura-wasm-definitions";
import CuraResponse, {
  convertToArrayBuffer,
  DefaultCuraSettings,
} from "../utils/curaUtils.js";
//import { printers } from "cura-wasm-definitions/src/definitions/index.js";

@inject()
export default class CuraService {
  constructor() {}

  async slice(
    machine: string,
    stlFile: Buffer,
    hasSupport: boolean,
    layerHeight: number,
    infill: number
  ): Promise<CuraResponse> {
    // if (!Object.keys(printers).includes(machine)) {
    //   throw new Error(`Machine ${machine} not found`);
    // }

    const settings = [
      {
        scope: "e0",
        key: "roofing_layer_count",
        value: "3",
      },
      {
        scope: "e0",
        key: "layer_height",
        value: layerHeight.toString(),
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
        value: infill.toString(),
      },
      {
        scope: "e0",
        key: "material_guid",
        value: "e0f1d581-cc6b-4e36-8f3c-3f5601ecba5f",
      },
    ];

    if (hasSupport) {
      settings.push(
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
        }
      );
    }

    const cura = new CuraWASM({
      definition: resolveDefinition(machine as any),
      overrides: settings,
      transfer: true,
      verbose: true,
    });

    const arrayBuffer = convertToArrayBuffer(stlFile);
    const response = await cura.slice(arrayBuffer, "stl");

    return response.metadata as unknown as CuraResponse;
  }
}
