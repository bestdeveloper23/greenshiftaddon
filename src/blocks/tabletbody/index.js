import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import {registerBlockType} from '@wordpress/blocks';
import blockIcon from './icon';
import './styles.editor.scss';

registerBlockType( 'greenshift-blocks/tabletbody', {
    category: 'greenShiftAddondev',
    apiVersion: 2,
    icon: blockIcon,
    example: {},
    title: __('Table Tbody', 'greenshiftaddon'),
    description: __('Table Tbody', 'greenshiftaddon'),
    keywords: [],
    usesContext: [ "postId", "postType" ],
    parent: ['greenshift-blocks/advanced-table'],
    attributes: {
		id: {
			type: 'string',
			default: null,
		},
		inlineCssStyles: {
			type: 'string',
		},
    columnCount: {
      type: 'string',
      default: '2'
    },
    rowCount: {
      type: 'string',
      default: '2'
    },
	},
    edit,
    save
});