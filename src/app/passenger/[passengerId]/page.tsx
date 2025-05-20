import { Center, Container, defineStyle } from '@chakra-ui/react';
import { Suspense } from 'react';
import DownloadPassengerCardSkeleton from '../../../components/passenger/dowload/download-card-skeleton';
import DownloadPassengerCard from '../../../components/passenger/dowload/download-card';

type PassengerPageProps = {
  params: Promise<{ passengerId: string }>;
};

const containerCss = defineStyle({
  background:
    'repeating-linear-gradient(45deg, #14b8a6, #14b8a6 15px, #0d9488 15px, #0d9488 30px);',
  p: 4,
  w: 'full',
  minH: '100dvh',
});


export default async function PassengerPage(props: PassengerPageProps) {
  const { passengerId } = await props.params;

  return (
    <Container css={containerCss}>
      <Center w={'full'} pt={8}>
        <Suspense fallback={<DownloadPassengerCardSkeleton />}>
          <DownloadPassengerCard passengerId={passengerId} />
        </Suspense>
      </Center>
    </Container>
  );
}
