import { FC } from 'react';

import { Map } from '../../components/index';
import { useGetModelsQuery } from '../../redux/api/api';

const Home: FC = () => {
  const { data, isLoading } = useGetModelsQuery(null);

  return (
    <section>
      <div className="container">
        {isLoading ? <div>Loading...</div> : data ? <Map data={data} /> : <div>Not found</div>}
      </div>
    </section>
  );
};

export default Home;
