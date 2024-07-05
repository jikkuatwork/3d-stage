export const presetsObj = {
	sunset: '3D/sunset.hdr',
	dawn: 'kiara/kiara_1_dawn_1k.hdr',
	night: 'dikhololo/dikhololo_night_1k.hdr',
	warehouse: 'empty-wharehouse/empty_warehouse_01_1k.hdr',
	forest: 'forrest-slope/forest_slope_1k.hdr',
	apartment: '3D/apartment.hdr',
	studio: 'studio_small_03_1k.hdr',
	city: /* 'potsdamer-platz/potsdamer_platz_1k.hdr' */ 'studio_small_03_1k.hdr',
	park: 'rooitou/rooitou_park_1k.hdr',
	lobby: 'st-fagans/st_fagans_interior_1k.hdr',
};

export type PresetsType = keyof typeof presetsObj;
