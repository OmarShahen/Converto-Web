"use client";

import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { MessageSquare, Users, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <MessageSquare className="w-8 h-8 text-[#607AFB]" />,
      title: "Customer-First Approach",
      description: "We believe every customer interaction should be meaningful, helpful, and lead to real business results."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#607AFB]" />,
      title: "Innovation & Simplicity",
      description: "Cutting-edge AI technology made simple and accessible for business owners of all technical levels."
    },
    {
      icon: <Users className="w-8 h-8 text-[#607AFB]" />,
      title: "Empowering Small Business",
      description: "We're dedicated to giving small and medium businesses the same AI advantages as large enterprises."
    },
    {
      icon: <Target className="w-8 h-8 text-[#607AFB]" />,
      title: "Results-Driven",
      description: "Every feature we build is designed to increase sales, improve customer satisfaction, and save time."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <LegalPageHeader 
        title="About Us" 
        subtitle="Empowering businesses with AI-powered social media automation"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="prose prose-gray max-w-none">
            
            {/* Mission Section */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-[#607AFB]/10 to-purple-600/10 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-[#0d151c] mb-4 text-center">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                  To democratize AI-powered customer service by making sophisticated chatbot technology 
                  accessible and affordable for every business owner, regardless of their technical expertise or budget.
                </p>
              </div>
            </div>

            {/* Story Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0d151c] mb-6">Our Story</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  We started with a simple observation: while large corporations have teams of customer service 
                  representatives and expensive automation tools, small business owners were left handling every 
                  customer inquiry manually across multiple social media platforms.
                </p>
                
                <p>
                  After seeing countless store owners spending hours each day responding to the same questions 
                  on Facebook and Instagram - questions about product availability, shipping times, return policies, 
                  and more - we knew there had to be a better way.
                </p>
                
                <p>
                  That's when we decided to build an AI chatbot platform specifically designed for social media 
                  commerce. Our goal was to create something that any business owner could set up in minutes, 
                  not weeks, and that would actually understand their customers and help drive sales.
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0d151c] mb-6">What We Do</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We provide AI-powered chatbots that integrate seamlessly with Facebook and Instagram, 
                  helping store owners:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Automate customer support 24/7
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Answer product questions instantly
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Process orders and payments
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Recover abandoned carts
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Provide shipping and return info
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Recommend products based on preferences
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Handle customer complaints professionally
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#607AFB] rounded-full"></span>
                      Generate sales reports and insights
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0d151c] mb-6 text-center">Our Values</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      {value.icon}
                      <h3 className="text-lg font-semibold text-[#0d151c]">{value.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0d151c] mb-6">Why Choose Us</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d151c] mb-2">Built for Social Media Commerce</h4>
                    <p className="text-gray-700">
                      Unlike generic chatbot platforms, we're specifically designed for social media sales and support, 
                      with features tailored to e-commerce businesses.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d151c] mb-2">No Technical Knowledge Required</h4>
                    <p className="text-gray-700">
                      Set up your AI assistant in minutes with our intuitive interface. No coding, no complex configurations, 
                      just simple step-by-step setup.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d151c] mb-2">Flexible & Affordable Pricing</h4>
                    <p className="text-gray-700">
                      Our pay-as-you-grow model means you only pay for what you use. Start with our generous free trial 
                      and scale up as your business grows.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d151c] mb-2">Dedicated Support</h4>
                    <p className="text-gray-700">
                      Our team understands the challenges of running a business. We provide real human support when 
                      you need it, not just automated responses.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-[#607AFB] to-purple-600 rounded-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Customer Service?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of business owners who have already automated their social media customer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/pricing"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#607AFB] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/billing"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#607AFB] transition-colors"
                >
                  Learn About Pricing
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}