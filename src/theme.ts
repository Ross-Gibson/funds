import { DynamicValue } from 'react-native-dark-mode';

const AppLightTheme = {
  colors: {
    accent: '#4285F4', // secondary color for your app which complements the primary color.
    backdrop: 'rgba(0, 0, 0, 0.5)', // color for backdrops of various components such as modals.
    background: '#F6F6F6', // background color for pages, such as lists.
    disabled: 'rgba(0, 0, 0, 0.26)', // color for disabled elements.
    error: '#EA4335',
    notification: '#34A853',
    placeholder: 'rgba(0, 0, 0, 0.54)', // color for placeholder text, such as input placeholder.
    primary: '#FF3366', // primary color for your app, usually your brand color.
    surface: '#F9F9F9', // background color for elements containing content, such as cards.
    text: '#242424', // text color for content.
  },
  dark: false, // whether this is a dark theme or light theme.
  fonts: {
    light: 'HelveticaNeue-Light',
    medium: 'HelveticaNeue-Medium',
    regular: 'Helvetica Neue',
    thin: 'HelveticaNeue-Thin',
  },
  roundness: 3, // roundness of common elements, such as buttons.
};

const AppDarkTheme = {
  colors: {
    accent: '#4285F4',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#242424',
    disabled: 'rgba(255, 255, 255, 0.3)',
    error: '#EA4335',
    notification: '#34A853',
    placeholder: 'rgba(255, 255, 255, 0.54)',
    primary: '#FF3366',
    surface: '#7B7B7B',
    text: '#F6F6F6',
  },
  dark: true,
  fonts: {
    light: 'HelveticaNeue-Light',
    medium: 'HelveticaNeue-Medium',
    regular: 'Helvetica Neue',
    thin: 'HelveticaNeue-Thin',
  },
  roundness: 3,
};

export const AppTheme = new DynamicValue(AppLightTheme, AppDarkTheme);

const NavigationLightTheme = {
  dark: false,
  colors: {
    primary: AppLightTheme.colors.primary, // The primary color of the app used to tint various elements.
    background: AppLightTheme.colors.background, // The color of various backgrounds, such as background color for the screens.
    card: AppLightTheme.colors.background, // The background color of card-like elements, such as headers, tab bars etc.
    text: AppLightTheme.colors.text, // The text color of various elements.
    border: AppLightTheme.colors.backdrop, // The color of borders, e.g. header border, tab bar border etc.
  },
};

const NavigationDarkTheme = {
  dark: true,
  colors: {
    primary: AppDarkTheme.colors.primary, // The primary color of the app used to tint various elements.
    background: AppDarkTheme.colors.background, // The color of various backgrounds, such as background color for the screens.
    card: AppDarkTheme.colors.background, // The background color of card-like elements, such as headers, tab bars etc.
    text: AppDarkTheme.colors.text, // The text color of various elements.
    border: AppDarkTheme.colors.backdrop, // The color of borders, e.g. header border, tab bar border etc.
  },
};

export const NavigationTheme = new DynamicValue(
  NavigationLightTheme,
  NavigationDarkTheme,
);
