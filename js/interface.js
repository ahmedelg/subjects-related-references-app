// Website window of app
const websiteWindow = document.querySelector(".website-window");
let refsCntr = document.getElementById('references-links-cnts');
let addBtn = document.getElementById('add-ref');
let numFArtcls = document.getElementById("num-articles");

let refInp = document.getElementById('ref-inp');
let hrefInp = document.getElementById('href-inp');

let titleSettings = document.getElementById("title-settings"),
  articleCntr = document.getElementById("article-title");

// Article Selector
let articlesSelector = document.getElementById("specify-article");

let colors = ['rgb(66, 76, 49)', 'rgb(209, 108, 18)', 'rgb(139, 113, 22)'];


let userOptionsCntr = document.getElementById("user-needs");
// User options
let userOptions = {
  saveOptions: {
    self: userOptionsCntr.querySelector(".save-option"),
    resave: userOptionsCntr.querySelector(".save-option").querySelector(".resave"),
    new: userOptionsCntr.querySelector(".save-option").querySelector(".new"),
  },
  deleteOption: document.getElementById("dlt-ref")
}


// let interfaces = {
  
// }
