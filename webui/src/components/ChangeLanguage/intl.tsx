import React from 'react';

function LanguageSwitcher() {
  const changeLanguage = (locale: 'en' | 'zh') => {
    localStorage.setItem('language',locale);
    window.location.reload();
  };


  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh')}>中文</button>
    </div>
  );
}

export default LanguageSwitcher;
