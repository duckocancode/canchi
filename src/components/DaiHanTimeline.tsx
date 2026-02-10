import { useState } from 'react';
import type { Laso } from '../lib/canchi-engine';
import { CUNG_NAMES } from '../lib/canchi-engine';

interface DaiHanTimelineProps {
  laso: Laso;
  onCungClick: (viTri: number) => void;
  onTieuHanClick?: (viTri: number) => void;
}

// Mod 1-12
function mod12(n: number): number {
  return ((n - 1) % 12 + 12) % 12 + 1;
}

/**
 * Tính tiểu hạn trong 1 đại hạn theo logic:
 * - Năm 1: cung đại hạn (gốc)
 * - Năm 2: cung đối diện
 * - Năm 3: đối diện ± 1 (nghịch: -1, thuận: +1)
 * - Năm 4: quay lại đối diện
 * - Năm 5+: đi ngược hướng từ đối diện, mỗi năm +1 bước, cuối cùng về gốc
 */
function calcTieuHanInDaiHan(cungDH: number, numYears: number, isNghich: boolean): number[] {
  const opposite = mod12(cungDH + 6);
  const dir = isNghich ? 1 : -1;

  const result: number[] = [];
  for (let i = 0; i < numYears; i++) {
    if (i === 0) {
      result.push(cungDH);
    } else if (i === 1) {
      result.push(opposite);
    } else if (i === 2) {
      result.push(mod12(opposite + dir));
    } else if (i === 3) {
      result.push(opposite);
    } else {
      // Năm 5+: đi ngược dir từ đối diện
      const step = -(i - 3) * dir;
      result.push(mod12(opposite + step));
    }
  }
  return result;
}

export function DaiHanTimeline({ laso, onCungClick, onTieuHanClick }: DaiHanTimelineProps) {
  const [selectedDaiHan, setSelectedDaiHan] = useState<number | null>(null);

  // Lấy danh sách đại hạn, sort theo tuổi
  const daiHanList = laso.cung
    .map(c => ({
      viTri: c.viTri,
      tenCung: c.tenCungMenh,
      chiCung: c.chiCung,
      daiHan: c.daiHan,
      isMenh: c.isMenh,
    }))
    .sort((a, b) => a.daiHan - b.daiHan);

  // Tuổi hiện tại
  const tuoiHienTai = laso.tuoiHan;
  const isNghich = laso.isNghichLy;

  // Map: cung viTri → tenCungMenh
  const cungNameMap: Record<number, string> = {};
  for (const c of laso.cung) {
    cungNameMap[c.viTri] = c.tenCungMenh;
  }

  // Tính tiểu hạn cho 1 đại hạn
  const getTieuHanForDaiHan = (cungDH: number, startAge: number, endAge: number) => {
    const numYears = endAge - startAge + 1;
    const cungList = calcTieuHanInDaiHan(cungDH, numYears, isNghich);

    return cungList.map((cungViTri, idx) => ({
      tuoi: startAge + idx,
      cungViTri,
      tenCung: cungNameMap[cungViTri] || CUNG_NAMES[cungViTri],
      chiCung: CUNG_NAMES[cungViTri],
    }));
  };

  return (
    <div className="dai-han-timeline">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Đại Hạn</span>
        <span className="text-[10px] text-zinc-400">( Click để xem tiểu hạn )</span>
      </div>
      <div className="dai-han-scroll">
        <div className="flex gap-0">
        {daiHanList.map((item, idx) => {
          const endAge = idx < daiHanList.length - 1 ? daiHanList[idx + 1].daiHan - 1 : item.daiHan + 9;
          const isSelected = selectedDaiHan === idx;
          const isCurrent = tuoiHienTai >= item.daiHan && tuoiHienTai <= endAge;

          return (
            <button
              key={item.viTri}
              onClick={() => {
                onCungClick(item.viTri);
                setSelectedDaiHan(isSelected ? null : idx);
              }}
              className={`dai-han-item ${isSelected ? 'dai-han-active' : ''} ${isCurrent ? 'dai-han-current' : ''} ${isSelected ? 'dai-han-selected' : ''}`}
              title={`${item.tenCung} (${CUNG_NAMES[item.viTri]}): ${item.daiHan}-${endAge} tuổi`}
            >
              <span className="text-[10px] font-semibold truncate">{item.tenCung}</span>
              <span className="text-[10px] text-zinc-500">{item.chiCung}</span>
              <span className="text-xs font-bold">{item.daiHan}</span>
              <span className="text-[9px] text-zinc-400">-{endAge}</span>
            </button>
          );
        })}
        </div>
      </div>

      {/* Tiểu Hạn sub-timeline */}
      {selectedDaiHan !== null && (() => {
        const item = daiHanList[selectedDaiHan];
        const endAge = selectedDaiHan < daiHanList.length - 1 
          ? daiHanList[selectedDaiHan + 1].daiHan - 1 
          : item.daiHan + 9;
        const tieuHanItems = getTieuHanForDaiHan(item.viTri, item.daiHan, endAge);

        return (
          <div className="tieu-han-sub mt-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Tiểu Hạn — {item.tenCung} ({item.daiHan}–{endAge})
              </span>
              <span className="text-[10px] text-zinc-400">
                ({isNghich ? 'Nghịch' : 'Thuận'})
              </span>
            </div>
            <div className="dai-han-scroll">
              <div className="flex gap-0">
              {tieuHanItems.map((th) => {
                const isCurrent = th.tuoi === tuoiHienTai;
                return (
                  <button
                    key={th.tuoi}
                    onClick={() => (onTieuHanClick || onCungClick)(th.cungViTri)}
                    className={`tieu-han-item ${isCurrent ? 'tieu-han-current' : ''}`}
                    title={`Tuổi ${th.tuoi} — ${th.chiCung} — ${th.tenCung}`}
                  >
                    <span className="text-[10px] font-bold">{th.tuoi}</span>
                    <span className="text-[9px] text-zinc-500">{th.chiCung}</span>
                    <span className="text-[9px] font-medium truncate max-w-full">{th.tenCung}</span>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Indicator cho tuổi hiện tại */}
      <div className="flex items-center gap-2 mt-1.5">
        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
          <span className="w-2 h-2 rounded-sm bg-amber-200 border border-amber-400 inline-block"></span>
          <span>Đại hạn hiện tại ({tuoiHienTai} tuổi)</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
          <span className="w-2 h-2 rounded-sm bg-zinc-900 border border-zinc-950 inline-block"></span>
          <span>Cung đang xem</span>
        </div>
      </div>
    </div>
  );
}
