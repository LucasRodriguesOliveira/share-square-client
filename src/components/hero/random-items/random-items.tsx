'use client';

import { FC, useEffect, useState } from 'react';
import { Option } from './options';
import { For, Icon, Presence, Stack, Text } from '@chakra-ui/react';
import { BiFile } from 'react-icons/bi';

interface RandomIconProps {
  options: Option[];
}

const ONE_SECOND = 1000;

const Fallback = () => {
  return (
    <Text>
      Files <BiFile />
    </Text>
  );
};

export const RandomItems: FC<RandomIconProps> = ({ options }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = Math.round(Math.random() * options.length) % options.length;

      console.log(index);

      setCurrent(index);
    }, ONE_SECOND);

    return () => {
      clearInterval(intervalId);
    };
  }, [options]);

  return (
    <For each={options} fallback={<Fallback />}>
      {(item, index) => (
        <Presence
          present={index === current}
          animationName={{ _open: 'bounce' }}
          animationDuration={'moderate'}
          key={index}
        >
          <Stack direction={'row'} gap={2} align={'center'}>
            <Text fontWeight={'bold'} color={'teal'}>{item.text}</Text>
            <Icon color={'teal'} size={'md'}>
              <item.Icon />
            </Icon>
          </Stack>
        </Presence>
      )}
    </For>
  );
};
