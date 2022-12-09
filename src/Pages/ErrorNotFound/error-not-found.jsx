import { NotFound } from "../../Components/NotFound/NotFound";

export const ErrorNotFound = () => {
  return (
    <NotFound
      title="Ошибка,такой страницы не существует"
      buttonText="На главную"
    />
  );
};
