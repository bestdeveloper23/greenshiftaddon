import { __ } from '@wordpress/i18n';
import edit from './edit';
import {registerBlockType} from '@wordpress/blocks';
import blockIcon from './icon';
const { collectionsObjects } = gspblib.helpers;
import './styles.editor.scss';
import save from "./save";

registerBlockType( 'greenshift-blocks/advanced-table', {
  category: 'greenShiftAddondev',
  icon: blockIcon,
  example: {},
  title: __('Advanced Table', 'greenshiftaddon'),
  description: __('Create structured content in rows and columns to display information.', 'greenshiftaddon'),
  keywords: [],
  usesContext: [ "postId", "postType" ],
  attributes: {
    id: {
      type: 'string',
      default: null,
    },
    inlineCssStyles: {
      type: 'string',
    },
    csstransform: {
      type: 'object',
      default: collectionsObjects.csstransform,
    },
    position: {
      type: 'object',
      default: collectionsObjects.position,
    },
    animation: {
      type: 'object',
      default: collectionsObjects.animation,
    },
    spacing: {
      type: 'object',
      default: collectionsObjects.spacing,
    },
    responsive: {
      type: 'object',
      default: collectionsObjects.responsive
    },
    shadow: {
      type: 'object',
      default: collectionsObjects.shadow,
    },
    border: {
      type: 'object',
      default: collectionsObjects.border,
    },
    background: {
      type: 'object',
      default: collectionsObjects.background,
    },
    typography: {
      type: 'object',
      default: collectionsObjects.typography,
    },
    loading: {
      type: 'boolean',
    },
    align: {
      type: 'string',
      default: '',
    },
    hasFixedLayout: {
      type: "boolean",
      default: false
    },
    // caption: {
    //   type: "string",
    //   source: "html",
    //   selector: "figcaption",
    //   default: ""
    // },
    rowCount: {
      type: 'string',
      default: '2'
    },
    columnCount: {
      type: 'string',
      default: '2'
    },
    initSetup: {
      type: 'boolean',
      default: true
    },
    global_borer_style: {
      type: 'string',
      default: 'borders'
    },
    colorBorder: {
      type: 'string',
      default: "#000",
    },
    stripesColor: {
      type: 'string',
      default: "#f9fafb",
    },
    styles_arr: {
      type: 'array',
      default: []
    },
    table_head_responsive: {
      type: 'boolean',
      default: false
    },
    table_sorting: {
      type: 'boolean',
      default: false
    },
    border_head: {
      type: 'object',
      default: collectionsObjects.border,
    },
    background_head: {
      type: 'object',
      default: collectionsObjects.background,
    },
    typography_head: {
      type: 'object',
      default: collectionsObjects.typography,
    },
    typography_responsive_labels: {
      type: 'object',
      default: collectionsObjects.typography,
    },
    size: {
      type: 'number',
      default: 768,
    },
    sizeUnit: {
      type: 'string',
      default: 'px',
    },
  },
  edit,
  save
});