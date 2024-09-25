import PreviewHeader from "../components/preview/header";
import CardContentView from "../components/preview/cardContent";
import { useLinks } from "../components/context/link";
import PreviewLayout from "../components/layout/preview";

const PreviewCardPage = () => {
  const { avatar, getValues } = useLinks();

  return (
    <PreviewLayout>
      <PreviewHeader />

      {/* Profile Card */}
      <CardContentView
        avatarUrl={avatar}
        name={`${getValues("firstName")} ${getValues("lastName")}`}
        email={getValues("email")}
        links={getValues("links")}
      />
    </PreviewLayout>
  );
};

export default PreviewCardPage;
