import { allowlistSelector } from '@redux/selectors/userStatsSelectors';
import { setAllowlist } from '@redux/slices/userStatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Address } from 'viem';
import { CONTRACT_METHODS, METAMASK_EVENTS } from '../types';
import useContracts from './useContracts';
import useMetamask from './useMetamask';
import usePersonalInfo from './usePersonalInfo';

const useAllowlist = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useMetamask();
  const { web3Instance } = usePersonalInfo();
  const { getGameManager, gameManager } = useContracts();

  const allowlistCache = useSelector(allowlistSelector);

  const fetchAllowlistCounter = (
    allowlistId: number,
    address: Address
  ): Promise<number | undefined> =>
    new Promise((resolve, reject) =>
      web3Instance
        ? makeRequest({
            type: METAMASK_EVENTS.call,
            address,
            method: CONTRACT_METHODS.getAllowlistCounter,
            params: [allowlistId, address],
            contract: gameManager ?? getGameManager(),
            onSuccess: (counter) => {
              counter !== undefined &&
                dispatch(
                  setAllowlist({ [allowlistId]: { [address]: counter } })
                );

              resolve(counter);
            },
            onError: reject
          })
        : undefined
    );

  return {
    fetchAllowlistCounter,
    allowlist: allowlistCache
  };
};

export default useAllowlist;
