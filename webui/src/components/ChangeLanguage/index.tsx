import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

const LanguageSwitcher=()=> {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "en" | "zh") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginRight: 8 }}
        onClick={() => changeLanguage("en")}
      >
        English
      </Button>
      <Button onClick={() => changeLanguage("zh")}>中文</Button>
    </div>
  );
}

export default LanguageSwitcher;
