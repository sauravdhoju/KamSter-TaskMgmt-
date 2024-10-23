import React, { useState } from 'react';
import { Box, Grid, Flex, Text, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';

import './Calendar.scss';

// Dummy data for months and days
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Calender Component
const Calender = () => {
  const [currentView, setCurrentView] = useState('Year');

  // Yearly View
 
// Monthly View
const MonthView = () => {
  const daysInMonth = 30;
  const firstDayOffset = 2; // April 1st starts on Tuesday

  return (
    <Box className="calendar-container">
      {/* Days of the week */}
      <Grid templateColumns="repeat(7, 1fr)" className="calendar-grid-header">
        {daysOfWeek.map((day) => (
          <Text key={day} className="day-header" textAlign="center" >
            {day}
          </Text>
        ))}
      </Grid>

      {/* Grid for days */}
      <Grid templateColumns="repeat(7, 1fr)" className="calendar-grid">
        {/* Empty boxes before the first day of the month */}
        {Array.from({ length: firstDayOffset }).map((_, index) => (
          <Box key={`empty-${index}`} />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isSaturday = (firstDayOffset + day) % 7 === 0;

          return (
            <Box
              key={day}
              className={`day-box ${isSaturday ? 'saturday' : ''}`}
              p="10px"
              textAlign="center"
            >
              <Text fontSize="md" color={isSaturday ? 'red.500' : 'black'}>
                {day}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};


  // Weekly View
  const WeekView = () => (
    <Box >
    <Text fontWeight="bold" fontSize="2xl">week</Text>
    <Text fontSize="lg">Wait...</Text>
  </Box>
);

  // Daily View
  const DayView = () => (
    <Box >
      <Text fontWeight="bold" fontSize="2xl">Today</Text>
      <Text fontSize="lg">Details for the day...</Text>
    </Box>
  );

  return (
    <Box p={5}>
      {/* Tabs for View Toggle */}
      <Tabs variant="soft-rounded" colorScheme="gray">
        <TabList>
          <Tab onClick={() => setCurrentView('Year')}>Year</Tab>
          <Tab onClick={() => setCurrentView('Month')}>Month</Tab>
          <Tab onClick={() => setCurrentView('Week')}>Week</Tab>
          <Tab onClick={() => setCurrentView('Day')}>Day</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* <YearView /> */}
          </TabPanel>
          <TabPanel>
            <MonthView />
          </TabPanel>
          <TabPanel>
            <WeekView />
          </TabPanel>
          <TabPanel>
            <DayView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Calender;
