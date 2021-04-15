import { create } from '@storybook/theming';
import logo from '../assets/IngredUi/logoIngredUi.png';

export default create({
    base: 'light',
  
    colorPrimary: '#eb0a4e',
    colorSecondary: '#0b82f4',
  
    // UI
    appBg: '#fff',
    appContentBg: '#fff',
    appBorderColor: '#d1d5da',
    appBorderRadius: 8,
  
    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',
  
    // Text colors
    textColor: '#041c33',
    textInverseColor: 'rgba(255,255,255,0.9)',
  
    // Toolbar default and active colors
    barTextColor: '#041c33',
    barSelectedColor: '#041c33',
    barBg: '#f5f7f8',
  
    // Form colors
    inputBg: '#fff',
    inputBorder: '#b3bac1',
    inputTextColor: '#041c33',
    inputBorderRadius: 8,
  
    brandTitle: 'INGRED UI',
    brandUrl: 'https://github.com/voyagegroup/ingred-ui',
    brandImage: logo,
  });