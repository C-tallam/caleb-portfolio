import {
  Code2, Network, Wrench, Palette, Terminal, Layers, ShieldCheck, Cpu, Server,
  Rocket, GraduationCap, Briefcase, Award, Folder,
} from 'lucide-react';

const map = {
  code: Code2, network: Network, wrench: Wrench, palette: Palette, terminal: Terminal,
  layers: Layers, shield: ShieldCheck, cpu: Cpu, server: Server, rocket: Rocket,
  graduation: GraduationCap, briefcase: Briefcase, award: Award, folder: Folder,
};

export default function Icon({ name, size = 22, ...rest }) {
  const Cmp = map[name] || Layers;
  return <Cmp size={size} aria-hidden="true" {...rest} />;
}
