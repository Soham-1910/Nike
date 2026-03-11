import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/index";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Jordan", category: "Jordan", image: products.find(p => p.category === "Jordan")?.image[0] },
    { name: "Lebron", category: "Lebron", image: products.find(p => p.category === "Lebron")?.image[0] },
    { name: "Travis Scott", category: "Travis Scott", image: products.find(p => p.category === "Travis Scott")?.image[0] },
    { name: "Supreme", category: "Supreme", image: products.find(p => p.category === "Supreme")?.image[0] },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest">JUST DO IT</h1>
            <p className="mt-4 text-base md:text-lg text-gray-200 italic uppercase tracking-tighter">Exclusive drops and limited editions</p>
            <button
              onClick={() => navigate('/collection')}
              className="mt-6 px-10 py-4 bg-white text-black font-bold uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300 ease-in-out active:scale-95 cursor-pointer rounded-full"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Brand Category Section */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10 uppercase tracking-tighter italic">Shop by Brand</h2>

          {/* FIX EXPLAINED:
            1. 'snap-x snap-mandatory' handles the alignment.
            2. 'px-[calc(50%-140px)]' is the magic. 
               140px is half the width of your mobile card (280px).
               By setting padding to (Half Screen - Half Card), the card sits perfectly in the center.
          */}
          <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-10 md:pb-0 snap-x snap-mandatory scrollbar-hide px-[calc(50%-140px)] md:px-10">
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/collection?category=${item.category}`)}
                className="
                  flex-none w-[280px] md:w-full snap-center
                  group cursor-pointer relative overflow-hidden rounded-2xl bg-[#f9f9f9] border border-gray-100 hover:shadow-2xl transition-all duration-500
                "
              >
                {/* Image Container */}
                <div className="aspect-square flex items-center justify-center bg-[#f6f6f6]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Info */}
                <div className="p-6 text-center bg-white">
                  <h3 className="font-black text-gray-900 uppercase text-lg tracking-tighter italic">
                    {item.name}
                  </h3>
                  <div className="w-8 h-[2px] bg-black mx-auto mt-2 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Hint dots for Mobile */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {categories.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-200"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;