import React, { useState } from 'react';
import { Box, Grid, Text, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';

// Dummy data for months and days
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Calender Component
const Calender = () => {
  const [currentView, setCurrentView] = useState('Year');

  // Yearly View
 

  // Monthly View
  const MonthView = () => (
    <Grid templateColumns="repeat(7, 1fr)" gap={2}>
      {daysOfWeek.map((day) => (
        <Text key={day} fontWeight="bold" textAlign="center">{day}</Text>
      ))}
      {Array.from({ length: 30 }, (_, i) => (
        <Box key={i} border="1px solid" borderRadius="md" padding="10px" textAlign="center">
          {i + 1}
        </Box>
      ))}
    </Grid>
  );

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
