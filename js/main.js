// +1 `Add` `new reference`
addBtn.addEventListener('click', (e) => {
  let vls = { ref: refInp.value, href: hrefInp.value };
  refsCntr.append(createReference(vls));
  refInp.value = '';
  hrefInp.value = '';
})
// -----------------
// +2 `Create` n`ew reference`
let createReference = function (vls = { ref: 'none', href: 'none' }) {
  let new_ref = document.createElement('li');
  let new_href = document.createElement('a');
  new_href = changeStyle(new_href);
  new_href.href = vls.href;
  // console.log(new_href)
  new_href.textContent = vls.ref;
  new_ref.append(new_href)
  return new_ref;
}
// -----------------
// `Change` the `style` of new reference
let i = 0;
function changeStyle(a) {
  if (i === colors.length) {
    i = 0;
  }
  a.style.color = colors[i++]
  return a;
}
// -----------------
// 3+ `Reload` the `previous references`
let reloadAllPreviousReferences = () => {
  // 1.1 Check? articles data store in localStorage `exists` or `not-exists`
  const allRefs = extractArticlesData().result; // [] or [article1},{article2},{article3}]
  // [-2]
  // # Extract `all references` `saved` in local storage
  getAllSavedReferences(
    // # Show `all references`
    () => {
      // # Check .>> is allArticles `not empty` or `empty`?
      if (allRefs.length !== 0) {
        // .>> Is ?`not-empty` >> There are articles in localStorage
        // +1 Check for `last opened` => `Last index`
        let lastOpened = allRefs[allRefs[allRefs.length - 1]]; // return `index` of `last-opened`
        // # Show `last-opened article`
        // +2 Reload the `name of article`
        articleCntr.textContent = lastOpened.title;
        // +3 Get `number of found articles`
        let numFLinks = lastOpened.links.length,
          i = 0;
        while (i < numFLinks) {
          let new_ref = {
            ref: lastOpened.links[i].name,
            href: lastOpened.links[i].href
          }
          new_ref = createReference(new_ref);
          // render `new-reference` of `last-opened-article`
          refsCntr.append(new_ref);
          i++;
        }
        return { isEmpty: false }
      } else {
        // ? `empty` .>> Start from the `begin-state`
        // Start a `new one article`
        articleCntr.textContent = "_awesome_ next article!";
        return { isEmpty: true }
      }
    },
    // # Reload `article-selector` values
    () => {
      // [-3]
      // Reload `founded-article`
      dpsAllSvdArticles(allRefs);
    })
  // [-4]
  // Handle num of articles
  handleNumFArtcls();
} // End (+) reloadAllPreviousReferences.
// -----------------
// Reload the application - Restore the last opened article
reloadAllPreviousReferences()
// -----------------
// Get references from local storage
function getAllSavedReferences(dspAllRefs, reloadArticlesSelector) {
  // +1 Get `all references` or `articles` from `local storage`
  // let allRefs = JSON.parse(localStorage.getItem('all_references'));
  // +2 Display `all articles`
  if (!dspAllRefs().isEmpty) {
    reloadArticlesSelector();
  }
}
// -----------------
// [-3]
// # Display all `saved articles` `options`
function dpsAllSvdArticles(allRefs) {
  let i = 0;
  while (i < allRefs.length - 1) { // (allRefs.length-1) .>> solve index that has `last-opened` `address`
    // Add new article
    insertOption(allRefs[i].title)
    i++;
  }
  // # Handle `last-opend article` option
  articlesSelector.value = getLastOpenedArticle().result.title;
} // End (+) dpsAllSvdArticles.
// -----------------
// Create option of articles
// 4+ Save existed references
let saveExistedReferences = () => {
  extractAllExistReferences((allRefsData) => {
    // +1 Get the `name of article`
    // >> <articleName>
    let articleName = articleCntr.textContent; // Proplem?
    // >> <articleName>
    let articleSelectorValue = articlesSelector.value;
    // Get `all articles` from local storage
    let allArticles = extractArticlesData();
    // Check if `all_references` is empty?
    // .>> To handle `lastOpened`
    if (allArticles.result.length === 0) {
      // `First-article` `default-article-last-opened`
      allArticles.result.push(0);
    }
    // -4.1 Check if article aready `exists` or `not exists`?
    let srchRslt = findSlcArtc(articleSelectorValue);
    if (srchRslt.check) {
      // ?Exists
      // # Display `options of save` the `existed-article`
      userOptionsCntr.style.display = "block";
      // # Display `save-options`
      userOptions.saveOptions.self.style.display = "block";
      // # Store `existed-article` in session
      sessionStorage.setItem("saveOptions", JSON.stringify({
        result: srchRslt.result,
        index: srchRslt.index,
        title: articleName,
        newLinks: allRefsData,
        articlesStorage: allArticles,
      }));
    } else {
      // ?`Not exists` .>> article not found
      // .>> _run `Normal-save`
      normalSave();
    }
  })
} // End (+) saveExistedReferences.
// -----------------
const normalSave=()=>{
  const allArticlesDs = JSON.parse(localStorage.getItem("all_references"));
  // -> Handle `last-opend`
  if (allArticlesDs.length === 0) {
    // .>> last-opened index >> logic =0
    allArticlesDs.push(0);
  }
  // -> Add `new article`
  const articleTitle = articleCntr.textContent;
  allArticlesDs.unshift({
    title: articleTitle,
    links: extractArticleLinks()
  });
  // -> Add `new option` into `articles-selector`
  articlesSelector.prepend(createOption(articleTitle));
  // -> Update `articles-selector` to `new-option`
  articlesSelector.value = articleTitle;
  // -> Save articles
  localStorage.setItem('all_references', JSON.stringify(allArticlesDs));
  // -> Handle` num of articles`
  handleNumFArtcls();  
} // End (+) normalSave.
// -----------------
// Extract all existed references
function extractAllExistReferences(saveReferences) {
  let refData = [];
  let allRefs = refsCntr.querySelectorAll('a');
  // Store all existed references of the aready exists-article
  allRefs.forEach((e) => {
    // Get name and href
    refData.push({
      name: e.text,
      href: e.href
    })
  })
  saveReferences(refData);
}
// -----------------
// -> Just extract `links of article` in the workspace
const extractArticleLinks = () => {
  let refData = [];
  let allRefs = refsCntr.querySelectorAll('a');
  // Store all existed references of the aready exists-article
  allRefs.forEach((e) => {
    // Get name and href
    refData.push({
      name: e.text,
      href: e.href
    })
  })
  return refData;
}
// -----------------
// Build date structure of references
function buildStructureFReferences() {
  return []; // [ {name: '', href: ''} , {} , {} ]
}
// -----------------
// 5+ Delete selected references
let deleteSelectedReferences = () => {

}
// -----------------
// +6 Change the title of article
// First Method
articleCntr.addEventListener('click', (event) => {
  articleCntr.style.display = "none"
  titleSettings.style.display = "block";
})
// -----------------
// Change name of article
function changeTitleFArticle() {
  // Get new name
  let newName = titleSettings.querySelector("#changeTitle").value;
  titleSettings.style.display = "none";
  // Change name
  articleCntr.textContent = newName;
  articleCntr.style.display = "block";


}
// -----------------
// +7 Transfer to another article
let lastOpenedArticle = '';
// +8 Create new article
function createNewArticle() {
  // -> Check if `change-name option` is open
  let chngNmOpt = titleSettings.style.display;
  if (chngNmOpt === "block") {
    // Close `change-name option`
    titleSettings.style.display = "none";
    // View new-name option
    articleCntr.style.display = "block";
  }
  articleCntr.textContent = '_awesome_ next article!';
  // Empty all links that exists
  refsCntr.innerHTML = '';
}
// -----------------

// # Handle num of articles
function handleNumFArtcls() {
  let artcls = extractArticlesData().result;
  // Check it's empty or not
  if (artcls.length === 0) {
    numFArtcls.textContent = "0";
  } else {
    numFArtcls.textContent = artcls.length - 1;
  }
}
// -----------------