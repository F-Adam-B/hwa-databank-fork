import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
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
import { SideBar } from '../index';
import {
  useGetSamplesQuery,
  SampleType,
} from '../../features/samples/samplesApi';
import {
  addSelectedSample,
  removeSelectedSample,
} from '../../features/samples/sampleSlice';
import { GET_ALL_SAMPLES } from '../../graphql/queries/sampleQueries';

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

const MapBox = () => {
  const dispatch = useDispatch();
  const { waterSamplesMap } = useMap();

  // const { loading, data: graphQlData } = useQuery(GET_ALL_SAMPLES);

  const graphQlData = {
    samples: [],
  };
  // const { data, isFetching, isLoading } = useGetSamplesQuery();
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
    return (
      graphQlData?.samples.filter((s: SampleType) =>
        s.location.coordinates.every((coord) => coord !== null)
      ) || []
    );
  }, [graphQlData?.samples]);

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
            anchor="bottom"
            style={{
              color: 'aquamarine',
            }}
            onClick={(e) => {
              dispatch(addSelectedSample(s));
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

  // if (isFetching) return <div>Fetching samples...</div>;
  // if (loading) return <div>Loading samples...</div>;
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
        {samplePins}

        {popupInfo && (
          <Popup
            anchor="top"
            latitude={Number(popupInfo.location.coordinates[0])}
            longitude={Number(popupInfo.location.coordinates[1])}
            onClose={() => {
              setPopupInfo(null);
            }}
          >
            <div>
              {popupInfo.sampleNumber}, {popupInfo.stationName}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
