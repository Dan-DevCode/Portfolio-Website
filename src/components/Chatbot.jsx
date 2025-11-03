import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const knowledgeBase = {
  greeting: [
    "Hello! I'm Dan's AI assistant. How can I help you learn more about Daniel?",
    "Hi there! I'm here to answer questions about Daniel Samarin. What would you like to know?",
    "Hey! I'm Dan's AI. Feel free to ask me anything about Daniel's work, interests, or background!",
  ],
  about: [
    "Daniel is an AI Engineer passionate about building intelligent, scalable solutions. He's deeply interested in innovation, business strategy, investments, stocks, and finance. When he's not coding, he analyzes market trends and explores the intersection of AI, business, and finance.",
  ],
  role: [
    "Daniel is an AI Engineer, Innovator, and Builder. He focuses on creating intelligent systems that drive innovation and create meaningful impact.",
  ],
  skills: [
    "Daniel's skills include Python, JavaScript, HTML/CSS, Node.js, React, Machine Learning, AI/ML, Project Management, Team Leadership, Communication, Research, and Web Development.",
  ],
  projects: [
    "Daniel has worked on several projects including: 1) A Church Website - building a comprehensive platform with HTML, CSS, JavaScript, and Node.js. 2) Hangry - a meal planning and ingredient inventory management app. 3) Remote Patient Monitoring System (RPMS) - a digital health solution for remote patient care.",
  ],
  interests: [
    "Daniel is passionate about AI & Innovation, Business & Strategy, and Finance & Investments. He loves exploring cutting-edge technologies and understanding how they intersect with business and financial markets.",
  ],
  availability: [
    "Yes! Daniel is currently available for work opportunities, freelance projects, and collaborations. He's open to full-time positions, contract work, and exciting projects that align with his expertise in AI engineering, web development, and innovation. Would you like me to help you get in touch with him?",
    "Daniel is actively seeking new opportunities and is available for work. He's interested in roles related to AI engineering, software development, or projects that combine technology with business innovation. Feel free to reach out to discuss potential opportunities!",
  ],
  contact: [
    "You can reach Daniel at danielsamarin.ai@gmail.com. He's also on GitHub (@dsamarin-ai) and LinkedIn. Would you like me to help you get in touch?",
  ],
  default: [
    "That's an interesting question! While I can help with general information about Daniel, for more specific details or opportunities, I'd recommend reaching out directly to him. Would you like me to help you contact Daniel?",
  ],
}

function getResponse(userMessage, previousMessages = []) {
  const message = userMessage.toLowerCase().trim()
  
  // Check for questions asking for specific information we don't have
  const asksForSpecificInfo = message.match(/(when|what time|what date|schedule|timeline|deadline|how long|how much|price|rate|salary|location|where|address|phone|number|specific|exact)/)
  
  // Greeting patterns
  if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return {
      text: knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)],
      suggestEmail: false,
    }
  }
  
  // Availability - but check if asking for specific timing/schedule
  if (message.match(/(available|availability)/)) {
    if (asksForSpecificInfo) {
      return {
        text: "I don't have specific information about Daniel's exact schedule or availability timeline. For detailed availability, scheduling, or project timelines, I'd recommend reaching out directly to Daniel. He can provide you with specific dates, rates, and availability windows. Would you like me to help you contact him?",
        suggestEmail: true,
      }
    }
    // General availability question (is he available?)
    if (message.match(/(is.*available|available.*work|looking for|seeking|open to)/)) {
      return {
        text: knowledgeBase.availability[Math.floor(Math.random() * knowledgeBase.availability.length)],
        suggestEmail: true,
      }
    }
  }
  
  // Work opportunities - general questions
  if (message.match(/(hiring|looking for work|seeking.*opportunities|open to.*opportunities|can.*work|work opportunities|job opportunities|employment|freelance|contract|collaboration|partnership|team|join|hire|recruit)/) && !asksForSpecificInfo) {
    return {
      text: knowledgeBase.availability[Math.floor(Math.random() * knowledgeBase.availability.length)],
      suggestEmail: true,
    }
  }
  
  // About Daniel
  if (message.match(/(who is|tell me about|about daniel|introduction|background|who are you|describe|info about)/)) {
    return {
      text: knowledgeBase.about[0],
      suggestEmail: false,
    }
  }
  
  // Role/Title
  if (message.match(/(what does|what is|role|job|title|profession|do for a living|work as|occupation|what.*do)/)) {
    return {
      text: knowledgeBase.role[0],
      suggestEmail: false,
    }
  }
  
  // Skills
  if (message.match(/(skills|technologies|tech stack|what can|proficient|expertise|proficient in|technologies|tools|languages|knows|capable|abilities)/)) {
    return {
      text: knowledgeBase.skills[0],
      suggestEmail: false,
    }
  }
  
  // Projects - more specific pattern to avoid catching "available to work"
  if (message.match(/(projects|portfolio|built|created|developed|what.*projects|show.*projects|recent.*work|past.*work|examples.*work|projects.*done)/)) {
    return {
      text: knowledgeBase.projects[0],
      suggestEmail: false,
    }
  }
  
  // Experience
  if (message.match(/(experience|background|previous|past experience|work history|career)/)) {
    return {
      text: "Daniel has experience in AI engineering, web development, and project management. He's worked on various projects ranging from church websites to healthcare systems, demonstrating versatility in full-stack development and innovative problem-solving.",
      suggestEmail: false,
    }
  }
  
  // Interests
  if (message.match(/(interests|passions|hobbies|what does.*like|interested in|passionate about|what.*enjoy|likes)/)) {
    return {
      text: knowledgeBase.interests[0],
      suggestEmail: false,
    }
  }
  
  // Pricing/Rates - specific info we don't have
  if (message.match(/(how much|price|rate|cost|salary|compensation|fee|pricing|budget|pay)/)) {
    return {
      text: "I don't have information about Daniel's rates, pricing, or compensation details. These would depend on the specific project, scope, and requirements. For accurate pricing and project quotes, I'd recommend contacting Daniel directly to discuss your specific needs. Would you like me to help you get in touch?",
      suggestEmail: true,
    }
  }
  
  // Location/Where questions
  if (message.match(/(where|location|address|city|country|based|located|live)/)) {
    return {
      text: "I don't have specific location information about where Daniel is based. For location details or to discuss remote work options, I'd recommend reaching out directly. Would you like me to help you contact Daniel?",
      suggestEmail: true,
    }
  }
  
  // Phone/Contact number
  if (message.match(/(phone|number|tel|call|telephone)/)) {
    return {
      text: "I don't have Daniel's phone number. The best way to reach him is via email at danielsamarin.ai@gmail.com. You can also connect with him on LinkedIn or GitHub. Would you like me to help you get in touch?",
      suggestEmail: true,
    }
  }
  
  // Contact
  if (message.match(/(contact|email|reach|get in touch|linkedin|github|social|how to|connect|way to|how.*reach|contact.*info)/)) {
    return {
      text: knowledgeBase.contact[0],
      suggestEmail: true,
    }
  }
  
  // Quote
  if (message.match(/(quote|favorite quote|motto|belief|philosophy|inspiring)/)) {
    return {
      text: "Daniel's favorite quote is: 'The man who fears God fears nothing else.' This reflects his values and approach to life and work.",
      suggestEmail: false,
    }
  }
  
  // Education/Learning
  if (message.match(/(education|school|university|degree|learned|studied|background|academic)/)) {
    return {
      text: "Daniel is a student passionate about continuous learning and growth in AI engineering and technology. He combines academic knowledge with practical project experience to build real-world solutions.",
      suggestEmail: false,
    }
  }
  
  // If asking for specific info we don't have, acknowledge and suggest contact
  if (asksForSpecificInfo) {
    return {
      text: "That's a great question, but I don't have that specific information readily available. For detailed or specific information, I'd recommend reaching out directly to Daniel. He can provide you with the exact details you're looking for. Would you like me to help you contact him?",
      suggestEmail: true,
    }
  }
  
  // Default response - more conversational and thoughtful
  return {
    text: knowledgeBase.default[0],
    suggestEmail: true,
  }
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Dan's AI assistant. I can help you learn about Daniel - his background, skills, availability for work, projects, and more. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Show tooltip after user has been on page for a few seconds
  useEffect(() => {
    const tooltipShown = sessionStorage.getItem('chatbotTooltipShown')
    if (!tooltipShown && !tooltipDismissed) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        sessionStorage.setItem('chatbotTooltipShown', 'true')
      }, 3000) // Show after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [tooltipDismissed])

  // Hide tooltip when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false)
    }
  }, [isOpen])

  const handleDismissTooltip = () => {
    setShowTooltip(false)
    setTooltipDismissed(true)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }])
    setIsTyping(true)

    // Simulate typing delay for more natural feel
    await new Promise((resolve) => setTimeout(resolve, 800))

    const response = getResponse(userMessage, messages)
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: response.text, suggestEmail: response.suggestEmail },
    ])
    setIsTyping(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEmailSuggestion = () => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: "Yes, I'd like to contact Daniel",
      },
      {
        role: 'assistant',
        text: "Great! You can reach Daniel at danielsamarin.ai@gmail.com or visit the Contact page for more options. Would you like me to open your email client?",
        suggestEmail: false,
      },
    ])
  }

  const openEmail = () => {
    window.location.href = 'mailto:danielsamarin.ai@gmail.com?subject=Question from Portfolio Website'
  }

  return (
    <>
      {/* Animated Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 max-w-xs"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-2xl border border-gray-200 dark:border-gray-700 relative"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ 
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}
            >
              {/* Tooltip Arrow */}
              <div className="absolute bottom-0 right-8 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Ask Dan's AI
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    Get quick answers about Daniel
                  </p>
                </div>
                <button
                  onClick={handleDismissTooltip}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Dismiss tooltip"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          setShowTooltip(false)
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-accent to-accent-light text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center focus-ring group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        aria-label="Open Dan's AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent to-accent-light text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Dan's AI</h3>
                  <p className="text-xs text-white/80">AI Assistant</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.suggestEmail && (
                      <motion.button
                        onClick={handleEmailSuggestion}
                        className="mt-2 text-xs bg-accent/10 hover:bg-accent/20 text-accent dark:text-accent-light px-3 py-1.5 rounded-lg transition-colors w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        💬 Yes, help me contact Daniel
                      </motion.button>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Daniel..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-accent to-accent-light text-white rounded-lg hover:from-accent-dark hover:to-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
                  whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              {messages.some((msg) => msg.text.includes('email client')) && (
                <motion.button
                  onClick={openEmail}
                  className="mt-2 w-full px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent dark:text-accent-light rounded-lg text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📧 Open Email Client
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

