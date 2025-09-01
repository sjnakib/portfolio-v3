### UI Components

#### Reusable Components
The portfolio utilizes a system of reusable UI components to ensure consistency and maintainability:

- **HoverableCard Component**
  - Provides consistent card styling across the application
  - Props:
    - `children`: React nodes to be rendered inside the card
    - `className`: Additional CSS classes for customization
    - `noPadding`: Boolean to remove default padding
    - `noHover`: Boolean to disable hover animations
  - Features:
    - Consistent border styling (border-primary/20)
    - Hover animations (translate-y-1, shadow-md, border-primary/40)
    - Smooth transitions (duration-300)
    - Rounded corners (rounded-md)

- **CardCorners Component**
  - Provides decorative corner accents for cards and images
  - Props:
    - `className`: For customizing size and z-index
  - Features:
    - Consistent corner styling across the application
    - Primary color accents (border-primary/40)
    - Positioning in all four corners

These reusable components ensure visual consistency while reducing code duplication and making future style updates more efficient. By centralizing hover animations and card styling in dedicated components, the codebase becomes more maintainable and the UI more consistent.
