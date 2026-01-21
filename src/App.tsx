// src/App.tsx
import { CartProvider } from '@/contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ProductProvider } from './contexts/ProductContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider> 
        <CartProvider>
          <AppRoutes />
          <Toaster 
            position="top-right" 
            expand={false}
            richColors
            closeButton
            duration={4000}
          />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;