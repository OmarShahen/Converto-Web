"use client";

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

const HowItWorksSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: stepsRef, visibleItems: stepItems } = useStaggeredScrollAnimation(3);
  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-800 transform ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-[#0d151c] text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight tracking-[-0.015em] mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-[#49749c] text-base sm:text-lg font-normal leading-normal max-w-2xl mx-auto px-4">
            From setup to sales in minutes. No technical knowledge required.
          </p>
        </div>

        {/* Process Flow */}
        <div ref={stepsRef} className="relative">
          {/* Timeline Line */}
          <div className={`hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#607AFB] to-transparent z-0 transition-all duration-1000 delay-300 transform-gpu ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
            {/* Step 1 */}
            <div className={`relative transition-all duration-700 transform ${
              stepItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 text-center relative z-10 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <div className="w-20 h-20 mx-auto bg-[#607AFB] rounded-full flex items-center justify-center mb-6 relative transform transition-transform duration-300 group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    fill="white"
                    viewBox="0 0 256 256"
                    className="transform transition-all duration-300"
                  >
                    <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.5,56.9,77.54,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/>
                  </svg>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 animate-bounce">
                    <span className="text-[#607AFB] text-sm font-bold">1</span>
                  </div>
                </div>
                
                <h3 className="text-[#0d151c] text-xl font-bold leading-tight mb-3 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                  Sign Up & Setup
                </h3>
                <p className="text-[#49749c] text-base font-normal leading-relaxed mb-4">
                  Create your account and tell us about your store. Our AI will automatically configure your chatbot based on your products and services.
                </p>
                <div className="text-[#607AFB] text-sm font-medium animate-pulse">
                  ⏱️ Takes 2-3 minutes
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`relative transition-all duration-700 delay-200 transform ${
              stepItems[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 text-center relative z-10 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6 relative transform transition-transform duration-300 group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    fill="white"
                    viewBox="0 0 256 256"
                    className="transform transition-all duration-300"
                  >
                    <path d="M248,128a87.34,87.34,0,0,1-17.6,52.81l-46.21-46.21A8,8,0,0,0,173,134.4a8,8,0,0,0-.25,5.59A20,20,0,0,1,152,168H120a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8h32a8,8,0,0,1,0,16H88a8,8,0,0,1-8-8V168a8,8,0,0,0-8-8H56a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H72a8,8,0,0,0,8-8V104a8,8,0,0,0-8-8H56a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H72a8,8,0,0,0,8-8V40a8,8,0,0,1,8-8H152a8,8,0,0,1,8,8V56a8,8,0,0,0,8,8h16a8,8,0,0,1,8,8V88a8,8,0,0,0,8,8h16a8,8,0,0,1,8,8v16a8,8,0,0,0,8,8h16A8,8,0,0,1,248,128Z"/>
                  </svg>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                </div>
                
                <h3 className="text-[#0d151c] text-xl font-bold leading-tight mb-3 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                  Connect Social Media
                </h3>
                <p className="text-[#49749c] text-base font-normal leading-relaxed mb-4">
                  One-click integration with Facebook Messenger and Instagram DMs. We handle all the technical setup for you.
                </p>
                <div className="text-green-600 text-sm font-medium animate-pulse">
                  🔗 Instant connection
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`relative transition-all duration-700 delay-400 transform ${
              stepItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 sm:p-8 text-center relative z-10 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <div className="w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center mb-6 relative transform transition-transform duration-300 group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    fill="white"
                    viewBox="0 0 256 256"
                    className="transform transition-all duration-300"
                  >
                    <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40ZM173.66,138.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L128,172.69l34.34-34.35A8,8,0,0,1,173.66,138.34Z"/>
                  </svg>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 animate-bounce" style={{ animationDelay: '0.4s' }}>
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                </div>
                
                <h3 className="text-[#0d151c] text-xl font-bold leading-tight mb-3 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                  Go Live & Start Selling
                </h3>
                <p className="text-[#49749c] text-base font-normal leading-relaxed mb-4">
                  Your AI chatbot is now live! It automatically handles customer questions, recommends products, and processes orders 24/7.
                </p>
                <div className="text-purple-600 text-sm font-medium animate-pulse">
                  🚀 Immediate results
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 lg:mt-16 transition-all duration-800 delay-600 transform ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-r from-[#607AFB]/5 to-purple-500/5 rounded-2xl p-6 sm:p-8 max-w-2xl mx-4 lg:mx-auto transform transition-all duration-300 hover:scale-102">
            <h3 className="text-[#0d151c] text-xl font-bold mb-3">
              Ready to transform your customer service?
            </h3>
            <p className="text-[#49749c] text-base font-normal mb-6">
              Join 5,000+ store owners who've automated their social media customer interactions
            </p>
            <button className="bg-[#607AFB] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-[#507AFB] transition-all duration-300 text-base sm:text-lg transform hover:scale-105 hover:shadow-lg w-full sm:w-auto">
              Start Your Free 14-Day Trial
            </button>
            <p className="text-[#49749c] text-sm mt-3">
              No credit card required • Setup in under 10 minutes
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HowItWorksSection;
