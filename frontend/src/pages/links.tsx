import CustomizeLinksLayout from "../components/layout/links";
import LinkForm from "../components/link";
import ProfileDetails from "../components/profileDetails";
import { useLinks } from "../components/context/link";

export default function LinksPage() {
  const { view } = useLinks();
  return (
      <CustomizeLinksLayout>
        <>
        {view === "profile" && <ProfileDetails />}
        {view === "links" && <LinkForm />}
        </>
      </CustomizeLinksLayout>
  );
}
