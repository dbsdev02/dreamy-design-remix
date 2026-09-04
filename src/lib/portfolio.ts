import data from "./portfolio.data.json";

export type Sector = { title: string; text: string; image: string };
export type Advantage = { number: string; title: string; text: string };
export type ApproachStep = { title: string; text: string };
export type Testimonial = { quote: string; name: string; role: string };
export type Stat = { value: number; label: string; suffix: string; plain: boolean };

export const sectors: Sector[] = data.sectors;
export const capabilities: string[] = data.capabilities;
export const advantages: Advantage[] = data.advantages;
export const approach: ApproachStep[] = data.approach;
export const approvals: string[] = data.approvals;
export const testimonials: Testimonial[] = data.testimonials;
export const stats: Stat[] = data.stats as Stat[];
