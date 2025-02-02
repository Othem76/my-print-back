import Material from "#models/material/material";

export interface CostSetting {
  fileId: string;
  printer: string;
  material: Material;
  support: boolean;
  layerHeight: number;
  infill: number;
}
