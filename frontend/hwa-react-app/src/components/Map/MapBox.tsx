import React, { useEffect, useMemo, useState } from 'react';
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

  const { data, isFetching, isLoading } = useGetSamplesQuery();
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
      data?.samples.filter((s) =>
        s.location.coordinates.every((coord) => coord !== null)
      ) || []
    );
  }, [data?.samples]);

  const samplePins = useMemo(() => {
    return samplesWithCoordinates.map((s) => {
      const latitude = s.location.coordinates[0];
      const longitude = s.location.coordinates[1];
      return (
        <div className="pinsContainer">
          <Marker
            key={`marker-${s._id}`}
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

  if (isFetching) return <div>Fetching samples...</div>;
  if (isLoading) return <div>Loading samples...</div>;
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

// const [pins, setPins] = useState([]);
// const mapBounds = useMapBounds(); // Custom hook or function to get map bounds

// useEffect(() => {
//   const fetchPins = async () => {
//     try {
//       const response = await axios.get('api/pins', {
//         params: {
//           northEastLat: mapBounds.ne.lat,
//           northEastLng: mapBounds.ne.lng,
//           southWestLat: mapBounds.sw.lat,
//           southWestLng: mapBounds.sw.lng,
//         },
//       });
//       setPins(response.data);
//     } catch (error) {
//       console.error('Failed to fetch pins:', error);
//     }
//   };

//   fetchPins();
// }, [mapBounds]); // Re-fetch pins whenever the map bounds change
