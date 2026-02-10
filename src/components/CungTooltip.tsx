import { useState, useRef, type ReactNode } from 'react';

interface CungTooltipProps {
  label: string;
  content: ReactNode;
  children: ReactNode;
}

/**
 * Generic tooltip for header/footer elements in a cung cell.
 * Follows the same hover pattern as SaoTooltip.
 */
export function CungTooltip({ label, content, children }: CungTooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 160 ? 'bottom' : 'top');
    }
    setShow(true);
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`cung-tooltip ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          {/* Arrow */}
          <div
            className={`absolute left-4 w-2 h-2 bg-white border-zinc-300 transform rotate-45 ${
              position === 'top'
                ? 'bottom-[-5px] border-b border-r'
                : 'top-[-5px] border-t border-l'
            }`}
          />

          <div className="font-bold text-xs text-zinc-900 mb-1">{label}</div>
          <div className="text-[11px] text-zinc-600 leading-relaxed">{content}</div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// Tooltip data / helpers cho Header & Footer
// ================================================================

const CUNG_MENH_DESC: Record<string, string> = {
  'Mệnh': 'Bản mệnh — tính cách, ngoại hình, tư chất, vận mệnh tổng quát cả đời. Là cung quan trọng nhất trong lá số, quyết định cách người đó sống và hành xử.',
  'Phụ mẫu': 'Cha mẹ — quan hệ với song thân, sự giáo dục, gia phong, mức độ được phụ mẫu che chở. Cũng xem phong cách lãnh đạo/cấp trên.',
  'Phúc đức': 'Phúc đức — phúc phần tổ tiên để lại, đời sống tinh thần, tâm linh, tuổi thọ. Cung tốt thì hưởng phúc ấm, xấu thì nghiệp nặng.',
  'Điền trạch': 'Điền trạch — nhà cửa, bất động sản, tài sản cố định, nơi cư trú. Xem được hay mất nhà, có của để dành không.',
  'Quan lộc': 'Quan lộc — sự nghiệp, công danh, nghề nghiệp, con đường sự nghiệp. Xem làm quan hay buôn bán, thăng tiến hay trì trệ.',
  'Nô bộc': 'Nô bộc (Giao hữu) — bạn bè, thuộc hạ, đồng nghiệp, mối quan hệ xã hội. Xem có quý nhân giúp đỡ hay bị tiểu nhân hại.',
  'Thiên di': 'Thiên di — hoạt động bên ngoài, xuất ngoại, di chuyển, giao tế xã hội. Xem vận may khi rời nhà, có nên đi xa lập nghiệp không.',
  'Tật ách': 'Tật ách — sức khoẻ, bệnh tật, tai nạn, thể chất. Xem bệnh gì hay mắc, phần nào trên cơ thể yếu, có tai ương không.',
  'Tài bạch': 'Tài bạch — tiền bạc, thu nhập, cách kiếm tiền, vận tài chính. Xem giàu nghèo, tiền vào nhiều hay ít, giữ được hay hao tán.',
  'Tử tức': 'Tử tức — con cái, hậu duệ, khả năng sinh sản, quan hệ với con. Cũng xem năng lực sáng tạo, đào hoa, tình dục.',
  'Phu thê': 'Phu thê — hôn nhân, vợ/chồng, đối tác tình cảm. Xem sớm hay muộn, hạnh phúc hay lận đận, đặc điểm người phối ngẫu.',
  'Huynh đệ': 'Huynh đệ — anh chị em, bạn cùng trang lứa, đồng nghiệp ngang hàng. Xem tình cảm anh em, có giúp đỡ nhau không.',
};

const TRANG_SINH_DESC: Record<string, string> = {
  'Tràng sinh': 'Khởi đầu mạnh mẽ, sinh sôi, phát triển.',
  'Mộc dục': 'Giai đoạn tắm rửa, thay đổi, bất ổn nhẹ.',
  'Quan đới': 'Đội mũ áo, bắt đầu ra đời, trưởng thành.',
  'Lâm quan': 'Gần ngưỡng thành tựu, vững vàng.',
  'Đế vượng': 'Cực thịnh, đỉnh cao năng lượng.',
  'Suy': 'Bắt đầu suy giảm, cần cẩn trọng.',
  'Bệnh': 'Sức lực yếu, dễ gặp trở ngại.',
  'Tử': 'Ngưng trệ, khó tiến triển.',
  'Mộ': 'Cất giấu, tiềm ẩn, tích lũy.',
  'Tuyệt': 'Kết thúc một chu kỳ, cạn kiệt.',
  'Thai': 'Manh nha, bắt đầu hình thành mới.',
  'Dưỡng': 'Nuôi dưỡng, chuẩn bị cho chu kỳ mới.',
};

const NGU_HANH_LABEL: Record<string, string> = {
  'kim': 'Kim',
  'moc': 'Mộc',
  'thuy': 'Thủy',
  'hoa': 'Hỏa',
  'tho': 'Thổ',
};

const CUNG_NGU_HANH_MAP: Record<number, string> = {
  1: 'thuy', 2: 'tho', 3: 'moc', 4: 'moc', 5: 'tho', 6: 'hoa',
  7: 'hoa', 8: 'tho', 9: 'kim', 10: 'kim', 11: 'tho', 12: 'thuy',
};

// eslint-disable-next-line react-refresh/only-export-components
export function getCungMenhDesc(tenCungMenh: string): string {
  return CUNG_MENH_DESC[tenCungMenh] || '';
}

// eslint-disable-next-line react-refresh/only-export-components
export function getTrangSinhDesc(trangSinh: string): string {
  return TRANG_SINH_DESC[trangSinh] || '';
}

// eslint-disable-next-line react-refresh/only-export-components
export function getNguHanhCung(viTri: number): string {
  const key = CUNG_NGU_HANH_MAP[viTri];
  return key ? NGU_HANH_LABEL[key] || '' : '';
}
