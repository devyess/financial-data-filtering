export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const filterData = (data, filters) => {
  return data.filter((item) => {
    const dateInRange =
      (!filters.dateRange.start || item.date >= filters.dateRange.start) &&
      (!filters.dateRange.end || item.date <= filters.dateRange.end);

    const revenueInRange =
      (!filters.revenue.min || item.revenue >= Number(filters.revenue.min)) &&
      (!filters.revenue.max || item.revenue <= Number(filters.revenue.max));

    const netIncomeInRange =
      (!filters.netIncome.min || item.netIncome >= Number(filters.netIncome.min)) &&
      (!filters.netIncome.max || item.netIncome <= Number(filters.netIncome.max));

    return dateInRange && revenueInRange && netIncomeInRange;
  });
};
