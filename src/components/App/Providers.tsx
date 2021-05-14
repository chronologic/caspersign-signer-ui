import React from "react";
import { QueryParamProvider } from "use-query-params";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => (
  <QueryParamProvider>{children}</QueryParamProvider>
);

export default Providers;
