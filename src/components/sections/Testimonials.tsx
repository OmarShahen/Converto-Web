"use client";

import {
  useScrollAnimation,
  useStaggeredScrollAnimation,
} from "@/hooks/useScrollAnimation";

export const TestimonialsSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: testimonialsRef, visibleItems: testimonialItems } =
    useStaggeredScrollAnimation(4);
  return (
    <>
      <div
        ref={sectionRef}
        id="testimonials"
        className="py-16 lg:py-20 bg-slate-50"
      >
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-800 transform ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[#0d151c] text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 mb-4">
            Success Stories from Store Owners
          </h2>
          <p className="text-[#49749c] text-base sm:text-lg font-normal leading-normal text-center px-4 max-w-3xl mx-auto">
            See how our AI chatbots have transformed businesses across social
            media channels
          </p>
        </div>

        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {/* Testimonial 1 */}
          <div
            className={`flex h-full flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              testimonialItems[0]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <div>
                <h4 className="text-[#0d151c] font-bold">Sarah Chen</h4>
                <p className="text-[#49749c] text-sm">
                  Owner, Boutique Fashion Store
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#0d151c] text-base font-medium leading-normal mb-4">
                "Our Instagram and Facebook sales skyrocketed after implementing
                the chatbot. It handles product recommendations 24/7 and has
                increased our conversion rate by 45%. Best decision we made this
                year!"
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-[#607AFB] font-bold text-sm">RESULTS:</div>
                <div className="text-[#49749c] text-sm">
                  45% increase in conversions • 60% less time on customer
                  service
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div
            className={`flex h-full flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              testimonialItems[1]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">MR</span>
              </div>
              <div>
                <h4 className="text-[#0d151c] font-bold">Marcus Rodriguez</h4>
                <p className="text-[#49749c] text-sm">
                  Founder, Electronics Store
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#0d151c] text-base font-medium leading-normal mb-4">
                "The social media integration was a game-changer. Customers can
                now get instant support and product info through Facebook and
                Instagram. Our abandoned cart recovery improved by 30% and
                customer satisfaction is through the roof."
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-bold text-sm">RESULTS:</div>
                <div className="text-[#49749c] text-sm">
                  30% better cart recovery • 95% customer satisfaction score
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div
            className={`flex h-full flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              testimonialItems[2]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">EJ</span>
              </div>
              <div>
                <h4 className="text-[#0d151c] font-bold">Emma Johnson</h4>
                <p className="text-[#49749c] text-sm">
                  Owner, Home Decor Store
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#0d151c] text-base font-medium leading-normal mb-4">
                "Setup was incredibly easy - no coding required! Our Facebook
                Messenger now handles FAQs automatically, and the AI even helps
                customers find the perfect home decor items. Revenue is up 25%."
              </p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-bold text-sm">
                  RESULTS:
                </div>
                <div className="text-[#49749c] text-sm">
                  25% revenue increase • 80% faster response time
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 4
            <div className={`flex h-full flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
              testimonialItems[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DK</span>
                </div>
                <div>
                  <h4 className="text-[#0d151c] font-bold">David Kim</h4>
                  <p className="text-[#49749c] text-sm">Owner, Sports Equipment Store</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[#0d151c] text-base font-medium leading-normal mb-4">
                  "Managing customer inquiries across Instagram and Facebook used to be overwhelming. Now our AI handles it all seamlessly. We've saved 15 hours per week and sales are up 40%!"
                </p>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-orange-600 font-bold text-sm">RESULTS:</div>
                  <div className="text-[#49749c] text-sm">40% sales increase • 15 hours saved weekly</div>
                </div>
              </div>
            </div> */}
        </div>

        {/* Bottom stats */}
        <div
          className={`mt-12 lg:mt-16 text-center transition-all duration-800 delay-600 transform ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-6 bg-white rounded-full px-8 py-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">+</span>
                </div>
              </div>
              <span className="text-[#49749c] text-sm font-medium">
                5,000+ happy store owners
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#49749c] text-sm font-medium">
                4.9/5 rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
