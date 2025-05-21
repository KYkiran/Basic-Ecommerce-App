import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct, updateProduct } from '../api';

const ProductForm = ({ editProduct, setEditProduct, showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  });
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (editProduct) {
      setFormData({
        ...editProduct,
        price: editProduct.price.toString()
      });
    }
  }, [editProduct]);
  
  const createMutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      resetForm();
      showToast('Product created successfully');
    },
    onError: (error) => {
      showToast(error.message || 'Failed to create product', 'error');
    }
  });
  
  const updateMutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      resetForm();
      showToast('Product updated successfully');
    },
    onError: (error) => {
      showToast(error.message || 'Failed to update product', 'error');
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({ name: '', price: '', image: '' });
    setEditProduct(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.price || !formData.image) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    if (editProduct) {
      updateMutation.mutate(productData);
    } else {
      createMutation.mutate(productData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-200">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter product name"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter price"
          min="0"
          step="0.01"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter image URL"
        />
      </div>

      {formData.image && (
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">Image Preview:</p>
          <img 
            src={formData.image} 
            alt="Preview" 
            className="h-32 w-32 object-cover rounded border border-gray-300 dark:border-gray-600"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
      )}
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {editProduct ? 'Update Product' : 'Add Product'}
        </button>
        
        {editProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;