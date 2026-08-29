import { InventoryProvider } from './context/InventoryContext';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <InventoryProvider>
      <Dashboard />
    </InventoryProvider>
  );
}

export default App;
