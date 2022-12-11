//components
import Login from './components/account/Login'
import DataProvider from './context/DataProvider';
function App() {
  return (
    <div>
     <DataProvider>
        <Login/>
     </DataProvider>
    </div>
  );
}

export default App;
