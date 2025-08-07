export default function Section({ title, children, className = "" }) {
  return (
    <section className={`py-10 md:py-14 ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[var(--foreground)]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
