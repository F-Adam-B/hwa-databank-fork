import React, { useEffect, useMemo, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import Map, {
  Layer,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Source,
  GeolocateControl,
  useMap,
} from 'react-map-gl';
import Pin from '../Pin/Pin';
import { CircularProgressIndicator, SideBar } from '../index';
import client from '../../graphql/apollo-client';
import {
  useGetSamplesQuery,
  SampleType,
} from '../../features/samples/samplesApi';
import {
  addSelectedSample,
  removeSelectedSample,
} from '../../features/samples/sampleSlice';
import {
  GET_ALL_SAMPLES,
  GET_SAMPLES,
} from '../../graphql/queries/sampleQueries';
import { formatTimestamp } from '../../utilities';

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_TOKEN || '';

// Need pin clustering option?
// Cache pin data as the don't change often
// Need to debounce map movement events to it only fires a few milliseconds after the user stops dragging the curser

type LngLatBounds = {
  sw: [number, number];
  ne: [number, number];
  _sw: [number, number];
  _ne: [number, number];
};

type TMapBoxProps = {
  data: {
    sample: SampleType[];
  };
  loading: boolean;
};

const MapBox = ({ data, loading }: TMapBoxProps) => {
  const { waterSamplesMap } = useMap();

  const [popupInfo, setPopupInfo] = useState<SampleType | null>(null);
  const [mapBounds, setMapBounds] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!waterSamplesMap) {
      return undefined;
    }

    const onMove = () => {
      const bounds = waterSamplesMap.getBounds();
      setMapBounds(bounds);
      setError(false);
    };
    waterSamplesMap.on('move', onMove);
    onMove();

    return () => {
      waterSamplesMap.off('move', onMove);
    };
  }, [waterSamplesMap]);

  const samplesWithCoordinates = useMemo(() => {
    return data
      ? data?.sample.filter((s: SampleType) =>
          s.location.coordinates.every((coord) => coord !== null)
        ) || []
      : [];
  }, [data]);

  const samplePins = useMemo(() => {
    return samplesWithCoordinates.map((s: SampleType) => {
      const latitude = Number(s.location.coordinates[0]);
      const longitude = Number(s.location.coordinates[1]);
      return (
        <div className="pinsContainer">
          <Marker
            key={`marker-${s.id}`}
            latitude={latitude}
            longitude={longitude}
            anchor="top"
            style={{
              color: 'aquamarine',
            }}
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(s);
            }}
          >
            <Pin />
          </Marker>
        </div>
      );
    });
  }, [samplesWithCoordinates]);

  return (
    <div className="mapContainer" style={{ height: '500px' }}>
      <SideBar />
      <Map
        id="waterSamplesMap"
        initialViewState={{
          latitude: 37.84283055189627,
          longitude: -106.90655228410716,
          zoom: 10.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_API_KEY}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {loading ? <CircularProgressIndicator /> : samplePins}

        {popupInfo && (
          <Popup
            anchor="bottom"
            latitude={Number(popupInfo.location.coordinates[0])}
            longitude={Number(popupInfo.location.coordinates[1])}
            onClose={() => {
              setPopupInfo(null);
            }}
          >
            <ul>
              <li>Matrix: {popupInfo.matrix}</li>
              <li>Project Name: {popupInfo.project.projectName}</li>
              <li>Organization: {popupInfo.project.organization}</li>
              <li>Sample Number: {popupInfo.sampleNumber}</li>
              <li>Station Name: {popupInfo.stationName}</li>
              <li>Sample Date: {formatTimestamp(popupInfo.sampleDate)}</li>
            </ul>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
