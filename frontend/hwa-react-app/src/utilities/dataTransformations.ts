import { GenericObject, JsonValue } from '../types';
const isNonEmpty = (value: JsonValue): boolean => {
  if (value === '' || value === undefined) return false;
  if (Array.isArray(value)) return value.some(isNonEmpty); // Check if there's any non-empty item in array
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).some(isNonEmpty); // Check if there's any non-empty property in object
  }
  return true;
};

const cleanObject = (
  obj: GenericObject | JsonValue[]
): GenericObject | JsonValue[] => {
  if (Array.isArray(obj)) {
    return obj
      .map((item) =>
        typeof item === 'object' && item !== null
          ? cleanObject(item as GenericObject)
          : item
      )
      .filter(isNonEmpty); // Remove all empty items after cleaning
  } else {
    const newObj: GenericObject = {};
    for (const key in obj) {
      if (key === '__typename') continue;
      const value = obj[key];
      if (isNonEmpty(value)) {
        newObj[key] =
          typeof value === 'object' && value !== null
            ? cleanObject(value as GenericObject)
            : value;
      }
    }
    return newObj;
  }
};

const parseCoordinate = (coordString: string) => {
  const parsedString = parseFloat(coordString);

  if (isNaN(parsedString)) {
    throw new Error(`Invalid coordinate: ${coordString}`);
  }

  return parsedString;
};

const cleanFormData = (formData: any) => {
  const { analytesTested, dateCollected, location, timeCollected, ...rest } =
    formData;

  const cleanedAnalytes = analytesTested.map(
    ({ characteristics, ...restAnalyte }: any) => {
      return {
        ...restAnalyte,
        characteristics: characteristics.filter(
          (a: any) => a.value !== undefined
        ),
      };
    }
  );

  const cleanedLocation = {
    ...location,
    coordinates: location.coordinates.map((latLong: string) =>
      parseCoordinate(latLong)
    ),
  };
  return cleanObject({
    analytesTested: cleanedAnalytes,
    dateCollected: dateCollected.toISOString(),
    location: cleanedLocation,
    timeCollected: timeCollected.toISOString(),
    ...rest,
  });
};

export { cleanFormData };
