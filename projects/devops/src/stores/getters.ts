import { useSelector, useDispatch } from "./index";

export const useGetAccessToken = () =>
  useSelector(state => state.commonSR.access_token);

  export const useGetTheme = () => useSelector(state => state.commonSR.theme)