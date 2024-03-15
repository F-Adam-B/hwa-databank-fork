/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddSampleMutation($sampleFormValues: SampleFormValuesInputType!) {\n    addSampleMutation(sampleFormValues: $sampleFormValues) {\n      sampleNumber\n    }\n  }\n": types.AddSampleMutationDocument,
    "\n  query GetAnalyteCharacteristicsQuery($listOfAnalyteNames: [String]!) {\n    analytesCharacteristics(listOfAnalyteNames: $listOfAnalyteNames) {\n      analyteName\n      characteristics {\n        name\n      }\n    }\n  }\n": types.GetAnalyteCharacteristicsQueryDocument,
    "\n  query GetAnalytes {\n    analytes {\n      analyteName\n    }\n  }\n": types.GetAnalytesDocument,
    "\n  query GetAllSamples {\n    samples {\n      id\n      location {\n        coordinates\n      }\n      sampleNumber\n      stationName\n    }\n  }\n": types.GetAllSamplesDocument,
    "\n  query GetSamples(\n    $fromDate: Date\n    $toDate: Date\n    $matrix: String\n    $stationName: String\n    $organization: String\n    $waterBody: String\n    $analytes: [String]\n  ) {\n    sample(\n      fromDate: $fromDate\n      toDate: $toDate\n      matrix: $matrix\n      stationName: $stationName\n      organization: $organization\n      waterBody: $waterBody\n      analytes: $analytes\n    ) {\n      id\n      location {\n        coordinates\n      }\n      matrix\n      project {\n        projectName\n        organization\n      }\n      sampleDate\n      sampleNumber\n      stationName\n      waterBody\n      watershed\n    }\n  }\n": types.GetSamplesDocument,
    "\n  query GetSearchSampleFormFields {\n    formFieldValues {\n      uniqueMatrices\n      uniqueWaterBodies\n      uniqueStationNames\n      uniqueOrganizations\n    }\n  }\n": types.GetSearchSampleFormFieldsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddSampleMutation($sampleFormValues: SampleFormValuesInputType!) {\n    addSampleMutation(sampleFormValues: $sampleFormValues) {\n      sampleNumber\n    }\n  }\n"): (typeof documents)["\n  mutation AddSampleMutation($sampleFormValues: SampleFormValuesInputType!) {\n    addSampleMutation(sampleFormValues: $sampleFormValues) {\n      sampleNumber\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAnalyteCharacteristicsQuery($listOfAnalyteNames: [String]!) {\n    analytesCharacteristics(listOfAnalyteNames: $listOfAnalyteNames) {\n      analyteName\n      characteristics {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAnalyteCharacteristicsQuery($listOfAnalyteNames: [String]!) {\n    analytesCharacteristics(listOfAnalyteNames: $listOfAnalyteNames) {\n      analyteName\n      characteristics {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAnalytes {\n    analytes {\n      analyteName\n    }\n  }\n"): (typeof documents)["\n  query GetAnalytes {\n    analytes {\n      analyteName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllSamples {\n    samples {\n      id\n      location {\n        coordinates\n      }\n      sampleNumber\n      stationName\n    }\n  }\n"): (typeof documents)["\n  query GetAllSamples {\n    samples {\n      id\n      location {\n        coordinates\n      }\n      sampleNumber\n      stationName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSamples(\n    $fromDate: Date\n    $toDate: Date\n    $matrix: String\n    $stationName: String\n    $organization: String\n    $waterBody: String\n    $analytes: [String]\n  ) {\n    sample(\n      fromDate: $fromDate\n      toDate: $toDate\n      matrix: $matrix\n      stationName: $stationName\n      organization: $organization\n      waterBody: $waterBody\n      analytes: $analytes\n    ) {\n      id\n      location {\n        coordinates\n      }\n      matrix\n      project {\n        projectName\n        organization\n      }\n      sampleDate\n      sampleNumber\n      stationName\n      waterBody\n      watershed\n    }\n  }\n"): (typeof documents)["\n  query GetSamples(\n    $fromDate: Date\n    $toDate: Date\n    $matrix: String\n    $stationName: String\n    $organization: String\n    $waterBody: String\n    $analytes: [String]\n  ) {\n    sample(\n      fromDate: $fromDate\n      toDate: $toDate\n      matrix: $matrix\n      stationName: $stationName\n      organization: $organization\n      waterBody: $waterBody\n      analytes: $analytes\n    ) {\n      id\n      location {\n        coordinates\n      }\n      matrix\n      project {\n        projectName\n        organization\n      }\n      sampleDate\n      sampleNumber\n      stationName\n      waterBody\n      watershed\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSearchSampleFormFields {\n    formFieldValues {\n      uniqueMatrices\n      uniqueWaterBodies\n      uniqueStationNames\n      uniqueOrganizations\n    }\n  }\n"): (typeof documents)["\n  query GetSearchSampleFormFields {\n    formFieldValues {\n      uniqueMatrices\n      uniqueWaterBodies\n      uniqueStationNames\n      uniqueOrganizations\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;