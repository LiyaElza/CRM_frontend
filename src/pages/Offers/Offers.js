import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React from 'react';
import Navbar from '../../components/Navbar';
import PlusOffers from './PlusOffers';

import './Offers.css'
import Form from './Form';
import View from './View';

function Offers() {
  return (
    <div>
    <Navbar/>
    <span></span>
    <Tabs>
    <TabList className='tabs'>
      <span></span>
      <Tab><h4>Add Offers</h4></Tab>
      <Tab><h4>View Offers</h4></Tab>
      <Tab><h4>Special Offers</h4></Tab>
    </TabList>

    <TabPanel>
      <Form/>
    </TabPanel>
    <TabPanel>
      <View/>
    </TabPanel>
    <TabPanel>
      <PlusOffers/>
    </TabPanel>
  </Tabs>
    </div>
  );
}

export default Offers;
