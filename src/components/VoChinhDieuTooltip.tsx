import { useState, useRef } from 'react';
import type { Cung } from '../lib/canchi-engine';

interface VoChinhDieuTooltipProps {
  cung: Cung;
}

/**
 * Vô Chính Diệu: cung không có chính tinh.
 * Hiển thị vùng hover trong suốt, tooltip giải thích khi hover.
 */
export function VoChinhDieuTooltip({ cung }: VoChinhDieuTooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 250 ? 'bottom' : 'top');
    }
    setShow(true);
  };

  // Xác định sao chiếu từ tam phương
  const saoPhuNote = cung.saoPhu.length > 0
    ? `Có ${cung.saoPhu.length} phụ tinh hỗ trợ.`
    : 'Không có phụ tinh hỗ trợ.';

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-full flex items-center justify-center cursor-help"
      style={{ zIndex: show ? 50 : undefined }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {/* Vùng trong suốt - không hiện gì */}
      <span className="w-full h-full" />

      {show && (
        <div
          className={`sao-tooltip ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
          style={{ left: '50%', transform: 'translateX(-50%)', minWidth: '260px', zIndex: 60 }}
        >
          {/* Arrow */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-zinc-300 transform rotate-45 ${
              position === 'top'
                ? 'bottom-[-5px] border-b border-r'
                : 'top-[-5px] border-t border-l'
            }`}
          />

          {/* Header */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-sm text-zinc-900">Vô Chính Diệu</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-semibold">
              Không Cung
            </span>
          </div>

          {/* Giải thích */}
          <p className="text-[11px] text-zinc-600 leading-relaxed mb-1.5">
            Cung <strong>{cung.tenCungMenh}</strong> không có chính tinh tọa thủ.
            Tính chất của cung phụ thuộc vào các sao chiếu từ
            cung xung chiếu và tam hợp (Tam Phương Tứ Chính).
          </p>

          <p className="text-[11px] text-zinc-800 leading-relaxed font-medium mb-1.5">
            Người có cung Vô Chính Diệu thường linh hoạt, dễ thích nghi nhưng
            thiếu chủ kiến. Cần xem kỹ phụ tinh và sao chiếu để luận đoán.
          </p>

          {/* Phụ tinh note */}
          <div className="text-[10px] text-zinc-400 border-t border-zinc-100 pt-1.5">
            {saoPhuNote}
          </div>
        </div>
      )}
    </div>
  );
}
