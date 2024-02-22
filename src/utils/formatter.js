export function formatNumber(number) {
  return new Intl.NumberFormat('id-ID').format(number);
}
