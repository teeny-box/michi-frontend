import { useRecoilState } from "recoil";
import { loadingState } from "@/recoil/commonAtoms";

export function useLoadingScreen() {
  const [loading, setLoading] = useRecoilState(loadingState);

  const getLoadingState = () => {
    return loading;
  };

  const openLoadingScreen = async () => {
    setLoading(true);
  };

  const closeLoadingScreen = async () => {
    setLoading(false);
  };

  const setLoadingState = async (newState: boolean) => {
    setLoading(newState);
  };

  return { getLoadingState, openLoadingScreen, closeLoadingScreen, setLoadingState };
}
