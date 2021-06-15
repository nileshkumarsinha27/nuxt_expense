export const currencyFormatter = (
  value: number,
  minimumFractionDigits = 0,
  locale = 'en-IN',
  currency = 'INR'
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  });
  return formatter.format(value);
};
