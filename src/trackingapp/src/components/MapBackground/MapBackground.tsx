/* global google */
import {
  DirectionsRenderer, GoogleMap, Marker, useJsApiLoader
} from '@react-google-maps/api';
import axios from 'axios';
import React, { useCallback } from 'react';
import { GOOGLE_API_KEY } from '../../app.constants';
import useWindowDimensions from '../../hooks/window';
import { IAddress } from '../../models/cario';
import { GpsLocation, ITrackedConsignment } from '../../models/consignment';
import { COUNTRY_ISOS, GOOGLE_MAP_STYLES_COLOUR, ICON_MARKER } from './constants';
import box from '../../assets/images/box.png';
import './MapBackground.scss';
import { isIoTCustomer } from '../../hooks/consignment';
import { format } from 'date-fns';

type Props = {
  consignment: ITrackedConsignment;
  onClick?: (eventData: any) => void;
  containerClass?: string;
  width?: number;
  height?: number;
  padding?: any;
  includeRoute?: boolean;
};


/**
 * TODO: Refactor this map
 * @param _props
 * @returns 
 */
function MapBackground(_props: Props) {
  const windowSize = useWindowDimensions();
  const { consignment, onClick } = _props;
  const [mapRef, setMapRef] = React.useState<google.maps.Map|null>(null);
  const [directions, setDirections] = React.useState<google.maps.DirectionsResult|null>(null);
  // The heartbeat markers
  const [beats, setBeats] = React.useState<GpsLocation[]>([]);
  // The current location marker
  const [current, setCurrent] = React.useState<GpsLocation|null>(null);
  // The markers on the map
  const [markers, setMarkers] = React.useState<any>([]);
  // Styles of the map wrapper/container
  // const [isIot, setIsIot] = React.useState<boolean>(false);
  const containerStyle = {
    width: (_props.width) ? _props.width : '100%', 
    height: (_props.height) ? _props.height : '100%',
    opacity: 1
  };


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY
  })

  const onUnmount = React.useCallback(function callback(map) {
    setMapRef(null)
  }, [])
  

  const onLoad = React.useCallback(function callback(map) {
    setMapRef(map);
  }, [])


  /**
   * We need to transform the address object provided by the server in to a
   * query string for the coordinate request.
   * @param addr The address we need to translate to query string
   * @returns 
   */
   const buildRequestString = (addr: IAddress|undefined): string => {
    if (!addr) { return 'Australia'}
    // Line 1, 2 and 3 of the address may not have data. Set a fallback
    const line1 = (addr.line1) ? `${addr.line1.replaceAll(' ', '+')}+` : '';
    const line2 = (addr.line2) ? `${addr.line2.replaceAll(' ', '+')}+` : '';
    const line3 = (addr.line3) ? `${addr.line3.replaceAll(' ', '+')}+` : ''
    // Build the query string
    const str = `address=${line1}${line2}${line3}
      ${addr.location.locality}+
      ${addr.location.state}+
      ${addr.location.country.name}+
      ${addr.location.postcode}
      &key=${GOOGLE_API_KEY}`;
    return str.replaceAll('\n', '').replaceAll(' ', '')
  }

  /**
   * From the addresses provided in the consignment data, fetch the coordinates
   * from google.
   */
  const getCoordsFromAddress = useCallback(async (addr: IAddress|undefined) => {
    const str = buildRequestString(addr);
    const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?${str}`
    try {
      const req: any = await axios.get(googleUrl)
      if (req.data.error_message || !req.data.results.length) {
        return null;
      }
      // If results are returned successfully. Send back the coordinates.
      return req.data.results[0].geometry.location;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },[])

  /**
   * Get the marker location data for the map
   */
  const getMarkers = useCallback(async (connote: ITrackedConsignment) => {
    const deliveryCoords = await getCoordsFromAddress(connote.deliveryAddress);
    const pickupCoords = await getCoordsFromAddress(connote.pickupAddress);

    return [{
      position: deliveryCoords,
      options: {
        icon: {
          path: ICON_MARKER,
          anchor: new window.google.maps.Point(12,17),
          fillOpacity: 1,
          strokeWeight: 2,
          // Red
          strokeColor: "#af0000",
          fillColor: '#e20000',
          // strokeColor: '#bababa',
          // fillColor: '#fff',
          scale: 1.67,
        }
      }
    }, {
      position: pickupCoords,
      options: {
        icon: {
          path: ICON_MARKER,
          anchor: new window.google.maps.Point(12,17),
          fillOpacity: 1,
          fillColor: '#0fbc9d',
          strokeWeight: 1,
          strokeColor: "#0da489",
          scale: 1.67,
        }
      }
    }];
  }, [getCoordsFromAddress])


  /**
   * We want to add padding to the boundary of the map. The padding will change
   * depending on whether or not the ASN is being viewed on a mobile device.
   * On mobile, we have to consider the mobile drawer button at the bottom of
   * the screen. This function will calculate how much padding is needed.
   */
  const setPadding = useCallback(() => {
    const bottom = (windowSize.width < 1024) ? 109 : 38;
    const left = (windowSize.width >= 1024) ? 109: 32;
    const right = (windowSize.width >= 1024) ? 48 : 32;
    return { bottom, left, top: 48, right };
  }, [windowSize]);

  /**
   * On first load, initialise the map
   */
  const initMap = useCallback(async () => {
    // If no consignment is set, abort
    if (!consignment) {
      setMarkers([]);
      setCurrent(null);
      return;
    }
    // When initialising map, check if an IoT customer
    const isIot = isIoTCustomer(consignment);
    // setIsIot(isIot);
    // If there is a consignment, set the markers
    const markerArr = await getMarkers(consignment);
    setMarkers(markerArr);
    // TODO: We will use this to show location history later. For now, we just
    // need the most recent location...
    // Set the heartbeats markers
    // TODO #2: A consignment can potentially contain multiple items/packages
    // each of which can have trackers.  'deviceLocations' is an array of
    // {deviceId: string, locations: GpsLocation[]}
    // For not we'll just assume a single device per consignment though.
    const beats = (consignment.deviceLocations && 
        consignment.deviceLocations.length > 0) ?
        consignment.deviceLocations[0].locations : [];
    const pickupCoords = markerArr[1]; // pickup address
    const current = (!isIot) ? null : (beats.length) ? beats[beats.length - 1] : {
      lat: pickupCoords.position.lat,
      long: pickupCoords.position.lng,
      timeUTC: new Date().toISOString()
    }
    setCurrent(current)
    // When we set the array of heartbeats we want to remove the last one.
    // because we've set that as the "Current" position marker (box icon)
    setBeats(beats.slice(0, -1));

    // If the user has opted to include the route...
    if (_props.includeRoute) {
      const directionsSrv = new window.google.maps.DirectionsService();
      // If it's an iot user, and there's no existing heartbeats. 
      // Do not add the route (as there's no current route information)
      if (isIot && !current) { return; }
      // If it's a non Iot user. We want the directions to go from the
      // origin to the destination. Drawing a simple route generated by google.
      if (!isIot) {
        directionsSrv.route(
          {
            origin: markerArr[1].position,
            destination: markerArr[0].position,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            }
          }
        );
        return;
      }
      
      // 2021-12-06 Request to remove the directions line for IoT customers
      // If it's an IoT user (and there's existing heartbeats). 
      // We want the directions route to map along the path the heartbeats take.
      // This will draw a line between the array of heartbeat locations
      // const line = new window.google.maps.Polyline({
      //   path: beats.map(beat => ({ lat: beat.lat, lng: beat.long })),
      //   geodesic: true,
      //   strokeColor: '#0fbc9d',
      //   strokeOpacity: 0.8,
      //   strokeWeight: 1
      // })
      // line.setMap(mapRef)
    }
  }, [_props.includeRoute, consignment, getMarkers])

  /**
   *  Set the padding and boundaries of the map
   */
  const setMapPosition = React.useCallback(() => {
    if (!window.google || !mapRef) { return; }
    // Set the padding around the boundary of the map
    const padding = (_props.padding) ? _props.padding : setPadding();
    // Zoom the map to fit the bounds of the markers
    const bounds = new window.google.maps.LatLngBounds();
    // If there's no current heartbeat, we want to zoom the map so that both the
    // origin and destination are in view
    if (!current) {
      markers.forEach((marker: any) => bounds.extend(marker.position));
      mapRef.fitBounds(bounds, padding);
    } else {
      // If there is an existing heartbeat, we want to zoom the map to see where
      // it is.
      mapRef.setCenter({ lat: current.lat, lng: current.long })
      mapRef.setZoom(12);
    }
  
  }, [_props.padding, mapRef, markers, setPadding, current])


  React.useEffect(() => {
    initMap();
  }, [initMap])

  React.useEffect(() => {
    setMapPosition();
  }, [setMapPosition])

  return (
    (isLoaded) ? (
      <GoogleMap
        mapContainerClassName={_props.containerClass}
        mapContainerStyle={containerStyle}
        center={COUNTRY_ISOS['AU']}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        options={{
          disableDefaultUI: true,
          draggable: true,
          styles: GOOGLE_MAP_STYLES_COLOUR
        }}
      >
        { // If the user has opted to include directions on the map
          (_props.includeRoute && directions) && 
            <DirectionsRenderer directions={directions} options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#0fbc9d',
                strokeOpacity: 0.8,
              }
            }} />
        }

        { // Markers for the map
          markers.length && markers.map((marker: any, i: number) => {
            if (!marker.position) { return null; }
            return <Marker 
              position={marker.position}
              key={i}
              options={marker.options}
              onClick={(e) => console.log(e)}
            />;
          })
        }

        {
          // The current location marker
          current && <Marker 
            position={{ lat: current.lat, lng: current.long }}
            options={{
              icon: {
                url: box,
                scaledSize: new google.maps.Size(55, 55)
              },
            }}
          />
        }


        { // Heartbeats for the IoT device
          beats.length && beats.map((beat: GpsLocation, i: number) => {
            const max = beats.length - 1;
            const min = 0;
            const percent = 10 + (i - min)/(max - min)*90
            const opacity = percent / 100;
            const scale = opacity * 10;

            let tooltip = `Time: ${format(new Date(beat.timeUTC), "dd/MM/yyyy HH:mm")}\nLat: ${beat.lat}\nLong: ${beat.long}`;

            if (!isNaN(Number(beat.internalTemperature))) {
              tooltip += `\nTemp: ${beat.internalTemperature}c`
            }

            if (!isNaN(Number(beat.internalVoltage))) {
              tooltip += `\nVoltage: ${beat.internalVoltage}c`
            }

            return <Marker 
              position={{ lat: beat.lat, lng: beat.long }} 
              key={i}
              onClick={(e) => console.log(e)}
              title={tooltip}
              options={{
                icon: {
                  fillOpacity: opacity,
                  anchor: new window.google.maps.Point(0,0),
                  fillColor: '#44ffe5',
                  strokeColor: '#00c2a8',
                  strokeWeight: 2,
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: scale
                }
              }}
            />
          })
        }
      </GoogleMap>
    ) : null
  )
}

export default MapBackground;
