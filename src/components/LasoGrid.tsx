import { useState, useRef, useEffect } from 'react';
import type { Laso } from '../lib/canchi-engine';
import { CUNG_NAMES, formatCanChi, getGioTimeRange } from '../lib/canchi-engine';
import { CungCell } from './CungCell';
import { DaiHanTimeline } from './DaiHanTimeline';
import { LegendPanel, ActionButtons } from './LegendPanel';

// Điểm trên cạnh center panel (0-100%) tương ứng với từng cung
// Mỗi cạnh chia đôi cho 2 cung → điểm giữa mỗi nửa: 25% và 75%
const CUNG_EDGE_POINT: Record<number, { x: number; y: number }> = {
  6: { x: 0, y: 0 },         // Tỵ - góc trên-trái
  7: { x: 25, y: 0 },        // Ngọ - cạnh trên, nửa trái
  8: { x: 75, y: 0 },        // Mùi - cạnh trên, nửa phải
  9: { x: 100, y: 0 },       // Thân - góc trên-phải
  5: { x: 0, y: 25 },        // Thìn - cạnh trái, nửa trên
  10: { x: 100, y: 25 },     // Dậu - cạnh phải, nửa trên
  4: { x: 0, y: 75 },        // Mão - cạnh trái, nửa dưới
  11: { x: 100, y: 75 },     // Tuất - cạnh phải, nửa dưới
  3: { x: 0, y: 100 },       // Dần - góc dưới-trái
  2: { x: 25, y: 100 },      // Sửu - cạnh dưới, nửa trái
  1: { x: 75, y: 100 },      // Tý - cạnh dưới, nửa phải
  12: { x: 100, y: 100 },    // Hợi - góc dưới-phải
};

// Tính cung Xung Chiếu (đối diện, cách 6 cung)
function getCungXung(viTri: number): number {
  return ((viTri - 1 + 6) % 12) + 1;
}

// Tính 2 cung Tam Hợp (cách 4 và 8 cung)
function getCungTamHop(viTri: number): [number, number] {
  const tamHop1 = ((viTri - 1 + 4) % 12) + 1;
  const tamHop2 = ((viTri - 1 + 8) % 12) + 1;
  return [tamHop1, tamHop2];
}

// Component vẽ đường Tam Phương
interface TamPhuongLinesProps {
  cungViTri: number;
}

function TamPhuongLines({ cungViTri }: TamPhuongLinesProps) {
  const xungCung = getCungXung(cungViTri);
  const [tamHop1, tamHop2] = getCungTamHop(cungViTri);

  // Dùng edge point trực tiếp thay vì ray-casting
  const edgeToCung = CUNG_EDGE_POINT[cungViTri];
  const edgeToXung = CUNG_EDGE_POINT[xungCung];
  const edgeToTamHop1 = CUNG_EDGE_POINT[tamHop1];
  const edgeToTamHop2 = CUNG_EDGE_POINT[tamHop2];

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible',
      }}
    >
      {/* Đường Xung Chiếu - màu đỏ */}
      <line
        x1={`${edgeToCung.x}%`}
        y1={`${edgeToCung.y}%`}
        x2={`${edgeToXung.x}%`}
        y2={`${edgeToXung.y}%`}
        stroke="#ef4444"
        strokeWidth="2"
        opacity="0.6"
      />
      {/* Đường Tam Hợp 1 - màu đen */}
      <line
        x1={`${edgeToCung.x}%`}
        y1={`${edgeToCung.y}%`}
        x2={`${edgeToTamHop1.x}%`}
        y2={`${edgeToTamHop1.y}%`}
        stroke="#000"
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Đường Tam Hợp 2 - màu đen */}
      <line
        x1={`${edgeToCung.x}%`}
        y1={`${edgeToCung.y}%`}
        x2={`${edgeToTamHop2.x}%`}
        y2={`${edgeToTamHop2.y}%`}
        stroke="#000"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}

// Tính Can Chi từ năm
function getCanChiNam(nam: number): { can: number; chi: number } {
  const can = ((nam - 4) % 10) + 1;
  const chi = ((nam - 4) % 12) + 1;
  return { can, chi };
}

// Tính vị trí badge trên cạnh của center panel (2x2 ở giữa)
// Center panel chiếm rows 1-2, cols 1-2 của grid
// Tính vị trí badge trên grid (% tương đối với grid 4x4)
// Badge nằm tại đường viền chung giữa 2 cung liền kề
// Nếu pair nằm sát center panel → đẩy badge vào cạnh gần center
function getBadgeGridPosition(cung1: number, cung2: number): { x: number; y: number } | null {
  const pos1 = GRID_POSITIONS[cung1];
  const pos2 = GRID_POSITIONS[cung2];
  if (!pos1 || !pos2) return null;
  
  // Cùng hàng (horizontal pair)
  if (pos1[0] === pos2[0] && Math.abs(pos1[1] - pos2[1]) === 1) {
    const row = pos1[0];
    const x = Math.max(pos1[1], pos2[1]) * 25; // boundary column
    // Center-adjacent: cả 2 cung nằm ở cols 1-2 (trên/dưới center panel)
    const isCenterAdj = pos1[1] >= 1 && pos1[1] <= 2 && pos2[1] >= 1 && pos2[1] <= 2;
    let y: number;
    if (isCenterAdj && row === 0) {
      y = 25; // cạnh dưới hàng trên (sát center panel)
    } else if (isCenterAdj && row === 3) {
      y = 75; // cạnh trên hàng dưới (sát center panel)
    } else {
      y = (row + 0.5) * 25; // giữa hàng
    }
    return { x, y };
  }
  
  // Cùng cột (vertical pair)
  if (pos1[1] === pos2[1] && Math.abs(pos1[0] - pos2[0]) === 1) {
    const col = pos1[1];
    const y = Math.max(pos1[0], pos2[0]) * 25; // boundary row
    // Center-adjacent: cả 2 cung nằm ở rows 1-2 (trái/phải center panel)
    const isCenterAdj = pos1[0] >= 1 && pos1[0] <= 2 && pos2[0] >= 1 && pos2[0] <= 2;
    let x: number;
    if (isCenterAdj && col === 0) {
      x = 25; // cạnh phải cột trái (sát center panel)
    } else if (isCenterAdj && col === 3) {
      x = 75; // cạnh trái cột phải (sát center panel)
    } else {
      x = (col + 0.5) * 25; // giữa cột
    }
    return { x, y };
  }
  
  return null;
}

interface LasoGridProps {
  laso: Laso;
}

// Grid layout: 4x4, cung được xếp theo thứ tự đặc biệt
// Hàng 1: Tỵ(6), Ngọ(7), Mùi(8), Thân(9)
// Hàng 2: Thìn(5), [CENTER], [CENTER], Dậu(10)
// Hàng 3: Mão(4), [CENTER], [CENTER], Tuất(11)
// Hàng 4: Dần(3), Sửu(2), Tý(1), Hợi(12)

// GRID_POSITIONS: vị trí cố định của 12 địa chi trên grid (viTri 1=Tý, 2=Sửu,...)
const GRID_POSITIONS: Record<number, [number, number]> = {
  6: [0, 0], 7: [0, 1], 8: [0, 2], 9: [0, 3],
  5: [1, 0],                       10: [1, 3],
  4: [2, 0],                       11: [2, 3],
  3: [3, 0], 2: [3, 1], 1: [3, 2], 12: [3, 3],
};

// Tên địa chi tại mỗi vị trí grid cố định
const GRID_CHI: Record<number, string> = {
  1: 'Tý', 2: 'Sửu', 3: 'Dần', 4: 'Mão', 5: 'Thìn', 6: 'Tỵ',
  7: 'Ngọ', 8: 'Mùi', 9: 'Thân', 10: 'Dậu', 11: 'Tuất', 12: 'Hợi'
};

export { GRID_CHI };

const GRID_FIXED_WIDTH = 960;

export function LasoGrid({ laso }: LasoGridProps) {
  // State cho việc hover cung - chỉ highlight khi đang hover
  const [hoveredCung, setHoveredCung] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);
  const [gridOffsetLeft, setGridOffsetLeft] = useState(0);

  useEffect(() => {
    const scaler = scalerRef.current;
    const grid = gridRef.current;
    if (!scaler || !grid) return;

    const update = () => {
      const w = scaler.clientWidth;
      const s = Math.min(1, w / GRID_FIXED_WIDTH);
      setScale(s);
      setGridOffsetLeft(Math.max(0, (w - GRID_FIXED_WIDTH * s) / 2));
      // Cập nhật height sau khi grid đã render
      requestAnimationFrame(() => {
        if (grid) setScaledHeight(grid.offsetHeight * s);
      });
    };

    const ro = new ResizeObserver(update);
    ro.observe(scaler);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  // Tính highlight Tam Phương Tứ Chính - chỉ khi hover
  const getHighlight = (viTri: number): 'in-tam-phuong' | 'dimmed' | null => {
    if (hoveredCung === null) return null; // Không hover → không highlight
    const xungCung = getCungXung(hoveredCung);
    const [tamHop1, tamHop2] = getCungTamHop(hoveredCung);
    if (viTri === hoveredCung || viTri === xungCung || viTri === tamHop1 || viTri === tamHop2) {
      return 'in-tam-phuong';
    }
    return 'dimmed';
  };

  const getCungByPosition = (row: number, col: number) => {
    const cungNum = Object.entries(GRID_POSITIONS).find(
      ([, pos]) => pos[0] === row && pos[1] === col
    )?.[0];
    if (!cungNum) return null;
    return laso.cung.find(c => c.viTri === parseInt(cungNum));
  };

  // Lấy cung đầu tiên của Triệt và Tuần
  const [triet1, triet2] = laso.trietLo;
  const [tuan1, tuan2] = laso.tuanTriet;
  
  // Tính badge trên grid
  const trietPos = getBadgeGridPosition(triet1, triet2);
  const tuanPos = getBadgeGridPosition(tuan1, tuan2);
  
  // Edge case: Tuần và Triệt cùng vị trí → gộp 1 badge
  const isSamePosition = triet1 === tuan1 && triet2 === tuan2;
  
  const gridBadges: { label: string; x: number; y: number }[] = [];
  if (isSamePosition && trietPos) {
    gridBadges.push({ label: 'Tuần - Triệt', ...trietPos });
  } else {
    if (trietPos) gridBadges.push({ label: 'Triệt', ...trietPos });
    if (tuanPos) gridBadges.push({ label: 'Tuần', ...tuanPos });
  }

  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Action buttons */}
      <ActionButtons gridRef={gridRef} laso={laso} showLegend={showLegend} onToggleLegend={() => setShowLegend(!showLegend)} />

      {/* Legend Panel */}
      {showLegend && <LegendPanel laso={laso} />}

      {/* Đại Hạn Timeline */}
      <DaiHanTimeline laso={laso} onCungClick={(viTri) => setHoveredCung(viTri)} onTieuHanClick={(viTri) => setHoveredCung(viTri)} />

      <div ref={scalerRef} className="laso-grid-scaler" style={{ height: scaledHeight }}>
        <div ref={gridRef} className="laso-grid relative" id="laso-grid-export" style={{ transform: `scale(${scale})`, marginLeft: `${gridOffsetLeft}px` }}>
        {/* Row 0 */}
        {[0, 1, 2, 3].map(col => {
          const cung = getCungByPosition(0, col);
          return cung ? (
            <CungCell 
              key={cung.viTri} 
              cung={cung} 
              highlight={getHighlight(cung.viTri)}
              onHover={() => setHoveredCung(cung.viTri)}
              onLeave={() => setHoveredCung(null)}
            />
          ) : null;
        })}

        {/* Row 1 */}
        {(() => {
          const cung5 = getCungByPosition(1, 0);
          const cung10 = getCungByPosition(1, 3);
          return (
            <>
              {cung5 && (
                <CungCell 
                  key={cung5.viTri} 
                  cung={cung5} 
                  highlight={getHighlight(cung5.viTri)}
                  onHover={() => setHoveredCung(cung5.viTri)}
                  onLeave={() => setHoveredCung(null)}
                />
              )}
              
              {/* Center panel - spans 2 cols, 2 rows */}
              <div className="laso-center">
                <p className="text-base text-center text-muted-foreground">CanChi</p>
                <h1 className="text-2xl font-bold text-center uppercase tracking-wide">
                  Lá số Tử Vi
                </h1>
                <hr className="border-border w-1/2 mx-auto my-1" />
                
                <div className="space-y-1.5 text-base">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Năm</span>
                    <span className="font-semibold">
                      {laso.input.namDuong || laso.input.namAm}
                      {laso.input.namDuong && laso.input.namDuong !== laso.input.namAm && (
                        <span className="text-muted-foreground"> ({laso.input.namAm})</span>
                      )}
                    </span>
                    <span className="font-bold">{formatCanChi(laso.canNam, laso.chiNam)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Tháng</span>
                    <span className="font-semibold">
                      {laso.input.thangDuong || laso.input.thangAm}
                      {laso.input.thangDuong && laso.input.thangDuong !== laso.input.thangAm && (
                        <span className="text-muted-foreground"> ({laso.input.thangAm})</span>
                      )}
                    </span>
                    <span className="font-bold">{formatCanChi(laso.canThang, laso.chiThang)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Ngày</span>
                    <span className="font-semibold">
                      {laso.input.ngayDuong || laso.input.ngayAm}
                      {laso.input.ngayDuong && laso.input.ngayDuong !== laso.input.ngayAm && (
                        <span className="text-muted-foreground"> ({laso.input.ngayAm})</span>
                      )}
                    </span>
                    <span className="font-bold">
                      {laso.canNgay > 0 ? formatCanChi(laso.canNgay, laso.chiNgay) : '-'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Giờ</span>
                    <span className="font-semibold">{getGioTimeRange(laso.input.gio)}</span>
                    <span className="font-bold">
                      {laso.canGio > 0 ? formatCanChi(laso.canGio, laso.chiGio) : CUNG_NAMES[laso.chiGio]}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Năm xem</span>
                    <span className="font-semibold">{laso.input.namXem || new Date().getFullYear()}</span>
                    <div className="flex flex-col">
                      {(() => {
                        const namXem = laso.input.namXem || new Date().getFullYear();
                        const { can, chi } = getCanChiNam(namXem);
                        return (
                          <>
                            <span className="font-bold">{formatCanChi(can, chi)}</span>
                            <span className="font-bold">{laso.tuoiHan} tuổi</span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <hr className="border-border w-1/2 mx-auto my-1" />
                
                <div className="space-y-1.5 text-base">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Âm Dương</span>
                    <div className="col-span-2 flex flex-col">
                      <span className="font-bold">
                        {laso.amDuong} {laso.input.gioiTinh === 'nam' ? 'Nam' : 'Nữ'}
                      </span>
                      <span className="font-bold">
                        {laso.isNghichLy ? 'Âm dương nghịch lý' : 'Âm dương thuận lý'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Mệnh</span>
                    <span className="font-bold col-span-2 capitalize">{laso.napAm}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-muted-foreground">Cục</span>
                    <div className="col-span-2 flex flex-col">
                      <span className="font-bold">{laso.cucTen}</span>
                      {laso.cucSinhKhac && (
                        <span className="font-bold">{laso.cucSinhKhac}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Đường Tam Phương */}
                <TamPhuongLines cungViTri={hoveredCung ?? laso.cungMenh} />
              </div>
              
              {cung10 && <CungCell key={cung10.viTri} cung={cung10} highlight={getHighlight(cung10.viTri)} onHover={() => setHoveredCung(cung10.viTri)} onLeave={() => setHoveredCung(null)} />}
            </>
          );
        })()}

        {/* Row 2 */}
        {(() => {
          const cung4 = getCungByPosition(2, 0);
          const cung11 = getCungByPosition(2, 3);
          return (
            <>
              {cung4 && <CungCell key={cung4.viTri} cung={cung4} highlight={getHighlight(cung4.viTri)} onHover={() => setHoveredCung(cung4.viTri)} onLeave={() => setHoveredCung(null)} />}
              {/* Center continues from row 1 */}
              {cung11 && <CungCell key={cung11.viTri} cung={cung11} highlight={getHighlight(cung11.viTri)} onHover={() => setHoveredCung(cung11.viTri)} onLeave={() => setHoveredCung(null)} />}
            </>
          );
        })()}

        {/* Row 3 */}
        {[0, 1, 2, 3].map(col => {
          const cung = getCungByPosition(3, col);
          return cung ? <CungCell key={cung.viTri} cung={cung} highlight={getHighlight(cung.viTri)} onHover={() => setHoveredCung(cung.viTri)} onLeave={() => setHoveredCung(null)} /> : null;
        })}

        {/* Badge Tuần/Triệt - đặt tại đường viền chung giữa 2 cung */}
        {gridBadges.map((b, i) => (
          <div
            key={`badge-${i}`}
            className="group px-2 text-xs font-semibold bg-black text-white whitespace-nowrap pt-[2px] cursor-help"
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
            }}
          >
            {b.label}
            <div className="hidden group-hover:block absolute bottom-full mb-1.5 w-56 p-2 bg-white text-zinc-700 text-[11px] font-normal border border-zinc-300 rounded shadow-lg leading-relaxed whitespace-normal"
              style={{ zIndex: 60, left: '50%', transform: 'translateX(-50%)', maxWidth: '14rem' }}
            >
              {b.label.includes('Triệt') && (
                <p><b>Triệt lộ:</b> Vùng bị cắt đứt, sao trong cung bị giảm lực. Gặp cát tinh thì giảm tốt, gặp hung tinh thì giảm xấu.</p>
              )}
              {b.label.includes('Tuần') && (
                <p className={b.label.includes('Triệt') ? 'mt-1' : ''}><b>Tuần trung:</b> Vùng ẩn tàng, sao bị che khuất. Hung tinh gặp Tuần thì bớt hung, cát tinh gặp Tuần thì chậm phát.</p>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
