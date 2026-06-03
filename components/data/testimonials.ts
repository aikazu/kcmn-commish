export interface Testimonial {
  id: string;
  name: string;
  project: string;
  quote: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Andi Wijaya",
    project: "SaaS Analytics Platform",
    quote: "Kerja cepat, komunikasi jelas, hasilnya di atas ekspektasi. Highly recommended untuk web app serius.",
    initials: "AW",
  },
  {
    id: "t2",
    name: "Sari Putri",
    project: "E-commerce Storefront",
    quote: "Animasi halusnya bikin toko online kami stand out. Konversi naik 23% dalam sebulan.",
    initials: "SP",
  },
  {
    id: "t3",
    name: "Budi Santoso",
    project: "Internal CRM",
    quote: "Code quality tinggi, test coverage bagus, dokumentasi lengkap. Tim internal kami bisa maintain dengan mudah.",
    initials: "BS",
  },
  {
    id: "t4",
    name: "Linda Maharani",
    project: "Brand Landing",
    quote: "Process dari brief sampai deploy mulus. Iqbal paham brand dan translate ke web dengan baik.",
    initials: "LM",
  },
  {
    id: "t5",
    name: "Reza Hidayat",
    project: "Booking System",
    quote: "Real-time features jalan sempurna. Performance score 98 di Lighthouse. Mantap.",
    initials: "RH",
  },
];
