import useGuard from "lib/modules/routing/useGuard";
import { Loading } from "../Loading/Loading";

const Home = () => {
  useGuard(true, "/landing");
  return <Loading />;
};

export default Home;
