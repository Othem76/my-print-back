import { inject } from "@adonisjs/core";
import { CuraWASM } from "cura-wasm";
import { resolveDefinition } from "cura-wasm-definitions";
import CuraResponse, {
  convertToArrayBuffer,
  DefaultCuraSettings,
} from "../utils/curaUtils.js";
import { printers } from "cura-wasm-definitions/src/definitions/index.js";

@inject()
export default class CuraService {
  constructor() {}

  async slice(machine: string, stlFile: Buffer): Promise<CuraResponse> {
    if (!Object.keys(printers).includes(machine)) {
      throw new Error(`Machine ${machine} not found`);
    }

    const cura = new CuraWASM({
      definition: resolveDefinition(machine as keyof typeof printers),

      overrides: DefaultCuraSettings,

      transfer: true,
      verbose: false,
    });

    const arrayBuffer = convertToArrayBuffer(stlFile);

    const { metadata } = await cura.slice(arrayBuffer, "stl");

    return metadata as unknown as CuraResponse;
  }
}
