import { useRouter } from "next/router";
import { useAuthenticationStatus, useUserData } from "@nhost/nextjs";

const AuthorizedAccess = ({ children }) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
  return <>{children}</>;
};

export default AuthorizedAccess;
