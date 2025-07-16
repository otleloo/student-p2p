interface Comp317Props {
  content: string;
}

export default function Comp317({ content }: Comp317Props) {
  return (
    <div className="p-4">
      <p>{content}</p>
    </div>
  );
}