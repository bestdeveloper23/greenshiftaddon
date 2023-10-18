import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import {registerBlockType} from '@wordpress/blocks';
import blockIcon from './icon';
import './styles.editor.scss';

registerBlockType( 'greenshift-blocks/tablethead', {
    category: 'greenShiftAddondev',
    apiVersion: 2,
    icon: blockIcon,
    example: {},
    title: __('Table Thead', 'greenshiftaddon'),
    description: __('Table Thead', 'greenshiftaddon'),
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
	},
    edit,
    save
});