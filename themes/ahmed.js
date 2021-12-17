let THEMES = {};

THEMES.elements = {
  body: document.body,
  newBtn: document.getElementById("add-new-article"),
  articleTitle: articleCntr,
  articleSelector: articlesSelector,
  refInp: refInp,
  hrefInp: hrefInp,
  
}

// All collected colors
THEMES.colors = ['#e1c90d', '#17402e', '#d06414', '#8c174c', '#1c6b26', '#861a26', '#cb3724', '#26215f'];

// All themes
THEMES.categories = [];

// Add new theme

THEMES.apply = (newTheme) => {
  // Change background
  THEMES.elements.body.style.backgroundColor = newTheme.bodyBackground;
  // Change new button
  THEMES.elements.newBtn.style.backgroundColor = newTheme.newBtn.backgroundColor;
  THEMES.elements.newBtn.style.color = newTheme.newBtn.color;
  THEMES.elements.newBtn.style.borderColor = newTheme.newBtn.borderColor;
    
  // article-title
  THEMES.elements.articleTitle.style.backgroundColor = newTheme.articleTitle.background;
  THEMES.elements.articleTitle.style.color = newTheme.articleTitle.color;
  
  // article-selector
  changeBackground(THEMES.elements.articleSelector, newTheme.articleSelector.background);
  changeColor(THEMES.elements.articleSelector, newTheme.articleSelector.color);
  changeBorderColor(THEMES.elements.articleSelector, newTheme.articleSelector.background);
  
  // change reference input
  changeBorderColor(THEMES.elements.refInp, newTheme.inputs.borderColor);
  changeColor(THEMES.elements.refInp, newTheme.inputs.color);
  changeBorderColor(THEMES.elements.hrefInp, newTheme.inputs.borderColor);
  changeColor(THEMES.elements.hrefInp, newTheme.inputs.color);
  
};

// Change background
let changeBackground = ( src, themeBackground ) => {
  src.style.backgroundColor = themeBackground;
}

// Change color
let changeColor = ( src, themeColor ) => {
  src.style.color = themeColor;
}

// Change color
let changeBorderColor = ( src, themeBorderColor ) => {
  src.style.borderColor = themeBorderColor;
}


// Ahmed theme
let ahmedTheme = {
  bodyBackground: "rgb(74, 85, 54)",//THEMES.colors[3],
  color: THEMES.colors[1],
  newBtn: {
    backgroundColor: 'transparent',
    color: THEMES.colors[0],
    borderColor: THEMES.colors[0],
  },
  articleTitle: {
    background: THEMES.colors[0],
    color: THEMES.colors[2],
  },
  articleSelector: {
    background: 'whitesmoke',
    color: 'rgb(181, 167, 24)',
  },
  inputs: {
    borderColor: THEMES.colors[0],
    color: THEMES.colors[0],
  },
}

let mohamedTheme = {
  background: THEMES.colors[5],
}



THEMES.apply(ahmedTheme)