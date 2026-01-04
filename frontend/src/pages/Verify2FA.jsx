import React from "react";
import { useNavigate } from "react-router-dom";
import TwoFaVerification from "../components/TwoFaVerification";

const Verify2FA = () => {
  const navigate = useNavigate();
  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };
  const handle2FaReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  return (
    <TwoFaVerification
      onVerifySuccess={handleVerification}
      onResetSuccess={handle2FaReset}
    />
  );
};

export default Verify2FA;
