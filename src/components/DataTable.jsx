import useFetchedData from '../hooks/useFetchedData';
import { useEffect, useMemo, useState } from 'react';

const DataTable = () => {
  const data = useFetchedData(
    'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=9hVAoELoh3MxIfbUvDOWXmrRDoYqX4g8'
  );
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedData, setSortedData] = useState([]);
  const [filters, setFilters] = useState({
    minDate: '',
    maxDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  useEffect(() => {
    if (data && data.data) {
      setSortedData(data.data);
    }
  }, [data]);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sdata = [...sortedData].sort((a, b) => {
      const valueA = column === 'date' ? new Date(a[column]) : Number(a[column]);
      const valueB = column === 'date' ? new Date(b[column]) : Number(b[column]);
  
      if (newSortOrder === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
    setSortedData(sdata);
  };
  
  const handleDateSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sdata = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setSortedData(sdata);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = useMemo(() => {
    if (!sortedData) return [];
    return sortedData.filter((item) => {
      const itemDate = new Date(item.date);
      const dateMatch =
        (!filters.minDate || itemDate >= new Date(filters.minDate)) &&
        (!filters.maxDate || itemDate <= new Date(filters.maxDate));
      const revenueMatch =
        (filters.minRevenue ? item.revenue >= filters.minRevenue : true) &&
        (filters.maxRevenue ? item.revenue <= filters.maxRevenue : true);
      const netIncomeMatch =
        (filters.minNetIncome ? item.netIncome >= filters.minNetIncome : true) &&
        (filters.maxNetIncome ? item.netIncome <= filters.maxNetIncome : true);
      return dateMatch && revenueMatch && netIncomeMatch;
    });
  }, [sortedData, filters]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
          Financial Data
        </h3>
        <p className="text-gray-500 mb-6">
          View income and revenue details with sorting and filtering options.
        </p>
        <h4 className="font-semibold mb-2">Filters</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <input
            type="number"
            name="minDate"
            placeholder="Year From"
            value={filters.minDate}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:outline-blue-500"
          />
          <input
            type="number"
            name="maxDate"
            placeholder="Year To"
            value={filters.maxDate}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:outline-blue-500"
          />
          <input
            type="number"
            name="minRevenue"
            placeholder="Min Revenue"
            value={filters.minRevenue}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:outline-blue-500"
          />
          <input
            type="number"
            name="maxRevenue"
            placeholder="Max Revenue"
            value={filters.maxRevenue}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:outline-blue-500"
          />
          <input
            type="number"
            name="minNetIncome"
            placeholder="Min Net Income"
            value={filters.minNetIncome}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:outline-blue-500"
          />
          <input
            type="number"
            name="maxNetIncome"
            placeholder="Max Net Income"
            value={filters.maxNetIncome}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:outline-blue-500"
          />
        </div>

        {data.loading ? (
          <p>Loading...</p>
        ) : data.error ? (
          <p className="text-red-500">Error: {data.error.message}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-3 border border-gray-300">
                    Date
                    <button onClick={handleDateSort} className="ml-2 text-blue-500">
                      <i className="fas fa-sort"></i>
                    </button>
                  </th>
                  <th className="p-3 border border-gray-300">
                    Revenue
                    <button onClick={() => handleSort('revenue')} className="ml-2 text-blue-500">
                      <i className="fas fa-sort"></i>
                    </button>
                  </th>
                  <th className="p-3 border border-gray-300">
                    Net Income
                    <button onClick={() => handleSort('netIncome')} className="ml-2 text-blue-500">
                      <i className="fas fa-sort"></i>
                    </button>
                  </th>
                  <th className="p-3 border border-gray-300">Gross Profit</th>
                  <th className="p-3 border border-gray-300">Earnings Per Share</th>
                  <th className="p-3 border border-gray-300">Operating Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="p-3 border border-gray-300">{item.date}</td>
                    <td className="p-3 border border-gray-300">{item.revenue}</td>
                    <td className="p-3 border border-gray-300">{item.netIncome}</td>
                    <td className="p-3 border border-gray-300">{item.grossProfit}</td>
                    <td className="p-3 border border-gray-300">{item.eps}</td>
                    <td className="p-3 border border-gray-300">{item.operatingIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
