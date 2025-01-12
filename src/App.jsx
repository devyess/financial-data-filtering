import DataTable from './components/DataTable'
import useFetchedData from './hooks/useFetchedData'

const App = () => {
  return (
    <div style={{backgroundColor: '#'}} className="w-full min-h-screen p-5 rounded-lg shadow-lg">
      <DataTable/>
    </div>
  )
}

export default App;