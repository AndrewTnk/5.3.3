import { Container, Title, Text, Paper, Stack } from '@mantine/core';
import classes from './About.module.scss';

export function About() {
  return (
    <Container size="md" py="xl">
      <Paper p="xl" radius="md" className={classes.aboutCard}>
        <Stack gap="lg">
          <Title order={1} className={classes.title}>
            Андрей экей Дрон
          </Title>

          <Text size="lg" className={classes.intro}>
            Привет! Я - Frontend-разработчик. Пишу приложения на React +
            TypeScript + Redux Toolkit.
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
