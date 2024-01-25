'use client';
import { useState } from 'react';
import { Header } from './components/Header';
import { CustomerList } from './components/CustomerList';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { RouteList } from './components/RouteList';

const CustomersPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <>
      <Header />
      <Tabs onChange={handleTabChange} index={selectedTab} pt={5}>
        <TabList w='full' justifyItems='center' justifyContent='center'>
          <Tab>Lista de clientes</Tab>
          <Tab>Geração de rotas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CustomerList />
          </TabPanel>
          <TabPanel>
            <RouteList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CustomersPage;
