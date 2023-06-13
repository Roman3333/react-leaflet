import { FC, useState, useRef, useMemo } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import type { LeafletEvent } from 'leaflet';

import { useUpdateModelMutation, useDeleteModelMutation } from '../../redux/api/api';
import { IModel } from '../../types/model';
import styles from './mapItem.module.scss';

interface MapItemProps {
  model: IModel;
}

export const MapItem: FC<MapItemProps> = ({ model }) => {
  const [info, setInfo] = useState({ name: model.name, amount: model.amount });
  const [isEditing, setIsEditing] = useState(false);
  const markerRef = useRef(null);
  const [updateModel] = useUpdateModelMutation();
  const [deleteModel] = useDeleteModelMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    updateModel({ ...model, ...info });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInfo({ name: model.name, amount: model.amount });
  };

  const eventHandlers = useMemo(
    () => ({
      dragend(e: LeafletEvent) {
        updateModel({ ...model, x: e.target._latlng.lat, y: e.target._latlng.lng });
      },
    }),
    [updateModel, model],
  );

  const handleDeleteClick = () => {
    deleteModel(model);
  };

  return (
    <Marker
      position={[model.x, model.y]}
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}>
      <Tooltip>{model.name}</Tooltip>
      <Popup>
        <div className={styles.popup}>
          {isEditing ? (
            <>
              <input
                className={styles.markerInput}
                name="name"
                value={info.name}
                type="text"
                onChange={handleInputChange}
              />
              <input
                className={styles.markerInput}
                name="amount"
                value={info.amount}
                type="text"
                onChange={handleInputChange}
              />
              <button onClick={handleSaveClick}>Сохранить</button>
              <button onClick={handleCancelClick}>Закрыть</button>
            </>
          ) : (
            <>
              <h3>{model.name}</h3>
              <p>Amount: {model.amount}</p>
              <button onClick={handleEditClick}>Редактиировать</button>
              <button onClick={handleDeleteClick}>Удалить</button>
            </>
          )}
        </div>
      </Popup>
    </Marker>
  );
};
