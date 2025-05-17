import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";
import styles from "./PaginatedResult.module.css";

const PaginatedResult = ({ fetchPage, resultComponentBuilder }) => {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [{ pageNumber, pageSize }, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(0);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    try {
      fetchPage({ pageNumber: pageNumber, pageSize: pageSize }).then((response) => {
        setTotalPages(Math.ceil(response.totalCount / pageSize));
        setItems(response.data);
      });
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [pageNumber, pageSize, fetchPage, setIsLoading]);

  const navigateTo = (page) => {
    if (page === 0) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pageNumber: page,
    }));

    window.scrollTo(0, 0);
  };

  if (error) return;

  return error ? (
    <div>Error: {error}</div>
  ) : (
    <>
      <div className={styles.pagination}>
        <div className={styles.paginationBar}>
          <button
            disabled={pageNumber === 1}
            onClick={() => navigateTo(pageNumber - 1)}
            className={styles.paginationButton}>
            Previous
          </button>
          <div className={styles.paginationPageSize}>
            <label htmlFor="pageSize">Page Size: </label>
            <select
              name="pageSize"
              className={styles.pageSizePicker}
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
          <span className={styles.paginationPages}>
            Page <span className={styles.paginationPageNumber}>{pageNumber}</span> of <span className={styles.paginationPageNumber}>{totalPages}</span>
          </span>
          <button
            disabled={pageNumber === totalPages}
            onClick={() => navigateTo(pageNumber + 1)}
            className={styles.paginationButton}>
            Next
          </button>
        </div>
      </div>
      {resultComponentBuilder(items)}
    </>
  );
};

export default PaginatedResult;
