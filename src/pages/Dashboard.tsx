import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
} from '@chakra-ui/react';

import { useUsers } from '@/hooks/api/useUsers';

const Dashboard: React.FC = () => {
  const { data: usersData, isLoading, error } = useUsers({ limit: 5 });

  if (error) {
    return <Box>Error loading dashboard data</Box>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - React Enterprise App</title>
        <meta name="description" content="Main dashboard with key metrics" />
      </Helmet>

      <Box p={6}>
        <Heading mb={6}>Dashboard</Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Users</StatLabel>
                <StatNumber>{isLoading ? '...' : usersData?.total || 0}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Active Sessions</StatLabel>
                <StatNumber>1,234</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12.05%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Revenue</StatLabel>
                <StatNumber>$45,678</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  5.12%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Conversion Rate</StatLabel>
                <StatNumber>3.45%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  8.23%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Recent Activity
            </Heading>
            <Box>
              {isLoading ? (
                <Box>Loading recent users...</Box>
              ) : (
                <Box>
                  {usersData?.users.map(user => (
                    <Box key={user.id} p={2} borderBottom="1px" borderColor="gray.200">
                      {user.fullName} - {user.email}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Dashboard;
