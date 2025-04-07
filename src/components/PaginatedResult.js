import { useEffect, useState } from "react";

export default function PaginatedResult({ fetchPage, resultComponentBuilder }) {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [{ pageNumber, pageSize }, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    try {
      fetchPage({ pageNumber: pageNumber, pageSize: pageSize }).then((response) => {
        setTotalPages(Math.ceil(response.totalCount / pageSize));
        setItems(response.data);
      });
    } catch (err) {
      setError(err.message);
    }
  }, [pageNumber, pageSize, fetchPage]);

  const navigateTo = (page) => {
    if (page === 0) {
      return;
    }

    setPagination((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));

    window.scrollTo(0, 0);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="pagination-section">
        <div className="pagination-bar">
          <button
            disabled={pageNumber === 1}
            onClick={() => navigateTo(pageNumber - 1)}
            className="pagination-button">
            Previous
          </button>
          <div className="page-size-picker">
            <label htmlFor="pageSize">Page Size: </label>
            <select
              name="pageSize"
              id="pageSize"
              onChange={(event) => {
                setPagination({
                  pageNumber: 1,
                  pageSize: event.target.value,
                });
              }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <span className="pages">
            Page <span className="page-number">{pageNumber}</span> of <span className="page-number">{totalPages}</span>
          </span>
          <button
            disabled={pageNumber === totalPages}
            onClick={() => navigateTo(pageNumber + 1)}
            className="pagination-button">
            Next
          </button>
        </div>
      </div>
      {resultComponentBuilder(items)}
    </>
  );
}
