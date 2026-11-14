
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  options?: MenuOption[];
}

interface MenuOption {
  label: string;
  response?: string;
  route?: string;
  action?: "admission" | "external";
  url?: string;
  children?: MenuOption[];
}

interface ChatbotProps {
  onOpenAdmission?: () => void;
}

const mainMenu: MenuOption[] = [
  {
    label: "About Our College",
    children: [
      {
        label: "About Us",
        response: "St. Lourdes Engineering College is committed to providing quality technical education and developing skilled professionals.",
        route: "/about",
      },
      {
        label: "Vision & Mission",
        response: "Our vision is to develop competent professionals through quality education, innovation, research, and ethical values.",
        route: "/about",
      },
      {
        label: "Management",
        response: "Our management works towards academic excellence, student development, and creating a supportive learning environment.",
        route: "/about",
      },
    ],
  },
  {
    label: "Admissions",
    children: [
      {
        label: "Admission Enquiry",
        response: "Interested in joining St. Lourdes Engineering College? Contact our admission team for assistance.",
        action: "admission",
      },
      {
        label: "Eligibility",
        response: "Eligibility requirements depend on the programme and applicable admission regulations. Contact our admission office for the latest details.",
      },
      {
        label: "Apply Now",
        response: "Visit our admission page to explore the admission process.",
        route: "/admission",
      },
    ],
  },
  {
    label: "Courses & Programmes",
    children: [
      {
        label: "Engineering Programmes",
        response: "Explore the engineering programmes offered by our institution.",
        route: "/programs",
      },
      {
        label: "Departments",
        response: "Our academic departments focus on technical knowledge, practical learning, and career development.",
        route: "/departments",
      },
    ],
  },
  {
    label: "Campus & Facilities",
    children: [
      {
        label: "Campus Facilities",
        response: "Our campus provides facilities that support academic learning and student development.",
        route: "/facilities",
      },
      {
        label: "Library",
        response: "Our college library supports students and faculty with learning and academic resources.",
      },
      {
        label: "Laboratories",
        response: "Practical laboratory sessions help students develop technical and professional skills.",
      },
      {
        label: "Gallery",
        response: "Explore photographs and highlights from our campus and college activities.",
        route: "/gallery",
      },
    ],
  },
  {
    label: "Placements",
    children: [
      {
        label: "Placement Cell",
        response: "Our placement activities help students prepare for recruitment through career guidance, training, and placement opportunities.",
        route: "/placement",
      },
      {
        label: "Training & Development",
        response: "Students can develop communication, aptitude, technical, and interview skills through training activities.",
        route: "/placement",
      },
    ],
  },
  {
    label: "Contact Us",
    response: "Contact St. Lourdes Engineering College through our official contact page for enquiries and assistance.",
    route: "/contact",
  },
];

const quickQuestions = [
  "Admission Enquiry",
  "Available Courses",
  "Placement Details",
  "Contact Information",
];

const Chatbot: React.FC<ChatbotProps> = ({ onOpenAdmission }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuStack, setMenuStack] = useState<MenuOption[][]>([mainMenu]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const createMessage = (
    sender: "bot" | "user",
    text: string,
    options?: MenuOption[]
  ): Message => ({
    id: Date.now() + Math.random(),
    sender,
    text,
    options,
  });

  const addMessage = (
    sender: "bot" | "user",
    text: string,
    options?: MenuOption[]
  ) => {
    setMessages((previous) => [
      ...previous,
      createMessage(sender, text, options),
    ]);
  };

  const showBotMessage = (text: string, options?: MenuOption[]) => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    setIsTyping(true);

    typingTimerRef.current = setTimeout(() => {
      addMessage("bot", text, options);
      setIsTyping(false);
      typingTimerRef.current = null;
    }, 450);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isTyping) {
      showBotMessage(
        "Welcome to St. Lourdes Engineering College! 👋\n\nI'm your virtual assistant. How can I help you today?",
        mainMenu
      );
    }
  }, [isOpen, messages.length, isTyping]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  const handleOptionClick = (option: MenuOption) => {
    addMessage("user", option.label);

    if (option.children) {
      setMenuStack((previous) => [...previous, option.children!]);
      showBotMessage(
        `Here are the available options for ${option.label}. Please select one:`,
        option.children
      );
      return;
    }

    if (option.action === "admission") {
      showBotMessage(option.response || "Let's connect you with our admission team.");

      if (onOpenAdmission) {
        onOpenAdmission();
      } else {
        navigate("/admission");
      }
      return;
    }

    if (option.action === "external" && option.url) {
      window.open(option.url, "_blank", "noopener,noreferrer");
    }

    showBotMessage(option.response || "Here is the information you requested.");

    if (option.route) {
      setTimeout(() => navigate(option.route!), 500);
    }
  };

  const goBack = () => {
    if (menuStack.length > 1) {
      const previousMenu = menuStack[menuStack.length - 2];
      setMenuStack((previous) => previous.slice(0, -1));
      showBotMessage("Here are the previous options:", previousMenu);
    } else {
      showBotMessage("You are already in the main menu.", mainMenu);
    }
  };

  const goToMainMenu = () => {
    setMenuStack([mainMenu]);
    showBotMessage("Welcome to the main menu. What would you like to know?", mainMenu);
  };

  const startNewConversation = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    setMessages([]);
    setMenuStack([mainMenu]);
    setInput("");
    setIsTyping(false);

    setTimeout(() => {
      addMessage(
        "bot",
        "Welcome back! 👋\n\nHow can I help you today?",
        mainMenu
      );
    }, 100);
  };

  const findMatchingOption = (text: string): MenuOption | undefined => {
    const query = text.toLowerCase();

    const allOptions: MenuOption[] = [];

    const collectOptions = (options: MenuOption[]) => {
      options.forEach((option) => {
        allOptions.push(option);
        if (option.children) collectOptions(option.children);
      });
    };

    collectOptions(mainMenu);

    const aliases: Record<string, string[]> = {
      "Admission Enquiry": ["admission", "join", "apply", "application"],
      "Engineering Programmes": ["courses", "course", "programmes", "programs"],
      "Placement Cell": ["placement", "jobs", "recruitment"],
      "Contact Us": ["contact", "phone", "email", "address"],
    };

    return allOptions.find((option) => {
      const label = option.label.toLowerCase();
      const words = aliases[option.label] || [];

      return (
        query.includes(label) ||
        words.some((word) => query.includes(word))
      );
    });
  };

  const handleSend = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isTyping) return;

    addMessage("user", trimmedInput);
    setInput("");

    const matchedOption = findMatchingOption(trimmedInput);

    if (!matchedOption) {
      showBotMessage(
        "I'm sorry, I couldn't find an exact answer. Please select an option from the menu below or contact our college office.",
        mainMenu
      );
      setMenuStack([mainMenu]);
      return;
    }

    if (matchedOption.children) {
      setMenuStack((previous) => [...previous, matchedOption.children!]);
      showBotMessage(
        `Here are the options for ${matchedOption.label}.`,
        matchedOption.children
      );
      return;
    }

    if (matchedOption.action === "admission") {
      showBotMessage(matchedOption.response || "Please contact our admission team.");

      if (onOpenAdmission) {
        onOpenAdmission();
      } else {
        navigate("/admission");
      }
      return;
    }

    showBotMessage(
      matchedOption.response || "Here is the information you requested."
    );

    if (matchedOption.route) {
      setTimeout(() => navigate(matchedOption.route!), 500);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput("");
    addMessage("user", question);

    const matchedOption = findMatchingOption(question);

    if (!matchedOption) {
      showBotMessage("Please select an option from the main menu.", mainMenu);
      return;
    }

    if (matchedOption.action === "admission") {
      showBotMessage(matchedOption.response || "Please contact our admission team.");

      if (onOpenAdmission) {
        onOpenAdmission();
      } else {
        navigate("/admission");
      }
      return;
    }

    showBotMessage(
      matchedOption.response || "Here is the information you requested.",
      matchedOption.children
    );

    if (matchedOption.children) {
      setMenuStack((previous) => [...previous, matchedOption.children!]);
    }

    if (matchedOption.route) {
      setTimeout(() => navigate(matchedOption.route!), 500);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --lourdes-maroon: #681b2c;
          --lourdes-dark-maroon: #45101e;
          --lourdes-gold: #d6ad55;
          --lourdes-light-gold: #f1d995;
        }

        .lourdes-chat-launcher {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 9998;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 21px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 50px;
          background: linear-gradient(135deg, var(--lourdes-maroon), var(--lourdes-dark-maroon));
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(0,0,0,.25);
          transition: all .3s ease;
        }

        .lourdes-chat-launcher:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(104,27,44,.35);
        }

        .lourdes-launcher-icon {
          color: var(--lourdes-light-gold);
          font-size: 22px;
        }

        .lourdes-chat-window {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 9999;
          width: 390px;
          height: 590px;
          max-height: calc(100vh - 55px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 2px solid var(--lourdes-gold);
          border-radius: 20px;
          background: transparent;
          box-shadow: 0 15px 50px rgba(0,0,0,.25);
          animation: lourdes-appear .3s ease;
        }

        @keyframes lourdes-appear {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lourdes-chat-header {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 17px 18px;
          background: linear-gradient(120deg, var(--lourdes-dark-maroon), var(--lourdes-maroon));
          border-bottom: 2px solid var(--lourdes-gold);
          color: #fff;
        }

        .lourdes-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lourdes-bot-avatar {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--lourdes-gold);
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          color: var(--lourdes-light-gold);
          font-size: 25px;
        }

        .lourdes-header-info h3 {
          margin: 0 0 5px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }

        .lourdes-online-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #f5e8e8;
        }

        .lourdes-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #55d98a;
          box-shadow: 0 0 7px rgba(85,217,138,.8);
        }

        .lourdes-header-actions {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .lourdes-header-actions button {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          color: white;
          font-size: 21px;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-header-actions button:hover {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-chat-body {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          background: transparent;
        }

        .lourdes-messages {
          height: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 17px 13px;
          background: transparent;
          scrollbar-width: thin;
          scrollbar-color: var(--lourdes-gold) transparent;
        }

        .lourdes-messages::-webkit-scrollbar { width: 5px; }
        .lourdes-messages::-webkit-scrollbar-thumb {
          background: var(--lourdes-gold);
          border-radius: 10px;
        }

        .lourdes-message-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }

        .bot-row { justify-content: flex-start; }
        .user-row { justify-content: flex-end; }

        .lourdes-message-avatar,
        .lourdes-user-avatar {
          width: 29px;
          height: 29px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
        }

        .lourdes-message-avatar {
          background: var(--lourdes-maroon);
          border: 1px solid var(--lourdes-gold);
          color: var(--lourdes-light-gold);
        }

        .lourdes-user-avatar {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-message {
          max-width: 84%;
          padding: 12px 14px;
          border-radius: 13px;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .lourdes-message p {
          margin: 0;
          white-space: pre-line;
        }

        .bot-message {
          background: rgba(104,27,44,.87);
          color: #fff;
          border: 1px solid rgba(214,173,85,.65);
          border-top-left-radius: 3px;
        }

        .user-message {
          background: rgba(214,173,85,.94);
          color: #32101a;
          border-top-right-radius: 3px;
          font-weight: 500;
        }

        .lourdes-menu-options {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-top: 13px;
        }

        .lourdes-menu-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border: 1px solid rgba(241,217,149,.7);
          border-radius: 8px;
          background: rgba(255,255,255,.1);
          color: #fff;
          text-align: left;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all .2s ease;
        }

        .lourdes-menu-option:hover {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
          transform: translateX(3px);
        }

        .lourdes-option-arrow {
          font-size: 20px;
          line-height: 1;
        }

        .lourdes-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 13px 15px;
          background: rgba(104,27,44,.87);
          border: 1px solid rgba(214,173,85,.65);
          border-radius: 12px;
        }

        .lourdes-typing span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--lourdes-light-gold);
          animation: lourdes-typing 1.2s infinite ease-in-out;
        }

        .lourdes-typing span:nth-child(2) { animation-delay: .2s; }
        .lourdes-typing span:nth-child(3) { animation-delay: .4s; }

        @keyframes lourdes-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: .5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .lourdes-chat-controls {
          flex-shrink: 0;
          padding: 10px 12px 8px;
          background: transparent;
          border-top: 1px solid rgba(214,173,85,.65);
        }

        .lourdes-navigation {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }

        .lourdes-navigation button {
          flex: 1;
          padding: 8px 4px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 7px;
          background: rgba(104,27,44,.9);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-navigation button:hover {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-quick-questions {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
          padding-bottom: 3px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .lourdes-quick-questions::-webkit-scrollbar { display: none; }

        .lourdes-quick-questions button {
          flex-shrink: 0;
          padding: 7px 10px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 20px;
          background: rgba(104,27,44,.88);
          color: #fff;
          font-size: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-quick-questions button:hover {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-input-area {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 7px 6px 13px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 30px;
          background: rgba(255,255,255,.92);
        }

        .lourdes-input-area input {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #32101a;
          font-size: 12px;
        }

        .lourdes-input-area input::placeholder { color: #777; }

        .lourdes-input-area button {
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          border: none;
          border-radius: 50%;
          background: var(--lourdes-maroon);
          color: var(--lourdes-light-gold);
          font-size: 17px;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-input-area button:hover:not(:disabled) {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-input-area button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .lourdes-chat-footer {
          margin-top: 8px;
          color: #fff;
          text-align: center;
          font-size: 9px;
          text-shadow: 0 1px 3px rgba(0,0,0,.6);
        }

        .lourdes-chat-footer strong {
          color: var(--lourdes-light-gold);
        }

        @media (max-width: 480px) {
          .lourdes-chat-window {
            right: 10px;
            bottom: 10px;
            width: calc(100vw - 20px);
            height: min(620px, calc(100dvh - 20px));
            max-height: calc(100dvh - 20px);
            border-radius: 17px;
          }

          .lourdes-chat-launcher {
            right: 16px;
            bottom: 16px;
            padding: 12px 17px;
          }

          .lourdes-chat-header { padding: 14px; }
          .lourdes-message { max-width: 88%; }
          .lourdes-navigation button { font-size: 9px; }
        }

        @media (max-width: 350px) {
          .lourdes-quick-questions button {
            font-size: 9px;
            padding: 6px 8px;
          }

          .lourdes-chat-controls { padding: 8px; }
        }
      `}</style>

      {!isOpen && (
        <button
          className="lourdes-chat-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <span className="lourdes-launcher-icon">✦</span>
          <span>Chat with us</span>
        </button>
      )}

      {isOpen && (
        <div className="lourdes-chat-window">
          <div className="lourdes-chat-header">
            <div className="lourdes-header-info">
              <div className="lourdes-bot-avatar">✦</div>
              <div>
                <h3>St. Lourdes Assistant</h3>
                <span className="lourdes-online-status">
                  <span className="lourdes-online-dot" />
                  Online | Here to help
                </span>
              </div>
            </div>

            <div className="lourdes-header-actions">
              <button
                onClick={startNewConversation}
                title="New conversation"
                aria-label="New conversation"
              >
                ↻
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          <div className="lourdes-chat-body">
            <div className="lourdes-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`lourdes-message-row ${
                    message.sender === "user" ? "user-row" : "bot-row"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="lourdes-message-avatar">✦</div>
                  )}

                  <div
                    className={`lourdes-message ${
                      message.sender === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    <p>{message.text}</p>

                    {message.options && message.options.length > 0 && (
                      <div className="lourdes-menu-options">
                        {message.options.map((option, index) => (
                          <button
                            key={`${option.label}-${index}`}
                            onClick={() => handleOptionClick(option)}
                            className="lourdes-menu-option"
                          >
                            <span>{option.label}</span>
                            <span className="lourdes-option-arrow">›</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === "user" && (
                    <div className="lourdes-user-avatar">You</div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="lourdes-message-row bot-row">
                  <div className="lourdes-message-avatar">✦</div>
                  <div className="lourdes-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="lourdes-chat-controls">
            <div className="lourdes-navigation">
              <button onClick={goBack}>‹ Previous</button>
              <button onClick={goToMainMenu}>⌂ Main Menu</button>
              <button onClick={startNewConversation}>↻ New Chat</button>
            </div>

            <div className="lourdes-quick-questions">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>

            <form
              className="lourdes-input-area"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={isTyping}
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                ➤
              </button>
            </form>

            <div className="lourdes-chat-footer">
              Powered by <strong>St. Lourdes Engineering College</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
