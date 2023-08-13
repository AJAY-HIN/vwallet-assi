import { CreatedActions, createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  getData: ["payload"],
});
