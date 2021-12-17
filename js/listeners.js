// -Article-switcher-
articlesSelector.addEventListener("change", (e) => {
  let selectedArtc = e.target.value;
  // console.log(e.target.value);
  // Find selected-article
  let srcRslt = findSlcArtc(selectedArtc);
  // console.log(srcRslt); // false
  if (srcRslt.check) {
    // Exists
    // Display the selected-article
    dspSlcArticle(srcRslt.result);
    // Handle last-opened
    handleLastOpened(srcRslt.index);
  } else {
    // Not exists
    alert(srcRslt.reason);
  }
})
// ----------------
// Find selected-article
function findSlcArtc(artcVl) {
  // Get all articles
  let allArtcls = JSON.parse(localStorage.getItem('all_references'));
  // Start search about selected-article
  if (allArtcls.length === 0) { // There are no articles
    // alert("There are no articles to view...")
    return {
      check: false,
      reason: 'there are no articles to view!'
    };
  } else {
    // Search about article
    for (let i = 0; i < allArtcls.length - 1; i++) { // Because last-index for last-opend article so we can not enter
      if (artcVl == allArtcls[i].title) {
        // Return `article-details`
        return {
          check: true,
          result: allArtcls[i],
          index: i,
          allArticles: allArtcls
        }
      }
    }
    return {
      check: false,
      reason: 'not found'
    };
  }
}
// ----------------
// Display selected-article
function dspSlcArticle(article) {
  // Dsp name of selected-article
  articleCntr.textContent = article.title;
  // Dsp links related to selected-article
  // Hide exists links
  emptyLinksFArticle();
  // Get number of found articles
  let numFLinks = article.links.length,
    i = 0;
  while (i < numFLinks) {
    let new_ref = {
      ref: article.links[i].name,
      href: article.links[i].href,
    };
    new_ref = createReference(new_ref);
    // Add new reference
    refsCntr.append(new_ref)
    i++;
  }
};
// ----------------
// Empty links of article
function emptyLinksFArticle() {
  refsCntr.innerHTML = '';
}
// ----------------
// # Resave article
function resaveArticle() {
  // # Get `saveOptions` from sessionStorage
  let saveOptions = JSON.parse(sessionStorage.getItem("saveOptions"));
  // console.log(saveOptions)
  // Object { result: {…}, index: 0, title: "TS 1 Course ITI MaharaTech Institution", newLinks: (1) […], articlesStorage: {…} }
  // -> Update `selected-article`
  saveOptions.articlesStorage.result[saveOptions.index] = {
    title: saveOptions.title,
    links: saveOptions.newLinks,
  };
  // console.log(saveOptions.articlesStorage.result)
  // return ;
  // Save `articles`
  localStorage.setItem('all_references', JSON.stringify(saveOptions.articlesStorage.result));
  // // -> Handle `num of articles`
  // handleNumFArtcls();
  // -> Close `options-container`
  userOptionsCntr.style.display = "none";
  // -> Close `save-options-buttons`
  userOptions.saveOptions.self.style.display = "none";
  // -> Handle `articles-selector` => Reload `articles-names` from the localStorage  
  // return;
  // dpsAllSvdArticles(saveOptions.articlesStorage);
  // console.log("reload the options-updates");
  // console.log(resavedArticle);
  updateArticlesSelector(saveOptions.articlesStorage.result);
} // End (+) resaveArticle.
// ----------------
const updateArticlesSelector = (updatedArticles) => {
  // -> Removes `existsed options`
  deletesAllArticleSelectorOptions();
  // -> Set `new options`
  updatedArticles.forEach(article => {
    // -> Handle `last-opened-index`
    if (!article.title)
      return;
    // console.log(article.title)
    // -> Create `own representative option`
    // .>> Append into `article-selector`
    articlesSelector.append(createOption(article.title));
  })
};

const deletesAllArticleSelectorOptions = () => {
  [...articlesSelector.getElementsByTagName("option")].forEach(opt => {
    opt.remove()
  })
};

const createOption = (name) => {
  let option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  return option;
}
// ----------------
// # Save new article
function saveNewArticle() {
  // .>> article is `Not exists`
  // -> Add as `new article`
  const saveOptions = JSON.parse(sessionStorage.getItem("saveOptions"));
  saveOptions.articlesStorage.result.unshift({
    title: saveOptions.title,
    links: [],
  });
  // -> Add `new option` into `articles-selector`
  articlesSelector.prepend(createOption(saveOptions.title))
  // -> Update `articles-selector` to `new-option`
  articlesSelector.value = saveOptions.title;
  // -> Save articles
  localStorage.setItem('all_references', JSON.stringify(saveOptions.articlesStorage.result));
  // -> Handle` num of articles`
  handleNumFArtcls();
  // -> Hide options of save the existed-article
  userOptionsCntr.style.display = "none";
  // -> Hide save-options
  userOptions.saveOptions.self.style.display = "none";
} // End (+) saveNewArticle.
// ----------------
// # Delete `selected-article`
userOptions.deleteOption.addEventListener("click", (event) => {
  // // console.log(CURRENT_ARTICLE())
  // let article = findSlcArtc(CURRENT_ARTICLE());
  // console.log(article)
  // if(article.check){
  //   // ?Exists
  //   deletesArticle(article);
  // }

  // Object { check: true, result: {…}, index: 0, allArticles: (7) […] }
});
// ----------------
// # Deletes the `specific-article`
const deletesArticle = (article) => {
  // // +1 Remove from `workspace-articles`
  // // article.allArticles.splice(article.index, 1);
  // allRefs.splice(article.index, 1);
  // // +2 Reload `updated-articles`
  // reloadAllPreviousReferences();
};
// ----------------