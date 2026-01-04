import React from "react";
import TwoFaSetup from "../components/TwoFaSetup";
import { useNavigate } from "react-router-dom";
const Setup2FA = () => {
  const navigate = useNavigate();
  const handleSetupComplete = () => {
    navigate("/verify-2fa");
  };
  return <TwoFaSetup onSetupComplete={handleSetupComplete} />;
};
export default Setup2FA;
