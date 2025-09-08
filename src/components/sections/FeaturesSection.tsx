"use client";

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

export const FeaturesSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: featuresRef, visibleItems: featureItems } = useStaggeredScrollAnimation(6);

  return (
    <>
      <section ref={sectionRef} id="features" className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-12 lg:mb-16 transition-all duration-800 transform ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-[#0d151c] text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-[#49749c] text-base sm:text-lg font-normal leading-normal max-w-2xl mx-auto px-4">
              Powerful features designed to transform your social media into a sales machine
            </p>
          </div>

          {/* Hero Feature Banner */}
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#607AFB] to-purple-600 p-6 sm:p-8 lg:p-12 mb-12 lg:mb-16 transform transition-all duration-800 delay-200 hover:scale-[1.02] group ${
            sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative z-10 text-center text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="white" viewBox="0 0 256 256" className="sm:w-10 sm:h-10">
                  <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM176,72v32H152V72ZM136,72v32H120V72ZM104,72v32H80V72ZM64,120H80v32H64Zm40,0h16v32H104Zm32,0h16v32H136Zm40,0h16v32H176Z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                Unified Multi-Channel Dashboard
              </h3>
              <p className="text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto opacity-90 px-4">
                Manage Facebook and Instagram conversations from one powerful interface. Never miss a customer message again.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
              featureItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="#607AFB" viewBox="0 0 256 256" className="sm:w-8 sm:h-8">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149.94,179.65,139.36,188,128,188S106.06,179.65,101.63,168Zm-1.91-16C98.6,140.5,103.55,128,128,128s29.4,12.5,28.28,24Zm82.64,0H169.52c1.19-18.18-3.51-35.75-13.14-49.82C171.41,113.64,182.05,128.68,182.36,152ZM99.62,102.18C90,116.25,85.29,133.82,86.48,152H73.64C73.95,128.68,84.59,113.64,99.62,102.18ZM73.64,168H86.48c-1.08,16.21,2.25,32.32,9.56,46.7A87.65,87.65,0,0,1,73.64,168Zm86.32,46.7c7.31-14.38,10.64-30.49,9.56-46.7h12.84A87.65,87.65,0,0,1,160,214.7Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-lg sm:text-xl font-bold mb-3 group-hover:text-[#607AFB] transition-colors duration-300">
                Smart AI Responses
              </h3>
              <p className="text-[#49749c] text-sm sm:text-base leading-relaxed">
                Advanced AI understands context and responds naturally to customer inquiries, increasing engagement rates by 300%.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
              featureItems[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="#22c55e" viewBox="0 0 256 256" className="sm:w-8 sm:h-8">
                  <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40ZM173.66,138.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L128,172.69l34.34-34.35A8,8,0,0,1,173.66,138.34Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-lg sm:text-xl font-bold mb-3 group-hover:text-green-600 transition-colors duration-300">
                Sales Automation
              </h3>
              <p className="text-[#49749c] text-sm sm:text-base leading-relaxed">
                Automatically guide customers through your sales funnel with personalized product recommendations and seamless checkout.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
              featureItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="#8b5cf6" viewBox="0 0 256 256" className="sm:w-8 sm:h-8">
                  <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-lg sm:text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300">
                No-Code Setup
              </h3>
              <p className="text-[#49749c] text-sm sm:text-base leading-relaxed">
                Get started in under 5 minutes. No technical knowledge required - just connect your accounts and you're ready to go.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
              featureItems[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="#f97316" viewBox="0 0 256 256" className="sm:w-8 sm:h-8">
                  <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8V112a8,8,0,0,1-16,0V91.31L133.66,149.66a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-lg sm:text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors duration-300">
                Analytics & Insights
              </h3>
              <p className="text-[#49749c] text-sm sm:text-base leading-relaxed">
                Detailed analytics show conversation trends, conversion rates, and ROI to optimize your social media strategy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
              featureItems[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="#6366f1" viewBox="0 0 256 256" className="sm:w-8 sm:h-8">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-lg sm:text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                24/7 Availability
              </h3>
              <p className="text-[#49749c] text-sm sm:text-base leading-relaxed">
                Never miss a sale. Your AI chatbot works around the clock to engage customers and capture leads while you sleep.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
              featureItems[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="#ec4899" viewBox="0 0 256 256" className="sm:w-8 sm:h-8">
                  <path d="M248,128a87.34,87.34,0,0,1-17.6,52.81l-46.21-46.21A8,8,0,0,0,173,134.4a8,8,0,0,0-.25,5.59A20,20,0,0,1,152,168H120a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8h32a8,8,0,0,1,0,16H88a8,8,0,0,1-8-8V168a8,8,0,0,0-8-8H56a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H72a8,8,0,0,0,8-8V104a8,8,0,0,0-8-8H56a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H72a8,8,0,0,0,8-8V40a8,8,0,0,1,8-8H152a8,8,0,0,1,8,8V56a8,8,0,0,0,8,8h16a8,8,0,0,1,8,8V88a8,8,0,0,0,8,8h16a8,8,0,0,1,8,8v16a8,8,0,0,0,8,8h16A8,8,0,0,1,248,128Z"/>
                </svg>
              </div>
              <h3 className="text-[#0d151c] text-lg sm:text-xl font-bold mb-3 group-hover:text-pink-600 transition-colors duration-300">
                Brand Customization
              </h3>
              <p className="text-[#49749c] text-sm sm:text-base leading-relaxed">
                Customize your bot's personality, responses, and appearance to perfectly match your brand voice and style.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};