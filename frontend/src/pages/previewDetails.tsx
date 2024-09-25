import CardContentView from "../components/preview/cardContent";
import { useLinks } from "../components/context/link";
import PreviewLayout from "../components/layout/preview";

const PreviewDetailsPage = () => {

  return (
    <PreviewLayout>
      <p>PEPE</p>
      {/* <CardContentView
        avatarUrl={avatar}
        name={`${getValues("firstName")} ${getValues("lastName")}`}
        email={getValues("email")}
        links={getValues("links")}
      /> */}
    </PreviewLayout>
  );
};

export default PreviewDetailsPage;
