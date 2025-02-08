import Card from '@/components/common/Card';
import CustomCarousel from '@/components/common/CustomCarousel';
import { CarouselItem } from '@/components/ui/carousel';
import { getProducts } from '@/services/Products';
import { Product } from '@/types';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface ProductsProps {
    products: Product[]
}

const Products = ({ products }: ProductsProps) => {
    const defaultImage = "https://picsum.photos/200";
    return (
        <section>
            <div className='container mx-auto my-4'>
                <div className='flex flex-wrap justify-center'>
                    <div className='w-1/2'>

                    </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                    {products.length > 0 && products.map((product, idx) => (
                        <Link key={idx} href={`/products/${product.id}`}>
                            <Card className='m-6 bg-slate-400 w-1/5'>
                                <Card.Header>
                                    <CustomCarousel>
                                        {product.images.length > 0 && product.images.map((img, index) => {
                                            let newImg;
                                            if (typeof img === 'string') {
                                                try {
                                                    const parsedArray = JSON.parse(img);
                                                    newImg = Array.isArray(parsedArray) && parsedArray.length > 0 ? parsedArray[0] : null;
                                                } catch (error) {
                                                    console.error(error)
                                                    newImg = null;
                                                }
                                            } else if (Array.isArray(img)) {
                                                newImg = img[0];
                                            } else {
                                                newImg = null;
                                            }
                                            return (
                                                <CarouselItem key={index} className='pl-0 w-1/4'>
                                                    <Image src={newImg || defaultImage} alt='image' key={index} width={300} height={300} />
                                                </CarouselItem>
                                            )
                                        })}
                                    </CustomCarousel>
                                </Card.Header>
                                <span className='text-black font-bold'>
                                    {product.title}
                                </span>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products;

export const getServerSideProps: GetServerSideProps = async () => {
    const datas = await getProducts();
    let products;
    if (datas.length > 0) {
        products = datas
    }

    return {
        props: {
          products,
        },
    };
}