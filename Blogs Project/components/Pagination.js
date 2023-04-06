import Link from "next/link";

export default function Pagination({ currentPage, numPages }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {!isFirst && (
          <Link legacyBehavior href={prevPage}>
            <li
              key={Math.random()}
              className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
            >
              Previous
            </li>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <Link legacyBehavior href={`/blog/page/${i + 1}`}>
            <li
              key={Math.random()}
              className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
            >
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLast && (
          <Link legacyBehavior href={nextPage}>
            <li
              key={Math.random()}
              className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
            >
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
