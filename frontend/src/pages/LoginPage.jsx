import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock authentication
        const mockUser = {
            name: formData.email.split('@')[0],
            email: formData.email,
            role: formData.email.includes('consultant') ? 'CONSULTANT' : 'USER'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));

        if (mockUser.role === 'CONSULTANT') {
            navigate('/consultant/dashboard');
        } else {
            navigate('/user/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-10 rounded-2xl shadow-soft w-full max-w-md">
                {/* Logo/Brand */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Entrar</h2>
                    <p className="text-gray-600">Bem-vindo de volta! Entre para continuar</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Senha</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 btn-primary shadow-lg mt-6"
                    >
                        Entrar
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Não tem uma conta?{' '}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            Criar conta
                        </Link>
                    </p>
                </div>

                {/* Test Hint */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-sm text-gray-700 font-semibold flex items-center">
                        <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Dica para testar
                    </p>
                    <p className="text-sm text-gray-600 mt-1 ml-7">
                        Use email com "consult" para entrar como consultor (ex: consult@test.com)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
