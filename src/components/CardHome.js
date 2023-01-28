import Image from "next/image";

export default function CardHome({ articleData }) {
  return (
    <div
      className="flex flex-col items-center text-center gap-y-6 cursor-pointer"
      onClick={() => console.log("clicked")}
    >
      <Image
        src={articleData.image}
        alt={articleData.title}
        width={600}
        height={400}
        className="rounded-lg"
      ></Image>
      <span className="border border-black p-2 rounded-full text-xs">
        By <span className="font-bold">{articleData.author}</span>
      </span>
      <span className="font-medium text-2xl">{articleData.title}</span>
    </div>
  );
}
