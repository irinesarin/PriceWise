export interface Product {
  title: string;
  price: number;
  image_url: string;
  product_url: string;
  source: 'amazon' | 'flipkart';
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`http://localhost:8000/api/search/${encodeURIComponent(query)}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
