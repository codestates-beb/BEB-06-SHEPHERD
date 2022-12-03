import mapData from 'assets/topoJson/skorea-municipalities-2018-topo';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

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
      <Geographies geography={mapData}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))}
      </Geographies>
    </ComposableMap>
  );
}

export default MapChart;
