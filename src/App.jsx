import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { formatCurrency, filterData } from './utils';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    revenue: { min: '', max: '' },
    netIncome: { min: '', max: '' },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=9hVAoELoh3MxIfbUvDOWXmrRDoYqX4g8'
        );
        const jsonData = await response.json();

        const transformedData = jsonData.map((item) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));

        setData(transformedData);
      } catch (err) {
        setError('Failed to fetch financial data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = filterData(data, filters);
    return [...filteredData].sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return multiplier * (a[sortField] > b[sortField] ? 1 : -1);
    });
  }, [data, filters, sortField, sortDirection]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
        
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Date Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Start Year"
                className="border rounded p-2"
                value={filters.dateRange.start}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, start: e.target.value },
                  })
                }
              />
              <input
                type="number"
                placeholder="End Year"
                className="border rounded p-2"
                value={filters.dateRange.end}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, end: e.target.value },
                  })
                }
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Revenue Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                className="border rounded p-2"
                value={filters.revenue.min}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    revenue: { ...filters.revenue, min: e.target.value },
                  })
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="border rounded p-2"
                value={filters.revenue.max}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    revenue: { ...filters.revenue, max: e.target.value },
                  })
                }
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Net Income Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                className="border rounded p-2"
                value={filters.netIncome.min}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    netIncome: { ...filters.netIncome, min: e.target.value },
                  })
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="border rounded p-2"
                value={filters.netIncome.max}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    netIncome: { ...filters.netIncome, max: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center space-x-1 font-semibold"
                    onClick={() => handleSort('date')}
                  >
                    <span>Date</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center space-x-1 font-semibold"
                    onClick={() => handleSort('revenue')}
                  >
                    <span>Revenue</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center space-x-1 font-semibold"
                    onClick={() => handleSort('netIncome')}
                  >
                    <span>Net Income</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-semibold">Gross Profit</th>
                <th className="px-4 py-3 text-left font-semibold">EPS</th>
                <th className="px-4 py-3 text-left font-semibold">Operating Income</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedAndFilteredData.map((item) => (
                <tr key={item.date} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{formatCurrency(item.revenue)}</td>
                  <td className="px-4 py-3">{formatCurrency(item.netIncome)}</td>
                  <td className="px-4 py-3">{formatCurrency(item.grossProfit)}</td>
                  <td className="px-4 py-3">${item.eps.toFixed(2)}</td>
                  <td className="px-4 py-3">{formatCurrency(item.operatingIncome)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;