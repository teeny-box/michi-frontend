import { useRecoilState } from "recoil";
import { alertState, alertStateType } from "@/recoil/commonAtoms";

export function useAlert() {
  const [alert, setAlert] = useRecoilState(alertState);

  const getAlertState = () => {
    return alert;
  };

  const openAlert = async () => {
    setAlert({ ...alert, open: true });
  };

  const closeAlert = async () => {
    setAlert({ ...alert, open: false });
  };

  const setAlertState = async (newState: alertStateType) => {
    setAlert({ ...alert, ...newState });
  };

  return { getAlertState, openAlert, closeAlert, setAlertState };
}
