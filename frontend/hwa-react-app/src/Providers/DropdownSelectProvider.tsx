import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  DropdownOptionsContext,
  DropdownOptionsProviderProps,
  IDropdownOptions,
} from './DropdownSelectContext';
import { GET_SEARCH_SAMPLE_FORM_FIELDS } from '../graphql/queries/sampleQueries';

import { GET_ANALYTES } from '../graphql/queries/analyteQueries';

import { getUniqueValues, createFormDropdownObject } from '../utilities';

export const DropdownOptionsProvider = ({
  children,
}: DropdownOptionsProviderProps) => {
  const [options, setOptions] = useState<IDropdownOptions>({
    matricesOptions: [],
    stationOptions: [],
    organizationOptions: [],
    waterBodyOptions: [],
    analyteOptions: [],
  });

  const {
    data: analytesData,
    loading: analytesLoading,
    error: analytesError,
  } = useQuery(GET_ANALYTES);

  const {
    data: searchSampleFormFieldData,
    loading: searchSampleFormFieldsLoading,
    error: searchSampleFormFieldsError,
  } = useQuery(GET_SEARCH_SAMPLE_FORM_FIELDS);

  useEffect(() => {
    if (analytesData && analytesData.analytes.length) {
      const arrayOfAnalyteValues = analytesData.analytes.map(
        (analyte: { analyteName: string; __typename: string }) =>
          analyte?.analyteName
      );
      const flatArrayOfAnalyteValues = getUniqueValues(
        arrayOfAnalyteValues.flat()
      );
      const uniqueAnalyteOptions = createFormDropdownObject(
        flatArrayOfAnalyteValues,
        'title'
      );

      setOptions((prevState) => ({
        ...prevState,
        analyteOptions: uniqueAnalyteOptions,
      }));
    }
  }, [analytesData]);

  useEffect(() => {
    if (
      !searchSampleFormFieldsLoading &&
      !searchSampleFormFieldsError &&
      searchSampleFormFieldData?.formFieldValues
    ) {
      const {
        uniqueMatrices = [],
        uniqueWaterBodies = [],
        uniqueStationNames = [],
        uniqueOrganizations = [],
      } = searchSampleFormFieldData.formFieldValues;

      const matOptions = createFormDropdownObject(uniqueMatrices, 'label');
      const stationOptions = createFormDropdownObject(
        uniqueStationNames,
        'label'
      );
      const organizationOptions = createFormDropdownObject(
        uniqueOrganizations,
        'label'
      );
      const waterBodyOptions = createFormDropdownObject(
        uniqueWaterBodies,
        'label'
      );

      setOptions((prevState) => ({
        ...prevState,
        matricesOptions: matOptions,
        stationOptions: stationOptions,
        organizationOptions: organizationOptions,
        waterBodyOptions: waterBodyOptions,
      }));
    }
  }, [
    searchSampleFormFieldsLoading,
    searchSampleFormFieldsError,
    searchSampleFormFieldData,
  ]);

  return (
    <DropdownOptionsContext.Provider value={options}>
      {children}
    </DropdownOptionsContext.Provider>
  );
};
