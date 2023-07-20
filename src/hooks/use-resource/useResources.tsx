import { useSelector } from "react-redux";

import { AppState } from "src/redux/reducer";
import { Resource } from "src/types";

export const useResources = (): Resource[] | null => {
  return useSelector((state: AppState) => state.resources.resources);
};
