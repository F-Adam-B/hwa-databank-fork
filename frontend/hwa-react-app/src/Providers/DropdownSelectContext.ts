import { createContext } from 'react';
import { IDropdownOptions } from '../types';

export const DropdownOptionsContext = createContext<IDropdownOptions>({
  matricesOptions: [],
  stationOptions: [],
  organizationOptions: [],
  waterBodyOptions: [],
  analyteOptions: [],
});
