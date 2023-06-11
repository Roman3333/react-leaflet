import { FC } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { MapItem } from '../../components/index';
import { useCreateModelsMutation } from '../../redux/api/api';
import { IModel } from '../../types/model';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  data: IModel[];
}

const LocationMarker = () => {
  const [createModel] = useCreateModelsMutation();

  //при клике на карту добавляем маркер
  const map = useMapEvents({
    click(e: LeafletMouseEvent) {
      const name = prompt('Введите имя') || 'test';
      const amount = prompt('Введите сумму') || '777';

      createModel({
        name,
        amount,
        id: Date.now().toString(),
        x: e.latlng.lat,
        y: e.latlng.lng,
      });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

export const Map: FC<MapProps> = ({ data }) => {
  return (
    <MapContainer center={{ lat: 47.908012, lng: 11.2796424 }} zoom={17}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data?.map((model) => (
        <MapItem key={model.id} model={model} />
      ))}
      <LocationMarker />
    </MapContainer>
  );
};
