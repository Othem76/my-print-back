import { CuraWASM } from "cura-wasm";
import { resolveDefinition } from "cura-wasm-definitions";
import CuraResponse, { convertToArrayBuffer } from "../utils/curaUtils.js";
import { writeFileSync } from "fs";
import { join } from "path";
import { FILE_UPLOAD_DIRECTORY } from "../utils/consts.js";
//import { printers } from "cura-wasm-definitions/src/definitions/index.js";

export default class CuraService {

  async slice(
    machine: string,
    stlFile: Buffer,
    hasSupport: boolean,
    layerHeight: number,
    infill: number
  ): Promise<CuraResponse> {

    const settings = [
      {
        scope: undefined,
        key: "layer_height",
        value: (layerHeight*0.1).toString(),
      },
      {
        scope: undefined,
        key: "infill_enable_travel_optimization",
        value: "True",
      },
      {
        scope: undefined,
        key: "infill_sparse_thickness",
        value: (layerHeight*0.1).toString(),
      },
      {
        scope: undefined,
        key: "roofing_pattern",
        value: "lines",
      },
      {
        scope: undefined,
        key: "infill_sparse_density",
        value: (infill*100).toString(),
      },
      {
        scope: undefined,
        key: "skin_edge_support_layers",
        value: "4",
      },
      {
        scope: undefined,
        key: "infill_pattern",
        value: "triangles",
      },
      {
        scope: undefined,
        key: "roofing_layer_count",
        value: "1",
      },
      {
        scope: undefined,
        key: "material_type",
        value: "PLA",
      },
      {
        scope: undefined,
        key: "material_diameter",
        value: "1.75",
      },
      {
        scope: undefined,
        key: "zig_zaggify_infill",
        value: "True",
      },
      {
        scope: undefined,
        key: "infill_multiplier",
        value: "1",
      },
      { scope: undefined, key: "extruder_prime_pos_x", value: "0" },
      { scope: undefined, key: "material_print_temperature", value: "200" },
      { scope: undefined, key: "material_bed_temperature", value: "60" },
      { scope: undefined, key: "material_bed_temperature_layer_0", value: "60" },
      { scope: undefined, key: "material_standby_temperature", value: "180" },
      { scope: undefined, key: "extruder_prime_pos_y", value: "0" },
      { scope: undefined, key: "relative_extrusion", value: "False" },
      { scope: undefined, key: "gantry_height", value: "50" },
      { scope: undefined, key: "speed_travel", value: "150" },
      { scope: undefined, key: "acceleration_enabled", value: "True" },
      { scope: undefined, key: "acceleration_layer_0", value: "500" },
      { scope: undefined, key: "acceleration_prime_tower", value: "1000" },
      { scope: undefined, key: "acceleration_print", value: "3000" },
      { scope: undefined, key: "acceleration_support", value: "2000" },
      { scope: undefined, key: "acceleration_support_interface", value: "1500" },
      { scope: undefined, key: "acceleration_topbottom", value: "2500" },
      { scope: undefined, key: "acceleration_wall", value: "3000" },
      { scope: undefined, key: "acceleration_wall_0", value: "2500" },
      { scope: undefined, key: "brim_width", value: "8" },
      { scope: undefined, key: "cool_fan_full_at_height", value: "0.5" },
      { scope: undefined, key: "cool_fan_speed", value: "100" },
      { scope: undefined, key: "cool_fan_speed_max", value: "100" },
      { scope: undefined, key: "cool_min_speed", value: "5" },
      { scope: undefined, key: "infill_line_width", value: "0.4" },
      { scope: undefined, key: "infill_overlap", value: "30" },
      { scope: undefined, key: "infill_wipe_dist", value: "0.2" },
      { scope: undefined, key: "jerk_enabled", value: "True" },
      { scope: undefined, key: "jerk_layer_0", value: "8" },
      { scope: undefined, key: "jerk_prime_tower", value: "10" },
      { scope: undefined, key: "jerk_print", value: "15" },
      { scope: undefined, key: "jerk_support", value: "10" },
      { scope: undefined, key: "jerk_support_interface", value: "8" },
      { scope: undefined, key: "jerk_topbottom", value: "12" },
      { scope: undefined, key: "jerk_wall", value: "15" },
      { scope: undefined, key: "jerk_wall_0", value: "12" },
      { scope: undefined, key: "layer_height_0", value: "0.2" },
      { scope: undefined, key: "layer_start_x", value: "10" },
      { scope: undefined, key: "layer_start_y", value: "10" },
      { scope: undefined, key: "line_width", value: "0.4" },
      { scope: undefined, key: "machine_min_cool_heat_time_window", value: "15" },
      { scope: undefined, key: "default_material_print_temperature", value: "200" },
      { scope: undefined, key: "multiple_mesh_overlap", value: "0.2" },
      { scope: undefined, key: "prime_tower_enable", value: "False" },
      { scope: undefined, key: "raft_airgap", value: "0.3" },
      { scope: undefined, key: "raft_base_speed", value: "20" },
      { scope: undefined, key: "raft_base_thickness", value: "0.3" },
      { scope: undefined, key: "raft_interface_line_spacing", value: "1.0" },
      { scope: undefined, key: "raft_interface_line_width", value: "0.4" },
      { scope: undefined, key: "raft_interface_speed", value: "20" },
      { scope: undefined, key: "raft_interface_thickness", value: "0.2" },
      { scope: undefined, key: "raft_jerk", value: "10" },
      { scope: undefined, key: "raft_margin", value: "5" },
      { scope: undefined, key: "raft_speed", value: "20" },
      { scope: undefined, key: "raft_surface_layers", value: "2" },
      { scope: undefined, key: "retraction_amount", value: "5" },
      { scope: undefined, key: "retraction_count_max", value: "10" },
      { scope: undefined, key: "retraction_extrusion_window", value: "2" },
      { scope: undefined, key: "retraction_hop", value: "0.6" },
      { scope: undefined, key: "retraction_hop_enabled", value: "False" },
      { scope: undefined, key: "retraction_hop_only_when_collides", value: "True" },
      { scope: undefined, key: "retraction_min_travel", value: "1.5" },
      { scope: undefined, key: "retraction_prime_speed", value: "25" },
      { scope: undefined, key: "skin_overlap", value: "10" },
      { scope: undefined, key: "speed_equalize_flow_enabled", value: "False" },
      { scope: undefined, key: "speed_layer_0", value: "20" },
      { scope: undefined, key: "speed_prime_tower", value: "40" },
      { scope: undefined, key: "speed_print", value: "50" },
      { scope: undefined, key: "speed_support", value: "40" },
      { scope: undefined, key: "speed_support_interface", value: "30" },
      { scope: undefined, key: "speed_topbottom", value: "40" },
      { scope: undefined, key: "speed_wall", value: "50" },
      { scope: undefined, key: "speed_wall_0", value: "40" },
      { scope: undefined, key: "speed_wall_x", value: "50" },
      { scope: undefined, key: "support_use_towers", value: "False" },
      { scope: undefined, key: "support_xy_distance", value: "0.8" },
      { scope: undefined, key: "support_xy_distance_overhang", value: "0.2" },
      { scope: undefined, key: "switch_extruder_prime_speed", value: "20" },
      { scope: undefined, key: "switch_extruder_retraction_amount", value: "2" },
      { scope: undefined, key: "top_bottom_thickness", value: "0.8" },
      { scope: undefined, key: "travel_avoid_supports", value: "True" },
      { scope: undefined, key: "travel_avoid_distance", value: "1" },
      { scope: undefined, key: "wall_0_inset", value: "0.2" },
      { scope: undefined, key: "wall_line_width_x", value: "0.4" },
      { scope: undefined, key: "wall_thickness", value: "1.2" },
      { scope: undefined, key: "meshfix_maximum_resolution", value: "0.1" },
      { scope: undefined, key: "meshfix_maximum_deviation", value: "0.05" },
      { scope: undefined, key: "optimize_wall_printing_order", value: "True" },
      { scope: undefined, key: "initial_layer_line_width_factor", value: "100" },
      { scope: undefined, key: "adhesion_type", value: "brim" },
    ];

    switch (layerHeight) {
      case 1: {
        settings.push(
          {
            scope: undefined,
            key: "top_layers",
            value: "10",
          },
          {
          scope: undefined,
            key: "bottom_layers",
            value: "10",
          },
          {
          scope: undefined,
            key: "infill_overlap_mm",
            value: "0.0",
          },
          {
          scope: undefined,
            key: "skin_edge_support_thickness",
            value: "0.4",
          },
        )
        break;
      }

      case 1.5: {
        settings.push(
          {
          scope: undefined,
            key: "top_layers",
            value: "7",
          },
          {
          scope: undefined,
            key: "bottom_layers",
            value: "7",
          },
          {
          scope: undefined,
            key: "skin_edge_support_thickness",
            value: "0.6",
          },
        )
        break;
      }

      case 2: {
        settings.push(
          {
          scope: undefined,
            key: "top_layers",
            value: "4",
          },
          {
          scope: undefined,
            key: "bottom_layers",
            value: "4",
          },
          {
          scope: undefined,
            key: "skin_edge_support_thickness",
            value: "0.8",
          },
        )
        break;
      }
    }

    switch(infill) {
      case 0.1: {
        settings.push(
          {
          scope: undefined,
            key: "infill_line_distance",
            value: "12.0",
          },
        )
      }
      break;

      case 0.2: {
        settings.push(
          {
          scope: undefined,
            key: "infill_line_distance",
            value: "6.0",
          },
        )
        break;
      }

      case 0.3: {
        settings.push(
          {
          scope: undefined,
            key: "infill_line_distance",
            value: "4.0",
          },
        )
        break;
      }
    }

    if (hasSupport) {
      settings.push(
        {
          scope: undefined,
          key: "support_enable",
          value: "True",
        },
        {
          scope: undefined,
          key: "infill_support_enabled",
          value: "True",
        },
        {
          scope: undefined,
          key: "support_pattern",
          value: "zigzag",
        },
        {
          scope: undefined,
          key: "support_z_distance",
          value: "0.2"
        },
        {
          scope: undefined,
          key: "support_z_seam_away_from_model",
          value: "True",
        },
        {
          scope: undefined,
          key: "support_infill_rate",
          value: "10",
        },
        {
          scope: undefined,
          key: "support_structure",
          value: "normal",
        },
        {
          scope: undefined,
          key: "support_type",
          value: "everywhere",
        },
        {
          scope: undefined,
          key: "support_angle",
          value: "60",
        },
        {
          scope: undefined,
          key: "support_infill_sparse_thickness",
          value: "0.2",
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

    const gcode = response.gcode;
    const filePath = join(FILE_UPLOAD_DIRECTORY, "output.gcode");

    writeFileSync(filePath, Buffer.from(gcode));

    return response.metadata as unknown as CuraResponse;
  }
}
