import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { products } from "../assets/index";

const normalize = (value) => (value || "").toString().trim().toLowerCase();

const matchesQuery = (product, query) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return false;

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  const fields = [
    product.name,
    product.category,
    product.subCategory,
    product.description,
  ];

  return tokens.every((token) =>
    fields.some((field) => normalize(field).includes(token))
  );
};

const SearchResults = () => {
  const { query } = useParams();
  const decoded = decodeURIComponent(query || "");

  const results = useMemo(() => {
    if (!decoded.trim()) return [];
    return products.filter((product) => matchesQuery(product, decoded));
  }, [decoded]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-widest">Search results</h1>
        <p className="mt-2 text-sm text-gray-600">
          Showing results for <span className="font-semibold">"{decoded}"</span>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-700">Product unavailable</p>
            <p className="mt-2 text-sm text-gray-500">Try searching for another keyword.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
