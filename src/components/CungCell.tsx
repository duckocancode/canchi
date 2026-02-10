import type { Sao, Cung } from '../lib/canchi-engine';
import { SaoTooltip } from './SaoTooltip';
import { VoChinhDieuTooltip } from './VoChinhDieuTooltip';
import { CungTooltip, getCungMenhDesc, getTrangSinhDesc, getNguHanhCung } from './CungTooltip';

// Ngũ hành của CUNG theo Chi (vị trí cung)
// Tý(1), Hợi(12) = Thủy | Sửu(2), Thìn(5), Mùi(8), Tuất(11) = Thổ
// Dần(3), Mão(4) = Mộc | Tỵ(6), Ngọ(7) = Hỏa | Thân(9), Dậu(10) = Kim
const CUNG_NGU_HANH: Record<number, string> = {
  1: 'thuy',   // Tý
  2: 'tho',    // Sửu
  3: 'moc',    // Dần
  4: 'moc',    // Mão
  5: 'tho',    // Thìn
  6: 'hoa',    // Tỵ
  7: 'hoa',    // Ngọ
  8: 'tho',    // Mùi
  9: 'kim',    // Thân
  10: 'kim',   // Dậu
  11: 'tho',   // Tuất
  12: 'thuy',  // Hợi
};

// Sao phụ quan trọng - hiển thị semibold
const SAO_PHU_QUAN_TRONG = new Set([
  "Tả Phù", "Hữu Bật", "Văn Xương", "Văn Khúc",
  "Thiên Khôi", "Thiên Việt", "Lộc Tồn", "Thiên Mã",
  "Kình Dương", "Đà La", "Hỏa Tinh", "Linh Tinh",
  "Địa Không", "Địa Kiếp", "Hồng Loan", "Thiên Hỷ",
  "Thiên Không", "Thiên Hình", "Cô Thần", "Quả Tú", "Thiên Diêu",
  // Tứ Hóa
  "Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"
]);

interface SaoDisplayProps {
  sao: Sao;
  isChinhTinh?: boolean;
}

function SaoDisplay({ sao, isChinhTinh = false }: SaoDisplayProps) {
  // Màu theo ngũ hành
  const nguHanhClass: Record<string, string> = {
    hoa: 'text-red-600',
    moc: 'text-green-600',
    tho: 'text-yellow-600',
    kim: 'text-zinc-500',
    thuy: 'text-black',
  };

  const colorClass = sao.nguHanh ? nguHanhClass[sao.nguHanh] : 'text-zinc-800';
  
  // Weight: chính tinh = bold, sao phụ quan trọng = semibold, còn lại = normal
  let weightClass = 'font-normal';
  if (isChinhTinh) {
    weightClass = 'font-bold';
  } else if (SAO_PHU_QUAN_TRONG.has(sao.ten)) {
    weightClass = 'font-semibold';
  }

  // Map D -> Đ for display
  const dacTinhDisplay: Record<string, string> = { M: 'M', V: 'V', D: 'Đ', H: 'H', B: 'B' };
  const dacTinhText = sao.dacTinh ? ` (${dacTinhDisplay[sao.dacTinh] || sao.dacTinh})` : '';

  if (isChinhTinh) {
    return (
      <SaoTooltip sao={sao}>
        <p className={`text-lg text-center ${colorClass} ${weightClass} cursor-help`}>
          {sao.ten}{dacTinhText}
        </p>
      </SaoTooltip>
    );
  }

  return (
    <SaoTooltip sao={sao}>
      <p className={`text-[15px] capitalize ${colorClass} ${weightClass} cursor-help`}>
        {sao.ten}{dacTinhText}
      </p>
    </SaoTooltip>
  );
}

interface CungCellProps {
  cung: Cung;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  highlight?: 'in-tam-phuong' | 'dimmed' | null;
}

export function CungCell({ cung, onClick, onHover, onLeave, highlight }: CungCellProps) {
  const highlightClass = highlight === 'dimmed' ? 'cung-dimmed' : '';

  return (
    <div 
      className={`cung-cell ${highlightClass}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      
      {/* Header: Can Chi, Tên cung, Đại hạn */}
      <div className="cung-header">
        {(() => {
          const canChar = cung.canCung.charAt(0);
          const nguHanh = CUNG_NGU_HANH[cung.viTri] || 'thuy';
          const nguHanhColorClass: Record<string, string> = {
            hoa: 'text-red-600',
            moc: 'text-green-600',
            tho: 'text-yellow-600',
            kim: 'text-zinc-500',
            thuy: 'text-black',
          };
          return (
            <CungTooltip
              label={`${cung.canCung} ${cung.chiCung}`}
              content={
                <>
                  <p>Thiên can: <b>{cung.canCung}</b></p>
                  <p>Địa chi: <b>{cung.chiCung}</b></p>
                  <p>Ngũ hành cung: <b>{getNguHanhCung(cung.viTri)}</b></p>
                </>
              }
            >
              <span className={`font-semibold ${nguHanhColorClass[nguHanh]}`}>
                {canChar}.{cung.chiCung}
              </span>
            </CungTooltip>
          );
        })()}
        <div className="flex items-center gap-1">
          <CungTooltip
            label={cung.tenCungMenh}
            content={
              <>
                <p>{getCungMenhDesc(cung.tenCungMenh)}</p>
                {cung.isThan && <p className="mt-1 font-semibold text-zinc-800">☆ Cung này an Thân — ảnh hưởng lớn đến hậu vận.</p>}
              </>
            }
          >
            <span className="cung-name">{cung.tenCungMenh}</span>
          </CungTooltip>
          {cung.isThan && (
            <CungTooltip
              label="Thân cung"
              content={<p>Thân cư {cung.tenCungMenh} — quyết định hậu vận (sau 30 tuổi). Thân đồng cung Mệnh thì suốt đời nhất quán.</p>}
            >
              <span className="px-1 bg-primary text-primary-foreground text-[10px] font-semibold">
                Thân
              </span>
            </CungTooltip>
          )}
        </div>
        <CungTooltip
          label="Đại hạn"
          content={<p>Tuổi bắt đầu đại hạn tại cung này: <b>{cung.daiHan} tuổi</b>. Mỗi đại hạn kéo dài 10 năm.</p>}
        >
          <span className="font-semibold">{cung.daiHan}</span>
        </CungTooltip>
      </div>

      {/* Chính tinh - fixed 2 dòng */}
      <div className="flex flex-col items-center justify-center gap-0.5" style={{ height: '3rem', overflow: 'visible' }}>
        {cung.saoChinhTinh.length > 0 ? (
          cung.saoChinhTinh.map(sao => (
            <SaoDisplay key={sao.id} sao={sao} isChinhTinh />
          ))
        ) : (
          <VoChinhDieuTooltip cung={cung} />
        )}
      </div>

      {/* Sao phụ - 2 cột: Trái = Cát tinh (tốt), Phải = Hung tinh (xấu) */}
      {/* Ưu tiên sao quan trọng (semibold) lên trên */}
      <div className="flex flex-1 justify-between gap-2 px-1">
        <div className="flex flex-col items-start min-h-52">
          {cung.saoPhu
            .filter(sao => sao.isTot !== false)
            .sort((a, b) => {
              const aImportant = SAO_PHU_QUAN_TRONG.has(a.ten) ? 0 : 1;
              const bImportant = SAO_PHU_QUAN_TRONG.has(b.ten) ? 0 : 1;
              return aImportant - bImportant;
            })
            .map(sao => (
              <SaoDisplay key={sao.id} sao={sao} />
            ))}
        </div>
        <div className="flex flex-col items-start min-h-52">
          {cung.saoPhu
            .filter(sao => sao.isTot === false)
            .sort((a, b) => {
              const aImportant = SAO_PHU_QUAN_TRONG.has(a.ten) ? 0 : 1;
              const bImportant = SAO_PHU_QUAN_TRONG.has(b.ten) ? 0 : 1;
              return aImportant - bImportant;
            })
            .map(sao => (
              <SaoDisplay key={sao.id} sao={sao} />
            ))}
        </div>
      </div>

      {/* Footer: Tiểu Hạn Chi, Tràng sinh, Tháng */}
      <div className="cung-footer">
        <CungTooltip
          label="Tiểu hạn"
          content={<p>Tiểu hạn lưu niên tại cung <b>{cung.chiCung}</b> ({cung.tieuHan || cung.tenCung}).</p>}
        >
          <span>{cung.tieuHan || cung.tenCung}</span>
        </CungTooltip>
        <CungTooltip
          label="Tràng Sinh"
          content={
            <>
              <p className="font-semibold text-zinc-800">{cung.trangSinh}</p>
              <p className="mt-0.5">{getTrangSinhDesc(cung.trangSinh)}</p>
              <p className="mt-1 text-[10px] text-zinc-400">Vòng Tràng Sinh — 12 giai đoạn sinh vượng suy tuyệt của ngũ hành Cục.</p>
            </>
          }
        >
          <span className="font-semibold text-center">{cung.trangSinh}</span>
        </CungTooltip>
        <CungTooltip
          label="Nguyệt hạn"
          content={<p>Cung này ứng với <b>tháng {cung.nguyetHan || '-'}</b> (âm lịch) trong lưu nguyệt hạn.</p>}
        >
          <span className="font-semibold">T.{cung.nguyetHan || '-'}</span>
        </CungTooltip>
      </div>
    </div>
  );
}
