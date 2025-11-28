import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, CheckCircle, TicketPercent, DollarSign, Wallet, Landmark, Receipt, Save } from 'lucide-react';

import { InputRow } from './InputRow';
import { DisplayRow } from './DisplayRow';
import { MarginInputRow } from './MarginInputRow';
import { CalculatorState, CalculationResults } from '../types';
import { useRoasCalculator } from '../hooks/useRoasCalculator';

interface CalculatorViewProps {
    initialState: CalculatorState;
    onStateChange: (state: CalculatorState) => void;
    onSave: (state: CalculatorState, results: CalculationResults) => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({ initialState, onStateChange, onSave }) => {
    const state = initialState;
    const setState = onStateChange;

    const calculations = useRoasCalculator(state);

    const handleStateChange = <K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) => {
        setState({ ...state, [key]: value });
    };

    const handleMarginChange = (mode: 'percent' | 'currency', value: number) => {
        setState({ ...state, marginProfitMode: mode, marginProfitValueInput: value });
    }

    const handleBiayaOperasionalChange = (mode: 'percent' | 'currency', value: number) => {
        setState({ ...state, biayaOperasionalMode: mode, biayaOperasionalValueInput: value });
    }

    return (
        <main className="space-y-6">
            {/* Section 0: Product Name */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <label htmlFor="productName" className="text-sm font-medium text-slate-700 block mb-2">Nama Produk</label>
                <input
                    id="productName"
                    type="text"
                    value={state.productName}
                    onChange={e => handleStateChange('productName', e.target.value)}
                    placeholder="Contoh: Kemeja Polos Lengan Panjang"
                    className="w-full bg-slate-50 rounded-md p-2 ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500 transition focus:outline-none"
                />
            </div>

            {/* Section 1: Harga & Margin */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><DollarSign className="w-5 h-5 text-cyan-500" />Harga & Margin</h2>
                <div className="space-y-1">
                    <InputRow label="HPP" type="currency" value={state.hpp} onChange={v => handleStateChange('hpp', v)} info="Harga Pokok Penjualan atau harga produksi/ambil barang." />
                    <MarginInputRow
                        label="Margin Profit"
                        mode={state.marginProfitMode}
                        value={state.marginProfitValueInput}
                        onModeChange={mode => handleMarginChange(mode, state.marginProfitValueInput)}
                        onValueChange={value => handleMarginChange(state.marginProfitMode, value)}
                        info="Set margin profit yang diinginkan dalam persen (%) atau nominal (Rp)."
                    />
                    <DisplayRow label="Harga Jual" type="currency" value={calculations.hargaJual} highlight="blue" info="Harga jual otomatis dihitung dari HPP + Margin Profit." />
                    <InputRow label="Diskon Toko" type="currency" value={state.diskon} onChange={v => handleStateChange('diskon', v)} info="Diskon atau voucher tambahan dari toko yang mengurangi harga jual." />
                </div>
            </div>

            {/* Section 2: Campaign */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><TicketPercent className="text-orange-500" />Perhitungan Campaign</h2>
                <div className="space-y-1">
                    <InputRow label="Potongan Campaign" type="percentage" value={state.persentaseCampaign} onChange={v => handleStateChange('persentaseCampaign', v)} info="Persentase diskon dari program campaign marketplace (dihitung dari Harga Jual)." calculatedValue={calculations.potonganCampaignValue} />
                    <InputRow label="Subsidi Campaign Toko" type="percentage" value={state.campaignDitanggungTokoPercent} onChange={v => handleStateChange('campaignDitanggungTokoPercent', v)} info="Berapa persen dari total diskon campaign yang ditanggung oleh toko." calculatedValue={calculations.potonganDitanggungToko} />
                    <DisplayRow label="Subsidi Campaign TikTok" type="percentage" value={calculations.subsidiTiktokPercent} calculatedValue={calculations.subsidiTiktokValue} calculatedValueType="currency" highlight="yellow" info="Sisa potongan campaign yang ditanggung oleh marketplace/TikTok." />
                    <DisplayRow label="Harga Final / Etalase" type="currency" value={calculations.hargaFinal} highlight="blue" isBold={true} info="Harga yang dilihat dan dibayar oleh pembeli setelah semua diskon." />
                </div>
            </div>

            {/* Section 2.5: Total Penghasilan */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Wallet className="text-blue-500" />Total Penghasilan</h2>
                <div className="space-y-1">
                    <DisplayRow
                        label="Total Penghasilan Seller"
                        type="currency"
                        value={calculations.totalPenghasilan}
                        highlight="blue"
                        isBold={true}
                        info="Jumlah uang yang diterima seller setelah semua diskon dan subsidi campaign, sebelum dipotong biaya marketplace dan HPP."
                    />
                </div>
            </div>

            {/* Section 3: Biaya-biaya */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Biaya-Biaya Marketplace</h2>
                <div className="space-y-1">
                    <InputRow label="Komisi Platform" type="percentage" value={state.komisiPlatformPercent} onChange={v => handleStateChange('komisiPlatformPercent', v)} calculatedValue={calculations.komisiPlatformValue} />
                    <InputRow label="Komisi Dinamis" type="percentage" value={state.komisiDinamisPercent} onChange={v => handleStateChange('komisiDinamisPercent', v)} calculatedValue={calculations.komisiDinamisValue} />
                    <InputRow label="Cashback Bonus" type="percentage" value={state.cashbackBonusPercent} onChange={v => handleStateChange('cashbackBonusPercent', v)} calculatedValue={calculations.cashbackBonusValue} />
                    <InputRow label="Biaya Pemrosesan" type="currency" value={state.biayaPemrosesan} onChange={v => handleStateChange('biayaPemrosesan', v)} />
                    <InputRow label="Afiliasi" type="percentage" value={state.afiliasiPercent} onChange={v => handleStateChange('afiliasiPercent', v)} calculatedValue={calculations.afiliasiValue} />
                    <InputRow label="Komisi Affiliasi Toko" type="percentage" value={state.komisiAfiliasiTokoPercent} onChange={v => handleStateChange('komisiAfiliasiTokoPercent', v)} calculatedValue={calculations.komisiAfiliasiTokoValue} />
                    <InputRow label="Live/Voucher Extra" type="percentage" value={state.liveVoucherExtraPercent} onChange={v => handleStateChange('liveVoucherExtraPercent', v)} calculatedValue={calculations.liveVoucherExtraValue} />
                    <MarginInputRow
                        label="Biaya Operasional"
                        mode={state.biayaOperasionalMode}
                        value={state.biayaOperasionalValueInput}
                        onModeChange={mode => handleBiayaOperasionalChange(mode, state.biayaOperasionalValueInput)}
                        onValueChange={value => handleBiayaOperasionalChange(state.biayaOperasionalMode, value)}
                        info="Biaya operasional per pesanan (misal: packaging) dalam persen (%) atau nominal (Rp)."
                    />
                </div>
            </div>

            {/* Section 3.5: Total Penyelesaian Pembayaran */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Landmark className="text-purple-500" />Total Penyelesaian Pembayaran</h2>
                <div className="space-y-1">
                    <DisplayRow
                        label="Total Penyelesaian Pembayaran"
                        type="currency"
                        value={calculations.totalPenyelesaianPembayaran}
                        highlight="green"
                        isBold={true}
                        info="Jumlah akhir yang masuk ke saldo penjual setelah semua biaya marketplace dipotong dari total penghasilan."
                    />
                </div>
            </div>

            {/* Section 4: Target Ideal */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Target className="text-green-500" />Target Ideal</h2>
                <div className="space-y-1">
                    <InputRow label="Target Persentase Keuntungan" type="percentage" value={state.targetProfitPercent} onChange={v => handleStateChange('targetProfitPercent', v)} calculatedValue={calculations.potensiKeuntunganValue} info="Keuntungan bersih yang Anda inginkan per pesanan." />
                    <DisplayRow label="Potensi Keuntungan" type="currency" value={calculations.potensiKeuntunganValue} highlight="green" />
                    <DisplayRow label="Target ROI Ideal" type="number" value={calculations.targetRoiIdeal} calculatedValue={calculations.budgetIklanValue} calculatedValueType="currency" highlight="green" isBold={true} info="Target ROI yang harus dicapai untuk mendapatkan profit yang diinginkan." />
                    <DisplayRow label="ROI BEP / Impas" type="number" value={calculations.roiBep} calculatedValue={calculations.maxAdSpendForBep} calculatedValueType="currency" highlight="yellow" info="ROI minimum agar tidak rugi (profit Rp 0). Angka di samping adalah budget iklan maksimal untuk impas." />
                </div>
            </div>

            {/* Section 5: Performa Aktual */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><CheckCircle className="text-indigo-500" />Analisis Performa Aktual</h2>
                <div className="space-y-1">
                    <InputRow label="Input ROI Aktual" type="number" value={state.actualRoi} onChange={v => handleStateChange('actualRoi', v)} info="Masukkan ROI yang Anda dapatkan dari campaign." />
                    <DisplayRow label="Biaya Iklan Aktual" type="currency" value={calculations.actualAdSpend} highlight="yellow" info="Biaya iklan yang dihabiskan berdasarkan ROI aktual yang dimasukkan." />
                    <DisplayRow label="Potensi Profit per Order" type="currency" value={calculations.actualProfit} highlight={calculations.actualProfit > 0 ? 'green' : 'red'} isBold={true} icon={calculations.actualProfit > 0 ? <TrendingUp /> : <TrendingDown />} />
                    <DisplayRow label="Persentase Keuntungan" type="percentage" value={calculations.actualProfitPercent} highlight={calculations.actualProfitPercent > 0 ? 'green' : 'red'} />
                </div>
            </div>

            {/* Section 6: Analisis Biaya / Pesanan */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Receipt className="text-green-500" />Analisis Biaya / Pesanan</h2>
                <div className="space-y-1">
                    <InputRow
                        label="Biaya Iklan / Pesanan"
                        type="currency"
                        value={state.biayaIklanPerPesanan}
                        onChange={v => handleStateChange('biayaIklanPerPesanan', v)}
                        info="Masukkan biaya iklan (sebelum PPN) per pesanan. PPN 11% akan ditambahkan secara otomatis."
                        calculatedValue={calculations.finalBiayaIklanPerPesanan}
                    />
                    <DisplayRow label="Pembayaran" type="currency" value={calculations.pembayaran} highlight="blue" info="Total penyelesaian pembayaran dikurangi biaya iklan per pesanan (termasuk PPN)." />
                    <DisplayRow label="Profit" type="currency" value={calculations.profitAnalisisBiaya} highlight={calculations.profitAnalisisBiaya > 0 ? 'green' : 'red'} isBold={true} icon={calculations.profitAnalisisBiaya > 0 ? <TrendingUp /> : <TrendingDown />} info="Total penyelesaian pembayaran dikurangi HPP dan biaya iklan final." />
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
                <button 
                    onClick={() => onSave(state, calculations)}
                    className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg"
                >
                    <Save className="w-5 h-5"/>
                    Simpan Perhitungan
                </button>
            </div>
        </main>
    )
};
