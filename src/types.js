const financialDataExample = {
      date: '', 
      revenue: 0, 
      netIncome: 0, 
      grossProfit: 0, 
      eps: 0, 
      operatingIncome: 0, 
    };
    
    const filterStateExample = {
      dateRange: {
        start: '', 
        end: '', 
      },
      revenue: {
        min: '', 
        max: '', 
      },
      netIncome: {
        min: '', 
        max: '', 
      },
    };
    
    const SORT_FIELDS = ['date', 'revenue', 'netIncome'];
    const SORT_DIRECTIONS = ['asc', 'desc'];
    