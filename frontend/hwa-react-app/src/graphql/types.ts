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
  project?: Project;
  sampleDate?: Date;
  sampleNumber?: string;
  stationName?: string;
  waterBody?: string;
  watershed?: string;
}

interface Location {
  coordinates?: Float[]; // Assuming it's an optional array of floats for latitude and longitude
}

interface Project {
  projectName?: string;
  organization?: string;
}

// Input Types
export interface SampleFormValuesInputType {
  analytesTested?: AnalyteInputType[];
  dateCollected?: string;
  elevation?: string;
  eventId?: string;
  id?: ID;
  location?: LocationInputType;
  matrix?: string;
  preservationMethods?: string[];
  project: ProjectInputType;
  sampler?: string;
  sampleComment?: string;
  sampleNumber: string;
  sampleTags?: string[];
  sampleType?: string;
  stationName?: string;
  stationNameTwo?: string;
  timeCollected?: string;
  waterBody?: string;
  waterBodyId?: string;
  waterCode?: string;
  watershed?: string;
  watershedReport?: string;
}

interface CharacteristicInput {
  name?: string;
  description?: string;
  value?: string;
}

interface AnalyteInputType {
  analyteName?: string;
  characteristics?: CharacteristicInput[];
}

interface LocationInputType {
  coordinates?: Float[];
  county: string;
  elevation?: string;
  elevationToGrade?: string;
  locationDescription?: string;
}

interface ProjectInputType {
  projectName?: string;
  organization?: string;
  labName?: string;
  labId?: string;
}
