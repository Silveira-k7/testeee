import React, { useState } from 'react';

const RequestPage = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});

    const handleNext = () => setStep(step + 1);

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <h1 className="text-2xl font-bold mb-6">Nova Solicitação</h1>

                {step === 1 && (
                    <div>
                        <h2 className="text-xl mb-4">Qual é a área do seu problema?</h2>
                        <select className="w-full p-2 border rounded mb-4">
                            <option>Tecnologia</option>
                            <option>Gestão</option>
                            <option>Financeiro</option>
                        </select>
                        <button onClick={handleNext} className="bg-primary text-white px-4 py-2 rounded">Próximo</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl mb-4">Descreva o problema em detalhes</h2>
                        <textarea className="w-full p-2 border rounded mb-4 h-32"></textarea>
                        <button className="bg-secondary text-white px-4 py-2 rounded">Enviar Pedido</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestPage;
