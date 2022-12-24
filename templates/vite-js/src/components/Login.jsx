import {
  useActiveProfile,
  useWalletLogin,
  useWalletLogout,
} from "@lens-protocol/react";
import { InjectedConnector } from "@wagmi/core";
import { useAccount, useConnect, useSigner } from "wagmi";

const Login = () => {
  const { data: activeProfile, loading } = useActiveProfile();
  const logout = useWalletLogout();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const login = useWalletLogin();
  const { isDisconnected } = useAccount();
  const { data: signer } = useSigner();

  const onClickLogin = async () => {
    if (activeProfile) {
      return logout();
    }
    if (isDisconnected) {
      return await connectAsync();
    }
    if (signer) {
      login(signer);
    }
  };

  return (
    <div onClick={() => onClickLogin()} className="card">
      <h5>{!activeProfile?.handle && "Login"}</h5>
      <p>{loading && "Loading..."}</p>
      <h6>{activeProfile?.id}</h6>
      <p>{activeProfile?.handle}</p>
    </div>
  );
};

export default Login;
