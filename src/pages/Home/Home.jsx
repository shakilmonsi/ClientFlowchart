import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext/ThemeProvider";

function Home() {
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <section>
      Home Page
      <button onClick={toggleTheme}>Change Theme</button>
      <h2>{t("welcome")}</h2>
      <button>{t("button.login")}</button>
      <button>{t("button.signup")}</button>
    </section>
  );
}

export default Home;
