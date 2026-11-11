
export default function StatsCard({
  label,
  value,
  change,
  icon: Icon,
}) {
  return (
    <div className="panel group relative overflow-hidden rounded-2xl border border-white/[0.06] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#20202a] hover:shadow-xl hover:shadow-violet-500/[0.06]">

      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/[0.04] blur-2xl transition-all duration-500 group-hover:bg-violet-500/15" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-violet-200">
            {value}
          </h3>

          <p className="mt-2 text-[11px] font-medium text-emerald-400">
            +{change}
            <span className="ml-1 font-normal text-slate-500">
              from last period
            </span>
          </p>
        </div>

        <div className="rounded-xl border border-violet-400/10 bg-violet-400/10 p-3 text-violet-300 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-violet-400/20">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}
