const initialize = () => {
  let playVoiceButton = document.getElementById('btnPlayVoice');
  let stopVoiceButton = document.getElementById('btnStopVoice');
  let addFontSizeButton = document.getElementById('btnPlusFont');
  let minusFontSizeButton = document.getElementById('btnMinusFont');
  let themeGrayButton = document.getElementById('btnThemeGray');

  if(playVoiceButton!=null) {
  playVoiceButton.addEventListener('click', () => {
    playVoice();
  });
  }
  if(stopVoiceButton!=null) {
  stopVoiceButton.addEventListener('click', () => {
    stopVoice();
  });
  }
  if(addFontSizeButton!=null) {
  addFontSizeButton.addEventListener('click', () => {
    addFontSize();
  });
  }
  if(minusFontSizeButton!=null) {
  minusFontSizeButton.addEventListener('click', () => {
    minusFontSize();
  });
  }

  if(themeGrayButton!=null) {
  themeGrayButton.addEventListener('click', () => {
    changedThemeGray();
  });
  }
};

const AddEventVoice = (htmlelement) => {
  addEventListener('mouseover', (e) => {
    let element = e.target;
    if (element instanceof htmlelement) {
      var msg = new SpeechSynthesisUtterance();
      if (htmlelement === HTMLImageElement) {
        msg.text = element.alt;
      } else {
        msg.text = element.innerText === '' ? element.placeholder : element.innerText;
      }
      msg.text = msg.text === 'undefined' ? '' : msg.text;
      if (localStorage.getItem('playVoice') === 'on') {
        window.speechSynthesis.speak(msg);
      }
    }
  });
  addEventListener('mouseout', (e) => {
    let element = e.target;
    if (element instanceof htmlelement) {
      window.speechSynthesis.cancel();
    }
  });
};

const playVoice = () => {
  localStorage.setItem('playVoice', 'on');
  if ('speechSynthesis' in window) {
    AddEventVoice(HTMLHeadingElement);
    AddEventVoice(HTMLAnchorElement);
    AddEventVoice(HTMLButtonElement);
    AddEventVoice(HTMLParagraphElement);
    AddEventVoice(HTMLSpanElement);
    AddEventVoice(HTMLLabelElement);
    AddEventVoice(HTMLInputElement);
    AddEventVoice(HTMLDivElement);
    AddEventVoice(HTMLImageElement);
  } else {
    alert("Su navegador no tiene soporte para la herramienta, por favor utilice Google Chrome en su última versión.");
  }
};

const stopVoice = () => {
  localStorage.setItem('playVoice', 'off');
};

const addFontSize = () => {
  let arrayHtmlElements = document.getElementsByClassName('accesibility');
  for (let item of arrayHtmlElements) {
    let stylecss = window.getComputedStyle(item)
    let fontSizeCurrent = stylecss.getPropertyValue('font-size');
    let newFontSize = (parseInt(fontSizeCurrent.substring(0, 2)) + 2) + 'px';
    item.style.fontSize = newFontSize;
  }
};

const minusFontSize = () => {
  let arrayHtmlElements = document.getElementsByClassName('accesibility');
  for (let item of arrayHtmlElements) {
    let stylecss = window.getComputedStyle(item)
    let fontSizeCurrent = stylecss.getPropertyValue('font-size');
    let newFontSize = (parseInt(fontSizeCurrent.substring(0, 2)) - 2) + 'px';
    item.style.fontSize = newFontSize;
  }
};

const changedThemeGray = () => {
  let themeFlag = sessionStorage.getItem('themeFlag');
  themeFlag = themeFlag === null || themeFlag === undefined ? '0' : themeFlag;
  let arrayHtmlElements = document.getElementsByClassName('accesibility-theme');
  let arrayHtmlElementsText = document.getElementsByClassName('accesibility-theme-text');
  console.log('Iniciando: ' + themeFlag);
  if (themeFlag === '1') {
    for (let item of arrayHtmlElements) {
      item.classList.remove('accesibility-gray-theme');
    }

    for (let texto of arrayHtmlElementsText) {
      texto.classList.remove('accesibility-gray-theme-text');
    }
    themeFlag = '0';
    console.log('Cerrando: ' + themeFlag);
    sessionStorage.setItem('themeFlag', themeFlag);
  }
  else {
    for (let item of arrayHtmlElements) {
      item.className += " accesibility-gray-theme"
    }

    for (let texto of arrayHtmlElementsText) {
      texto.className += " accesibility-gray-theme-text"
    }
    themeFlag = '1';
    console.log('Cerrando: ' + themeFlag);
    sessionStorage.setItem('themeFlag', themeFlag);
  }
}

setTimeout(() => {
  initialize();
}, 3000);
