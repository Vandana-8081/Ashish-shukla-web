import {
  Briefcase, Droplets, GlassWater, GraduationCap, Handshake, HeartPulse, Landmark,
  Lightbulb, Route, Sprout, Store, Trash2, TrainFront, Trees, Users, Wheat, Construction,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  road: Construction, lightbulb: Lightbulb, droplets: Droplets, trash: Trash2, glass: GlassWater,
  trees: Trees, route: Route, graduation: GraduationCap, heart: HeartPulse, wheat: Wheat,
  users: Users, store: Store, landmark: Landmark, sprout: Sprout, train: TrainFront,
  briefcase: Briefcase, handshake: Handshake,
};

export function StoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Landmark;
  return <Icon className={className} aria-hidden />;
}
