export const createStations = () => {
  return {
    stations: [
      {
        TestCase:
          "Verify that a station can be created with valid latitude, longitude & altitude details",
        external_id: "SF_TEST001",
        name: "San Francisco Test Station",
        latitude: 37.76,
        longitude: -122.43,
        altitude: 150,
      },
      {
        TestCase:
          "Verify that a station can be created with valid latitude, longitude & altitude details",
        external_id: "SF_TEST002",
        name: "San Francisco Test Station",
        latitude: 37.99,
        longitude: -122.99,
        altitude: 151,
      },
    ],
  };
};
