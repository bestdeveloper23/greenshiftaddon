import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import {registerBlockType} from '@wordpress/blocks';
import blockIcon from './icon';
import './styles.editor.scss';

registerBlockType( 'greenshift-blocks/tablecell', {
    category: 'greenShiftAddondev',
    apiVersion: 2,
    icon: blockIcon,
    example: {},
    title: __('Table Cell', 'greenshiftaddon'),
    description: __('Table Cell', 'greenshiftaddon'),
    keywords: [],
    usesContext: [ "postId", "postType" ],
    parent: ['greenshift-blocks/tablerow'],
    attributes: {
		id: {
			type: 'string',
			default: null,
		},
		inlineCssStyles: {
			type: 'string',
		},
    cellEl: {
      default: 'td',
      type: 'string',
    },
	},
	edit,
  save
});