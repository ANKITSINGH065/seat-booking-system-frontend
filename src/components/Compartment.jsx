import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Button,
    Tooltip,
    Icon,
  } from '@chakra-ui/react';
  import React from 'react';
  import Seat from './Seat';
  import { useNavigate } from 'react-router-dom';
  import { removeToken } from '../utils/auth';
  import { FaTrain } from 'react-icons/fa';
  
  export default function Compartment({ loading, data }) {
    const navigate = useNavigate();
  
    let booked = 0;
    let notBooked = 0;
  
    data?.forEach((item) => {
      if (item.isBooked) booked++;
      else notBooked++;
    });
  
    const handleLogout = () => {
      removeToken();
      navigate('/login');
    };
  
    return (
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        minH="100vh"
        bgGradient="linear(to-br, #edf2f7, #e2e8f0)"
        px="6"
        py="6"
      >
        {/* Header with icon and Logout */}
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          maxW="900px"
          mb="4"
        >
          <Flex align="center" gap="3">
            <Icon as={FaTrain} w={6} h={6} color="blue.500" />
            <Heading size="lg" bgClip="text" bgGradient="linear(to-r, teal.500, green.400)">
              Ticket Booking
            </Heading>
          </Flex>
          <Button
            colorScheme="red"
            onClick={handleLogout}
            size="sm"
            variant="outline"
            borderWidth="2px"
          >
            Logout
          </Button>
        </Flex>
  
        {/* Seat grid */}
        <Box
          bg="white"
          boxShadow="lg"
          rounded="xl"
          p="6"
          w="fit-content"
          maxW="900px"
          transition="0.3s"
        >
          <Grid
            templateColumns="repeat(7, 1fr)"
            gap={3}
            minH="fit-content"
            h="75vh"
            minW="400px"
          >
            {data?.map((item) => (
              <Tooltip
                label={item.isBooked ? 'Booked' : 'Available'}
                aria-label="Seat status"
                key={item._id}
                hasArrow
                bg={item.isBooked ? 'yellow.400' : 'green.400'}
                color="white"
              >
                <Box transition="0.3s" _hover={{ transform: 'scale(1.1)' }}>
                  <Seat isBooked={item.isBooked} seatNumber={item.seatNumber} />
                </Box>
              </Tooltip>
            ))}
          </Grid>
        </Box>
  
        {/* Booking status summary */}
        <Flex
          mt="6"
          gap="4"
          justify="space-around"
          fontWeight="bold"
          color="gray.700"
          w="100%"
          maxW="900px"
        >
          <Text
            w="50%"
            textAlign="center"
            bg="#FFC107"
            rounded="lg"
            p="3"
            boxShadow="md"
          >
            Booked Seats = {booked}
          </Text>
          <Text
            w="50%"
            textAlign="center"
            bg="#6CAC48"
            rounded="lg"
            p="3"
            boxShadow="md"
            color="white"
          >
            Available Seats = {notBooked}
          </Text>
        </Flex>
      </Box>
    );
  }
  