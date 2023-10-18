import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	store as blockEditorStore
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import {tool} from "@wordpress/icons";
import {useDispatch, useSelect} from "@wordpress/data";

// Import greenshift dependencies
const { gspb_setBlockId } = gspblib.utilities;

const {
	gspb_Css_Final
} = gspblib.utilities;

function edit(props) {

	const { attributes } = props;

	const {
		id, cellEl
	} = attributes;

	gspb_setBlockId(props);
	let blockId = `gspb_id-${id}`;
	let css_selector_by_user = `#${blockId}`;

	// Final CSS for the block
	let final_css = '';

	// Get The Stored CSS
	gspb_Css_Final(id, final_css, props);
	let editor_css = final_css;

	const blockProps = useBlockProps({
		className: '',
	});
	const MY_TEMPLATE = [
		['core/paragraph', { placeholder: 'Add content here or replace by custom block', align: 'center', fontSize: 'medium' }]
	];
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		template: MY_TEMPLATE
	});

	const { selectBlock } = useDispatch( blockEditorStore );

	const { tableClientId } = useSelect(
		( select ) => {
			const {
				getBlockParents,
				getSelectedBlockClientId,
			} = select( blockEditorStore );
			const selectedBlockClientId = getSelectedBlockClientId();
			const parents = getBlockParents( selectedBlockClientId );
			const _tableClientId = parents[0];
			return {
				tableClientId: _tableClientId
			};
		},
		[]
	);

	const TableTag = `${cellEl}`;

	return (
		<>
			<BlockControls group="other">
				<ToolbarButton
					icon={ tool }
					label={__('Select Table Styles', 'greenshiftaddon')}
					onClick={ () => selectBlock( tableClientId ) }
				/>
			</BlockControls>

			<TableTag {...innerBlocksProps}>

				{cellEl === 'td' ?
					<div className="td-responsive-wrapper">
						<div className="theading-content"></div>
						<div className="td-content">{innerBlocksProps.children}</div>
					</div>
					:
					<>
						{innerBlocksProps.children}

						<span className="sort-icon">↕️</span>
					</>
				}
				<style
					dangerouslySetInnerHTML={{
						__html: editor_css,
					}}
				/>
			</TableTag>
		</>
	);
}

export default edit;