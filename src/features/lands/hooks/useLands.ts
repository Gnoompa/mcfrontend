import { ALLOWLIST } from '@features/allowlist/constants';
import useMetamask from '@features/global/hooks/useMetamask';
import { userGameManagerSelector } from '@selectors/commonAppSelectors';
import {
  addressSelector,
  landsMissionsLimitsSelector
} from '@selectors/userStatsSelectors';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ILandClaimData {
  tokenId: number;
  allowlistId: ALLOWLIST;
}

export type TLandClaimOnchainPayload = {
  tokenId: number;
  allowlistId: ALLOWLIST | 0;
  allowlistUseLimit: number;
  allowlistData: string;
  allowlistProof: string[];
};

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
      method: 'getAllowlistUseCounter',
      params: [ALLOWLIST.DISCOUNTED_LAND, address],
      address,
      errorText: 'Error getting discounted land allowlist use counter'
    });
  }, [gm]);

  return { stats, getAllowlistClaims, landsMissionsLimits };
};

export default useLands;
