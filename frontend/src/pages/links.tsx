import CustomizeLinksLayout from "../components/layout/links";
import LinkForm from "../components/link";
import ProfileDetails from "../components/profileDetails";
import { motion } from "framer-motion";
import { useLinks } from "../components/context/link";

export default function LinksPage() {
  const { view } = useLinks();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CustomizeLinksLayout>
        <>
          {view === "profile" && <ProfileDetails />}
          {view === "links" && <LinkForm />}
        </>
      </CustomizeLinksLayout>
    </motion.div>
  );
}
