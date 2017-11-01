import color from 'color';

// These are the theme colors for Android
// see https://material.io/guidelines/style/color.html#color-color-palette
const primaryColor = '#673AB7';
const revPrimaryColor = '#EDE7F6';
const secondaryColor = '#FFC107';
const revSecondaryColor = '#795548';

export default {
    headerBackgroundColor: primaryColor,
    headerForegroundColor: revPrimaryColor,
    actionButtonColor: primaryColor,
    fieldIdColor: color(primaryColor).lighten(0.5).string()
};
