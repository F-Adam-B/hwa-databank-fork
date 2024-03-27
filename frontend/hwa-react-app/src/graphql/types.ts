import { ReactNode } from 'react';
// Define basic scalar types that might be represented differently on the server-side.
// For dates, a string in ISO format could be used on the client-side.
type Date = string;
type Float = number;
type ID = string;

// Query Types
interface Query {
  sample(
    fromDate: Date,
    toDate: Date,
    matrix: string,
    stationName: string,
    organization: string,
    waterBody: string,
    analytes: string[]
  ): Sample[];
}

// Sample Types
interface Sample {
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

export interface ProjectInputType {
  projectName?: string;
  organization?: string;
  labName?: string;
  labId?: string;
}

export type User = {
  username: string;
  email: string;
  isAdmin: string;
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
