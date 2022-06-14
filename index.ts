/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { stationData } from './stationData';
import { stationInfo } from './stationInfo';
import { extraStationInfo } from './extraStationInfo';

// Adds a marker to the map.
function addMarker(
  location: google.maps.LatLngLiteral,
  icon: google.maps.Icon,
  zIndex: number,
  map: google.maps.Map,
  infoWindow: google.maps.InfoWindow,
  infoString: string,
) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  const marker = new google.maps.Marker({
    position: location,
    icon: icon,
    zIndex: zIndex,
    map: map,
  });

  google.maps.event.addListener(marker, 'mouseover', function(e) {
    infoWindow.setPosition(e.latLng);
    infoWindow.setContent(infoString);
    infoWindow.open(map);
 });
 
 // Close the InfoWindow on mouseout:
 google.maps.event.addListener(marker, 'mouseout', function() {
    infoWindow.close();
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
  const infowindow = new google.maps.InfoWindow();

  // Add a marker at the center of the map.
  // addMarker(center, 'ANCHOR', map);
  stationData.forEach(({
    code,
    location,
    boardingFreq,
    departureFreq,
  }) => {
    const freq = boardingFreq + departureFreq;
    const {name = '', cityName = '', stateName = '' } = stationInfo[code];
    const { asHalt, asNonHalt } = extraStationInfo[code] || {};
    const infoString = `<h3>${code}</h3>${name}<br>${cityName}, ${stateName}<br>MMT Users Boading : ${boardingFreq}<br>MMT Users Deboarding : ${departureFreq}<br>Halting : ${asHalt || 0} trains<br>Non Halting : ${asNonHalt || 0} trains`;
    addMarker(
      location,
      {
        url:
          freq > 0
            ? 'https://drive.google.com/uc?id=1EAubx8tY7BF3aJ5Q-JEOBQ0HaY0E5THU'
            : 'https://drive.google.com/uc?id=1iIV1llmOnK_lPguJCpaMeW-_w99WMweH',
        scaledSize: new google.maps.Size(10, 10),
      },
      0,
      map,
      infowindow,
      infoString,
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
