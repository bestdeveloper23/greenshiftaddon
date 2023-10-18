import { __ } from '@wordpress/i18n';
import edit from './edit';
import {registerBlockType} from '@wordpress/blocks';
import blockIcon from './icon';
import './styles.editor.scss';
import attributes from './attributes';

registerBlockType( 'greenshift-blocks/exampledev', {
    category: 'greenShiftWoo',
    icon: blockIcon,
    example: {},
    title: __('Product Bundle', 'greenshiftaddon'),
    description: __('Product Bundle', 'greenshiftaddon'),
    keywords: [],
    attributes,
    edit,
    save: () => null
});