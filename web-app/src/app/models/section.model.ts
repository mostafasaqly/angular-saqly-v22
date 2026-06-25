export interface SectionMeta {
  id: number;
  title: string;
  titleEn: string;
  comingSoon?: boolean;
}

export type ContentBlockType =
  | { type: 'heading';    text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph';  text: string }
  | { type: 'tip';        text: string }
  | { type: 'warning';    text: string }
  | { type: 'list';       items: string[] }
  | { type: 'code';       code: string }
  | { type: 'cta';        text: string; link?: string; linkLabel?: string }
  | { type: 'qa';         question: string; answer: string };

export interface Section {
  id: number;
  title: string;
  titleEn: string;
  level: string;
  levelEn: string;
  intro: string;
  introEn: string;
  lessons: string[];
  lessonsEn: string[];
  content: ContentBlockType[];
  contentEn?: ContentBlockType[];
  comingSoon?: boolean;
}
