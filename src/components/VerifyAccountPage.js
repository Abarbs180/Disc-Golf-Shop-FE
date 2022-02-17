import LoadingIcon from "./LoadingIcon";
import { useState, useEffect } from "react";

const VerifyAccountPage = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    verifyAccount(params.user, params.auth);
  }, []);

  const verifyAccount = async (userId, uuid) => {
    if (Object.keys(params).length === 0) {
      return;
    }

    setIsLoading(true);

    await fetch("http://localhost:3000/user/verifyAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        uuid: uuid,
      }),
    });

    setIsLoading(false);
    setVerified(true);
  };

  const verificationMessage = verified ? (
    <div className="verify-account">Your account has been verified!</div>
  ) : (
    <div className="verify-account">
      A verification link has been sent to your email account
    </div>
  );

  return <>{!isLoading ? verificationMessage : <LoadingIcon />}</>;
};

export default VerifyAccountPage;
