export interface SectionMeta {
  id: number;
  title: string;
  titleEn: string;
  comingSoon?: boolean;
}

export const sections: SectionMeta[] = [
  { id: 1,  title: "مقدمة الكورس",                                   titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",                             titleEn: "Development Environment Setup" },
  { id: 3,  title: "أساسيات Angular",                                titleEn: "Angular Fundamentals" },
  { id: 4,  title: "Templates and Binding",                           titleEn: "Templates and Binding" },
  { id: 5,  title: "Control Flow في Angular",                         titleEn: "Control Flow in Angular" },
  { id: 6,  title: "تواصل Components",                               titleEn: "Components Communication" },
  { id: 7,  title: "أساسيات Signals",                                titleEn: "Signals Fundamentals" },
  { id: 8,  title: "Signals المتقدمة",                               titleEn: "Advanced Signals" },
  { id: 9,  title: "Directives and Pipes",                            titleEn: "Directives and Pipes" },
  { id: 10, title: "Services and Dependency Injection",               titleEn: "Services and Dependency Injection" },
  { id: 11, title: "Routing",                                         titleEn: "Routing" },
  { id: 12, title: "Forms في Angular",                                titleEn: "Forms in Angular" },
  { id: 13, title: "أساسيات RxJS",                                   titleEn: "RxJS Essentials" },
  { id: 14, title: "HTTP and APIs",                                   titleEn: "HTTP and APIs" },
  { id: 15, title: "State Management",                                titleEn: "State Management" },
  { id: 16, title: "Authentication and Guards",                       titleEn: "Authentication and Guards" },
  { id: 17, title: "UI, Styling, and Accessibility",                  titleEn: "UI, Styling, and Accessibility" },
  { id: 18, title: "Performance and Optimization",                    titleEn: "Performance and Optimization" },
  { id: 19, title: "SSR and Hydration",                               titleEn: "SSR and Hydration" },
  { id: 20, title: "أساسيات Testing",                                 titleEn: "Testing Basics" },
  { id: 21, title: "AI Tooling and Developer Experience",             titleEn: "AI Tooling and Developer Experience" },
  { id: 22, title: "مشروع — Admin Dashboard",                         titleEn: "Project — Admin Dashboard" },
  { id: 23, title: "مشروع — E-Commerce Mini App",                     titleEn: "Project — E-Commerce Mini App" },
  { id: 24, title: "Deployment",                                      titleEn: "Deployment" },
  { id: 25, title: "مراجعة نهائية و Next Steps",                      titleEn: "Final Review and Next Steps" },
];

export function loadSection(id: number): Promise<any> {
  const pad = String(id).padStart(2, '0');
  return import(`./sections/section${pad}.js`).then((m: any) => m.default);
}
