import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ICON_NAME, REQUEST_METHOD } from '@constants/index';

import useFetch from '@hooks/useFetch';

import Icon from '@components/common/Icon';
import * as S from './style';

interface Region {
  id: number;
  name: string;
}

interface RegionsData {
  regions: Region[];
}

const HomeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useFetch<RegionsData>({
    url: 'http://13.124.150.120:8080/users/regions',
    method: REQUEST_METHOD.GET,
  });
  const isLoggedIn = localStorage.getItem('Token');

  const firstDefaultRegion = '역삼 1동';
  const defaultRegion = useMemo(() => {
    if (!data) return;

    const address = data.regions[0].name;

    return address.split(' ').at(-1);
  }, [data]);

  return (
    <S.HomeHeader>
      <S.NeighborhoodDropdown onClick={() => setIsModalOpen(!isModalOpen)}>
        <span>{isLoggedIn ? defaultRegion : firstDefaultRegion}</span>
        <Icon name={ICON_NAME.CHEVRON_DOWN} />
        {isModalOpen && (
          <S.Modal>
            <S.Menu defaultregion="역삼 1동" region="역삼 1동">
              역삼 1동
            </S.Menu>
            <Link to="/region-setting">
              <S.Menu>내 동네 설정하기</S.Menu>
            </Link>
          </S.Modal>
        )}
      </S.NeighborhoodDropdown>
      <Link to="/categories">
        <Icon name={ICON_NAME.HAMBURGER} />
      </Link>
    </S.HomeHeader>
  );
};

export default HomeHeader;
