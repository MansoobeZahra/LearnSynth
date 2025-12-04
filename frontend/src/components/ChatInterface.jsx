import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

const ChatInterface = ({ messages, isLoading, onSendMessage }) => {
    const [input, setInput] = React.useState('');
    const [copiedIndex, setCopiedIndex] = React.useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput('');
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/30">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 dark:text-white">AI Study Assistant</h2>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-gradient-to-b from-gray-50/30 to-white dark:from-gray-900/30 dark:to-gray-800">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
                        <div className="p-4 bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full mb-4">
                            <Bot className="w-12 h-12 text-purple-500" />
                        </div>
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Ready to help you learn!</p>
                        <p className="text-sm mt-2">Upload a file and start asking questions</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user'
                            ? 'bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600'
                            : 'bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
                            }`}>
                            {msg.role === 'user' ? (
                                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Bot className="w-4 h-4 text-white" />
                            )}
                        </div>

                        <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`relative group ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white rounded-2xl rounded-tr-md shadow-sm'
                                : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-md border border-purple-100 dark:border-purple-800/30 shadow-md'
                                } p-4`}>
                                {msg.role === 'assistant' ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                            components={{
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline ? (
                                                        <div className="relative group/code">
                                                            <pre className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto my-2">
                                                                <code className={className} {...props}>
                                                                    {children}
                                                                </code>
                                                            </pre>
                                                            <button
                                                                onClick={() => handleCopy(String(children), `${idx}-code`)}
                                                                className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded opacity-0 group-hover/code:opacity-100 transition-opacity"
                                                            >
                                                                {copiedIndex === `${idx}-code` ? (
                                                                    <Check className="w-3 h-3 text-green-400" />
                                                                ) : (
                                                                    <Copy className="w-3 h-3 text-gray-300" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <code className="bg-purple-100 dark:bg-purple-900/40 px-1.5 py-0.5 rounded text-purple-700 dark:text-purple-300 font-mono text-xs" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                                p({ children }) {
                                                    return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                                                },
                                                ul({ children }) {
                                                    return <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>;
                                                },
                                                ol({ children }) {
                                                    return <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>;
                                                },
                                                li({ children }) {
                                                    return <li className="ml-2">{children}</li>;
                                                },
                                                h1({ children }) {
                                                    return <h1 className="text-xl font-bold mt-4 mb-2 text-purple-700 dark:text-purple-300">{children}</h1>;
                                                },
                                                h2({ children }) {
                                                    return <h2 className="text-lg font-bold mt-3 mb-2 text-purple-600 dark:text-purple-400">{children}</h2>;
                                                },
                                                h3({ children }) {
                                                    return <h3 className="text-base font-semibold mt-2 mb-1 text-purple-600 dark:text-purple-400">{children}</h3>;
                                                },
                                                blockquote({ children }) {
                                                    return <blockquote className="border-l-4 border-purple-400 pl-4 italic my-2 text-gray-600 dark:text-gray-400">{children}</blockquote>;
                                                },
                                                table({ children }) {
                                                    return <div className="overflow-x-auto my-2"><table className="min-w-full border border-gray-300 dark:border-gray-600">{children}</table></div>;
                                                },
                                                th({ children }) {
                                                    return <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 font-semibold">{children}</th>;
                                                },
                                                td({ children }) {
                                                    return <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{children}</td>;
                                                },
                                                a({ children, href }) {
                                                    return <a href={href} className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>;
                                                },
                                                strong({ children }) {
                                                    return <strong className="font-bold text-purple-700 dark:text-purple-300">{children}</strong>;
                                                },
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                )}

                                {/* Copy button for entire message */}
                                <button
                                    onClick={() => handleCopy(msg.content, idx)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                    title="Copy message"
                                >
                                    {copiedIndex === idx ? (
                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                    ) : (
                                        <Copy className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-2xl rounded-tl-md border border-purple-100 dark:border-purple-800/30 shadow-md">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your study material..."
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
