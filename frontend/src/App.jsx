import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ProductApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ProductApp() {
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm 
              editProduct={editProduct} 
              setEditProduct={setEditProduct} 
              showToast={showToast}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Product List</h2>
            <ProductList 
              setEditProduct={setEditProduct} 
              showToast={showToast}
            />
          </div>
        </div>
      </div>
      {toast.show && (
        <Toast message={toast.message} type={toast.type} />
      )}
    </div>
  );
}

export default App;