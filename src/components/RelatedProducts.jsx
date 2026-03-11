import React, { useMemo } from 'react';
import useShopStore from '../context/shopStore';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, id }) => {
    const { products } = useShopStore();

    const related = useMemo(() => {
        if (!products || products.length === 0) return [];

        return products
            .filter((item) => category === item.category && item._id !== id)
            .slice(0, 5);
    }, [products, category, id]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <h2 className='font-bold uppercase tracking-widest'>Related Products</h2>
                <div className='w-20 h-1 bg-black mx-auto mt-2'></div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-10'>
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>

            {related.length === 0 && (
                <p className='text-center text-gray-400 mt-5'>No other products found in this category.</p>
            )}
        </div>
    );
};

export default RelatedProducts;