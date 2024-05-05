import { ReactNode } from 'react';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Control } from 'react-hook-form';
// Define basic scalar types that might be represented differently on the server-side.
// For dates, a string in ISO format could be used on the client-side.
type Date = string;
type Float = number;
type ID = string;

// Sample Types
export interface Sample {
  id: ID;
  location?: Location;
  matrix?: string;
  project?: ProjectType;
  sampleDate?: Date;
  sampleNumber?: string;
  stationName?: string;
  waterBody?: string;
  watershed?: string;
}

export type SearchFormInput = {
  fromDate: string | null;
  toDate: string | null;
  matrix: string;
  organization: string;
  stationName: string;
  waterBody: string;
  analytes: string[];
};

export type InfoFormInput = {
  characteristic: string;
  characteristicGroup: string;
  collectionDate: string;
  collectionTime: string;
  description: string;
  organizationName: string;
  projectName: string;
  result: string;
  resultMeasureQualifier: string;
  sampleFraction: string;
  subLocation: string;
  surfaceWaterUnit: string;
  watershed: string;
  wellName: string;
};

export interface NewsFeedProps {
  id: ID;
  authorId: string;
  createdAt: string;
  content: string;
  imageUrl: string;
}

export type TSampleForm = {
  analytesTested: AnalyteType[];
  dateCollected?: string | null;
  elevation?: string;
  eventId: string;
  // id???
  location: LocationType;
  matrix: string;
  preservationMethods?: [];
  project: ProjectType;
  sampler?: string;
  sampleComment?: string;
  sampleNumber: string;
  sampleTag1?: string;
  sampleTag2?: string;
  sampleTag3?: string;
  sampleTag4?: string;
  sampleTag5?: string;
  sampleType: string;
  stationName: string;
  stationNameTwo?: string;
  timeCollected: string | null;
  waterBody: string;
  waterBodyId: string;
  waterCode?: string;
  watershed: string;
  watershedReport?: string;
};

export type SampleType = {
  _id: number | null;
  id: number | null;
  createdAt: string;
  elementsTested: {
    description: string;
    elementName: string;
    value: string;
  }[];
  location: {
    coordinates: [number, number];
    county: string;
    type: string;
  };
  matrix: string;
  project: {
    _id: number | null;
    organization: string;
    projectName: string;
  };
  sampleDate: string;
  sampleNumber: string;
  sampleTime: string;
  stationName: string;
  stationNameTwo: string;
  updatedAt: string;
};

interface Location {
  coordinates?: Float[]; // Assuming it's an optional array of floats for latitude and longitude
}

export interface ProjectType {
  labId: string;
  labName: string;
  organization?: string;
  projectName?: string;
}

export interface CharacteristicType {
  name: string;
  description?: string;
  value: string;
}

export interface AnalyteType {
  analyteName: string;
  characteristics: CharacteristicType[];
}

export interface LocationType {
  coordinates?: string[];
  county: string;
  elevation?: string;
  elevationToGrade?: string;
  locationDescription?: string;
}

export type TAutocompleteProps = {
  control: Control<any>;
  id?: string;
  label?: string;
  multiple?: boolean;
  name: string;
  options: TOptions[];
  placeholder?: string;
};

export type DataGridProps = {
  rows: GridRowsProp[];
  columns: GridColDef[];
};

export type TNewsFeedFormProps = { content: string; image: File | null };

export interface ProjectInputType {
  projectName?: string;
  organization?: string;
  labName?: string;
  labId?: string;
}

export type TCharacteristicsFormProps = {
  apiAnalytes: {
    analyteName: string;
    characteristics: CharacteristicType[];
  }[];
  control?: Control<any>;
  handleClose: (boolean: boolean) => void;
  open: boolean;
};

export type TCharField = {
  id?: string;
  analyteName: string;
  characteristics: CharacteristicType[];
  onChange?: any;
};

export type User = {
  id: ID;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string;
};

export type NewsFeed = {
  authorId: ID;
  content: string;
  createdAt?: string;
  title: string;
};

export type TChildrenProps = {
  children: ReactNode;
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export interface GenericObject {
  [key: string]: JsonValue;
}

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
