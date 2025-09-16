import { Stack, Pagination, Center, Loader, Text, Tabs } from '@mantine/core';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import classes from './VacancyList.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPage } from '../../store/vacanciesSlice';
import { setSelectedCity } from '../../store/filtersSlice';
import { useGetVacanciesQuery } from '../../store/api';

export function VacancyList() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSkills, areaId, searchQuery, selectedCity } = useAppSelector(
    s => s.filters
  );
  const { page, perPage } = useAppSelector(s => s.vacancies);
  const { data, isLoading, isError } = useGetVacanciesQuery({
    selectedSkills,
    areaId,
    searchQuery,
    page,
    perPage,
  });

  const getActiveTab = () => {
    if (location.pathname.includes('/petersburg')) return 'petersburg';
    return 'moscow';
  };

  const handleTabChange = (value: string | null) => {
    if (value === 'moscow') {
      navigate('/vacancies/moscow', { replace: true });
      dispatch(setSelectedCity('moscow'));
    } else if (value === 'petersburg') {
      navigate('/vacancies/petersburg', { replace: true });
      dispatch(setSelectedCity('petersburg'));
    }
  };

  useEffect(() => {
    const currentCity = getActiveTab();
    if (currentCity !== selectedCity) {
      dispatch(setSelectedCity(currentCity));
    }
  }, [location.pathname, dispatch, selectedCity]);

  const formatSalary = (s: any) => {
    if (!s) return 'З/п не указана';
    const from = s.from ?? null;
    const to = s.to ?? null;
    const currency = s.currency ?? 'RUR';
    const fmt = (n: number) => n.toLocaleString('ru-RU');
    const cur = currency === 'RUR' ? '₽' : currency;
    if (from && to) return `${fmt(from)} – ${fmt(to)} ${cur}`;
    if (from) return `от ${fmt(from)} ${cur}`;
    if (to) return `до ${fmt(to)} ${cur}`;
    return 'З/п не указана';
  };

  const mapRemoteType = (scheduleId?: string | null) => {
    if (!scheduleId) return undefined;
    if (scheduleId === 'remote') return 'remote' as const;
    if (scheduleId === 'flexible') return 'hybrid' as const;
    return 'office' as const;
  };

  return (
    <div className={classes.container}>
      <Tabs
        value={getActiveTab()}
        onChange={handleTabChange}
        mb="md"
        className={classes.tabs}
      >
        <Tabs.List>
          <Tabs.Tab value="moscow">Москва</Tabs.Tab>
          <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="moscow" pt="md">
          <Stack gap="md">
            {isLoading && (
              <Center my="xl">
                <Loader />
              </Center>
            )}

            {!isLoading &&
              !isError &&
              (data?.items ?? []).map(vacancy => (
                <div key={vacancy.id}>
                  <VacancyCard
                    id={vacancy.id}
                    title={vacancy.name}
                    salary={formatSalary(vacancy.salary)}
                    experience={vacancy.experience?.name ?? 'Опыт не указан'}
                    company={vacancy.employer?.name ?? 'Компания не указана'}
                    location={vacancy.area?.name ?? 'Город не указан'}
                    remoteType={mapRemoteType(vacancy.schedule?.id)}
                    hhUrl={vacancy.alternate_url ?? 'https://hh.ru/'}
                  />
                </div>
              ))}

            <Center mt="lg">
              <Pagination
                total={data?.totalPages ?? 10}
                siblings={1}
                value={page}
                color="gray"
                onChange={p => dispatch(setPage(p))}
                withEdges
              />
            </Center>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="petersburg" pt="md">
          <Stack gap="md">
            {isLoading && (
              <Center my="xl">
                <Loader />
              </Center>
            )}

            {!isLoading &&
              !isError &&
              (data?.items ?? []).map(vacancy => (
                <div key={vacancy.id}>
                  <VacancyCard
                    id={vacancy.id}
                    title={vacancy.name}
                    salary={formatSalary(vacancy.salary)}
                    experience={vacancy.experience?.name ?? 'Опыт не указан'}
                    company={vacancy.employer?.name ?? 'Компания не указана'}
                    location={vacancy.area?.name ?? 'Город не указан'}
                    remoteType={mapRemoteType(vacancy.schedule?.id)}
                    hhUrl={vacancy.alternate_url ?? 'https://hh.ru/'}
                  />
                </div>
              ))}

            <Center mt="lg">
              <Pagination
                total={data?.totalPages ?? 10}
                siblings={1}
                value={page}
                color="gray"
                onChange={p => dispatch(setPage(p))}
                withEdges
              />
            </Center>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
