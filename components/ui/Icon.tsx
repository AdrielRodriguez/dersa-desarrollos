import {
  Box,
  Compass,
  Cpu,
  Hammer,
  HardHat,
  Layers,
  Leaf,
  PenTool,
  Ruler,
  Sofa,
  Sun,
  Trees,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/content";

const map = {
  compass: Compass,
  sun: Sun,
  layers: Layers,
  pen: PenTool,
  sofa: Sofa,
  trees: Trees,
  hammer: Hammer,
  hardhat: HardHat,
  box: Box,
  leaf: Leaf,
  cpu: Cpu,
  ruler: Ruler,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden strokeWidth={1.25} {...props} />;
}
