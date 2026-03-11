import React, { useState } from "react";
import {
    Truck,
    RefreshCcw,
    CreditCard,
    User,
    MessageCircle,
    Mail,
    Phone,
    Search
} from "lucide-react";

const Help = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const faqCategories = [
        {
            title: "Shipping & Delivery",
            icon: <Truck size={24} />,
            questions: [
                { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days." },
                { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. Costs vary by location." }
            ]
        },
        {
            title: "Returns & Refunds",
            icon: <RefreshCcw size={24} />,
            questions: [
                { q: "What is your return policy?", a: "We offer a 30-day return policy for unworn sneakers in their original packaging." },
                { q: "How long do refunds take?", a: "Once received, refunds are processed within 5-7 business days." }
            ]
        },
        {
            title: "Payments & Orders",
            icon: <CreditCard size={24} />,
            questions: [
                { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, AMEX, PayPal, and Apple Pay." },
                { q: "Can I cancel my order?", a: "Orders can be cancelled within 30 minutes of placement." }
            ]
        },
        {
            title: "Account",
            icon: <User size={24} />,
            questions: [
                { q: "How do I create an account?", a: "Click the 'Join Us' link in the top bar to register with your email." },
                { q: "I forgot my password.", a: "Use the 'Forgot Password' link on the Sign In page to reset it." }
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Header */}
            <section className="bg-[#f5f5f5] py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-6">GET HELP</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="What can we help you with?"
                            className="w-full py-4 px-12 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
            </section>

            {/* FAQ Grid */}
            <section className="max-w-7xl mx-auto py-16 px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {faqCategories.map((cat, i) => (
                        <div key={i} className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <span className="text-black">{cat.icon}</span>
                                <h2 className="font-bold text-lg uppercase tracking-tight">{cat.title}</h2>
                            </div>
                            <ul className="space-y-4">
                                {cat.questions.map((item, idx) => (
                                    <li key={idx} className="group cursor-pointer">
                                        <p className="font-bold text-sm group-hover:underline">{item.q}</p>
                                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.a}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Options */}
            <section className="bg-black text-white py-20 px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center md:text-left">
                        Contact Us
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Phone Option */}
                        <div className="flex items-start gap-5 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                            <div className="p-3 bg-white text-black rounded-xl shrink-0">
                                <Phone size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1">000-800-919-0566</h3>
                                <p className="text-gray-400 text-sm mb-1">Available 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Mon - Fri</p>
                            </div>
                        </div>

                        {/* Live Chat Option */}
                        <div className="flex items-start gap-5 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                            <div className="p-3 bg-white text-black rounded-xl shrink-0">
                                <MessageCircle size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg leading-tight mb-1">Live Chat</h3>
                                <p className="text-gray-400 text-sm mb-4">Chat with our experts for instant support.</p>
                                <button className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                                    Chat Now
                                </button>
                            </div>
                        </div>

                        {/* Email Option */}
                        <div className="flex items-start gap-5 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                            <div className="p-3 bg-white text-black rounded-xl shrink-0">
                                <Mail size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg leading-tight mb-1">Email Us</h3>
                                <p className="text-gray-400 text-sm mb-4">We'll get back to you within 24 hours.</p>
                                <button className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                                    Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Help;