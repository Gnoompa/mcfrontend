import { ALLOWLIST } from '@features/allowlist/constants';
import useMetamask from '@features/global/hooks/useMetamask';
import { NETWORK_DATA } from '@root/settings';
import { userGameManagerSelector } from '@selectors/commonAppSelectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface IAllowlist {
  id: ALLOWLIST;
  target: string;
  data: string;
}

const useAllowlist = (
  allowlistId?: IAllowlist['id'],
  target?: IAllowlist['target']
) => {
  const gm = useSelector(userGameManagerSelector);
  const { makeCallRequest } = useMetamask();
  const [allowlist, setAllowlist] = useState<IAllowlist>();
  const [allowlistUseCounter, setAllowlistUseCounter] = useState<number>();
  const allowlistData = allowlist?.data?.split(',');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    allowlistId &&
      target &&
      (getAllowlist(allowlistId, target).then(setAllowlist),
      getAllowlistUseCounter(allowlistId, target).then(setAllowlistUseCounter));
  }, [gm, target, allowlistId]);

  const getAllowlist = (allowlistId: ALLOWLIST, target: string) =>
    fetch(
      `${NETWORK_DATA.BACKEND}/allowlist/isInAllowlist?allowlistId=${allowlistId}&allowlistTarget=${target}`
    ).then((response) => response.json());

  const getAllowlistProof = (allowlistId: ALLOWLIST, target: string) =>
    fetch(
      `${NETWORK_DATA.BACKEND}/allowlist/allowlistProof?allowlistId=${allowlistId}&allowlistTarget=${target}`
    ).then((response) => response.json());

  const getAllowlistUseCounter = (allowlistId: ALLOWLIST, target: string) =>
    makeCallRequest<number>({
      contract: gm ?? window.GM,
      method: 'getAllowlistUseCounter',
      params: [allowlistId, target],
      address,
      errorText: 'Error getting allowlist use counter'
    });

  return {
    getAllowlistUseCounter,
    allowlistUseCounter,
    getAllowlist,
    allowlist,
    allowlistData,
    getAllowlistProof
  };
};

export default useAllowlist;
