// FilterSearchManager.js
import React, {useState} from "react";
import FilterToggleButtons from "../FilterToggleButtons/FilterToggleButtons";
import SearchBox from "../SearchBox/SearchBox";
import FilterPanel from "../FilterPanel/FilterPanel";
import { sectionsData } from "../../sectionsData";

const FilterSearchManager = ({ activePanel, setActivePanel, setSearchTerm, setChecked, checked, searchTerm }) => {
  const [showFilterBox, setShowFilterBox] = useState(false);

  // activePanel 변경에 따른 showFilterBox 상태 업데이트 로직
  const togglePanel = (panelKey) => {
    console.log(`Current activePanel from FilterSearchManager: ${activePanel}, panelKey: ${panelKey}`)
    const isSamePanel = panelKey === activePanel;
    setActivePanel(isSamePanel ? 'default' : panelKey);
    setShowFilterBox(!isSamePanel || activePanel === null);
    console.log(`Updated showFilterBox from FilterSearchManager: ${!isSamePanel || activePanel === null}`);
  };

  return (
    <>
      <FilterToggleButtons
        activePanel={activePanel}
        togglePanel={togglePanel}
        filterOptions={sectionsData.map((section) => ({
          key: section.title,
          text: section.title,
        }))}
      />
      <FilterPanel
        showFilterBox={showFilterBox}
        filterSections={sectionsData.filter(
          (section) => section.title === activePanel
        )}
        checked={checked}
        onCheckboxChange={(groupName, newChecked) => setChecked(groupName, newChecked)}
        setChecked={setChecked}
      />
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} // Pass setSearchTerm directly to SearchBox
        onSearch={(newSearchTerm) => setSearchTerm(newSearchTerm)} // Directly update the searchTerm state on search
        checkedItems={checked}
      />
    </>
  );
};

export default FilterSearchManager;
