export const PACKAGE = {
  STANDARD: 0,
  SAFE: 1,
  SUPER_SAFE: 2,
};
export const findPercent = (value: number) => value / 100;

export const computable = (obj: any, key: string) => {
  return typeof obj[key] === "function" ? obj[key]() : obj[key];
};

export const computableLabel = (obj: any) => {
  return computable(obj, "label");
};
