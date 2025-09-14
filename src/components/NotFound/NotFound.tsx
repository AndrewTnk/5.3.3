import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Group,
  Image,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.scss';
import gif from '../../assets/gif.gif';

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/vacancies');
  };

  return (
    <Container size="md" className={classes.container}>
      <Paper radius="md">
        <Stack py="md">
          <Group className={classes.head}>
            <Title order={1} textWrap="wrap" className={classes.title} w={508}>
              Упс! Такой страницы не существует
            </Title>
            <Button size="md" onClick={handleGoHome} mr={20}>
              На главную
            </Button>
          </Group>
          <Group>
            <Text size="lg" className={classes.description} ml={20}>
              Давай перейдем к началу.
            </Text>
          </Group>
          <Image src={gif} radius="md" fit="contain" w={640} ml={20} />
        </Stack>
      </Paper>
    </Container>
  );
}
