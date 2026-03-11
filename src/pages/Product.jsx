import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import useShopStore from "../context/shopStore";
import { useCartStore } from "../store/useCartStore";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
    const { id } = useParams();
    const { products, currency } = useShopStore();
    const addToCart = useCartStore((state) => state.addToCart);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const sizes = [7, 8, 9, 10, 11, 12];

    const productData = useMemo(
        () => products.find((item) => String(item._id) === String(id)),
        [id, products]
    );

    useEffect(() => {
        if (productData) {
            setCurrentIndex(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [productData]);

    if (!productData)
        return (
            <div className="p-20 text-center font-bold text-gray-400">
                Loading...
            </div>
        );

    const images = productData.image || [];

    const handleImageChange = (newIndex) => {
        if (newIndex === currentIndex) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsAnimating(false);
        }, 150); // Short delay for a snappy fade-out/in
    };

    const nextImage = () => {
        const index = (currentIndex + 1) % images.length;
        handleImageChange(index);
    };

    const prevImage = () => {
        const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        handleImageChange(index);
    };

    const mainImage = images[currentIndex];

    return (
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 py-10">
            <div className="flex gap-12 flex-col lg:flex-row items-start">

                {/* IMAGE SECTION */}
                <div className="lg:w-[60%] w-full">

                    {/* Main Image Container - FIXED ASPECT RATIO */}
                    <div className="relative bg-[#f7f7f7] rounded-2xl overflow-hidden aspect-square flex items-center justify-center group shadow-sm border border-gray-50">

                        {/* The Image with Fade Animation */}
                        <div className={`w-full h-full p-8 md:p-12 transition-all duration-300 ease-in-out flex items-center justify-center ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                            <img
                                src={mainImage}
                                alt={productData.name}
                                className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevImage}
                            className="absolute left-6 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-6 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="grid grid-cols-5 gap-3 mt-6">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => handleImageChange(index)}
                                onMouseEnter={() => handleImageChange(index)}
                                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-[#f7f7f7] transition-all border-2
                                    ${currentIndex === index ? "border-black" : "border-transparent opacity-60 hover:opacity-100"}
                                `}
                            >
                                <img
                                    src={img}
                                    alt="thumb"
                                    className="w-full h-full object-cover p-1"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="lg:w-[40%] w-full flex flex-col pt-4">
                    <div className="max-w-[420px]">
                        {/* Header */}
                        <header className="mb-8">
                            <p className="text-[14px] text-orange-600 font-bold uppercase tracking-[0.2em] mb-2">
                                {productData.category}
                            </p>
                            <h1 className="font-black text-4xl md:text-5xl text-gray-900 leading-[0.9] tracking-tighter italic uppercase mb-4">
                                {productData.name}
                            </h1>
                            <p className="text-2xl font-bold text-gray-900">
                                {currency}{productData.price}
                            </p>
                        </header>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed text-base mb-10 italic">
                            {productData.description}
                        </p>

                        {/* SIZE SELECTOR */}
                        <div className="flex flex-col gap-5 mb-10">
                            <div className="flex justify-between items-center px-1">
                                <p className="font-black text-sm text-gray-900 uppercase tracking-tighter">
                                    Select Size
                                </p>
                                <button className="text-gray-400 underline text-xs hover:text-black font-medium transition-colors">
                                    Size Guide
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-4 text-sm flex items-center justify-center border-2 rounded-xl transition-all font-bold
                                            ${selectedSize === size
                                                ? "bg-black text-white border-black shadow-xl -translate-y-1"
                                                : "bg-white text-black border-gray-100 hover:border-black"
                                            }`}
                                    >
                                        US {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => {
                                    if (!selectedSize) return;
                                    addToCart(productData, selectedSize);
                                }}
                                disabled={!selectedSize}
                                className="w-full bg-black text-white py-5 text-[14px] font-black uppercase tracking-[3px] hover:bg-[#222] disabled:bg-gray-100 disabled:text-gray-400 transition-all rounded-full active:scale-95 shadow-lg shadow-black/10"
                            >
                                {selectedSize ? "Add to Bag" : "Select Size"}
                            </button>

                            <button className="w-full border-2 border-gray-100 py-5 text-[14px] font-black uppercase tracking-[3px] hover:border-black transition-all rounded-full flex items-center justify-center gap-3">
                                Favorite <Heart size={18} className="fill-transparent group-hover:fill-black" />
                            </button>
                        </div>

                        {/* EXTRA INFO */}
                        <div className="mt-12 space-y-6 pt-10 border-t border-gray-100 text-sm">
                            <details className="cursor-pointer group">
                                <summary className="font-black text-base list-none flex justify-between items-center uppercase tracking-tighter">
                                    Shipping & Returns
                                    <ChevronRight size={20} className="group-open:rotate-90 transition-transform" />
                                </summary>
                                <div className="pt-4 text-gray-500 leading-relaxed italic">
                                    Free standard delivery on all orders over $150. Return for any reason within 30 days.
                                </div>
                            </details>

                            <details className="cursor-pointer group border-t border-gray-50 pt-6">
                                <summary className="font-black text-base list-none flex justify-between items-center uppercase tracking-tighter">
                                    Reviews (122)
                                    <ChevronRight size={20} className="group-open:rotate-90 transition-transform" />
                                </summary>
                                <div className="pt-4 text-gray-500 italic">
                                    <div className="flex gap-1 text-black mb-2">★★★★★</div>
                                    "The most comfortable pair I've ever owned. The sizing is spot on!"
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            <div className="mt-32 border-t border-gray-100 pt-16">
                <h3 className="text-3xl font-black mb-10 italic uppercase tracking-tighter">
                    You Might Also Like
                </h3>
                <RelatedProducts
                    category={productData.category}
                    id={productData._id}
                />
            </div>
        </div>
    );
};

export default Product;