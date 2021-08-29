export function filterPageSize(pageSize: number, pageOptions: number[]): number {
  const currentOption = pageOptions.find((option) => option === pageSize);

  return currentOption ?? pageOptions[0];
}
