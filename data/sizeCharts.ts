export interface MeasurementRow {
  size: string;
  chest?: { in: number; cm: number };
  shoulder?: { in: number; cm: number };
  sleeve?: { in: number; cm: number };
  length?: { in: number; cm: number };
  waist?: { in: number; cm: number };
  hip?: { in: number; cm: number };
  rise?: { in: number; cm: number };
  inseam?: { in: number; cm: number };
  outseam?: { in: number; cm: number };
  thigh?: { in: number; cm: number };
  legOpening?: { in: number; cm: number };
}

export interface SizeChartData {
  title: string;
  categoryType: 'shirt' | 'pants' | 'tshirt' | 'labcoat' | 'uniform';
  description: string;
  columns: { key: keyof MeasurementRow; label: string }[];
  rows: MeasurementRow[];
  howToMeasure: { title: string; instruction: string }[];
}

export const SIZE_CHARTS: Record<string, SizeChartData> = {
  shirt: {
    title: "Men's Formal & Executive Shirt Size Guide",
    categoryType: 'shirt',
    description: 'Measurements refer to body size, not garment dimensions. Select your usual shirt collar/chest fit.',
    columns: [
      { key: 'size', label: 'Size' },
      { key: 'chest', label: 'Chest' },
      { key: 'shoulder', label: 'Shoulder Width' },
      { key: 'sleeve', label: 'Sleeve Length' },
      { key: 'length', label: 'Shirt Length' },
    ],
    rows: [
      { size: 'S (38)', chest: { in: 38, cm: 96.5 }, shoulder: { in: 17.5, cm: 44.5 }, sleeve: { in: 24.5, cm: 62.2 }, length: { in: 29.5, cm: 75 } },
      { size: 'M (40)', chest: { in: 40, cm: 101.6 }, shoulder: { in: 18.0, cm: 45.7 }, sleeve: { in: 25.0, cm: 63.5 }, length: { in: 30.0, cm: 76.2 } },
      { size: 'L (42)', chest: { in: 42, cm: 106.7 }, shoulder: { in: 18.7, cm: 47.6 }, sleeve: { in: 25.5, cm: 64.8 }, length: { in: 30.5, cm: 77.5 } },
      { size: 'XL (44)', chest: { in: 44, cm: 111.8 }, shoulder: { in: 19.5, cm: 49.5 }, sleeve: { in: 26.0, cm: 66.0 }, length: { in: 31.0, cm: 78.7 } },
      { size: 'XXL (46)', chest: { in: 46, cm: 116.8 }, shoulder: { in: 20.2, cm: 51.3 }, sleeve: { in: 26.5, cm: 67.3 }, length: { in: 31.5, cm: 80.0 } },
      { size: '3XL (48)', chest: { in: 48, cm: 121.9 }, shoulder: { in: 21.0, cm: 53.3 }, sleeve: { in: 27.0, cm: 68.6 }, length: { in: 32.0, cm: 81.3 } },
    ],
    howToMeasure: [
      { title: 'Chest', instruction: 'Measure around the fullest part of your chest, keeping tape horizontal under your arms.' },
      { title: 'Shoulder', instruction: 'Measure from one shoulder tip across the back curve to the opposite shoulder tip.' },
      { title: 'Sleeve', instruction: 'Measure from the center back of neck, across shoulder to arm wrist joint.' },
      { title: 'Shirt Length', instruction: 'Measure vertically from highest shoulder collar point straight down to hemline.' },
    ],
  },

  pants: {
    title: "Men's Formal Pants & Chinos Size Guide",
    categoryType: 'pants',
    description: 'Trouser sizes correspond to waistband inches. For stretch waistbands, choose your base waist measurement.',
    columns: [
      { key: 'size', label: 'Waist' },
      { key: 'hip', label: 'Hip' },
      { key: 'rise', label: 'Front Rise' },
      { key: 'inseam', label: 'Inseam' },
      { key: 'outseam', label: 'Outseam' },
      { key: 'thigh', label: 'Thigh' },
      { key: 'legOpening', label: 'Leg Opening' },
    ],
    rows: [
      { size: '30', waist: { in: 30, cm: 76.2 }, hip: { in: 38, cm: 96.5 }, rise: { in: 10.2, cm: 26.0 }, inseam: { in: 31, cm: 78.7 }, outseam: { in: 41, cm: 104.1 }, thigh: { in: 23, cm: 58.4 }, legOpening: { in: 14, cm: 35.6 } },
      { size: '32', waist: { in: 32, cm: 81.3 }, hip: { in: 40, cm: 101.6 }, rise: { in: 10.5, cm: 26.7 }, inseam: { in: 31.5, cm: 80.0 }, outseam: { in: 41.5, cm: 105.4 }, thigh: { in: 24, cm: 61.0 }, legOpening: { in: 14.5, cm: 36.8 } },
      { size: '34', waist: { in: 34, cm: 86.4 }, hip: { in: 42, cm: 106.7 }, rise: { in: 11.0, cm: 27.9 }, inseam: { in: 32, cm: 81.3 }, outseam: { in: 42, cm: 106.7 }, thigh: { in: 25, cm: 63.5 }, legOpening: { in: 15, cm: 38.1 } },
      { size: '36', waist: { in: 36, cm: 91.4 }, hip: { in: 44, cm: 111.8 }, rise: { in: 11.2, cm: 28.4 }, inseam: { in: 32, cm: 81.3 }, outseam: { in: 42.5, cm: 108.0 }, thigh: { in: 26, cm: 66.0 }, legOpening: { in: 15.5, cm: 39.4 } },
      { size: '38', waist: { in: 38, cm: 96.5 }, hip: { in: 46, cm: 116.8 }, rise: { in: 11.7, cm: 29.7 }, inseam: { in: 32.5, cm: 82.5 }, outseam: { in: 43, cm: 109.2 }, thigh: { in: 27, cm: 68.6 }, legOpening: { in: 16, cm: 40.6 } },
      { size: '40', waist: { in: 40, cm: 101.6 }, hip: { in: 48, cm: 121.9 }, rise: { in: 12.0, cm: 30.5 }, inseam: { in: 33, cm: 83.8 }, outseam: { in: 43.5, cm: 110.5 }, thigh: { in: 28, cm: 71.1 }, legOpening: { in: 16.5, cm: 41.9 } },
    ],
    howToMeasure: [
      { title: 'Waist', instruction: 'Measure where you normally wear your trousers, usually about 1 inch below your navel.' },
      { title: 'Hip', instruction: 'Stand with feet together and measure around the fullest part of your hips/seat.' },
      { title: 'Inseam', instruction: 'Measure from the top of the inner thigh seam straight down along leg to ankle.' },
      { title: 'Outseam', instruction: 'Measure from top edge of waistband along outer leg seam to lower bottom hem.' },
    ],
  },

  tshirt: {
    title: "Casual T-Shirt & Polo Size Guide",
    categoryType: 'tshirt',
    description: 'Relaxed fit dimensions designed for modern everyday wear.',
    columns: [
      { key: 'size', label: 'Size' },
      { key: 'chest', label: 'Chest' },
      { key: 'length', label: 'Body Length' },
      { key: 'shoulder', label: 'Shoulder' },
    ],
    rows: [
      { size: 'S', chest: { in: 36, cm: 91.4 }, length: { in: 27, cm: 68.6 }, shoulder: { in: 16.5, cm: 41.9 } },
      { size: 'M', chest: { in: 38, cm: 96.5 }, length: { in: 28, cm: 71.1 }, shoulder: { in: 17.5, cm: 44.5 } },
      { size: 'L', chest: { in: 40, cm: 101.6 }, length: { in: 29, cm: 73.7 }, shoulder: { in: 18.5, cm: 47.0 } },
      { size: 'XL', chest: { in: 42, cm: 106.7 }, length: { in: 30, cm: 76.2 }, shoulder: { in: 19.5, cm: 49.5 } },
      { size: 'XXL', chest: { in: 45, cm: 114.3 }, length: { in: 31, cm: 78.7 }, shoulder: { in: 20.5, cm: 52.1 } },
    ],
    howToMeasure: [
      { title: 'Chest', instruction: 'Measure under arms around the fullest part of chest.' },
      { title: 'Length', instruction: 'Measure from shoulder high point down to front bottom hem.' },
    ],
  },

  labcoat: {
    title: "Medical & Lab Coat Size Guide",
    categoryType: 'labcoat',
    description: 'Generous unisex sizing allowing ease of movement over indoor clothing.',
    columns: [
      { key: 'size', label: 'Size' },
      { key: 'chest', label: 'Chest Width' },
      { key: 'shoulder', label: 'Shoulder' },
      { key: 'sleeve', label: 'Sleeve' },
      { key: 'length', label: 'Coat Length' },
    ],
    rows: [
      { size: 'S', chest: { in: 40, cm: 101.6 }, shoulder: { in: 18.0, cm: 45.7 }, sleeve: { in: 24.0, cm: 61.0 }, length: { in: 36.0, cm: 91.4 } },
      { size: 'M', chest: { in: 43, cm: 109.2 }, shoulder: { in: 19.0, cm: 48.3 }, sleeve: { in: 24.5, cm: 62.2 }, length: { in: 37.0, cm: 94.0 } },
      { size: 'L', chest: { in: 46, cm: 116.8 }, shoulder: { in: 20.0, cm: 50.8 }, sleeve: { in: 25.0, cm: 63.5 }, length: { in: 38.0, cm: 96.5 } },
      { size: 'XL', chest: { in: 49, cm: 124.5 }, shoulder: { in: 21.0, cm: 53.3 }, sleeve: { in: 25.5, cm: 64.8 }, length: { in: 39.0, cm: 99.0 } },
      { size: 'XXL', chest: { in: 52, cm: 132.0 }, shoulder: { in: 22.0, cm: 55.9 }, sleeve: { in: 26.0, cm: 66.0 }, length: { in: 40.0, cm: 101.6 } },
      { size: '3XL', chest: { in: 55, cm: 139.7 }, shoulder: { in: 23.0, cm: 58.4 }, sleeve: { in: 26.5, cm: 67.3 }, length: { in: 41.0, cm: 104.1 } },
    ],
    howToMeasure: [
      { title: 'Chest', instruction: 'Measure over scrubs or standard indoor attire.' },
      { title: 'Coat Length', instruction: 'Standard knee-length cut measured from collar neck base.' },
    ],
  },

  uniform: {
    title: "Corporate & Commercial Uniform Size Guide",
    categoryType: 'uniform',
    description: 'Industrial and institutional specifications optimized for high mobility.',
    columns: [
      { key: 'size', label: 'Size Tag' },
      { key: 'chest', label: 'Shirt Chest' },
      { key: 'shoulder', label: 'Shoulder' },
      { key: 'sleeve', label: 'Sleeve' },
      { key: 'length', label: 'Garment Length' },
    ],
    rows: [
      { size: 'S (38)', chest: { in: 38, cm: 96.5 }, shoulder: { in: 17.5, cm: 44.5 }, sleeve: { in: 24, cm: 61 }, length: { in: 29, cm: 73.6 } },
      { size: 'M (40)', chest: { in: 40, cm: 101.6 }, shoulder: { in: 18.2, cm: 46.2 }, sleeve: { in: 24.5, cm: 62.2 }, length: { in: 30, cm: 76.2 } },
      { size: 'L (42)', chest: { in: 42, cm: 106.7 }, shoulder: { in: 19.0, cm: 48.3 }, sleeve: { in: 25, cm: 63.5 }, length: { in: 30.5, cm: 77.5 } },
      { size: 'XL (44)', chest: { in: 44, cm: 111.8 }, shoulder: { in: 19.8, cm: 50.3 }, sleeve: { in: 25.5, cm: 64.8 }, length: { in: 31, cm: 78.7 } },
      { size: 'XXL (46)', chest: { in: 46, cm: 116.8 }, shoulder: { in: 20.5, cm: 52.1 }, sleeve: { in: 26, cm: 66.0 }, length: { in: 31.5, cm: 80.0 } },
      { size: '3XL (48)', chest: { in: 48, cm: 121.9 }, shoulder: { in: 21.2, cm: 53.8 }, sleeve: { in: 26.5, cm: 67.3 }, length: { in: 32, cm: 81.3 } },
    ],
    howToMeasure: [
      { title: 'Corporate Sizing', instruction: 'Standard commercial sizing with 2 inches allowance for ease.' },
    ],
  },
};
