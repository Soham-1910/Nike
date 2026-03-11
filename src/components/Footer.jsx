import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram, Globe, Plus, Minus } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (title) => {
        setOpenSection(openSection === title ? null : title);
    };

    const footerLinks = [
        {
            title: "Resources",
            links: ["Gift Cards", "Find a Store", "Membership", "Site Feedback"],
        },
        {
            title: "Help",
            links: ["Get Help", "Order Status", "Shipping & Delivery", "Returns", "Order Cancellation", "Payment Options"],
        },
        {
            title: "Company",
            links: ["About Nike", "News", "Careers", "Investors", "Sustainability"],
        },
    ];

    return (
        <footer className="bg-[#111] text-white pt-10 pb-10 px-6 md:px-10 font-montserrat mt-auto">
            <div className="max-w-[1440px] mx-auto">

                {/* Main Content Section */}
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">

                    {/* Desktop: Grid | Mobile: Accordion */}
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-20 flex-grow">
                        {footerLinks.map((column) => (
                            <div key={column.title} className="border-b border-gray-800 md:border-none">
                                {/* Header - Clickable on Mobile */}
                                <button
                                    onClick={() => toggleSection(column.title)}
                                    className="w-full flex justify-between items-center py-4 md:py-0 md:mb-6 outline-none group"
                                >
                                    <h4 className="font-black uppercase text-[12px] tracking-widest text-left">
                                        {column.title}
                                    </h4>
                                    <span className="md:hidden">
                                        {openSection === column.title ? <Minus size={16} /> : <Plus size={16} />}
                                    </span>
                                </button>

                                {/* Links List */}
                                <ul className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ease-in-out 
                                    ${openSection === column.title ? "max-h-60 pb-6" : "max-h-0 md:max-h-full"}
                                `}>
                                    {column.links.map((link) => (
                                        <li key={link}>
                                            <Link
                                                to="#"
                                                className="text-gray-500 hover:text-white text-[12px] transition-colors font-medium block py-1"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Social Icons - Centered on Mobile */}
                    <div className="flex gap-4 items-center justify-start md:items-start self-start pt-4 md:pt-0">
                        {[Twitter, Facebook, Youtube, Instagram].map((Icon, index) => (
                            <Link
                                key={index}
                                to="#"
                                className="bg-[#333] hover:bg-white text-[#7e7e7e] hover:text-black w-9 h-9 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                            >
                                <Icon size={20} fill="currentColor" strokeWidth={0} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Legal & Copyright */}
                <div className="pt-8 border-t border-gray-800 flex flex-col gap-8">

                    {/* Location and Copyright Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <Globe size={14} className="text-white" />
                                <span className="text-[12px] font-bold hover:text-gray-400 transition-colors">United States</span>
                            </div>
                            <p className="text-gray-500 text-[11px]">
                                © {currentYear} Nike, Inc. All Rights Reserved
                            </p>
                        </div>

                        {/* Legal Links - Stacked on Mobile, Row on Desktop */}
                        <ul className="flex flex-wrap gap-x-6 gap-y-4 md:gap-y-2">
                            {[
                                "Guides", "Terms of Sale", "Terms of Use",
                                "Nike Privacy Policy", "CA Supply Chains Act", "Cookie Policy"
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="#"
                                        className="text-gray-500 hover:text-white text-[11px] transition-colors whitespace-nowrap"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;