import { getProducts, getProductsById } from '@/services/Products';
import { Product } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface ProductDetailProps {
    product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const datas = await getProducts();
    let products: Product[] = [];
    if (datas.length > 0) {
        products = datas
    }

    const paths = products.map((prod) => ({
        params: { id: prod.id.toString() }
    }))

    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const data = await getProductsById(params?.id as string);
    const product: Product = data;

    return {
        props: {
            product,
        },
        revalidate: 60, //in seconds
    };
}
