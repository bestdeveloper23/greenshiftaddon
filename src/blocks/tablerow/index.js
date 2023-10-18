import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import {registerBlockType} from '@wordpress/blocks';
import blockIcon from './icon';
import './styles.editor.scss';

registerBlockType( 'greenshift-blocks/tablerow', {
    category: 'greenShiftAddondev',
    apiVersion: 2,
    icon: blockIcon,
    example: {},
    title: __('Table Row', 'greenshiftaddon'),
    description: __('Table Row', 'greenshiftaddon'),
    keywords: [],
    usesContext: [ "postId", "postType" ],
    parent: ['greenshift-blocks/tabletbody'],
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
    cellEl: {
      default: 'td',
      type: 'string',
    },
	},
    edit,
    save
});