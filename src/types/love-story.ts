export type Locale = "de" | "pl";
export type TimelineEntry = { date: string; title: string; description: string };
export type Memory = { src: string; alt: string; caption: string; date?: string; location?: string };
export type BucketListItem = { id: string; text: string };
export type BucketListCategory = { id: string; title: string; icon: string; items: BucketListItem[] };
export type ExperienceContent = { relationshipStart:string; musicPath:string; intro:{eyebrow:string;title:string;text:string;button:string}; hero:{lead:string;body:string;image:string}; timeline:TimelineEntry[]; reasons:string[]; memories:Memory[]; letter:string[]; future:string[]; messages:string[]; final:{title:string;declaration:string;answer:string} };
