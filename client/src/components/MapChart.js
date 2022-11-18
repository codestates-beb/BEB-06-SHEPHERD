import mapData from 'assets/topoJson/skorea-municipalities-2018-topo';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

console.log(mapData);

function MapChart () {
  return (
    <ComposableMap
      width={1000}
      height={1000}
      projection='geoMercator'
      projectionConfig={{
        rotate: [-127.5, -35.4, 0.0],
        scale: 8000
      }}
    >
      <ZoomableGroup>
        <Geographies geography={mapData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}

export default MapChart;
