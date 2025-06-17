import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProducts, deleteProduct } from '../api';
import { Trash, Edit } from 'lucide-react';

const ProductList = ({ setEditProduct, showToast }) => {
  const queryClient = useQueryClient();
  
  const { data: products, isLoading, isError, error } = useQuery('products', fetchProducts, {
    onError: (err) => {
      console.error("Query error details:", err);
    }
  });
  
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      showToast('Product deleted successfully');
    },
    onError: (error) => {
      showToast(error.message || 'Failed to delete product', 'error');
    }
  });
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };
  
  if (isLoading) {
    return <div className="text-center py-4 dark:text-white">Loading products...</div>;
  }
  
  if (isError) {
    return (
      <div className="text-center py-4">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          <p className="font-bold">Error fetching products</p>
          <p>{error.message || 'Unknown error'}</p>
          <p className="text-sm mt-2">Check that your backend server is running at api/products</p>
        </div>
      </div>
    );
  }
  
  if (!products || products.length === 0) {
    return <div className="text-center py-4 dark:text-white">No products found. Add some!</div>;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-16 w-16 object-cover rounded border border-gray-200 dark:border-gray-600"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button 
                    onClick={() => setEditProduct(product)}
                    className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors duration-150"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors duration-150"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;