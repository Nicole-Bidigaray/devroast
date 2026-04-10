type SectionTitleProps = {
  children: string;
};

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm font-bold text-accent-green">
        {"//"}
      </span>
      <h2 className="font-mono text-sm font-bold text-text-primary">
        {children}
      </h2>
    </div>
  );
}
