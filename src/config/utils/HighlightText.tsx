

interface HighlightTextProps {
  text: string;
  query: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, query }) => {
  if (!query) return <>{text}</>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{ backgroundColor: "#D9EDFF", fontWeight: 600 }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};
