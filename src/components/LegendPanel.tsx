import { useState, type RefObject } from 'react';
import { BookOpen, X, Image, Download, Copy, Check, Loader2 } from 'lucide-react';
import type { Laso } from '../lib/canchi-engine';

interface LegendPanelProps {
  gridRef: RefObject<HTMLDivElement | null>;
  laso: Laso;
}

export function ActionButtons({ gridRef, laso, showLegend, onToggleLegend }: LegendPanelProps & { showLegend: boolean; onToggleLegend: () => void }) {
  const [exporting, setExporting] = useState(false);

  const getLasoJson = () => JSON.stringify(laso, null, 2);

  const handleDownloadJson = () => {
    const json = getLasoJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const name = `canchi-${laso.input.gioiTinh === 'nam' ? 'nam' : 'nu'}-${laso.input.ngayAm || laso.input.ngayDuong}-${laso.input.thangAm || laso.input.thangDuong}-${laso.input.namAm || laso.input.namDuong}`;
    link.download = `${name}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = useState(false);
  const handleCopyJson = async () => {
    await navigator.clipboard.writeText(getLasoJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleExport = async () => {
    if (!gridRef.current) return;
    setExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(gridRef.current, {
        backgroundColor: '#FFFBEF',
        pixelRatio: 2,
        style: {
          transform: 'none',
        }
      });
      const link = document.createElement('a');
      link.download = `laso-canchi-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Không thể xuất hình ảnh. Vui lòng thử lại.');
    } finally {
      setExporting(false);
    }
  };

  const btnClass = "px-3 py-1.5 text-xs border border-border rounded-md transition-colors flex items-center gap-1.5 hover:bg-zinc-900 hover:text-white hover:border-zinc-900";

  return (
    <div className="flex items-center gap-3 justify-center flex-wrap">
      <button onClick={onToggleLegend} className={btnClass}>
        {showLegend ? <><X className="w-3.5 h-3.5" /> Ẩn chú thích</> : <><BookOpen className="w-3.5 h-3.5" /> Chú thích</>}
      </button>
      <button onClick={handleExport} disabled={exporting} className={`${btnClass} disabled:opacity-50 disabled:pointer-events-none`}>
        {exporting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang xuất...</> : <><Image className="w-3.5 h-3.5" /> Tải lá số</>}
      </button>
      <button onClick={handleDownloadJson} className={btnClass}>
        <Download className="w-3.5 h-3.5" /> Tải JSON
      </button>
      <button onClick={handleCopyJson} className={btnClass}>
        {copied ? <><Check className="w-3.5 h-3.5" /> Đã copy</> : <><Copy className="w-3.5 h-3.5" /> Copy JSON</>}
      </button>
    </div>
  );
}

export function LegendPanel({ laso: _laso }: { laso: Laso }) {
  return (
    <div className="legend-panel">
          <h3 className="font-bold text-sm mb-3 text-zinc-800">📖 Chú thích Lá Số CanChi</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ngũ Hành */}
            <div>
              <h4 className="font-semibold text-xs text-zinc-600 mb-1.5 uppercase tracking-wider">Ngũ Hành (Màu sao)</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-red-600 font-semibold">Hỏa</span>
                  <span className="text-zinc-400">— Nóng, mạnh, bùng phát</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-green-600 font-semibold">Mộc</span>
                  <span className="text-zinc-400">— Sinh trưởng, phát triển</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-yellow-600 font-semibold">Thổ</span>
                  <span className="text-zinc-400">— Ổn định, trung hòa</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-zinc-400"></span>
                  <span className="text-zinc-500 font-semibold">Kim</span>
                  <span className="text-zinc-400">— Sắc bén, quyết đoán</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
                  <span className="text-zinc-800 font-semibold">Thủy</span>
                  <span className="text-zinc-400">— Linh hoạt, biến đổi</span>
                </div>
              </div>
            </div>

            {/* Đặc tính */}
            <div>
              <h4 className="font-semibold text-xs text-zinc-600 mb-1.5 uppercase tracking-wider">Đặc Tính Sao (M/V/Đ/H/B)</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[10px]">M</span>
                  <span className="font-semibold">Miếu</span>
                  <span className="text-zinc-400">— Vị trí tốt nhất</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[10px]">V</span>
                  <span className="font-semibold">Vượng</span>
                  <span className="text-zinc-400">— Vị trí mạnh</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[10px]">Đ</span>
                  <span className="font-semibold">Đắc</span>
                  <span className="text-zinc-400">— Vị trí khá</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">H</span>
                  <span className="font-semibold">Hãm</span>
                  <span className="text-zinc-400">— Vị trí yếu</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold text-[10px]">B</span>
                  <span className="font-semibold">Bình</span>
                  <span className="text-zinc-400">— Trung bình</span>
                </div>
              </div>
            </div>

            {/* Loại sao & Cấu trúc cung */}
            <div>
              <h4 className="font-semibold text-xs text-zinc-600 mb-1.5 uppercase tracking-wider">Cấu trúc Cung</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-base">Sao</span>
                  <span className="text-zinc-400">— Chính tinh (chữ to, đậm)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-sm">Sao</span>
                  <span className="text-zinc-400">— Phụ tinh quan trọng</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-normal text-sm">Sao</span>
                  <span className="text-zinc-400">— Phụ tinh thường</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-400">Cột trái = Cát tinh</span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-zinc-400">Cột phải = Hung tinh</span>
                </div>
              </div>

              <h4 className="font-semibold text-xs text-zinc-600 mt-3 mb-1.5 uppercase tracking-wider">Tam Phương Tứ Chính</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-4 h-3 rounded-sm border-2 border-blue-400 bg-blue-50 inline-block"></span>
                  <span className="text-zinc-500">Cung đang xem</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-4 h-3 rounded-sm border-2 border-red-300 bg-red-50 inline-block"></span>
                  <span className="text-zinc-500">Xung Chiếu (đối diện)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-4 h-3 rounded-sm border-2 border-emerald-300 bg-emerald-50 inline-block"></span>
                  <span className="text-zinc-500">Tam Hợp (cách 4 cung)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
