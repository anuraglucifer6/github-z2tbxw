/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { stationData } from './stationData';

// Adds a marker to the map.
function addMarker(
  location: google.maps.LatLngLiteral,
  icon: google.maps.Icon,
  zIndex: number,
  map: google.maps.Map
) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    icon: icon,
    zIndex: zIndex,
    map: map,
  });
}

function initMap(): void {
  const center = { lat: 23, lng: 80 };
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 5.3,
      center: center,
    }
  );

  // Add a marker at the center of the map.
  // addMarker(center, 'ANCHOR', map);
  stationData.forEach((station) => {
    const freq = station.boardingFreq + station.departureFreq;
    addMarker(
      station.location,
      {
        url:
          freq > 0
            ? 'https://drive.google.com/uc?id=1EAubx8tY7BF3aJ5Q-JEOBQ0HaY0E5THU'
            : 'https://drive.google.com/uc?id=1iIV1llmOnK_lPguJCpaMeW-_w99WMweH',
        scaledSize: new google.maps.Size(10, 10),
      },
      freq > 0 ? 1 : 0,
      map
    );
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
