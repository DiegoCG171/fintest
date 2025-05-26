import { ReactNode } from "react";

export function insertWordBreaks(text: string, chunkSize = 20): ReactNode[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks.reduce<ReactNode[]>((acc, chunk, index) => {
    if (index > 0) acc.push(<wbr key={index} />);
    acc.push(chunk);
    return acc;
  }, []);
}