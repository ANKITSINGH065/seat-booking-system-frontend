import { Box, Text } from '@chakra-ui/react';
import React from 'react';

// Seat component that displays a seat number and its booking status
export default function Seat({ seatNumber, isBooked }) {
    return (
        <Box
            color="gray.700"
            h="fit-content"
            w="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="1"
            bg={isBooked ? "#FFC107" : "#6CAC48"}
            rounded="lg"
        >
            <Text align="center" fontSize="md" as="b">
                {seatNumber}
            </Text>
        </Box>
    );
}
