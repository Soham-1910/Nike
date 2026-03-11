import React from 'react';
import { Link } from 'react-router-dom';
import useShopStore from '../context/shopStore';

const ProductItem = ({ id, image, name, price }) => {
    const currency = useShopStore((state) => state.currency);

    return (
        <Link className='group text-gray-700 cursor-pointer flex flex-col' to={`/product/${id}`}>
            {/* Fixed Aspect Ratio Container (Square) */}
            <div className='aspect-square overflow-hidden rounded-xl bg-[#f5f5f5] p-4 flex items-center justify-center'>
                <img
                    className='group-hover:scale-110 transition-transform duration-500 w-full h-full object-contain mix-blend-multiply'
                    src={image[0]}
                    alt={name}
                />
            </div>

            {/* Content area with fixed height to keep alignment */}
            <div className='mt-4 flex flex-col flex-grow'>
                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1'>New Arrival</p>
                <h3 className='text-sm font-semibold text-gray-900 leading-tight line-clamp-2 mb-2'>
                    {name}
                </h3>
                <p className='text-lg font-black'>{currency}{price}</p>
            </div>
        </Link>
    );
}

export default ProductItem;