import React, { useState } from 'react';
import { Trash2, ChevronDown, Search } from 'lucide-react';
import { SavedCalculation } from '../types';
import { ProductDetail } from './ProductDetail';

interface ProductListViewProps {
    products: SavedCalculation[];
    onDelete: (id: string) => void;
}

export const ProductListView: React.FC<ProductListViewProps> = ({ products, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

    const handleToggleExpand = (id: string) => {
        setExpandedProductId(prevId => (prevId === id ? null : id));
    };

    const filteredProducts = products.filter(product =>
        product.state.productName.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Show newest first

    if (products.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Belum Ada Data Tersimpan</h2>
                <p className="text-slate-500">Mulai gunakan kalkulator dan simpan hasilnya untuk melihatnya di sini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">Daftar Produk</h1>
            
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white rounded-lg p-2 pl-10 ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 transition focus:outline-none"
                />
            </div>
            
            {/* Product List */}
            <div className="space-y-2">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => handleToggleExpand(product.id)}>
                                <h2 className="font-bold text-slate-800">{product.state.productName}</h2>
                                <div className="flex items-center gap-2">
                                     <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent accordion from toggling
                                            if (window.confirm(`Anda yakin ingin menghapus "${product.state.productName}"?`)) {
                                                onDelete(product.id);
                                            }
                                        }} 
                                        className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50" 
                                        aria-label="Hapus produk"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${expandedProductId === product.id ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                            {/* Collapsible Detail View */}
                            <div className={`transition-all duration-500 ease-in-out ${expandedProductId === product.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-slate-100 p-4">
                                     <ProductDetail state={product.state} results={product.results} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-slate-500 py-8">Produk tidak ditemukan.</p>
                )}
            </div>
        </div>
    );
};