import { formatWallet } from '@features/globus/utils/methods';
import { addressSelector } from '@redux/selectors/userStatsSelectors';
import { LeaderboardIcon } from '@root/images/icons/sidebarIcons/LeaderboardIcon';
import { SidebarOpenIcon } from '@root/images/icons/sidebarIcons/SidebarOpenIcon';
import { NETWORK_DATA } from '@root/settings';
import { min, orderBy } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FlexProps,
  Flex as RebassFlex,
  Text as RebassText
} from 'rebass/styled-components';

const Text: typeof RebassText = (props) => (
  <RebassText variant={'primary'} {...props} />
);

const Flex: FC<FlexProps & { gap?: string }> = (props) => (
  <RebassFlex
    variant={'primary'}
    {...props}
    sx={{ gap: props.gap, ...props.sx }}
  />
);

export type TStat = {
  type: string;
  source: string;
  id: string;
  name: string;
  old_value: number;
  new_value: number;
  created_at: string;
  updated_at: string;
  order: number;
};

export const Leaderboard = () => {
  const connectedWalletAddress = useSelector(addressSelector) ?? window.address;
  const [scoreType] = useState<string>('shares');
  const [userScore, setUserScore] = useState<TStat[]>();
  const [allScores, setAllScores] = useState<TStat[]>();
  const [allScoresSize, setAllScoresSize] = useState<number>();
  const [allScoresPage, setAllScoresPage] = useState<number>(0);

  const scoreSource = 'polygon' || NETWORK_DATA.CHAIN.toLowerCase();
  const userScoreNeighbourLimit = 2;
  const allScoresPageSize = 20;
  const allScoresPaginationLimit = 3;
  const allScoresPages = allScoresSize
    ? Array(Math.ceil((allScoresSize || 1) / allScoresPageSize) || 1)
        .fill(null)
        .map((_, i) => i)
    : [];

  useEffect(() => {
    connectedWalletAddress &&
      fetchUserScore(
        connectedWalletAddress,
        scoreType,
        scoreSource,
        userScoreNeighbourLimit
      );
  }, [connectedWalletAddress]);

  useEffect(() => {
    fetchAllScores(scoreType, scoreSource, allScoresPage, allScoresPageSize);
  }, [allScoresPage]);

  const fetchUserScore = (
    scoreId: string,
    scoreType: string,
    scoreSource: string,
    scoreNeighbourLimit: number
  ) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/stats/relativeStats?type=${scoreType}&source=${scoreSource}&id=${scoreId}&neighbourLimit=${scoreNeighbourLimit}`
    )
      .then((response) => response.json())
      .then(setUserScore);
  };

  const fetchAllScores = (
    scoreType: string,
    scoreSource: string,
    page: number,
    pageSize: number
  ) => {
    fetch(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/stats/stats?type=${scoreType}&source=${scoreSource}&from=${
        page * pageSize
      }&limit=${pageSize}`
    )
      .then((response) => response.json())
      .then(({ stats, size }) => (setAllScores(stats), setAllScoresSize(size)));
  };

  return (
    <Flex
      justifyContent={'center'}
      p={['1rem', 0]}
      mt={['250px', '130px']}
      pb={'130px'}
      backgroundColor={'#000'}
    >
      <Flex width={'45rem'} flexDirection="column" gap="4rem">
        {connectedWalletAddress && userScore === undefined ? (
          <Text opacity={0.5}>fetching...</Text>
        ) : (
          !!userScore?.length && (
            <Flex flexDirection="column" gap="2rem">
              <Flex gap="1.5rem" alignItems={'center'}>
                <LeaderboardIcon
                  fill="#6EFEC2"
                  stroke="black"
                  w={40}
                  h={40}
                ></LeaderboardIcon>
                <Text
                  fontSize={'xxx-large'}
                  color={'white'}
                  fontWeight={'bold'}
                >
                  My shares
                </Text>
              </Flex>

              <Flex flexDirection="column">
                {orderBy(userScore, 'order', 'asc').map((score, scoreIndex) => (
                  <Flex flexDirection="column">
                    <Flex gap="2rem" flex={1} py={'1rem'} alignItems={'center'}>
                      <Text
                        color={'#6EFEC2'}
                        fontSize={
                          scoreIndex == Math.floor(userScore.length / 2)
                            ? 'x-large'
                            : 'small'
                        }
                        fontWeight={
                          scoreIndex == Math.floor(userScore.length / 2)
                            ? 'bold'
                            : 'thin'
                        }
                      >
                        {score.order}
                      </Text>
                      <Text
                        flex={1}
                        fontSize={
                          scoreIndex == Math.floor(userScore.length / 2)
                            ? ['large', 'x-large']
                            : 'small'
                        }
                        fontWeight={
                          scoreIndex == Math.floor(userScore.length / 2)
                            ? 'bold'
                            : 'thin'
                        }
                      >
                        {score.name || formatWallet(score.id)}
                      </Text>
                      <Flex gap="2rem" alignItems={'center'}>
                        {score.old_value != score.new_value && (
                          <Text fontSize={'small'}>{score.old_value}</Text>
                        )}
                        <Flex gap=".5rem" alignItems={'center'}>
                          <Text fontWeight={'bold'} fontSize={'large'}>
                            {score.new_value}
                          </Text>
                          {score.old_value != score.new_value && (
                            <Text color={'#6EFEC2'}>⬆</Text>
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                    <hr
                      style={{
                        borderColor: '#fff',
                        opacity: 0.3,
                        width: '100%'
                      }}
                    ></hr>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )
        )}
        <Flex flexDirection="column" gap="2rem">
          <Flex gap="1.5rem" alignItems={'center'}>
            <SidebarOpenIcon stroke="#6EFEC2" w={40} h={40}></SidebarOpenIcon>
            <Text fontSize={'xxx-large'} color={'white'} fontWeight={'bold'}>
              All shares
            </Text>
          </Flex>

          <Flex flexDirection="column">
            {allScores === undefined ? (
              <Text opacity={0.5}>fetching...</Text>
            ) : (
              orderBy(allScores, 'new_value', 'desc').map((score) => (
                <Flex flexDirection="column">
                  <Flex gap="2rem" flex={1} py={'1rem'}>
                    <Text color={'#6EFEC2'}>{score.order}</Text>
                    <Text fontWeight={'bold'} fontSize={'large'} flex={1}>
                      {score.name || formatWallet(score.id)}
                    </Text>
                    <Flex gap="2rem" alignItems={'center'}>
                      {score.old_value != score.new_value && (
                        <Text fontSize={'small'}>{score.old_value}</Text>
                      )}
                      <Flex gap=".5rem" alignItems={'center'}>
                        <Text fontWeight={'bold'} fontSize={'large'}>
                          {score.new_value}
                        </Text>
                        {score.old_value != score.new_value && (
                          <Text color={'#6EFEC2'}>⬆</Text>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                  <hr
                    style={{ borderColor: '#fff', opacity: 0.3, width: '100%' }}
                  ></hr>
                </Flex>
              ))
            )}
          </Flex>
        </Flex>
        {allScoresSize && (
          <Flex gap="1rem" pb={'4rem'} justifyContent={'center'}>
            {allScoresPage >= allScoresPaginationLimit - 1 && (
              <Flex gap="1rem" alignItems={'center'}>
                <Text
                  onClick={() => setAllScoresPage(0)}
                  p={'.5rem'}
                  sx={{
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: '1px solid #6EFEC2'
                  }}
                  color={'#fff'}
                >
                  1
                </Text>
                <Text opacity={0.5}>...</Text>
              </Flex>
            )}
            {[...allScoresPages]
              .splice(
                allScoresPages.length > allScoresPaginationLimit
                  ? (min([
                      allScoresPage ? allScoresPage - 1 : 0,
                      allScoresPages.length - allScoresPaginationLimit
                    ]) as number)
                  : 0,
                min([allScoresPaginationLimit])
              )
              .map((page) => (
                <Text
                  onClick={() => setAllScoresPage(page)}
                  p={'.5rem'}
                  sx={{
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: '1px solid #6EFEC2'
                  }}
                  color={allScoresPage == page ? '#111' : '#6EFEC2'}
                  bg={allScoresPage == page ? '#6EFEC2' : 'transparent'}
                >
                  {page + 1}
                </Text>
              ))}
            {allScoresPage <
              allScoresPages.length + 1 - allScoresPaginationLimit &&
              allScoresPages.length > allScoresPaginationLimit && (
                <Flex gap="1rem" alignItems={'center'}>
                  <Text opacity={0.5}>...</Text>
                  <Text
                    onClick={() => setAllScoresPage(allScoresPages.length - 1)}
                    p={'.5rem'}
                    sx={{
                      borderRadius: '5px',
                      cursor: 'pointer',
                      border: '1px solid #6EFEC2'
                    }}
                    color={'#fff'}
                  >
                    {allScoresPages.length}
                  </Text>
                </Flex>
              )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Leaderboard;
