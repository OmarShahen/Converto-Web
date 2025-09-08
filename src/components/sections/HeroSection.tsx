"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  delay: number;
}

const chatSequence: ChatMessage[] = [
  { id: 1, text: "Hi! How can I help you today?", isUser: false, delay: 0 },
  { id: 2, text: "Show me your best deals", isUser: true, delay: 2000 },
  {
    id: 3,
    text: "Great! Here are our top 3 trending items with special discounts:",
    isUser: false,
    delay: 1500,
  },
  {
    id: 4,
    text: "1. Summer Dress - 30% off\n2. Wireless Headphones - 25% off\n3. Smart Watch - 40% off\n\nWould you like details on any of these?",
    isUser: false,
    delay: 2000,
  },
  { id: 5, text: "Tell me about the Smart Watch", isUser: true, delay: 2500 },
  {
    id: 6,
    text: "Perfect choice! Our Smart Watch features:\n• 7-day battery life\n• Health tracking\n• Waterproof design\n• Only $199 (was $299)\n\nShall I add it to your cart?",
    isUser: false,
    delay: 2000,
  },
  { id: 7, text: "Yes, add it to cart!", isUser: true, delay: 2000 },
  {
    id: 8,
    text: "Added to cart! ✅\nYour total: $199\n\nWould you like to:\n• Continue shopping\n• Proceed to checkout\n• Apply a coupon code",
    isUser: false,
    delay: 1500,
  },
];

export const HeroSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionVisible) return;

    let timeoutIds: NodeJS.Timeout[] = [];
    let cumulativeDelay = 1000; // Start after 1 second

    const runChatSequence = () => {
      setVisibleMessages([]);
      setIsTyping(false);
      cumulativeDelay = 1000;

      chatSequence.forEach((message, index) => {
        // Show typing indicator for bot messages
        if (!message.isUser && index > 0) {
          timeoutIds.push(
            setTimeout(() => {
              setIsTyping(true);
            }, cumulativeDelay)
          );

          cumulativeDelay += 800; // Typing duration
        }

        // Show the actual message
        timeoutIds.push(
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages((prev) => [...prev, message.id]);
            // Auto-scroll to bottom
            setTimeout(() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
              }
            }, 100);
          }, cumulativeDelay + message.delay)
        );

        cumulativeDelay += message.delay;
      });

      // Restart the sequence after completion
      timeoutIds.push(
        setTimeout(() => {
          setCurrentCycle((prev) => prev + 1);
        }, cumulativeDelay + 3000)
      );
    };

    runChatSequence();

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [sectionVisible, currentCycle]);

  return (
    <>
      <div ref={sectionRef} className="@container py-12 sm:py-16 lg:py-20">
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.4s ease-out forwards;
          }
        `}</style>
        <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 lg:gap-12 lg:flex-row max-w-7xl mx-auto items-center">
          <div
            className={`w-full lg:flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 transition-all duration-800 delay-200 transform ${
              sectionVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-80 h-[500px] flex flex-col">
                <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#607AFB] to-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">
                      AI Assistant
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth">
                  {chatSequence
                    .filter((msg) => visibleMessages.includes(msg.id))
                    .map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        } animate-fadeInUp`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed ${
                            message.isUser
                              ? "bg-gradient-to-r from-[#607AFB] to-purple-600 text-white rounded-br-md"
                              : "bg-gray-100 text-gray-800 rounded-bl-md"
                          }`}
                        >
                          <div className="whitespace-pre-line">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fadeInUp">
                      <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
                    Type your message...
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-[#607AFB] to-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Social Media Integration Badges */}
              <div className="flex items-center justify-center space-x-12">
                <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-600">Facebook</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-600">Instagram</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-6 lg:gap-8 lg:justify-center lg:flex-1 transition-all duration-800 transform ${
              sectionVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-col gap-4 text-left">
              <h1 className="text-[#0d151c] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-[-0.033em]">
                Create AI Chatbots for Your Social Media Channels
              </h1>
              <p className="text-[#49749c] text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
                Help store owners automate customer interactions, increase
                sales, and save time with AI-powered chatbots connected directly
                to Facebook and Instagram.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="bg-gradient-to-r from-[#607AFB] to-purple-600 text-white px-8 py-4 rounded-full font-bold text-base lg:text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Get Started Free
              </button>
              <button className="bg-white border-2 border-[#607AFB] text-[#607AFB] px-8 py-4 rounded-full font-bold text-base lg:text-lg hover:bg-[#607AFB] hover:text-white transform hover:scale-105 transition-all duration-200">
                Book a Demo
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium">
                  5,000+ store owners trust us
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <span className="font-medium">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
