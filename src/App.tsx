// src/App.tsx
import { CartProvider } from '@/contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';


function App() {
  return (
      <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;