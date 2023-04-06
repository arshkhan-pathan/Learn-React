import Link from "next/link";

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: "#D97706",
    CSS: "#2563EB",
    Python: "#059669",
    PHP: "#7C3AED",
    Ruby: "#DC2626",
  };

  return (
    <div
      className={`px-2 py-1 text-gray-100 font-bold rounded`}
      style={{ backgroundColor: `${colorKey[children]}` }}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
