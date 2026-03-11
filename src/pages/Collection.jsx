import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../assets/index';
import ProductItem from '../components/ProductItem';

const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A → Z' },
    { value: 'name-desc', label: 'Name: Z → A' },
];

const Collection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get('category') || 'All';
    const sortBy = searchParams.get('sort') || 'newest';

    const categories = useMemo(() => {
        const unique = Array.from(new Set(products.map((p) => p.category)));
        return ['All', ...unique];
    }, []);

    const setParam = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value == null || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        setSearchParams(params);
    };

    const filteredProducts = useMemo(() => {
        let working = products;

        if (selectedCategory && selectedCategory !== 'All') {
            working = working.filter((item) => item.category === selectedCategory);
        }

        const sorted = [...working];

        switch (sortBy) {
            case 'oldest':
                sorted.sort((a, b) => a.date - b.date);
                break;
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => b.date - a.date);
                break;
        }

        return sorted;
    }, [selectedCategory, sortBy]);

    return (
        <div className="w-full mx-auto px-4 lg:px-10 pt-10">
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-10">

                {/* Filters Sidebar */}
                {/* Added 'lg:border-r', 'lg:pr-10', and 'border-gray-200' to create the vertical line */}
                <aside className="lg:w-64 w-full lg:sticky lg:top-24 h-fit border-b lg:border-b-0 lg:border-r border-gray-200 pr-0 lg:pr-10 pb-8 lg:pb-0">
                    <h3 className="hidden lg:block text-xl font-bold mb-6">Filters</h3>

                    <div className="flex justify-center lg:justify-start lg:flex-col gap-4 lg:gap-8">
                        {/* Category Filter */}
                        <div className="flex flex-col gap-2">
                            <label className="hidden lg:block text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                            <select
                                value={selectedCategory === 'All' ? '' : selectedCategory}
                                onChange={(e) =>
                                    setParam(
                                        'category',
                                        e.target.value === '' ? null : e.target.value
                                    )
                                }
                                className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm w-40 lg:w-full focus:ring-1 focus:ring-black outline-none"
                            >
                                <option value="">All Categories</option>
                                {categories
                                    .filter((cat) => cat !== 'All')
                                    .map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div className="flex flex-col gap-2">
                            <label className="hidden lg:block text-xs font-semibold text-gray-500 uppercase tracking-wider">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setParam('sort', e.target.value)}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm w-40 lg:w-full focus:ring-1 focus:ring-black outline-none"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Products Section */}
                <div className="flex-1 lg:pl-4 pt-8 lg:pt-0">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                            {selectedCategory && selectedCategory !== 'All'
                                ? `${selectedCategory} Collection`
                                : 'All Sneakers'}
                        </h2>
                        <span className="text-gray-500 text-sm font-medium">
                            {filteredProducts.length} Products
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-12 lg:gap-x-8 pb-24 mb-10">
                        {filteredProducts.map((item, index) => (
                            <ProductItem
                                key={item._id || index} // Preferred to use _id if available
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Collection;