import React from 'react';
import Navbar from '../../components/Navbar';
import List from './List';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Customeradd from './Customeradd';

function Customers() {
   return (
    <div>
    <Navbar/>
    <span></span>
    <Tabs>
    <TabList className='tabs'>
      <Tab><h4>View Customers</h4></Tab>
      <Tab><h4>Add Customers</h4></Tab>
    </TabList>

    <TabPanel>
      <List/>
    </TabPanel>
    <TabPanel>
     {/* <div><h1>Hai</h1></div> */}
     <Customeradd/>
    </TabPanel>
  </Tabs>
    </div>
    );


}

export default Customers;
