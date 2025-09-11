export default function Amenity(
    { icon,
        label,
        value, }
) {
    const plural = typeof value === "number" && value > 1 ? "s" : "";
    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-slate-400">{icon}</span>
            <span className="text-sm">
                {value} {label}
                {label.toLowerCase() === "sq ft" ? "" : plural}
            </span>
        </div>
    );
}