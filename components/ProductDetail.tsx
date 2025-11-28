import React from 'react';
import { CalculatorState, CalculationResults } from '../types';
import { DisplayRow } from './DisplayRow';

interface ProductDetailProps {
    state: CalculatorState;
    results: CalculationResults;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4 last:mb-0">
        <h3 className="text-md font-semibold text-slate-600 border-b border-slate-200 pb-2 mb-2">{title}</h3>
        <div className="space-y-1">{children}</div>
    </div>
);

export const ProductDetail: React.FC<ProductDetailProps> = ({ state, results }) => {
    return (
        <div className="bg-slate-50/50 p-4 rounded-lg">
            <Section title="Harga & Margin">
                <DisplayRow label="HPP" type="currency" value={state.hpp} />
                <DisplayRow
                    label="Margin Profit"
                    type={state.marginProfitMode === 'percent' ? 'percentage' : 'currency'}
                    value={state.marginProfitValueInput}
                />
                <DisplayRow label="Harga Jual" type="currency" value={results.hargaJual} highlight="blue" />
                <DisplayRow label="Diskon Toko" type="currency" value={state.diskon} />
            </Section>

            <Section title="Perhitungan Campaign">
                <DisplayRow label="Potongan Campaign (%)" type="percentage" value={state.persentaseCampaign / 100} />
                <DisplayRow label="Potongan Campaign (Rp)" type="currency" value={results.potonganCampaignValue} />
                <DisplayRow label="Subsidi Campaign Toko (%)" type="percentage" value={state.campaignDitanggungTokoPercent / 100} />
                <DisplayRow label="Subsidi Campaign Toko (Rp)" type="currency" value={results.potonganDitanggungToko} />
                <DisplayRow label="Subsidi Campaign TikTok (Rp)" type="currency" value={results.subsidiTiktokValue} highlight="yellow" />
                <DisplayRow label="Harga Final / Etalase" type="currency" value={results.hargaFinal} highlight="blue" isBold />
            </Section>

            <Section title="Total Penghasilan">
                <DisplayRow label="Total Penghasilan Seller" type="currency" value={results.totalPenghasilan} highlight="blue" isBold />
            </Section>

            <Section title="Biaya-Biaya Marketplace">
                <DisplayRow label="Komisi Platform" type="currency" value={results.komisiPlatformValue} />
                <DisplayRow label="Komisi Dinamis" type="currency" value={results.komisiDinamisValue} />
                <DisplayRow label="Cashback Bonus" type="currency" value={results.cashbackBonusValue} />
                <DisplayRow label="Biaya Pemrosesan" type="currency" value={state.biayaPemrosesan} />
                <DisplayRow label="Afiliasi" type="currency" value={results.afiliasiValue} />
                <DisplayRow label="Komisi Affiliasi Toko" type="currency" value={results.komisiAfiliasiTokoValue} />
                <DisplayRow label="Live/Voucher Extra" type="currency" value={results.liveVoucherExtraValue} />
                <DisplayRow
                    label="Biaya Operasional"
                    type={state.biayaOperasionalMode === 'percent' ? 'percentage' : 'currency'}
                    value={state.biayaOperasionalValueInput}
                    calculatedValue={results.biayaOperasionalValue}
                    calculatedValueType="currency"
                />
                 <DisplayRow label="Total Biaya" type="currency" value={results.totalCosts} highlight="red" isBold />
            </Section>
            
            <Section title="Total Penyelesaian Pembayaran">
                 <DisplayRow label="Total Penyelesaian Pembayaran" type="currency" value={results.totalPenyelesaianPembayaran} highlight="green" isBold />
            </Section>
            
            <Section title="Target Ideal">
                <DisplayRow label="Target Profit (%)" type="percentage" value={state.targetProfitPercent / 100} />
                <DisplayRow label="Potensi Keuntungan (Rp)" type="currency" value={results.potensiKeuntunganValue} highlight="green" />
                <DisplayRow label="Budget Iklan Ideal (Rp)" type="currency" value={results.budgetIklanValue} highlight="yellow" />
                <DisplayRow label="Target ROI Ideal" type="number" value={results.targetRoiIdeal} highlight="green" isBold />
                <DisplayRow label="ROI BEP / Impas" type="number" value={results.roiBep} highlight="yellow" />
                <DisplayRow label="Budget Iklan Maks (BEP)" type="currency" value={results.maxAdSpendForBep} highlight="yellow" />
            </Section>
            
            <Section title="Analisis Performa Aktual">
                <DisplayRow label="Input ROI Aktual" type="number" value={state.actualRoi} />
                <DisplayRow label="Biaya Iklan Aktual (Rp)" type="currency" value={results.actualAdSpend} highlight="yellow"/>
                <DisplayRow label="Potensi Profit Aktual (Rp)" type="currency" value={results.actualProfit} highlight={results.actualProfit > 0 ? 'green' : 'red'} isBold />
                <DisplayRow label="Profit Aktual (%)" type="percentage" value={results.actualProfitPercent} highlight={results.actualProfitPercent > 0 ? 'green' : 'red'} />
            </Section>

            <Section title="Analisis Biaya / Pesanan">
                <DisplayRow label="Biaya Iklan / Pesanan (Input)" type="currency" value={state.biayaIklanPerPesanan} />
                <DisplayRow label="Biaya Iklan Final (+PPN 11%)" type="currency" value={results.finalBiayaIklanPerPesanan} highlight="red" />
                <DisplayRow label="Pembayaran Final" type="currency" value={results.pembayaran} highlight="blue" />
                <DisplayRow label="Profit Final" type="currency" value={results.profitAnalisisBiaya} highlight={results.profitAnalisisBiaya > 0 ? 'green' : 'red'} isBold />
            </Section>
        </div>
    );
};
