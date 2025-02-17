import { render, screen } from '@testing-library/react';
import Products, { getServerSideProps } from '@/pages/products';
import { getProducts } from '@/services/Products';
import { Product } from '@/types';

// Mock the getProducts service
jest.mock('@/services/Products', () => ({
  getProducts: jest.fn(),
}));

describe('Products Page', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      images: ['https://example.com/image1.jpg'],
      price: 0,
      description: '',
      category: {
        id: 1,
        name: 'Category 1',
        image: 'https://example.com/category1.jpg',
      },
    },
    {
      id: 2,
      title: 'Product 2',
      images: ['https://example.com/image2.jpg'],
      price: 0,
      description: '',
      category: {
        id: 2,
        name: 'Category 2',
        image: 'https://example.com/category2.jpg',
      },
    },
  ];

  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('fetches products in getServerSideProps', async () => {
    const context = {};
    const result = await getServerSideProps(context as any);
    expect(result).toEqual({
      props: {
        products: mockProducts,
      },
    });
  });

  it('renders products correctly', () => {
    render(<Products products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getAllByAltText('image').length).toBe(2);
  });
});
