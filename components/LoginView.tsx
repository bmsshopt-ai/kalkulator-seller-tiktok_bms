import React, { useState } from 'react';
import { Calculator, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginViewProps {
    onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password === 'bms_seller') {
            onLoginSuccess();
        } else {
            setError('Password salah. Silakan coba lagi.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <Calculator className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-slate-900">Selamat Datang</h1>
                    <p className="text-slate-500 mt-2">Silakan masuk untuk melanjutkan ke Kalkulator Seller</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-black block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="email@example.com"
                            className="w-full bg-slate-50 rounded-md p-3 ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 transition focus:outline-none text-slate-900"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="text-sm font-medium text-black block mb-1">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full bg-slate-50 rounded-md p-3 pr-10 ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 transition focus:outline-none text-slate-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 transition-colors"
                                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg mt-2"
                        >
                            Masuk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
