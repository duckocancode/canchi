import { useState } from 'react';
import type { LasoInput } from '../lib/canchi-engine';
import { solarToLunar, lunarToSolar } from '../lib/canchi-engine';

export interface FormValues {
  ten: string;
  gioiTinh: 'nam' | 'nu';
  ngay: number;
  thang: number;
  nam: number;
  isDuongLich: boolean;
  gio: number;
  namXem: number;
}

interface LasoFormProps {
  onSubmit: (input: LasoInput, formValues: FormValues) => void;
  initialValues?: FormValues;
}

export function LasoForm({ onSubmit, initialValues }: LasoFormProps) {
  const currentYear = new Date().getFullYear();
  
  const [ten, setTen] = useState(initialValues?.ten ?? 'Lá Số CanChi');
  const [gioiTinh, setGioiTinh] = useState<'nam' | 'nu'>(initialValues?.gioiTinh ?? 'nam');
  const [ngay, setNgay] = useState<number>(initialValues?.ngay ?? 1);
  const [thang, setThang] = useState<number>(initialValues?.thang ?? 1);
  const [nam, setNam] = useState<number>(initialValues?.nam ?? 1990);
  const [isDuongLich, setIsDuongLich] = useState(initialValues?.isDuongLich ?? true);
  const [gio, setGio] = useState(initialValues?.gio ?? 21);
  const [namXem, setNamXem] = useState(initialValues?.namXem ?? currentYear);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngay || !thang || !nam) {
      alert('Vui lòng nhập đầy đủ ngày sinh');
      return;
    }

    let ngayAm: number, thangAm: number, namAm: number;
    let ngayDuong: number | undefined, thangDuong: number | undefined, namDuong: number | undefined;

    // Tý muộn (23h) = đã bước qua ngày hôm sau → cần +1 ngày
    let adjNgay = ngay, adjThang = thang, adjNam = nam;
    if (gio === 23) {
      if (isDuongLich) {
        // +1 ngày dương lịch
        const d = new Date(nam, thang - 1, ngay);
        d.setDate(d.getDate() + 1);
        adjNgay = d.getDate();
        adjThang = d.getMonth() + 1;
        adjNam = d.getFullYear();
      } else {
        // Âm lịch → chuyển sang dương, +1 ngày, rồi chuyển lại âm
        const solar = lunarToSolar(ngay, thang, nam);
        const d = new Date(solar.year, solar.month - 1, solar.day);
        d.setDate(d.getDate() + 1);
        adjNgay = d.getDate();
        adjThang = d.getMonth() + 1;
        adjNam = d.getFullYear();
        // adjNgay/adjThang/adjNam giờ là dương lịch → sẽ convert lại bên dưới
      }
    }

    if (isDuongLich || (gio === 23 && !isDuongLich)) {
      // Chuyển dương lịch sang âm lịch (dùng ngày đã +1 nếu Tý muộn)
      const lunar = solarToLunar(adjNgay, adjThang, adjNam);
      ngayAm = lunar.ngayAm;
      thangAm = lunar.thangAm;
      namAm = lunar.namAm;
      // Giữ nguyên ngày dương gốc user nhập
      ngayDuong = ngay;
      thangDuong = thang;
      namDuong = nam;
      // Nếu âm lịch + Tý muộn → cần tính lại ngày dương gốc từ âm lịch gốc
      if (!isDuongLich) {
        const solar = lunarToSolar(ngay, thang, nam);
        ngayDuong = solar.day;
        thangDuong = solar.month;
        namDuong = solar.year;
      }
    } else {
      // Đã là âm lịch (không phải Tý muộn)
      ngayAm = ngay;
      thangAm = thang;
      namAm = nam;
      // Chuyển âm lịch sang dương lịch
      const solar = lunarToSolar(ngay, thang, nam);
      ngayDuong = solar.day;
      thangDuong = solar.month;
      namDuong = solar.year;
    }

    onSubmit({ ngayAm, thangAm, namAm, gio, gioiTinh, namXem, ngayDuong, thangDuong, namDuong },
      { ten, gioiTinh, ngay, thang, nam, isDuongLich, gio, namXem });
  };

  const gioOptions = [
    { value: 0, label: "Tý sớm (0h - 0h59)" },
    { value: 1, label: "Sửu (1h - 2h59)" },
    { value: 3, label: "Dần (3h - 4h59)" },
    { value: 5, label: "Mão (5h - 6h59)" },
    { value: 7, label: "Thìn (7h - 8h59)" },
    { value: 9, label: "Tỵ (9h - 10h59)" },
    { value: 11, label: "Ngọ (11h - 12h59)" },
    { value: 13, label: "Mùi (13h - 14h59)" },
    { value: 15, label: "Thân (15h - 16h59)" },
    { value: 17, label: "Dậu (17h - 18h59)" },
    { value: 19, label: "Tuất (19h - 20h59)" },
    { value: 21, label: "Hợi (21h - 22h59)" },
    { value: 23, label: "Tý muộn (23h - 23h59)" },
  ];

  // Generate year options (current year down to 1930)
  const yearOptions = Array.from({ length: currentYear - 1929 }, (_, i) => currentYear - i);
  // Năm xem: from current year + 20 down to 1930
  const viewYearOptions = Array.from({ length: currentYear + 20 - 1929 }, (_, i) => currentYear + 20 - i);

  const inputClass = "w-full h-11 px-4 py-2 border border-neutral-300 bg-white text-sm font-medium focus:outline-none focus:border-neutral-500 transition-colors";
  const selectClass = "w-full h-11 px-4 py-2 border border-neutral-300 bg-white text-sm font-medium focus:outline-none focus:border-neutral-500 cursor-pointer appearance-none";
  const labelClass = "text-sm font-medium text-neutral-700";

  return (
    <div className="bg-white border border-neutral-200 shadow-xl p-6 md:p-12">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-6 md:gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 w-full">
            
            {/* Họ và tên */}
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <label htmlFor="nameInput" className={labelClass}>Họ và tên</label>
              <input
                type="text"
                id="nameInput"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                placeholder="Họ và tên"
                className={inputClass}
              />
            </div>

            {/* Giới tính */}
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <label htmlFor="genderSelect" className={labelClass}>Giới tính</label>
              <div className="relative">
                <select
                  id="genderSelect"
                  value={gioiTinh}
                  onChange={(e) => setGioiTinh(e.target.value as 'nam' | 'nu')}
                  className={selectClass}
                >
                  <option value="nam">Nam</option>
                  <option value="nu">Nữ</option>
                </select>
                <ChevronIcon />
              </div>
            </div>

            {/* Ngày sinh */}
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <label className={labelClass}>Ngày sinh</label>
              <div className="grid grid-cols-3 gap-2">
                {/* Ngày */}
                <div className="relative">
                  <select
                    value={ngay}
                    onChange={(e) => setNgay(parseInt(e.target.value) || 1)}
                    required
                    className={selectClass}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
                
                {/* Tháng */}
                <div className="relative">
                  <select
                    value={thang}
                    onChange={(e) => setThang(parseInt(e.target.value) || 1)}
                    required
                    className={selectClass}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>

                {/* Năm */}
                <div className="relative">
                  <select
                    value={nam}
                    onChange={(e) => setNam(parseInt(e.target.value) || 1990)}
                    required
                    className={selectClass}
                  >
                    {yearOptions.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>
            </div>

            {/* Loại lịch */}
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <label htmlFor="calendarTypeSelect" className={labelClass}>Loại lịch</label>
              <div className="relative">
                <select
                  id="calendarTypeSelect"
                  value={isDuongLich ? 'duong' : 'am'}
                  onChange={(e) => setIsDuongLich(e.target.value === 'duong')}
                  className={selectClass}
                >
                  <option value="duong">Dương lịch</option>
                  <option value="am">Âm lịch</option>
                </select>
                <ChevronIcon />
              </div>
            </div>

            {/* Giờ sinh */}
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <label htmlFor="hourSelect" className={labelClass}>Giờ sinh</label>
              <div className="relative">
                <select
                  id="hourSelect"
                  value={gio}
                  onChange={(e) => setGio(parseInt(e.target.value))}
                  className={selectClass}
                >
                  {gioOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>

            {/* Năm xem */}
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <label htmlFor="viewYearSelect" className={labelClass}>Năm xem</label>
              <div className="relative">
                <select
                  id="viewYearSelect"
                  value={namXem}
                  onChange={(e) => setNamXem(parseInt(e.target.value) || currentYear)}
                  className={selectClass}
                >
                  {viewYearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex justify-center items-center font-semibold transition-all duration-300 bg-neutral-900 text-white h-11 md:h-14 w-40 md:w-80 gap-2 md:gap-3 hover:bg-neutral-700"
            >
              <span className="md:text-lg">Xem kết quả</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-current h-4 w-4">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
      </svg>
    </div>
  );
}
