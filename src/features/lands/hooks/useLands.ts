import useMetamask from '@features/global/hooks/useMetamask';
import { userGameManagerSelector } from '@selectors/commonAppSelectors';
import {
  addressSelector,
  landsMissionsLimitsSelector
} from '@selectors/userStatsSelectors';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const FREE_LAND_ALLOWLIST_ID = 1;

const useLands = (tokens: string[] | null, ethInstance?: any) => {
  const [stats, setStats] = useState<unknown[]>([]);
  const gm = useSelector(userGameManagerSelector);
  const address = useSelector(addressSelector);
  const landsMissionsLimits = useSelector(landsMissionsLimitsSelector);
  const { makeCallRequest } = useMetamask();

  const getData = useCallback(() => {
    makeCallRequest<unknown[]>({
      contract: gm ?? window.GM,
      method: 'getAttributesMany',
      params: [tokens],
      address,
      errorText: 'Error getting lands list stats'
    }).then(async (stats) => {
      if (stats) {
        setStats(stats);
      }
    });
  }, [gm, tokens]);

  useEffect(() => {
    if (!tokens || !ethInstance) return;

    (async () => await getData())();
  }, [tokens, gm, address, ethInstance, getData]);

  const getAllowlistClaims = useCallback(() => {
    makeCallRequest<unknown[]>({
      contract: gm ?? window.GM,
      method: 'getAllowlistCounter',
      params: [FREE_LAND_ALLOWLIST_ID, address],
      address,
      errorText: 'Error getting lands free claiming allowlist'
    });
  }, [gm]);

  return { stats, getAllowlistClaims, landsMissionsLimits };
};

export default useLands;
