import Material from "#models/material/material";
import Printer from "#models/printer/printer";

export interface CostSetting {
  fileId: string;
  printer: Printer;
  material: Material;
  support: boolean;
  layerHeight: number;
  infill: number;
}
