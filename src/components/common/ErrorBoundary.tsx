import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Here you could send error to logging service
    // logErrorToService(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={8}
        >
          <VStack spacing={6} textAlign="center" maxW="md">
            <Heading size="lg" color="red.500">
              Oops! Something went wrong
            </Heading>
            
            <Text color="gray.600">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Text>

            {import.meta.env.DEV && this.state.error && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                border="1px solid"
                borderColor="red.200"
                textAlign="left"
                fontSize="sm"
                fontFamily="mono"
                maxW="100%"
                overflow="auto"
              >
                <Text fontWeight="bold" mb={2}>
                  Error Details:
                </Text>
                <Text>{this.state.error.message}</Text>
                {this.state.error.stack && (
                  <Text mt={2} fontSize="xs" color="gray.600">
                    {this.state.error.stack}
                  </Text>
                )}
              </Box>
            )}

            <VStack spacing={3}>
              <Button colorScheme="blue" onClick={this.handleReload}>
                Refresh Page
              </Button>
              <Button variant="outline" onClick={this.handleReset}>
                Try Again
              </Button>
            </VStack>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
