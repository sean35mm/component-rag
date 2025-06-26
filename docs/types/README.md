# TypeScript Types Documentation

This section contains comprehensive documentation for all TypeScript types, interfaces, and enums used throughout the Perigon application.

## Overview

The type system is organized into logical categories that reflect the application's domain model and architecture:

### Core Domain Types

- **Articles & News**: Types for news articles, stories, and content
- **Authentication**: User accounts, organizations, and access control
- **Signals**: Real-time monitoring and alerting system
- **Search**: Search functionality and filtering
- **Billing**: Subscription management and payment processing

### Infrastructure Types

- **API**: Request/response types and endpoint definitions
- **Database**: Entity relationships and data models
- **UI**: Component props and state management
- **Utilities**: Helper types and generic utilities

## Type Safety Approach

The codebase follows strict TypeScript practices:

- **Discriminated Unions**: Used extensively for type-safe state management
- **Generic Types**: Reusable type patterns for common operations
- **Branded Types**: Enhanced type safety for IDs and specific values
- **Utility Types**: Custom utility types for common transformations

## Key Patterns

### Enum Usage

- Const enums for compile-time optimization
- String enums for runtime safety
- Numeric enums for specific use cases

### Interface Design

- Composition over inheritance
- Clear property naming conventions
- Optional vs required property patterns

### Type Guards

- Runtime type checking patterns
- Validation integration
- Error handling with types

## Integration Points

Types are integrated throughout the application:

- **Services**: API layer type definitions
- **Components**: Props and state typing
- **Hooks**: Query and mutation typing
- **Stores**: State management typing

## Documentation Structure

Each type file is documented with:

- Purpose and usage context
- Property definitions and requirements
- Usage examples and patterns
- Related types and dependencies
- Integration points across the application

Browse the individual type documentation files to understand specific implementations and usage patterns.
