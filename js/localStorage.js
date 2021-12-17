// All related to local-storage
// # Extrat data of articles
function extractArticlesData() {
  const ALL_ARTICLEs = JSON.parse(localStorage.getItem("all_references"));
  // # Check? local storage `exists`! or `not yet`!
  return ALL_ARTICLEs !== null ? { result: ALL_ARTICLEs } : { result: createArticlesDs() };
}
// --------------------
// # Create `new-articles` data structure in localStorage
const createArticlesDs = () => {
  localStorage.setItem('all_references', JSON.stringify([])); // []
  return JSON.parse(localStorage.getItem("all_references"));
}
// --------------------
// # Handle `last-opened article`
function handleLastOpened(lastOpenedIndex) {
  // Extract articles data
  let artcData = extractArticlesData().result;
  artcData[artcData.length - 1] = lastOpenedIndex;
  // Save articles-data
  saveSlcArticles(artcData);
}
// --------------------
// # Save selected-article
function saveSlcArticles(arclsData) {
  localStorage.setItem('all_references', JSON.stringify(arclsData));
}
// --------------------
// # Get last-opended-article
function getLastOpenedArticle() {
  // -> Extract articles data
  let artcData = extractArticlesData().result;
  return {
    index: artcData[artcData.length - 1], // index of last-opened article
    result: artcData[artcData[artcData.length - 1]]
  };
}
// --------------------