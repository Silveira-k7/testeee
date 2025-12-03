import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            // Mock registration - replace with real API call when backend is ready
            // await axios.post('http://localhost:8080/api/auth/register', formData);

            const mockUser = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                role: formData.role
            };

            localStorage.setItem('user', JSON.stringify(mockUser));

            if (formData.role === 'CONSULTANT') {
                navigate('/consultant/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (error) {
            alert('Erro ao criar conta. Tente novamente.');
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h2>
                    <p className="text-gray-600">Junte-se à nossa plataforma</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="Seu nome"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Tipo de Conta</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white"
                        >
                            <option value="USER">Cliente - Preciso de ajuda</option>
                            <option value="CONSULTANT">Consultor - Quero ajudar</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 btn-primary shadow-lg mt-2"
                    >
                        Criar Conta
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-blue-600 font-bold hover:underline">
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
