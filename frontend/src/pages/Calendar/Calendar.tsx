import { useState } from 'react';
import { Box, Flex, Grid, Tabs, TabList, Tab, TabPanel, TabPanels, Text } from '@chakra-ui/react';

import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Calendar.scss';

// Dummy data for months and days
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Calendar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('Year');

//yearly view

  // Monthly View Component
  const MonthView = () => {
    const daysInMonth = 30;
    const firstDayOffset = 2; //  for starting day

    return (
      <Box className="calendar-container">
        {/* Days of the week */}
        <Grid templateColumns="repeat(7, 1fr)" className="calendar-grid-header">
          {daysOfWeek.map((day) => (
            <Text key={day} className="day-header" textAlign="center">
              {day}
            </Text>
          ))}
        </Grid>

        {/* Days of the month */}
        <Grid templateColumns="repeat(7, 1fr)" className="calendar-grid">
          {Array.from({ length: firstDayOffset }).map((_, index) => (
            <Box key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isSaturday = (firstDayOffset + day) % 7 === 0;

            return (
              <Box key={day} className={`day-box ${isSaturday ? 'saturday' : ''}`} p="10px" textAlign="center">
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

  // Weekly View Component
  const WeekView = () => (
    <Box>
      <Text fontWeight="bold" fontSize="2xl">Week</Text>
      <Text fontSize="lg">Wait...</Text>
    </Box>
  );

  // Daily View Component
  const DayView = () => (
    <Box>
      <Text fontWeight="bold" fontSize="2xl">Today</Text>
      <Text fontSize="lg">Details for the day...</Text>
    </Box>
  );

  return (
    <Flex className="calendar-page" width="100%" height="100%" flexDir="row">
      <Sidebar isSideBarOpen={isSidebarOpen} setIsSideBarOpen={setIsSidebarOpen} />
      
      <Grid className="calendar-container" flexGrow={1} padding="0 10px" templateRows="min-content 1fr">
        <HeaderGreet />
        
        <Box p={5}>
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList>
              <Tab onClick={() => setCurrentView('Year')}>Year</Tab>
              <Tab onClick={() => setCurrentView('Month')}>Month</Tab>
              <Tab onClick={() => setCurrentView('Week')}>Week</Tab>
              <Tab onClick={() => setCurrentView('Day')}>Day</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>{/* YearView  */}</TabPanel>
              <TabPanel><MonthView /></TabPanel>
              <TabPanel><WeekView /></TabPanel>
              <TabPanel><DayView /></TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Flex>
  );
};

export default Calendar;
