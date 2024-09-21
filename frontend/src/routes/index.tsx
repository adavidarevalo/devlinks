import PublicRoutes from "./public";
import PrivateRoutes from "./private";

export default function MainRoutes() {
  return (
    <>
    <PublicRoutes/>
    <PrivateRoutes/>
    </>
  );
}
