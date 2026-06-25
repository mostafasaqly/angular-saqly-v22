export interface SectionMeta {
  id: number;
  title: string;
  titleEn: string;
  comingSoon?: boolean;
}

export const sections: SectionMeta[] = [
  { id: 1,  title: "مقدمة الكورس",                               titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",                         titleEn: "Development Environment Setup" },
  { id: 3,  title: "أساسيات أنجولار",                            titleEn: "Angular Fundamentals" },
  { id: 4,  title: "القوالب والربط",                              titleEn: "Templates and Binding" },
  { id: 5,  title: "التحكم في التدفق",                            titleEn: "Control Flow in Angular" },
  { id: 6,  title: "التواصل بين المكوّنات",                       titleEn: "Components Communication" },
  { id: 7,  title: "أساسيات Signals",                            titleEn: "Signals Fundamentals" },
  { id: 8,  title: "Signals المتقدمة",                            titleEn: "Advanced Signals" },
  { id: 9,  title: "الموجّهات والأنابيب",                        titleEn: "Directives and Pipes" },
  { id: 10, title: "الخدمات وحقن التبعيات",                      titleEn: "Services and Dependency Injection" },
  { id: 11, title: "التوجيه (Routing)",                           titleEn: "Routing" },
  { id: 12, title: "النماذج (Forms)",                             titleEn: "Forms in Angular" },
  { id: 13, title: "أساسيات RxJS",                               titleEn: "RxJS Essentials" },
  { id: 14, title: "HTTP والـ APIs",                              titleEn: "HTTP and APIs" },
  { id: 15, title: "إدارة الحالة",                               titleEn: "State Management" },
  { id: 16, title: "المصادقة والحماية",                          titleEn: "Authentication and Guards" },
  { id: 17, title: "واجهة المستخدم والتصميم وإمكانية الوصول",    titleEn: "UI, Styling, and Accessibility" },
  { id: 18, title: "الأداء والتحسين",                            titleEn: "Performance and Optimization" },
  { id: 19, title: "SSR and Hydration",                               titleEn: "SSR and Hydration" },
  { id: 20, title: "أساسيات الاختبارات",                         titleEn: "Testing Basics" },
  { id: 21, title: "أدوات الذكاء الاصطناعي وتجربة المطوّر",      titleEn: "AI Tooling and Developer Experience" },
  { id: 22, title: "المشروع الأول: لوحة التحكم الإدارية",         titleEn: "Project — Admin Dashboard" },
  { id: 23, title: "المشروع الثاني: المتجر الإلكتروني المصغّر",   titleEn: "Project — E-Commerce Mini App" },
  { id: 24, title: "النشر",                                       titleEn: "Deployment" },
  { id: 25, title: "المراجعة النهائية والخطوات التالية",           titleEn: "Final Review and Next Steps" },
];

export function loadSection(id: number): Promise<any> {
  const pad = String(id).padStart(2, '0');
  return import(`./sections/section${pad}.js`).then((m: any) => m.default);
}
