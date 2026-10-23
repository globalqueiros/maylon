import ErrorPage from "./components/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Página não encontrada"
      description="A página que você procura não existe, foi removida ou o endereço foi digitado incorretamente."
    />
  );
}