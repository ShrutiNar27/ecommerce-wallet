import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">

      <button className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-100">
        <ChevronLeft size={18} />
        Previous
      </button>

      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
        1
      </button>

      <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">
        2
      </button>

      <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">
        3
      </button>

      <button className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-100">
        Next
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;