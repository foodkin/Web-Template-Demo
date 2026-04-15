export type Template = {
    id: number;
    title: string;
    category: string;
    desc: string;
    badge: string;
    pages: number;
    price: number; 
    headerBg: string;
    headerAccent: string;
    thumb: { w: string; h: string; bg: string; br: string }[];
    features: string[];
    tags: string[];
    livePreviewUrl?: string;
};

export const allTemplates: Template[] = [
    {
        id: 1,
        title: 'Ekspor Nusantara',
        category: 'Ekspor',
        desc: 'Tampilan tegas dan terpercaya untuk bisnis ekspor skala internasional. Dilengkapi halaman produk, portofolio, dan form inquiry.',
        badge: 'Terlaris',
        pages: 10,
        price: 97,
        headerBg: '#FFF7ED',
        headerAccent: '#EA580C',
        thumb: [
            { w: '65%', h: '10px', bg: '#EA580C', br: '4px' },
            { w: '45%', h: '8px', bg: '#EA580C40', br: '4px' },
            { w: '100%', h: '50px', bg: '#EA580C0D', br: '8px' },
            { w: '50%', h: '32px', bg: '#EA580C', br: '6px' },
        ],
        features: ['Landing Page', 'Produk Katalog', 'Form Inquiry', 'Tentang Kami', 'Blog'],
        tags: ['ekspor', 'bisnis', 'internasional', 'B2B'],
        livePreviewUrl: '/templates/template-1/index.html',
    },
    {
        id: 2,
        title: 'Global Trade Pro',
        category: 'Ekspor',
        desc: 'Desain modern untuk perusahaan ekspor impor dengan pasar global. Profesional dan mudah dikustomisasi.',
        badge: 'Featured',
        pages: 9,
        price: 127,
        headerBg: '#FEF3C7',
        headerAccent: '#D97706',
        thumb: [
            { w: '55%', h: '10px', bg: '#D97706', br: '4px' },
            { w: '75%', h: '8px', bg: '#D9770640', br: '4px' },
            { w: '100%', h: '52px', bg: '#D977060D', br: '8px' },
            { w: '45%', h: '32px', bg: '#D97706', br: '6px' },
        ],
        features: ['Landing Page', 'Portofolio Ekspor', 'Kontak & Peta', 'Multi-bahasa', 'FAQ'],
        tags: ['ekspor', 'impor', 'global', 'perdagangan'],
        livePreviewUrl: '/templates/template-2/index.html',
    },
    {
        id: 3,
        title: 'Company Profile Pro',
        category: 'Perusahaan',
        desc: 'Tampilan korporat profesional yang membangun kepercayaan klien dan investor. Ideal untuk PT dan CV.',
        badge: 'Populer',
        pages: 12,
        price: 147,
        headerBg: '#F0EBF8',
        headerAccent: '#2E1065',
        thumb: [
            { w: '50%', h: '10px', bg: '#2E1065', br: '4px' },
            { w: '70%', h: '8px', bg: '#2E106530', br: '4px' },
            { w: '100%', h: '48px', bg: '#2E10650A', br: '8px' },
            { w: '40%', h: '32px', bg: '#2E1065', br: '6px' },
        ],
        features: ['Profil Perusahaan', 'Tim & Struktur', 'Layanan', 'Klien & Partner', 'Karir'],
        tags: ['company', 'profile', 'korporat', 'PT', 'CV'],
    },
    {
        id: 4,
        title: 'Corporate Elegance',
        category: 'Perusahaan',
        desc: 'Desain elegan dan modern untuk company profile skala enterprise. Tampilan premium dengan animasi halus.',
        badge: 'Baru',
        pages: 14,
        price: 197,
        headerBg: '#EEE9F6',
        headerAccent: '#6D28D9',
        thumb: [
            { w: '60%', h: '10px', bg: '#6D28D9', br: '4px' },
            { w: '40%', h: '8px', bg: '#6D28D930', br: '4px' },
            { w: '100%', h: '50px', bg: '#6D28D90A', br: '8px' },
            { w: '44%', h: '32px', bg: '#6D28D9', br: '6px' },
        ],
        features: ['Hero Animasi', 'Profil Eksekutif', 'Laporan Tahunan', 'Press Release', 'Investor Relations'],
        tags: ['enterprise', 'korporat', 'premium', 'elegance'],
    },
    {
        id: 5,
        title: 'Agrikultur & Hasil Bumi',
        category: 'Agribisnis',
        desc: 'Desain segar dan natural untuk bisnis pertanian dan produk organik. Tampilkan hasil bumi dengan bangga.',
        badge: 'Baru',
        pages: 7,
        price: 77,
        headerBg: '#F0FDF4',
        headerAccent: '#16A34A',
        thumb: [
            { w: '55%', h: '10px', bg: '#16A34A', br: '4px' },
            { w: '35%', h: '8px', bg: '#16A34A40', br: '4px' },
            { w: '100%', h: '52px', bg: '#16A34A0D', br: '8px' },
            { w: '45%', h: '32px', bg: '#16A34A', br: '6px' },
        ],
        features: ['Katalog Produk', 'Tentang Kebun', 'Sertifikasi Organik', 'Distribusi', 'Kontak'],
        tags: ['pertanian', 'organik', 'agrikultur', 'hasil bumi'],
    },
    {
        id: 6,
        title: 'Green Harvest',
        category: 'Agribisnis',
        desc: 'Template modern untuk perkebunan, koperasi tani, dan hasil bumi lokal. Tampilan hijau yang menyegarkan.',
        badge: 'Featured',
        pages: 8,
        price: 97,
        headerBg: '#ECFDF5',
        headerAccent: '#059669',
        thumb: [
            { w: '50%', h: '10px', bg: '#059669', br: '4px' },
            { w: '65%', h: '8px', bg: '#05966940', br: '4px' },
            { w: '100%', h: '54px', bg: '#0596690D', br: '8px' },
            { w: '42%', h: '32px', bg: '#059669', br: '6px' },
        ],
        features: ['Tentang Koperasi', 'Produk Unggulan', 'Program Tani', 'Galeri', 'Kemitraan'],
        tags: ['koperasi', 'perkebunan', 'tani', 'lokal'],
    },
    {
        id: 7,
        title: 'Retail Modern',
        category: 'Toko Online',
        desc: 'Template toko online yang bersih dan konversi tinggi. Cocok untuk fashion, elektronik, dan produk rumah tangga.',
        badge: 'Terlaris',
        pages: 11,
        price: 117,
        headerBg: '#FFF1F2',
        headerAccent: '#E11D48',
        thumb: [
            { w: '70%', h: '10px', bg: '#E11D48', br: '4px' },
            { w: '50%', h: '8px', bg: '#E11D4830', br: '4px' },
            { w: '100%', h: '56px', bg: '#E11D480A', br: '8px' },
            { w: '55%', h: '32px', bg: '#E11D48', br: '6px' },
        ],
        features: ['Katalog Produk', 'Keranjang Belanja', 'Filter & Pencarian', 'Review Produk', 'Wishlist'],
        tags: ['toko', 'online', 'retail', 'ecommerce'],
    },
    {
        id: 8,
        title: 'Fashion Boutique',
        category: 'Toko Online',
        desc: 'Desain boutique yang elegan untuk brand fashion lokal. Tampilkan koleksi dengan visual yang memukau.',
        badge: 'Populer',
        pages: 9,
        price: 137,
        headerBg: '#FDF4FF',
        headerAccent: '#A21CAF',
        thumb: [
            { w: '45%', h: '10px', bg: '#A21CAF', br: '4px' },
            { w: '60%', h: '8px', bg: '#A21CAF40', br: '4px' },
            { w: '100%', h: '60px', bg: '#A21CAF0D', br: '8px' },
            { w: '48%', h: '32px', bg: '#A21CAF', br: '6px' },
        ],
        features: ['Lookbook', 'Size Guide', 'New Arrivals', 'Koleksi Eksklusif', 'Loyalty Program'],
        tags: ['fashion', 'boutique', 'brand', 'pakaian'],
    },
    {
        id: 9,
        title: 'Kuliner & Resto',
        category: 'Kuliner',
        desc: 'Template appetizing untuk restoran, cafe, dan bisnis kuliner. Menu online, lokasi, dan reservasi siap pakai.',
        badge: 'Baru',
        pages: 8,
        price: 87,
        headerBg: '#FFFBEB',
        headerAccent: '#F59E0B',
        thumb: [
            { w: '60%', h: '10px', bg: '#F59E0B', br: '4px' },
            { w: '80%', h: '8px', bg: '#F59E0B40', br: '4px' },
            { w: '100%', h: '48px', bg: '#F59E0B0D', br: '8px' },
            { w: '35%', h: '32px', bg: '#F59E0B', br: '6px' },
        ],
        features: ['Menu Digital', 'Reservasi Online', 'Galeri Makanan', 'Lokasi & Maps', 'Promo'],
        tags: ['kuliner', 'restoran', 'cafe', 'makanan'],
    },
];

export const categories = ['Semua', ...Array.from(new Set(allTemplates.map((t) => t.category)))];
