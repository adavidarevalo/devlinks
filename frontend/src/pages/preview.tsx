import PreviewHeader from "../components/preview/header";
import CardContentView from "../components/preview/cardContent";
import { useLinks } from "../components/context/link";
import { motion } from "framer-motion";
import PreviewLayout from "../components/layout/preview";

const PreviewCardPage = () => {
  const { avatar, getValues } = useLinks();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};

export default PreviewCardPage;
