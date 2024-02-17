import { useState } from "react";
import { GithubRepo } from "../../interface";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import ReactPaginate from "react-paginate";

const RepoTable = ({
  repoData,
  repoCount,
}: {
  repoData: GithubRepo[];
  repoCount: number;
}) => {
  //   const [rows, setRows] = useState([...repoData]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = repoData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(repoCount / itemsPerPage);

  const handlePageClick = (event: EventParameter) => {
    const newOffset = (event.selected * itemsPerPage) % repoData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <DataGrid columns={columns} rows={currentItems} />
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={10}
        // marginPagesDisplayed={20}
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

const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "Name" },
  { key: "description", name: "Description" },
  { key: "topics", name: "Topics" },
];

type EventParameter = {
  selected: number;
};
