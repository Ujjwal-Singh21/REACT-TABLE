import "./App.css";
import { BasicTable } from "./Components/BasicTable";
import { FilteringTable } from "./Components/Filtering/FilteringTable";
import { FilteringTableTwo } from "./Components/Filtering/FilteringTable2";
import { HeaderGroupsTable } from "./Components/HeaderGroupsTable";
import { RowSelection } from "./Components/SelectingRows/RowSelection";
import { GoToPaginationTable } from "./Components/Pagination/GoToPaginationTable";
import { PageSizePaginationTable } from "./Components/Pagination/PageSizePaginationTable";
import { PaginationTable } from "./Components/Pagination/PaginationTable";
import { SortingTable } from "./Components/Sorting/SortingTable";

function App() {
  return (
    // <div className="App">
    <div>
      {/* <BasicTable /> */}
      {/* <HeaderGroupsTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <FilteringTableTwo /> */}
      {/* <PaginationTable /> */}
      {/* <GoToPaginationTable /> */}
      {/* <PageSizePaginationTable /> */}
      <RowSelection />
    </div>
  );
}

export default App;
