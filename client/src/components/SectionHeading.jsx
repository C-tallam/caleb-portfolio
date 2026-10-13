export default function SectionHeading({ id, eyebrow, title, subtitle }) {
  return (
    <header className="sec-head reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="sec-sub">{subtitle}</p>}
    </header>
  );
}
