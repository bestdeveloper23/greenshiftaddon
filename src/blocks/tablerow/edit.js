import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

// Import greenshift dependencies
const { gspb_setBlockId } = gspblib.utilities;

const {
	gspb_Css_Final
} = gspblib.utilities;

function edit(props) {

	const { attributes, clientId } = props;

	const {
		id, columnCount, cellEl
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
	const ALLOWED_BLOCKS = ['greenshift-blocks/tablecell'];

	const TEMPLATE = Array(parseInt(columnCount)).fill(0).map((_, tabIndex) => (
		['greenshift-blocks/tablecell', {cellEl: cellEl}])
	);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		template: TEMPLATE,
		templateLock: false,
	});

	return (
		<>
			<tr
				{...innerBlocksProps}

				data-client-id={clientId}
			>
				{innerBlocksProps.children}
				<style
					dangerouslySetInnerHTML={{
						__html: editor_css,
					}}
				/>
			</tr>
		</>
	);
}

export default edit;