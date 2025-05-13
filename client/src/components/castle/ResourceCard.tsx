import { formatNumber } from "@/lib/utils";

interface ResourceCardProps {
  name: string;
  value: number;
  iconUrl: string;
  colorClass: string;
}

export default function ResourceCard({ name, value, iconUrl, colorClass }: ResourceCardProps) {
  return (
    <div className="resource-card flex-row hover:shadow-amber-900/20 hover:shadow-lg transition-shadow duration-300">
      <img 
        src={iconUrl} 
        alt={`${name} resource`} 
        className="w-14 h-14 rounded-full object-cover p-1 bg-gradient-to-br from-amber-200/20 to-amber-800/30 border border-amber-500/30" 
      />
      <div className="ml-3">
        <h4 className="font-ui font-medium text-amber-300">{name}</h4>
        <div className={`font-heading text-xl font-bold ${colorClass}`}>
          {formatNumber(value)}
        </div>
      </div>
    </div>
  );
}
