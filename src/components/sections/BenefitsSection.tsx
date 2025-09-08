"use client";

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

export const BenefitsSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: benefitsRef, visibleItems: benefitItems } = useStaggeredScrollAnimation(3);
  return (
    <>
      <section ref={sectionRef} className="py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
          <div className={`text-center mb-12 lg:mb-16 transition-all duration-800 transform ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-[#0d151c] text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Why Store Owners Choose Our Platform
            </h2>
            <p className="text-[#49749c] text-base sm:text-lg font-normal leading-normal max-w-2xl mx-auto px-4">
              Transform your customer experience and grow your business with AI-powered automation
            </p>
          </div>

          <div ref={benefitsRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Save Time */}
            <div className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              benefitItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-20 h-20 mx-auto mb-6 bg-[#607AFB] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-xl font-bold leading-tight mb-4">
                Save Precious Time
              </h3>
              <p className="text-[#49749c] text-base font-normal leading-normal mb-4">
                Stop spending hours answering the same questions over and over. Our AI handles routine inquiries instantly, freeing up your time to focus on growing your business.
              </p>
              <div className="text-[#607AFB] font-bold text-lg">
                Up to 80% less time on customer support
              </div>
            </div>

            {/* Increase Conversions */}
            <div className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              benefitItems[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V168a8,8,0,0,1,16,0v28.69l50.34-50.35a8,8,0,0,1,11.32,0L128,172.69l26.34-26.35a8,8,0,0,1,11.32,0L216,196.69V168a8,8,0,0,1,16,0Zm-16-40a8,8,0,0,0,8-8V96a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h28.69L128,156.69,101.66,130.34a8,8,0,0,0-11.32,0L40,180.69V152a8,8,0,0,0-16,0v64a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31L96,179.31l26.34,26.35a8,8,0,0,0,11.32,0L216,123.31V160A8,8,0,0,0,216,168Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-xl font-bold leading-tight mb-4">
                Boost Sales & Revenue
              </h3>
              <p className="text-[#49749c] text-base font-normal leading-normal mb-4">
                Turn every conversation into a sales opportunity. Our smart recommendations and automated follow-ups help convert browsers into buyers, even while you sleep.
              </p>
              <div className="text-green-600 font-bold text-lg">
                Average 35% increase in conversions
              </div>
            </div>

            {/* 24/7 Support */}
            <div className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              benefitItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,80H184V48a16,16,0,0,0-16-16H40A16,16,0,0,0,24,48V176a8,8,0,0,0,13,6.22L72,154V184a16,16,0,0,0,16,16h93.59L219,230.22a8,8,0,0,0,5,1.78,8,8,0,0,0,8-8V96A16,16,0,0,0,216,80ZM66.55,137.78,40,159.25V48H168v88H71.58A8,8,0,0,0,66.55,137.78ZM216,207.25l-26.55-21.47a8,8,0,0,0-5-1.78H88V152h80a16,16,0,0,0,16-16V96h32Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-xl font-bold leading-tight mb-4">
                Never Miss a Customer
              </h3>
              <p className="text-[#49749c] text-base font-normal leading-normal mb-4">
                Provide instant, 24/7 customer support across all your social channels. Your customers get immediate answers, and you never lose a sale due to delayed responses.
              </p>
              <div className="text-purple-600 font-bold text-lg">
                Round-the-clock availability
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#607AFB] to-[#507AFB] rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-white text-2xl font-bold mb-4">
                Ready to Transform Your Customer Experience?
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                Join thousands of successful store owners who have revolutionized their business with AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#607AFB] px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#607AFB] transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};