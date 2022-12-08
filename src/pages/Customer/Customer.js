import React from 'react';
import Navbar from '../../components/Navbar';
import List from './List';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Customeradd from './Customeradd';
import PlusCustomer from './PlusCustomer';

function Customers() {
   return (
    <div className='customerlist'>
    <Navbar/>
    <span></span>
    <Tabs>
    <TabList className='tabs'>
      <Tab><h4>View All Customers</h4></Tab>
      <Tab><h4>👑View Plus Customers</h4></Tab>
      <Tab><h4>Add Customers</h4></Tab>
    </TabList>

    <TabPanel>
      <List/>
    </TabPanel>

    <TabPanel>
      <PlusCustomer/>
    </TabPanel>

    <TabPanel>
     <Customeradd/>
    </TabPanel>
  </Tabs>
    </div>
    );

}

export default Customers;
