import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import ReactPaginate from "react-paginate";
import { GithubRepo } from "../../interface";

const RepoTable = ({
  repoData,
  repoCount,
  _fetchPage,
}: {
  repoData: GithubRepo[];
  repoCount: number;
  _fetchPage: (pageNumber?: number, pageCount?: number) => Promise<void>;
}) => {
  const itemsPerPage = 10;

  // total no of pages
  const pageCount = Math.ceil(repoCount / itemsPerPage);

  const handlePageClick = (event: EventParameter) => {
    // callback to fetch selected page
    _fetchPage(event.selected + 1, itemsPerPage);
  };

  return (
    <>
      <DataGrid className="data-grid" columns={columns} rows={repoData} />

      {/* pagination component */}
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default RepoTable;

// custom cell for topics array
const TopicCell = ({ row }: { row: any }) => {
  return <div>{row.topics.join(", ")}</div>;
};

// column schema
const columns = [
  { key: "id", name: "ID", width: 80 },
  { key: "name", name: "Name", resizable: true },
  { key: "description", name: "Description", resizable: true },
  { key: "topics", name: "Topics", resizable: true, renderCell: TopicCell },
];

type EventParameter = {
  selected: number;
};
