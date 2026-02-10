/**
 * Dữ liệu mô tả các sao - dùng cho Tooltip
 */

export interface SaoInfo {
  ten: string;
  loai: 'chinh_tinh' | 'phu_tinh' | 'tu_hoa' | 'trang_sinh' | 'luu_nien';
  nguHanh: string;
  amDuong: 'Dương' | 'Âm' | '';
  moTa: string;
  yNghia: string;
}

const NGU_HANH_LABEL: Record<string, string> = {
  hoa: 'Hỏa 🔥',
  moc: 'Mộc 🌳',
  tho: 'Thổ 🏔️',
  kim: 'Kim ⚔️',
  thuy: 'Thủy 💧',
};

const DAC_TINH_LABEL: Record<string, { ten: string; moTa: string }> = {
  M: { ten: 'Miếu', moTa: 'Sao ở vị trí tốt nhất, phát huy tối đa sức mạnh' },
  V: { ten: 'Vượng', moTa: 'Sao ở vị trí mạnh, năng lượng dồi dào' },
  D: { ten: 'Đắc', moTa: 'Sao ở vị trí khá, có thể phát huy được' },
  H: { ten: 'Hãm', moTa: 'Sao ở vị trí yếu, giảm sức mạnh đáng kể' },
  B: { ten: 'Bình', moTa: 'Sao ở vị trí trung bình, không tốt không xấu' },
};

export function getDacTinhInfo(dacTinh: string) {
  return DAC_TINH_LABEL[dacTinh];
}

export function getNguHanhLabel(nguHanh: string) {
  return NGU_HANH_LABEL[nguHanh] || nguHanh;
}

// Mô tả ngắn gọn cho từng sao
const SAO_MO_TA: Record<string, { moTa: string; yNghia: string; loai: string; amDuong: string }> = {
  // ===== 14 CHÍNH TINH =====
  "Tử Vi": {
    moTa: "Đế tinh, chúa tể trung thiên. Sao đứng đầu trong hệ thống Tử Vi.",
    yNghia: "Quyền lực, lãnh đạo, cao quý, uy phong. Quý nhân phù trợ.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Thiên Cơ": {
    moTa: "Sao trí tuệ, mưu lược, thiện biến.",
    yNghia: "Thông minh, linh hoạt, tài mưu lược. Giỏi tính toán, phân tích.",
    loai: "chinh_tinh", amDuong: "Âm"
  },
  "Thái Dương": {
    moTa: "Sao Mặt trời, ánh sáng, quang minh.",
    yNghia: "Quang minh, chính trực, bác ái. Chủ về danh tiếng, sự nghiệp.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Vũ Khúc": {
    moTa: "Sao tài tinh, chủ về tài chính, võ nghệ.",
    yNghia: "Tài năng, quyết đoán, cương nghị. Giỏi kiếm tiền, quản lý tài chính.",
    loai: "chinh_tinh", amDuong: "Âm"
  },
  "Thiên Đồng": {
    moTa: "Sao phúc tinh, chủ hưởng thụ, an nhàn.",
    yNghia: "Phúc lộc, an nhàn, hòa nhã. Đời sống thanh thản, ít lo lắng.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Liêm Trinh": {
    moTa: "Sao thứ phi, lưỡng diện. Vừa quý vừa sát.",
    yNghia: "Đa tài, sắc sảo, quyến rũ. Có tính hai mặt, cần cẩn trọng.",
    loai: "chinh_tinh", amDuong: "Âm"
  },
  "Thiên Phủ": {
    moTa: "Sao kho lẫm, chủ kho tàng, của cải.",
    yNghia: "Giàu có, sung túc, ổn định. Giỏi tích trữ, quản lý tài sản.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Thái Âm": {
    moTa: "Sao Mặt trăng, chủ âm nhu, điền sản.",
    yNghia: "Thanh tú, nhu mì, chu đáo. Chủ về bất động sản, tài sản âm.",
    loai: "chinh_tinh", amDuong: "Âm"
  },
  "Tham Lang": {
    moTa: "Sao đào hoa, đa tài đa nghệ.",
    yNghia: "Tài hoa, giao tiếp tốt, ham muốn. Đa dạng tài năng nhưng dễ tham vọng.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Cự Môn": {
    moTa: "Sao ám tinh, chủ khẩu thiệt, thị phi.",
    yNghia: "Ăn nói, tranh biện, thị phi. Giỏi giao tiếp nhưng hay gây mâu thuẫn.",
    loai: "chinh_tinh", amDuong: "Âm"
  },
  "Thiên Tướng": {
    moTa: "Sao ấn tinh, chủ chính trực, quý nhân.",
    yNghia: "Chính trực, phúc hậu, có quý nhân. Được người giúp đỡ.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Thiên Lương": {
    moTa: "Sao ấm tinh, chủ bóng mát, che chở.",
    yNghia: "Nhân từ, che chở, phúc thọ. Hay giúp đỡ người khác.",
    loai: "chinh_tinh", amDuong: "Âm"
  },
  "Thất Sát": {
    moTa: "Sao sát tinh, uy quyền, chiến đấu.",
    yNghia: "Uy quyền, quyết đoán, mạnh mẽ. Dám nghĩ dám làm, chịu áp lực.",
    loai: "chinh_tinh", amDuong: "Dương"
  },
  "Phá Quân": {
    moTa: "Sao hao tinh, phá cũ lập mới.",
    yNghia: "Đổi mới, phá cách, biến động. Hay thay đổi, cải cách mạnh mẽ.",
    loai: "chinh_tinh", amDuong: "Âm"
  },

  // ===== PHỤ TINH QUAN TRỌNG =====
  "Tả Phù": {
    moTa: "Trợ tinh bên trái, phù trợ chúa tinh.",
    yNghia: "Quý nhân phù trợ, nhiều bạn bè, được giúp đỡ.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Hữu Bật": {
    moTa: "Trợ tinh bên phải, phù trợ chúa tinh.",
    yNghia: "Quý nhân phù trợ, được bề trên nâng đỡ.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Văn Xương": {
    moTa: "Sao văn chương, học vấn.",
    yNghia: "Thông minh, học giỏi, có tài văn chương, thi cử đỗ đạt.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Văn Khúc": {
    moTa: "Sao nghệ thuật, tài hoa.",
    yNghia: "Tài hoa, nghệ thuật, khéo léo, giỏi giao tiếp.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Thiên Khôi": {
    moTa: "Quý nhân dương, sao dẫn đường.",
    yNghia: "Gặp quý nhân giúp đỡ, may mắn, thuận lợi trong sự nghiệp.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Thiên Việt": {
    moTa: "Quý nhân âm, sao hỗ trợ.",
    yNghia: "Được quý nhân âm thầm giúp đỡ, gặp may trong nguy.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Lộc Tồn": {
    moTa: "Sao tài lộc chính, giữ lộc.",
    yNghia: "Tài lộc bền vững, giữ tiền giỏi. Giàu có ổn định.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Thiên Mã": {
    moTa: "Sao di chuyển, vận động.",
    yNghia: "Di chuyển nhiều, năng động, thay đổi. Hợp kinh doanh, xuất ngoại.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Kình Dương": {
    moTa: "Sao sát tinh, cương cường.",
    yNghia: "Cương quyết, bướng bỉnh, dễ va chạm. Có thể gây tai nạn, tranh chấp.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Đà La": {
    moTa: "Sao sát tinh, kéo lùi, cản trở.",
    yNghia: "Chậm trễ, cản trở, lề mề. Nhưng cũng chính xác, cẩn thận.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Hỏa Tinh": {
    moTa: "Sao sát tinh, nóng nảy, bùng phát.",
    yNghia: "Nóng nảy, bốc đồng, tai họa bất ngờ. Nhưng cũng mạnh mẽ, quyết liệt.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Linh Tinh": {
    moTa: "Sao sát tinh, âm ỉ, kéo dài.",
    yNghia: "Lo lắng, âu sầu, tai họa âm thầm. Bền bỉ nhưng dễ lo âu.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Địa Không": {
    moTa: "Không vong tinh, trống rỗng.",
    yNghia: "Mất mát, hao tổn, không có gì. Nhưng cũng sáng tạo, triết học.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Địa Kiếp": {
    moTa: "Kiếp nạn tinh, tai họa.",
    yNghia: "Tai nạn, kiếp nạn, mất mát bất ngờ. Biến động mạnh.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Hồng Loan": {
    moTa: "Sao đào hoa chính, hôn nhân.",
    yNghia: "Duyên số, hôn nhân, tình cảm thuận lợi. Sắc đẹp, duyên dáng.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Thiên Hỷ": {
    moTa: "Sao vui mừng, hỷ tín.",
    yNghia: "Tin vui, hỷ sự, may mắn. Có thể báo hiệu đám cưới, sinh con.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Thiên Không": {
    moTa: "Sao không vong, trống rỗng trên trời.",
    yNghia: "Không thực tế, ảo tưởng. Nhưng giỏi sáng tạo, triết học, tôn giáo.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Thiên Hình": {
    moTa: "Sao hình phạt, kỷ luật.",
    yNghia: "Kỷ luật, nghiêm khắc, hình phạt. Hợp với ngành luật, công an.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Cô Thần": {
    moTa: "Sao cô đơn dương, lẻ loi.",
    yNghia: "Cô đơn, lẻ loi, thiếu bạn đời. Nhưng cũng độc lập, tự chủ.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Quả Tú": {
    moTa: "Sao cô đơn âm, góa bụa.",
    yNghia: "Cô quạnh, thiếu bạn đời. Nhưng cũng thanh cao, tự lập.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Thiên Diêu": {
    moTa: "Sao đào hoa loạn, dâm dục.",
    yNghia: "Quyến rũ, đào hoa, tình ái phức tạp. Nghệ thuật, giải trí.",
    loai: "phu_tinh", amDuong: ""
  },
  "Đào Hoa": {
    moTa: "Sao đào hoa, sắc đẹp, duyên dáng.",
    yNghia: "Duyên dáng, quyến rũ, giao tiếp tốt. Nghệ thuật, giải trí.",
    loai: "phu_tinh", amDuong: "Dương"
  },

  // ===== TỨ HÓA =====
  "Hóa Lộc": {
    moTa: "Tứ hóa: Lộc. Tài lộc, may mắn.",
    yNghia: "Tài lộc dồi dào, cơ hội kiếm tiền, sự nghiệp thuận lợi.",
    loai: "tu_hoa", amDuong: "Dương"
  },
  "Hóa Quyền": {
    moTa: "Tứ hóa: Quyền. Quyền lực, làm chủ.",
    yNghia: "Quyền lực, uy tín, khả năng lãnh đạo, kiểm soát.",
    loai: "tu_hoa", amDuong: "Dương"
  },
  "Hóa Khoa": {
    moTa: "Tứ hóa: Khoa. Danh tiếng, học vấn.",
    yNghia: "Danh tiếng, học vấn, thi đỗ, được nể trọng.",
    loai: "tu_hoa", amDuong: "Dương"
  },
  "Hóa Kỵ": {
    moTa: "Tứ hóa: Kỵ. Trở ngại, thị phi.",
    yNghia: "Trở ngại, phiền não, thị phi, tranh chấp. Cần cẩn trọng.",
    loai: "tu_hoa", amDuong: "Âm"
  },

  // ===== CÁC SAO PHỤ KHÁC =====
  "Thái Tuế": {
    moTa: "Sao tuế, kiện cáo.",
    yNghia: "Kiện tụng, thị phi, quan sự. Năm không thuận lợi.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tang Môn": {
    moTa: "Sao tang, buồn thương.",
    yNghia: "Tang tóc, buồn phiền, mất mát người thân.",
    loai: "phu_tinh", amDuong: ""
  },
  "Bạch Hổ": {
    moTa: "Sao hung bạo, tai nạn.",
    yNghia: "Tai nạn, máu me, phẫu thuật. Nhưng cũng uy quyền.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên La": {
    moTa: "Lưới trời, ràng buộc trên.",
    yNghia: "Bị ràng buộc, khó thoát, trở ngại từ trên.",
    loai: "phu_tinh", amDuong: ""
  },
  "Địa Võng": {
    moTa: "Lưới đất, ràng buộc dưới.",
    yNghia: "Bị ràng buộc, khó thoát, trở ngại từ dưới.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Thọ": {
    moTa: "Sao trường thọ.",
    yNghia: "Sống lâu, sức khỏe tốt, phúc thọ.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Tài": {
    moTa: "Sao tài năng thiên bẩm.",
    yNghia: "Tài năng bẩm sinh, khéo léo, sáng tạo.",
    loai: "phu_tinh", amDuong: ""
  },
  "Quốc Ấn": {
    moTa: "Sao ấn triện, quyền chức.",
    yNghia: "Có chức vụ, được phong tước, quyền hành chính thức.",
    loai: "phu_tinh", amDuong: ""
  },
  "Phong Cáo": {
    moTa: "Sao sắc phong, vinh hiển.",
    yNghia: "Được phong thưởng, khen ngợi, danh hiệu.",
    loai: "phu_tinh", amDuong: ""
  },
  "Đường Phù": {
    moTa: "Sao quyền thế, quan chức.",
    yNghia: "Có quyền thế, được bổ nhiệm, thăng chức.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thai Phụ": {
    moTa: "Sao phụ tá, hỗ trợ.",
    yNghia: "Được hỗ trợ, giúp đỡ trong học vấn và sự nghiệp.",
    loai: "phu_tinh", amDuong: ""
  },
  "Hoa Cái": {
    moTa: "Sao nghệ thuật, thanh cao.",
    yNghia: "Nghệ thuật, thanh cao, tôn giáo. Có phong cách riêng.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Y": {
    moTa: "Sao y dược, chữa bệnh.",
    yNghia: "Giỏi y dược, chữa bệnh, sức khỏe tốt.",
    loai: "phu_tinh", amDuong: ""
  },
  "Kiếp Sát": {
    moTa: "Sao kiếp nạn, cướp bóc.",
    yNghia: "Kiếp nạn, bị cướp, tai họa bất ngờ.",
    loai: "phu_tinh", amDuong: ""
  },
  "Phá Toái": {
    moTa: "Sao phá hoại nhỏ.",
    yNghia: "Phá hoại, hao tổn nhỏ, bất ổn.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Đức": {
    moTa: "Sao phúc đức trời cho.",
    yNghia: "Phúc đức, may mắn, được trời phù hộ.",
    loai: "phu_tinh", amDuong: ""
  },
  "Nguyệt Đức": {
    moTa: "Sao phúc đức mẹ.",
    yNghia: "Phúc từ mẹ, may mắn, duyên lành.",
    loai: "phu_tinh", amDuong: ""
  },
  "Long Trì": {
    moTa: "Sao rồng, quý tộc.",
    yNghia: "Cao quý, được quý nhân giúp, tài lộc.",
    loai: "phu_tinh", amDuong: ""
  },
  "Phượng Các": {
    moTa: "Sao phượng, vinh hoa.",
    yNghia: "Vinh hoa, phú quý, danh vọng cao.",
    loai: "phu_tinh", amDuong: ""
  },
  "Long Đức": {
    moTa: "Sao đức của rồng.",
    yNghia: "Nhân đức, phúc lộc, được kính trọng.",
    loai: "phu_tinh", amDuong: ""
  },
  "Ân Quang": {
    moTa: "Sao ân huệ, sáng suốt.",
    yNghia: "Ân huệ, phúc phận, được giúp đỡ.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Quý": {
    moTa: "Sao quý nhân trời.",
    yNghia: "Quý nhân, may mắn, cao sang.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Quan": {
    moTa: "Sao quan chức.",
    yNghia: "Có chức vụ, quyền hành, sự nghiệp hanh thông.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Phúc": {
    moTa: "Sao phúc trời.",
    yNghia: "Phúc lộc, may mắn, trời cho phúc.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tam Thai": {
    moTa: "Sao tam tài.",
    yNghia: "Văn chương, thi đỗ, học vấn cao.",
    loai: "phu_tinh", amDuong: ""
  },
  "Bát Tọa": {
    moTa: "Sao bát vị.",
    yNghia: "Văn chương, chức vụ, học hành giỏi.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Trù": {
    moTa: "Sao bếp trời, ẩm thực.",
    yNghia: "Ẩm thực, no đủ, phúc lộc ăn uống.",
    loai: "phu_tinh", amDuong: ""
  },
  "Giải Thần": {
    moTa: "Sao giải nạn.",
    yNghia: "Giải trừ hung xấu, hóa giải tai nạn.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Giải": {
    moTa: "Sao giải nạn trời.",
    yNghia: "Giải trừ tai họa, may mắn thoát nạn.",
    loai: "phu_tinh", amDuong: ""
  },
  "Địa Giải": {
    moTa: "Sao giải nạn đất.",
    yNghia: "Giải trừ tai họa, bình an.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tấu Thư": {
    moTa: "Sao tấu sớ, giấy tờ.",
    yNghia: "Văn bản, giấy tờ thuận lợi, thi đỗ.",
    loai: "phu_tinh", amDuong: ""
  },
  "Bác Sĩ": {
    moTa: "Sao bác học, hiểu biết.",
    yNghia: "Hiểu biết rộng, thông thái, học vấn.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Lực Sĩ": {
    moTa: "Sao sức mạnh.",
    yNghia: "Sức mạnh, cường tráng, làm việc tốt.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thanh Long": {
    moTa: "Sao rồng xanh, hỷ sự.",
    yNghia: "Vui mừng, may mắn, tài lộc.",
    loai: "phu_tinh", amDuong: ""
  },
  "Phúc Đức": {
    moTa: "Sao phúc đức.",
    yNghia: "Phúc đức dồi dào, may mắn.",
    loai: "phu_tinh", amDuong: ""
  },
  "Hỷ Thần": {
    moTa: "Sao thần vui.",
    yNghia: "Vui vẻ, hạnh phúc, gặp niềm vui.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiếu Dương": {
    moTa: "Sao dương nhỏ.",
    yNghia: "Sáng sủa, vui vẻ, may mắn.",
    loai: "phu_tinh", amDuong: "Dương"
  },
  "Thiếu Âm": {
    moTa: "Sao âm nhỏ.",
    yNghia: "Hiền lành, duyên dáng, phúc lộc.",
    loai: "phu_tinh", amDuong: "Âm"
  },
  "Quan Phù": {
    moTa: "Sao quan tụng.",
    yNghia: "Kiện tụng, tranh chấp, quan sự.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tử Phù": {
    moTa: "Sao bệnh tật.",
    yNghia: "Bệnh tật, ốm đau, sức khỏe kém.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tuế Phá": {
    moTa: "Sao phá tuế.",
    yNghia: "Phá hoại, hao tổn, bất ổn.",
    loai: "phu_tinh", amDuong: ""
  },
  "Điếu Khách": {
    moTa: "Sao viếng tang.",
    yNghia: "Tang tóc, buồn thương, viếng tang.",
    loai: "phu_tinh", amDuong: ""
  },
  "Trực Phù": {
    moTa: "Sao trực, cứng rắn.",
    yNghia: "Cứng rắn, hay va chạm, tranh chấp.",
    loai: "phu_tinh", amDuong: ""
  },
  "Bệnh Phù": {
    moTa: "Sao bệnh.",
    yNghia: "Bệnh tật, ốm đau.",
    loai: "phu_tinh", amDuong: ""
  },
  "Đại Hao": {
    moTa: "Sao hao tổn lớn.",
    yNghia: "Hao tổn tài chính lớn, chi tiêu nhiều.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tiểu Hao": {
    moTa: "Sao hao tổn nhỏ.",
    yNghia: "Hao tổn nhỏ, chi tiêu vặt.",
    loai: "phu_tinh", amDuong: ""
  },
  "Phục Binh": {
    moTa: "Sao phục kích.",
    yNghia: "Bị phục kích, âm mưu, tiểu nhân.",
    loai: "phu_tinh", amDuong: ""
  },
  "Quan Phủ": {
    moTa: "Sao quan hình.",
    yNghia: "Quan sự, hình phạt, kiện tụng.",
    loai: "phu_tinh", amDuong: ""
  },
  "Phi Liêm": {
    moTa: "Sao bay nhanh.",
    yNghia: "Biến động nhanh, bất ổn, tai bay vạ gió.",
    loai: "phu_tinh", amDuong: ""
  },
  "Tướng Quân": {
    moTa: "Sao tướng, chỉ huy.",
    yNghia: "Uy quyền, lãnh đạo, nhưng cũng cương ngạnh.",
    loai: "phu_tinh", amDuong: ""
  },
  "Đẩu Quân": {
    moTa: "Sao quân đấu.",
    yNghia: "Tranh đấu, cạnh tranh, áp lực.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Thương": {
    moTa: "Sao thương tích.",
    yNghia: "Thương tích, tai nạn, đau đớn.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Sứ": {
    moTa: "Sao sứ giả.",
    yNghia: "Tin tức, thông báo, nhưng cũng bệnh tật.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Hư": {
    moTa: "Sao trống rỗng.",
    yNghia: "Hao hụt, trống rỗng, mất mát.",
    loai: "phu_tinh", amDuong: ""
  },
  "Thiên Khốc": {
    moTa: "Sao khóc.",
    yNghia: "Buồn thương, khóc lóc, tang tóc.",
    loai: "phu_tinh", amDuong: ""
  },
  "Lưu Hà": {
    moTa: "Sao tai nạn nước.",
    yNghia: "Tai nạn liên quan nước, đuối nước.",
    loai: "phu_tinh", amDuong: ""
  },

  // ===== SAO LƯU NIÊN =====
  "L. Thái Tuế": {
    moTa: "Sao lưu niên, kích hoạt mọi sao tại cung. Trung tính.",
    yNghia: "Thị phi, tranh chấp, kiện tụng, biến động lớn. Tốt xấu tùy sao đi kèm.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Tang Môn": {
    moTa: "Sao lưu niên tang tóc, ốm đau.",
    yNghia: "Tang chế, buồn phiền, ốm đau. Gặp sát tinh thêm rất nguy hiểm.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Bạch Hổ": {
    moTa: "Sao lưu niên tai ương, hung hại.",
    yNghia: "Tai nạn, đổ máu, phẫu thuật. Bất lợi cả thể chất, tinh thần, tiền bạc.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Lộc Tồn": {
    moTa: "Sao lưu niên tài lộc, may mắn.",
    yNghia: "Gia phúc, giáng lộc cho cung an tọa. Gặp Thiên Mã thành Lộc Mã giao trì, rất tốt.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Kình Dương": {
    moTa: "Sao lưu niên sát tinh, trực tiếp phá hoại.",
    yNghia: "Tai nạn, xô xát, cản trở thăng tiến. Xung chiếu càng mạnh hơn đồng cung.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Đà La": {
    moTa: "Sao lưu niên sát tinh, ngấm ngầm phá hoại.",
    yNghia: "Ốm đau, lừa gạt, tiểu nhân ném đá giấu tay. Gây hại gián tiếp, thâm hiểm.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Thiên Mã": {
    moTa: "Sao lưu niên di chuyển, thay đổi.",
    yNghia: "Di chuyển, đổi việc, xuất ngoại, thay đổi liên quan cung an tọa. Gặp Lộc rất tốt, kỵ Đà La và Tang Môn.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Đào Hoa": {
    moTa: "Sao lưu niên đào hoa, tình duyên.",
    yNghia: "Tình cảm, duyên mới, hỷ sự. Hợp chiếu Mệnh/Phu Thê dễ có tin vui.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Kiếp Sát": {
    moTa: "Sao lưu niên kiếp nạn.",
    yNghia: "Kiếp nạn, cướp bóc, tai họa bất ngờ trong năm.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Thiên Khốc": {
    moTa: "Sao lưu niên tiếng khóc, buồn phiền.",
    yNghia: "Buồn phiền, khóc than, sụp đổ. Đắc địa ở Tý/Ngọ thì chủ vang danh, nổi tiếng.",
    loai: "luu_nien", amDuong: ""
  },
  "L. Thiên Hư": {
    moTa: "Sao lưu niên trống rỗng, mối mọt.",
    yNghia: "Hao hụt, tiêu cực, mục ruỗng. Gặp Tang Môn, Bạch Hổ rất xấu.",
    loai: "luu_nien", amDuong: ""
  },
  "LN Văn Tinh": {
    moTa: "Sao lưu niên văn chương, học vấn.",
    yNghia: "Học hành, thi cử, văn bằng chứng chỉ trong năm.",
    loai: "luu_nien", amDuong: ""
  },
};

/**
 * Lấy thông tin mô tả sao
 */
export function getSaoMoTa(tenSao: string): { moTa: string; yNghia: string; loai: string; amDuong: string } | null {
  return SAO_MO_TA[tenSao] || null;
}
