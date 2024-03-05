import React, { ReactNode, createContext, useState } from 'react';

export type TOptions = {
  [key: string]: string;
  value: string;
};
export interface IDropdownOptions {
  matricesOptions: TOptions[];
  stationOptions: TOptions[];
  organizationOptions: TOptions[];
  waterBodyOptions: TOptions[];
  analyteOptions: TOptions[];
}

export type DropdownOptionsProviderProps = {
  children: ReactNode;
};

export const DropdownOptionsContext = createContext<IDropdownOptions>({
  matricesOptions: [],
  stationOptions: [],
  organizationOptions: [],
  waterBodyOptions: [],
  analyteOptions: [],
});
