
export const fetchProducts = async () => {
  try {
    console.log('Fetching products from:', `api/products`);
    const response = await fetch(`api/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch products');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  const response = await fetch(`api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to create product');
  }
  
  return data.data;
};

export const updateProduct = async (productData) => {
  const response = await fetch(`api/products/${productData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to update product');
  }
  
  return data.data;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`api/products/${id}`, {
    method: 'DELETE',
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to delete product');
  }
  
  return data;
};