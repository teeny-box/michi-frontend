import { useRecoilState, useResetRecoilState } from "recoil";
import { alertState, alertStateType } from "@/recoil/commonAtoms";

export function useAlert() {
  const [alert, setAlert] = useRecoilState(alertState);
  const reset = useResetRecoilState(alertState);

  const getAlertState = () => {
    return alert;
  };

  const closeAlert = async () => {
    reset();
  };

  const setAlertState = async (newState: alertStateType) => {
    setAlert({ ...alert, ...newState });
  };

  return { getAlertState, closeAlert, setAlertState };
}
