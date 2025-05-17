import { Container } from '@chakra-ui/react';
import { HomeCallToAction } from '../components/hero/home.cta';

export default function Home() {
  return (
    <Container w={'full'} h={'100dvh'}>
      <HomeCallToAction />
    </Container>
  );
}
