import { Building2, Phone, Shield } from "lucide-react";
import { motion } from "motion/react";

type Helpline = {
  name: string;
  number: string;
  description: string;
  category: "police" | "government";
};

const HELPLINES: Helpline[] = [
  // Police
  {
    name: "Police",
    number: "100",
    description: "Emergency police response",
    category: "police",
  },
  {
    name: "Women Helpline",
    number: "1091",
    description: "Women in distress",
    category: "police",
  },
  {
    name: "Women Helpline (Domestic Abuse)",
    number: "181",
    description: "Domestic violence support",
    category: "police",
  },
  {
    name: "Anti-Stalking Helpline",
    number: "1096",
    description: "Stalking / harassment",
    category: "police",
  },
  // Government
  {
    name: "National Emergency",
    number: "112",
    description: "All-in-one emergency number",
    category: "government",
  },
  {
    name: "Ambulance",
    number: "108",
    description: "Medical emergency",
    category: "government",
  },
  {
    name: "Fire",
    number: "101",
    description: "Fire brigade",
    category: "government",
  },
  {
    name: "Child Helpline",
    number: "1098",
    description: "Child abuse / missing child",
    category: "government",
  },
  {
    name: "Senior Citizen Helpline",
    number: "14567",
    description: "Elder care & abuse",
    category: "government",
  },
  {
    name: "Cyber Crime",
    number: "1930",
    description: "Online fraud & harassment",
    category: "government",
  },
  {
    name: "NDRF",
    number: "011-24363260",
    description: "Disaster response force",
    category: "government",
  },
];

const police = HELPLINES.filter((h) => h.category === "police");
const government = HELPLINES.filter((h) => h.category === "government");

function HelplineCard({ item, index }: { item: Helpline; index: number }) {
  const isPolice = item.category === "police";
  const accent = isPolice ? "text-red-400" : "text-blue-400";
  const bg = isPolice
    ? "bg-red-500/20 border-red-500/30"
    : "bg-blue-500/20 border-blue-500/30";
  const Icon = isPolice ? Shield : Building2;

  return (
    <motion.div
      key={item.number}
      data-ocid={`helpline.item.${index}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-4 px-4 py-3"
    >
      <div
        className={`w-10 h-10 rounded-full ${bg} border flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={18} className={accent} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{item.name}</p>
        <p className="text-white/40 text-xs">{item.description}</p>
      </div>
      <a
        href={`tel:${item.number}`}
        data-ocid={`helpline.call.${index}`}
        aria-label={`Call ${item.name}`}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 font-bold text-sm active:scale-90 transition-transform"
      >
        <Phone size={13} />
        {item.number}
      </a>
    </motion.div>
  );
}

function Section({
  title,
  items,
  startIndex,
}: { title: string; items: Helpline[]; startIndex: number }) {
  return (
    <div className="mb-4">
      <p className="text-white/40 text-xs font-bold tracking-widest uppercase px-4 pb-2">
        {title}
      </p>
      <div className="card-surface overflow-hidden">
        {items.map((item, i) => (
          <div
            key={item.number}
            className={i < items.length - 1 ? "border-b border-white/8" : ""}
          >
            <HelplineCard item={item} index={startIndex + i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HelplineTab() {
  return (
    <div className="flex flex-col gap-2 px-4 pb-24">
      <Section title="Police" items={police} startIndex={0} />
      <Section
        title="Government"
        items={government}
        startIndex={police.length}
      />
      <p className="text-white/25 text-xs text-center mt-2">
        Numbers listed for India. Tap to dial directly.
      </p>
    </div>
  );
}
