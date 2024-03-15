/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AnalyteInputType = {
  analyteName?: InputMaybe<Scalars['String']['input']>;
  characteristics?: InputMaybe<Array<InputMaybe<CharacteristicInput>>>;
};

export type AnalyteType = {
  __typename?: 'AnalyteType';
  analyteName: Scalars['String']['output'];
  characteristics?: Maybe<Array<Maybe<CharacteristicType>>>;
};

export type CharacteristicInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CharacteristicType = {
  __typename?: 'CharacteristicType';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type FormFieldValueType = {
  __typename?: 'FormFieldValueType';
  uniqueMatrices?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  uniqueOrganizations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  uniqueStationNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  uniqueWaterBodies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Location = {
  __typename?: 'Location';
  coordinates?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
};

export type LocationInputType = {
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  county?: InputMaybe<Scalars['String']['input']>;
  elevation?: InputMaybe<Scalars['String']['input']>;
  elevationToGrade?: InputMaybe<Scalars['String']['input']>;
  locationDescription?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSampleMutation?: Maybe<Sample>;
};


export type MutationAddSampleMutationArgs = {
  sampleFormValues?: InputMaybe<SampleFormValuesInputType>;
};

export type Project = {
  __typename?: 'Project';
  organization?: Maybe<Scalars['String']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
};

export type ProjectInputType = {
  labId?: InputMaybe<Scalars['String']['input']>;
  labName?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  analytes?: Maybe<Array<Maybe<AnalyteType>>>;
  analytesCharacteristics?: Maybe<Array<Maybe<AnalyteType>>>;
  formFieldValues?: Maybe<FormFieldValueType>;
  sample?: Maybe<Array<Maybe<Sample>>>;
  samples?: Maybe<Array<Maybe<Sample>>>;
};


export type QueryAnalytesCharacteristicsArgs = {
  listOfAnalyteNames: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QuerySampleArgs = {
  analytes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fromDate?: InputMaybe<Scalars['Date']['input']>;
  matrix?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  stationName?: InputMaybe<Scalars['String']['input']>;
  toDate?: InputMaybe<Scalars['Date']['input']>;
  waterBody?: InputMaybe<Scalars['String']['input']>;
};

export type Sample = {
  __typename?: 'Sample';
  id?: Maybe<Scalars['ID']['output']>;
  location?: Maybe<Location>;
  matrix?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  sampleDate?: Maybe<Scalars['Date']['output']>;
  sampleNumber?: Maybe<Scalars['String']['output']>;
  stationName?: Maybe<Scalars['String']['output']>;
  waterBody?: Maybe<Scalars['String']['output']>;
  watershed?: Maybe<Scalars['String']['output']>;
};

export type SampleFormValuesInputType = {
  analytesTested?: InputMaybe<Array<InputMaybe<AnalyteInputType>>>;
  dateCollected?: InputMaybe<Scalars['String']['input']>;
  elevation?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<LocationInputType>;
  matrix?: InputMaybe<Scalars['String']['input']>;
  preservationMethods?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  project?: InputMaybe<ProjectInputType>;
  sampleComment?: InputMaybe<Scalars['String']['input']>;
  sampleNumber?: InputMaybe<Scalars['String']['input']>;
  sampleTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sampleType?: InputMaybe<Scalars['String']['input']>;
  sampler?: InputMaybe<Scalars['String']['input']>;
  stationName?: InputMaybe<Scalars['String']['input']>;
  stationNameTwo?: InputMaybe<Scalars['String']['input']>;
  timeCollected?: InputMaybe<Scalars['String']['input']>;
  waterBody?: InputMaybe<Scalars['String']['input']>;
  waterBodyId?: InputMaybe<Scalars['String']['input']>;
  waterCode?: InputMaybe<Scalars['String']['input']>;
  watershed?: InputMaybe<Scalars['String']['input']>;
  watershedReport?: InputMaybe<Scalars['String']['input']>;
};

export type AddSampleMutationMutationVariables = Exact<{
  sampleFormValues: SampleFormValuesInputType;
}>;


export type AddSampleMutationMutation = { __typename?: 'Mutation', addSampleMutation?: { __typename?: 'Sample', sampleNumber?: string | null } | null };

export type GetAnalyteCharacteristicsQueryQueryVariables = Exact<{
  listOfAnalyteNames: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type GetAnalyteCharacteristicsQueryQuery = { __typename?: 'Query', analytesCharacteristics?: Array<{ __typename?: 'AnalyteType', analyteName: string, characteristics?: Array<{ __typename?: 'CharacteristicType', name?: string | null } | null> | null } | null> | null };

export type GetAnalytesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnalytesQuery = { __typename?: 'Query', analytes?: Array<{ __typename?: 'AnalyteType', analyteName: string } | null> | null };

export type GetAllSamplesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSamplesQuery = { __typename?: 'Query', samples?: Array<{ __typename?: 'Sample', id?: string | null, sampleNumber?: string | null, stationName?: string | null, location?: { __typename?: 'Location', coordinates?: Array<number | null> | null } | null } | null> | null };

export type GetSamplesQueryVariables = Exact<{
  fromDate?: InputMaybe<Scalars['Date']['input']>;
  toDate?: InputMaybe<Scalars['Date']['input']>;
  matrix?: InputMaybe<Scalars['String']['input']>;
  stationName?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  waterBody?: InputMaybe<Scalars['String']['input']>;
  analytes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetSamplesQuery = { __typename?: 'Query', sample?: Array<{ __typename?: 'Sample', id?: string | null, matrix?: string | null, sampleDate?: any | null, sampleNumber?: string | null, stationName?: string | null, waterBody?: string | null, watershed?: string | null, location?: { __typename?: 'Location', coordinates?: Array<number | null> | null } | null, project?: { __typename?: 'Project', projectName?: string | null, organization?: string | null } | null } | null> | null };

export type GetSearchSampleFormFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSearchSampleFormFieldsQuery = { __typename?: 'Query', formFieldValues?: { __typename?: 'FormFieldValueType', uniqueMatrices?: Array<string | null> | null, uniqueWaterBodies?: Array<string | null> | null, uniqueStationNames?: Array<string | null> | null, uniqueOrganizations?: Array<string | null> | null } | null };


export const AddSampleMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSampleMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sampleFormValues"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SampleFormValuesInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSampleMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sampleFormValues"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sampleFormValues"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sampleNumber"}}]}}]}}]} as unknown as DocumentNode<AddSampleMutationMutation, AddSampleMutationMutationVariables>;
export const GetAnalyteCharacteristicsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnalyteCharacteristicsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listOfAnalyteNames"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analytesCharacteristics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listOfAnalyteNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listOfAnalyteNames"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analyteName"}},{"kind":"Field","name":{"kind":"Name","value":"characteristics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnalyteCharacteristicsQueryQuery, GetAnalyteCharacteristicsQueryQueryVariables>;
export const GetAnalytesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnalytes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analytes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analyteName"}}]}}]}}]} as unknown as DocumentNode<GetAnalytesQuery, GetAnalytesQueryVariables>;
export const GetAllSamplesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSamples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"samples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sampleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"stationName"}}]}}]}}]} as unknown as DocumentNode<GetAllSamplesQuery, GetAllSamplesQueryVariables>;
export const GetSamplesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSamples"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"matrix"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stationName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"waterBody"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"analytes"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sample"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"toDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"matrix"},"value":{"kind":"Variable","name":{"kind":"Name","value":"matrix"}}},{"kind":"Argument","name":{"kind":"Name","value":"stationName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stationName"}}},{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}},{"kind":"Argument","name":{"kind":"Name","value":"waterBody"},"value":{"kind":"Variable","name":{"kind":"Name","value":"waterBody"}}},{"kind":"Argument","name":{"kind":"Name","value":"analytes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"analytes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"}}]}},{"kind":"Field","name":{"kind":"Name","value":"matrix"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"organization"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sampleDate"}},{"kind":"Field","name":{"kind":"Name","value":"sampleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"stationName"}},{"kind":"Field","name":{"kind":"Name","value":"waterBody"}},{"kind":"Field","name":{"kind":"Name","value":"watershed"}}]}}]}}]} as unknown as DocumentNode<GetSamplesQuery, GetSamplesQueryVariables>;
export const GetSearchSampleFormFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSearchSampleFormFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formFieldValues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uniqueMatrices"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueWaterBodies"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueStationNames"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueOrganizations"}}]}}]}}]} as unknown as DocumentNode<GetSearchSampleFormFieldsQuery, GetSearchSampleFormFieldsQueryVariables>;