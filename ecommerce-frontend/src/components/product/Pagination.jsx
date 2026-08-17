import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">

      <button
        disabled={currentPage === 0}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        className={`flex items-center gap-1 px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg ${
          currentPage === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg ${
              currentPage === index
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        className={`flex items-center gap-1 px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg ${
          currentPage === totalPages - 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Next
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;