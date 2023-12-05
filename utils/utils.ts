export function formatRupiah(amount: number): string {
  // Round the number to remove decimal places
  const roundedAmount = Math.round(amount);

  // Format the rounded number to currency
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(roundedAmount);

  return formattedAmount;
}
