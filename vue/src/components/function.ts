export function splitImage(rowNo: number, columnNo: number): boolean {
  if (!Number.isInteger(rowNo) || !Number.isInteger(columnNo)) {
    throw new Error("The value must be an integer.");
  }

  return true;
}
