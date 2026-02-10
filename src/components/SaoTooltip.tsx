import { useState, useRef, type ReactNode } from 'react';
import { getSaoMoTa, getDacTinhInfo, getNguHanhLabel } from '../lib/sao-data';
import type { Sao } from '../lib/canchi-engine';

interface SaoTooltipProps {
  sao: Sao;
  children: ReactNode;
}

export function SaoTooltip({ sao, children }: SaoTooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 200 ? 'bottom' : 'top');
    }
    setShow(true);
  };

  const info = getSaoMoTa(sao.ten);
  const dacTinhInfo = sao.dacTinh ? getDacTinhInfo(sao.dacTinh) : null;

  // Ngũ hành colors
  const nguHanhBg: Record<string, string> = {
    hoa: 'bg-red-100 text-red-700',
    moc: 'bg-green-100 text-green-700',
    tho: 'bg-yellow-100 text-yellow-700',
    kim: 'bg-zinc-100 text-zinc-700',
    thuy: 'bg-blue-100 text-blue-700',
  };

  // Đặc tính colors
  const dacTinhColor: Record<string, string> = {
    M: 'bg-emerald-100 text-emerald-700',
    V: 'bg-blue-100 text-blue-700',
    D: 'bg-purple-100 text-purple-700',
    H: 'bg-red-100 text-red-700',
    B: 'bg-zinc-100 text-zinc-600',
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          ref={tooltipRef}
          className={`sao-tooltip ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          {/* Arrow */}
          <div
            className={`absolute left-4 w-2 h-2 bg-white border-zinc-300 transform rotate-45 ${
              position === 'top'
                ? 'bottom-[-5px] border-b border-r'
                : 'top-[-5px] border-t border-l'
            }`}
          />

          {/* Header */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-sm text-zinc-900">{sao.ten}</span>
            {sao.nguHanh && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${nguHanhBg[sao.nguHanh]}`}>
                {getNguHanhLabel(sao.nguHanh)}
              </span>
            )}
            {sao.isTot === true && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                Cát ★
              </span>
            )}
            {sao.isTot === false && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
                Hung ✕
              </span>
            )}
          </div>

          {/* Đặc tính */}
          {dacTinhInfo && sao.dacTinh && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${dacTinhColor[sao.dacTinh]}`}>
                {dacTinhInfo.ten}
              </span>
              <span className="text-[11px] text-zinc-500">{dacTinhInfo.moTa}</span>
            </div>
          )}

          {/* Tứ Hóa */}
          {sao.tuHoa && (
            <div className="mb-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                sao.tuHoa === 'ky' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {sao.tuHoa === 'loc' ? 'Hóa Lộc' :
                 sao.tuHoa === 'quyen' ? 'Hóa Quyền' :
                 sao.tuHoa === 'khoa' ? 'Hóa Khoa' :
                 'Hóa Kỵ'}
              </span>
            </div>
          )}

          {/* Mô tả */}
          {info && (
            <>
              <p className="text-[11px] text-zinc-600 leading-relaxed">{info.moTa}</p>
              <p className="text-[11px] text-zinc-800 leading-relaxed mt-1 font-medium">{info.yNghia}</p>
            </>
          )}

          {/* Âm Dương / Loại sao */}
          {info && (info.amDuong || info.loai) && (
            <div className="mt-1.5 text-[10px] text-zinc-400">
              {info.amDuong === 'Dương' ? '☀ Dương' : info.amDuong === 'Âm' ? '☽ Âm' : ''}
              {info.loai === 'chinh_tinh' && ' • Chính tinh'}
              {info.loai === 'phu_tinh' && ' • Phụ tinh'}
              {info.loai === 'tu_hoa' && ' • Tứ Hóa'}
              {info.loai === 'luu_nien' && ' ↻ Lưu niên'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
