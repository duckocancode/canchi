// Quick test for Tràng Sinh
const TRANG_SINH_NAMES = [
  "Tràng sinh", "Mộc dục", "Quan đới", "Lâm quan", "Đế vượng", "Suy",
  "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"
];

const TRANG_SINH_START = { 2: 9, 3: 12, 4: 6, 5: 9, 6: 3 };

const CHI_NAMES = {1:'Tý',2:'Sửu',3:'Dần',4:'Mão',5:'Thìn',6:'Tỵ',7:'Ngọ',8:'Mùi',9:'Thân',10:'Dậu',11:'Tuất',12:'Hợi'};

function tinhTrangSinh(cuc, cung, isNam, isDuongNam) {
  const isThuan = (isNam && isDuongNam) || (!isNam && !isDuongNam);
  const start = TRANG_SINH_START[cuc];
  const dir = isThuan ? 1 : -1;
  const idx = ((cung - start) * dir + 120) % 12;
  return TRANG_SINH_NAMES[idx];
}

// 3/5/2000, tháng 4 AL, Canh Thìn, giờ Tý muộn
// canNam=7 (Canh), isDuongNam=true, cungMenh=6 (Tỵ), cuc=4 (Kim tứ)
const cuc = 4;
console.log("=== Kim tứ cục, NAM, Dương ===");
for (let i = 1; i <= 12; i++) {
  console.log(`Cung ${i} (${CHI_NAMES[i]}): ${tinhTrangSinh(cuc, i, true, true)}`);
}
console.log("\n=== Kim tứ cục, NỮ, Dương ===");
for (let i = 1; i <= 12; i++) {
  console.log(`Cung ${i} (${CHI_NAMES[i]}): ${tinhTrangSinh(cuc, i, false, true)}`);
}
