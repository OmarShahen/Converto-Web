"use client";

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

export const SocialProofSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: logosRef, visibleItems: logoItems } = useStaggeredScrollAnimation(6);
  return (
    <>
      <div ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-slate-50">
        <div className={`text-center mb-12 transition-all duration-800 transform ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-[#49749c] text-sm font-medium leading-normal tracking-[0.015em] uppercase mb-2">
            Trusted by 5,000+ store owners
          </h3>
          <p className="text-[#0d151c] text-base sm:text-lg font-medium leading-normal">
            Join thousands of successful store owners who are growing their business with AI chatbots
          </p>
        </div>
        
        <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 items-center justify-items-center max-w-6xl mx-auto">
          {/* Store Logo Placeholders */}
          {['STORE', 'SHOP', 'MART', 'BOUTIQUE', 'RETAIL', 'MARKET'].map((name, index) => (
            <div
              key={name}
              className={`flex items-center justify-center h-14 sm:h-16 w-20 sm:w-24 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform hover:scale-105 ${
                logoItems[index] ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="text-gray-400 font-bold text-xs sm:text-sm">{name}</div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto transition-all duration-800 delay-400 transform ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#607AFB] mb-2">5,000+</div>
            <div className="text-[#49749c] text-sm font-medium">Active Store Owners</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#607AFB] mb-2">2M+</div>
            <div className="text-[#49749c] text-sm font-medium">Messages Handled</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#607AFB] mb-2">35%</div>
            <div className="text-[#49749c] text-sm font-medium">Average Sales Increase</div>
          </div>
        </div>
      </div>
    </>
  );
};