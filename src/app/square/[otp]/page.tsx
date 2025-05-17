import { Center, Container, defineStyle } from '@chakra-ui/react';
import { SquareDetailsCard } from '../../../components/square/card';
import { getSquareByOTPAction } from '../../../action/square/get-square-by-otp.action';
import { getSquareBusAction } from '../../../action/square/get-square-bus.action';
import { cookies } from 'next/headers';
import { SQUARE_TOKEN } from '../../../constants/cookie.token';

type SquareDetailsProps = {
  params: Promise<{ otp: string }>;
};

const containerCss = defineStyle({
  background:
    'repeating-linear-gradient(45deg, #14b8a6, #14b8a6 15px, #0d9488 15px, #0d9488 30px);',
  p: 4,
  w: 'full',
  minH: '100dvh',
});

export default async function SquareDetailsPage(props: SquareDetailsProps) {
  const { otp } = await props.params;
  const squareResult = await getSquareByOTPAction(otp);

  if (squareResult.error) {
    const cookieStore = await cookies();
    cookieStore.set(SQUARE_TOKEN.description!, '');
  }

  const result = await getSquareBusAction(squareResult.value!._id);

  return (
    <Container css={containerCss}>
      <Center w={'full'} pt={8}>
        <SquareDetailsCard
          square={squareResult.value!}
          passengers={result.value!}
        />
      </Center>
    </Container>
  );
}
