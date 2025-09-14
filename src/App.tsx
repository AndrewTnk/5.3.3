import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { SearchHeader } from './components/SearchHeader/SearchHeader';
import { Container, Group } from '@mantine/core';
import { Sidebar } from './components/Sidebar/Sidebar';
import { VacancyList } from './components/VacancyList/VacancyList';
import { VacancyDetail } from './components/VacancyDetail/VacancyDetail';
import { About } from './components/About/About';
import { NotFound } from './components/NotFound/NotFound';
import classes from './App.module.scss';

function VacanciesPage() {
  return (
    <>
      <SearchHeader />
      <Container size="xl" py="xl">
        <Group gap="xl" align="flex-start">
          <Sidebar />
          <div className={classes.mainContent}>
            <VacancyList />
          </div>
        </Group>
      </Container>
    </>
  );
}

function App() {
  return (
    <Router basename="/5.2.9">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/vacancies" replace />} />
          <Route path="vacancies" element={<VacanciesPage />} />
          <Route path="vacancies/moscow" element={<VacanciesPage />} />
          <Route path="vacancies/petersburg" element={<VacanciesPage />} />
          <Route path="vacancies/:id" element={<VacancyDetail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
