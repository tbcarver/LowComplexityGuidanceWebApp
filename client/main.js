
// NOTE: This file is for client features that should be available on every server side served webpage.
//  Features that are for a single page should have there own js entry point file and webpack configuration.

// Import all sass sources here for use with webpack
// These are output into a assets/dist/main.css file with a cache busting hash
import style from './sass/main.scss';

// Import in all client web components
import MessageBox from "./webComponents/messageBoxes/messageBox.component";
import MessageBoxClosable from "./webComponents/messageBoxes/messageBoxClosable.component";