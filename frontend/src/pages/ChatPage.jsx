import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ChatPage = () => {
    const { requestId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, sender: 'CONSULTANT', text: 'Olá! Vi sua solicitação. Como posso ajudar?', timestamp: '10:30', date: 'Hoje' },
        { id: 2, sender: 'USER', text: 'Preciso de ajuda com meu projeto de consultoria.', timestamp: '10:32', date: 'Hoje' },
        { id: 3, sender: 'CONSULTANT', text: 'Claro! Pode me dar mais detalhes sobre o que você precisa?', timestamp: '10:33', date: 'Hoje' },
        { id: 4, sender: 'USER', text: 'Estou desenvolvendo uma estratégia de marketing digital e preciso de orientação sobre as melhores práticas.', timestamp: '10:35', date: 'Hoje' },
        { id: 5, sender: 'CONSULTANT', text: 'Excelente! Vou preparar um material sobre isso. Consegue me enviar alguns dados sobre seu público-alvo?', timestamp: '10:40', date: 'Hoje' }
    ]);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Mock project data
    const projectData = {
        title: 'Consultoria de Marketing Digital',
        consultant: 'Ana Silva',
        client: 'João Santos',
        status: 'Em Andamento',
        progress: 65,
        startDate: '15/11/2025',
        deadline: '30/12/2025',
        category: 'Marketing'
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: user.role || 'USER',
            text: message,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            date: 'Hoje'
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar userName={user.name} userRole={user.role} />

            <div className="pt-16">
                <div className="h-screen flex">
                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to={user.role === 'CONSULTANT' ? '/consultant/dashboard' : '/user/dashboard'}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </Link>
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {user.role === 'CONSULTANT' ? projectData.client : projectData.consultant}
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Online</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </button>
                                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
                            {messages.map((msg, index) => {
                                const showDate = index === 0 || messages[index - 1].date !== msg.date;
                                const isOwnMessage = msg.sender === user.role;

                                return (
                                    <div key={msg.id}>
                                        {showDate && (
                                            <div className="flex justify-center my-4">
                                                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                                    {msg.date}
                                                </span>
                                            </div>
                                        )}
                                        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                                                <div
                                                    className={`px-4 py-3 rounded-2xl ${isOwnMessage
                                                            ? 'bg-blue-500 text-white rounded-br-none'
                                                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-none'
                                                        }`}
                                                >
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                                <p className={`text-xs mt-1 ${isOwnMessage ? 'text-right' : 'text-left'} text-gray-500 dark:text-gray-400`}>
                                                    {msg.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                            <form onSubmit={handleSendMessage}>
                                <div className="flex items-end space-x-2">
                                    {/* File attachment button */}
                                    <button
                                        type="button"
                                        className="p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>

                                    {/* Message input */}
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage(e);
                                                }
                                            }}
                                            placeholder="Digite sua mensagem..."
                                            rows="1"
                                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                                            style={{ maxHeight: '120px' }}
                                        />
                                    </div>

                                    {/* Send button */}
                                    <button
                                        type="submit"
                                        disabled={!message.trim()}
                                        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Pressione Enter para enviar, Shift + Enter para nova linha
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Project Status Sidebar */}
                    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                        <div className="p-6 space-y-6">
                            {/* Project Info */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Informações do Projeto
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Projeto</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{projectData.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Categoria</p>
                                        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm font-medium">
                                            {projectData.category}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                        <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm font-medium">
                                            {projectData.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Progresso</h4>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{projectData.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${projectData.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Início</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{projectData.startDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Prazo</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{projectData.deadline}</p>
                                </div>
                            </div>

                            {/* Shared Files */}
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Arquivos Compartilhados</h4>
                                <div className="space-y-2">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                Proposta_Inicial.pdf
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">2.5 MB</p>
                                        </div>
                                    </div>

                                    {/* Upload button */}
                                    <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 transition-colors">
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span className="text-sm font-medium">Enviar Arquivo</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Notas do Projeto</h4>
                                <textarea
                                    placeholder="Adicione notas sobre o projeto..."
                                    rows="4"
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:text-white focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
