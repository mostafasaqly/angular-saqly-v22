export interface SectionMeta {
  id: number;
  title: string;
  titleEn: string;
  comingSoon?: boolean;
}

export const sections: SectionMeta[] = [
  { id: 1,  title: "مقدمة الكورس",                               titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",                         titleEn: "Development Environment Setup" },
  { id: 3,  title: "أساسيات أنجولار",                            titleEn: "Angular Fundamentals",           comingSoon: true },
  { id: 4,  title: "القوالب والربط",                              titleEn: "Templates and Binding",          comingSoon: true },
  { id: 5,  title: "التحكم في التدفق",                            titleEn: "Control Flow in Angular",        comingSoon: true },
  { id: 6,  title: "التواصل بين المكوّنات",                       titleEn: "Components Communication",       comingSoon: true },
  { id: 7,  title: "أساسيات Signals",                            titleEn: "Signals Fundamentals",           comingSoon: true },
  { id: 8,  title: "Signals المتقدمة",                            titleEn: "Advanced Signals",               comingSoon: true },
  { id: 9,  title: "الموجّهات والأنابيب",                        titleEn: "Directives and Pipes",           comingSoon: true },
  { id: 10, title: "الخدمات وحقن التبعيات",                      titleEn: "Services and Dependency Injection", comingSoon: true },
  { id: 11, title: "التوجيه (Routing)",                           titleEn: "Routing",                        comingSoon: true },
  { id: 12, title: "النماذج (Forms)",                             titleEn: "Forms in Angular",               comingSoon: true },
  { id: 13, title: "أساسيات RxJS",                               titleEn: "RxJS Essentials",                comingSoon: true },
  { id: 14, title: "HTTP والـ APIs",                              titleEn: "HTTP and APIs",                  comingSoon: true },
  { id: 15, title: "إدارة الحالة",                               titleEn: "State Management",               comingSoon: true },
  { id: 16, title: "المصادقة والحماية",                          titleEn: "Authentication and Guards",       comingSoon: true },
  { id: 17, title: "واجهة المستخدم والتصميم وإمكانية الوصول",    titleEn: "UI, Styling, and Accessibility",  comingSoon: true },
  { id: 18, title: "الأداء والتحسين",                            titleEn: "Performance and Optimization",    comingSoon: true },
  { id: 19, title: "SSR والترطيب",                               titleEn: "SSR and Hydration",               comingSoon: true },
  { id: 20, title: "أساسيات الاختبارات",                         titleEn: "Testing Basics",                  comingSoon: true },
  { id: 21, title: "أدوات الذكاء الاصطناعي وتجربة المطوّر",      titleEn: "AI Tooling and Developer Experience", comingSoon: true },
  { id: 22, title: "المشروع الأول: لوحة التحكم الإدارية",         titleEn: "Project — Admin Dashboard",       comingSoon: true },
  { id: 23, title: "المشروع الثاني: المتجر الإلكتروني المصغّر",   titleEn: "Project — E-Commerce Mini App",   comingSoon: true },
  { id: 24, title: "النشر",                                       titleEn: "Deployment",                      comingSoon: true },
  { id: 25, title: "المراجعة النهائية والخطوات التالية",           titleEn: "Final Review and Next Steps",     comingSoon: true },
];

export function loadSection(id: number): Promise<any> {
  const pad = String(id).padStart(2, '0');
  return import(`./sections/section${pad}.js`).then((m: any) => m.default);
}
