import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
	BlockIcon,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Placeholder,
	Button,
	__experimentalHasSplitBorders as hasSplitBorders,
	ToolbarDropdownMenu,
	SelectControl,
	ToggleControl,
	RangeControl
} from '@wordpress/components';
import {
	blockTable as icon,
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
	table,
} from '@wordpress/icons';

import classnames from "classnames";

// Import greenshift dependencies
const { gspb_setBlockId } = gspblib.utilities;
const { BlockToolBar, CssUnits } = gspblib.components;
const {
	CssTransform,
	Position,
	Animation,
	Spacing,
	Responsive,
	Shadow,
	Border,
	Background,
	Typography
} = gspblib.collections;

const {
	gspb_csstransform_cssGen,
	gspb_position_cssGen,
	aos_animation_cssGen,
	gspb_spacing_cssGen,
	gspb_responsive_cssGen,
	gspb_shadow_cssGen,
	gspb_border_cssGen,
	gspb_background_cssGen,
	gspb_typography_cssGen,

	gspb_Css_Final
} = gspblib.utilities;
const { InspectorTabs, InspectorTab, StylesforBlock, BlpgeColorPicker, RadioAdvanced } = gspblib.components;
const { gspb_cssGen, collectionsObjects } = gspblib.helpers;
const { AnimationWrapper, AnimationRenderProps } = gspblib.collections;

function edit(props) {

	const { attributes, setAttributes, className, clientId, context } = props;
	const {
		id, csstransform, position, animation, spacing, responsive, shadow, border, background, typography, align,
		// loading,
		hasFixedLayout, rowCount, columnCount, initSetup, global_borer_style, colorBorder, stripesColor,
		styles_arr,
		table_head_responsive, typography_head, border_head, background_head, typography_responsive_labels,
		size, sizeUnit, table_sorting
		// caption

	} = attributes;

	const ALIGNMENT_CONTROLS = [
		{
			icon: 'editor-alignleft',
			title: __('Align Text Left', 'greenshift'),
			align: 'flex-start',
		},
		{
			icon: 'editor-aligncenter',
			title: __('Align Text Center', 'greenshift'),
			align: 'center',
		},
		{
			icon: 'editor-alignright',
			title: __('Align Text Right', 'greenshift'),
			align: 'flex-end',
		}
	];

	gspb_setBlockId(props);
	let blockId = `gspb_id-${id}`;
	let blockClassName = `gspb-advancedtablebox ${blockId} ${className}`;
	let css_selector_by_user = `#${blockId}`;

	const { replaceInnerBlocks } = useDispatch("core/block-editor");

	//Render Animation Properties
	let AnimationProps = {};
	AnimationProps = AnimationRenderProps(animation);

	// Final CSS for the block
	let final_css = `${css_selector_by_user} tbody .theading-content {display: none}`;

	if(global_borer_style === 'borders' || global_borer_style === 'borders_and_stripes') {
		final_css += `${css_selector_by_user} table, ${css_selector_by_user} table tr, ${css_selector_by_user} table td, ${css_selector_by_user} table th {border-color: ${colorBorder};}`
	}

	if(global_borer_style === 'stripes' || global_borer_style === 'borders_and_stripes') {
		final_css += `${css_selector_by_user} table tbody tr:nth-child(even){background-color: ${stripesColor};}`
	}

	if(global_borer_style === 'clean' || global_borer_style === 'stripes'){
		final_css += `${css_selector_by_user} table, ${css_selector_by_user} table tr, ${css_selector_by_user} table td, ${css_selector_by_user} table th {border: none;}`
	}

	if(table_sorting) {
		final_css += `${css_selector_by_user} thead th{position:relative} ${css_selector_by_user} thead th .sort-icon {
		display:block;
		position: absolute;
    right: 10px;
    top: 45%;
    z-index: 99;}`
	} else {
		final_css += `${css_selector_by_user} thead th .sort-icon {display:none;}`
	}

	// Css transform
	final_css = gspb_csstransform_cssGen(
		csstransform,
		css_selector_by_user,
		final_css,
		animation
	);

	// Position
	final_css = gspb_position_cssGen(
		position,
		'body.gspb-bodyfront ' + css_selector_by_user,
		final_css,
	);

	// Animation
	final_css = aos_animation_cssGen(
		animation,
		css_selector_by_user,
		final_css
	);

	// Spacing
	final_css = gspb_spacing_cssGen(
		spacing,
		css_selector_by_user,
		final_css
	);

	// Responsive classes
	final_css = gspb_responsive_cssGen(
		responsive,
		css_selector_by_user,
		final_css,
	);

	// Shadow
	final_css = gspb_shadow_cssGen(
		shadow,
		css_selector_by_user,
		final_css
	);

	// Border
	final_css = gspb_border_cssGen(
		border,
		css_selector_by_user,
		final_css
	);

	// Background
	final_css = gspb_background_cssGen(
		background,
		css_selector_by_user,
		final_css
	);

	// Typography
	final_css = gspb_typography_cssGen(
		typography,
		`${css_selector_by_user} table`,
		final_css
	);

	//Align
	final_css = gspb_cssGen(
		`${css_selector_by_user}`,
		['display', 'align-items', 'justify-content'],
		["flex", "center", align],
		final_css
	);

	if(table_head_responsive) {
		// Border
		final_css = gspb_border_cssGen(
			border_head,
			`${css_selector_by_user} table thead`,
			final_css
		);

		// Background
		final_css = gspb_background_cssGen(
			background_head,
			`${css_selector_by_user} table thead tr th`,
			final_css
		);

		// Typography
		final_css = gspb_typography_cssGen(
			typography_head,
			`${css_selector_by_user} table thead tr th`,
			final_css
		);

		// Typography for responsive heading
		final_css = gspb_typography_cssGen(
			typography_responsive_labels,
			`${css_selector_by_user} tbody .theading-content`,
			final_css
		);


		final_css += `@media screen and (max-width: ${size}${sizeUnit}) {
			${css_selector_by_user} table {border: 0;}
			${css_selector_by_user} thead {display: none}
			${css_selector_by_user} tbody .theading-content {display: block}
			${css_selector_by_user} tbody .td-content {word-break: break-word;}
			${css_selector_by_user} tbody tr {display: block;margin-bottom: 0.625em;}
			${css_selector_by_user} tbody td {display: block;}
			${css_selector_by_user} tbody td .td-responsive-wrapper {display: flex;justify-content: space-between;align-items: center;}
		}`;
	}

	if(!initSetup && styles_arr.length) {
		for (let i = 0; i < styles_arr.length; i++) {
			if(styles_arr[i].style_type === 'row'){
				// Background
				final_css = gspb_background_cssGen(
					styles_arr[i].background,
					css_selector_by_user + ' tbody tr:nth-child('+styles_arr[i].select_number+')',
					final_css
				);

				// Typography
				final_css = gspb_typography_cssGen(
					styles_arr[i].typography,
					css_selector_by_user + ' tbody tr:nth-child('+styles_arr[i].select_number+')',
					final_css
				);
			} else if(styles_arr[i].style_type === 'column'){
				// Background
				final_css = gspb_background_cssGen(
					styles_arr[i].background,
					css_selector_by_user + ' tbody tr td:nth-child('+styles_arr[i].select_number+')',
					final_css
				);

				// Typography
				final_css = gspb_typography_cssGen(
					styles_arr[i].typography,
					css_selector_by_user + ' tbody tr td:nth-child('+styles_arr[i].select_number+')',
					final_css
				);
			}

		}
	}


	// Get The Stored CSS
	gspb_Css_Final(id, final_css, props);
	let editor_css = final_css;

	// Position
	editor_css = gspb_position_cssGen(
		position,
		'#block-' + clientId,
		editor_css,
	);

	const tableControls = [
		{
			icon: tableRowBefore,
			title: __( 'Insert row before', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onInsertRowBefore,
		},
		{
			icon: tableRowAfter,
			title: __( 'Insert row after', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onInsertRowAfter,
		},
		{
			icon: tableRowDelete,
			title: __( 'Delete first row', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onDeleteFirstRow,
		},
		{
			icon: tableRowDelete,
			title: __( 'Delete last row', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onDeleteLastRow,
		},
		{
			icon: tableColumnBefore,
			title: __( 'Insert column before', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onInsertColumnBefore,
		},
		{
			icon: tableColumnAfter,
			title: __( 'Insert column after', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onInsertColumnAfter,
		},
		{
			icon: tableColumnDelete,
			title: __( 'Delete first column', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onDeleteFirstColumn,
		},
		{
			icon: tableColumnDelete,
			title: __( 'Delete last column', 'greenshiftaddon' ),
			// isDisabled: ! selectedCell,
			onClick: onDeleteLastColumn,
		},
	];

	let tableClasses = table_head_responsive ? 'has-table-head-responsive' : '';
	tableClasses += table_sorting ? ' table-sort' : ''

	const blockProps = useBlockProps({
		className: tableClasses,
	});

	const TEMPLATE = [['greenshift-blocks/tabletbody', { rowCount: rowCount, columnCount: columnCount }]];

	if(table_head_responsive) {
		TEMPLATE.unshift(['greenshift-blocks/tablethead', {columnCount: columnCount}]);
	}

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{ allowedBlocks: ['greenshift-blocks/tabletbody', 'greenshift-blocks/tablethead'], template: TEMPLATE, templateLock: 'all' }
	);

	const advancedTableBlock = useSelect((select) => {
		return select('core/block-editor').getBlock(clientId);
	}, []); //Get Block by ID

	const advancedTableBlockInnerBlocks = JSON.parse(JSON.stringify(advancedTableBlock.innerBlocks));

	useEffect(() => {
		if(!initSetup && advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody') !== undefined) {
			setAttributes({
				rowCount: advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.length + '',
			});
		}
	}, [advancedTableBlockInnerBlocks]);

	function onInsertRowAfter() {
			// setAttributes({
			// 	rowCount: parseInt(rowCount) + 1 + '',
			// });
			advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.push(createBlock('greenshift-blocks/tablerow', {columnCount: columnCount}));
			replaceInnerBlocks(clientId, advancedTableBlockInnerBlocks, false);
	}

	function onInsertRowBefore() {
		// setAttributes({
		// 	rowCount: parseInt(rowCount) + 1 + '',
		// });
		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.unshift(createBlock('greenshift-blocks/tablerow', {columnCount: columnCount}));
		replaceInnerBlocks(clientId, advancedTableBlockInnerBlocks, false);
	}

	function onDeleteLastRow () {
		if(parseInt(rowCount) === 0) return false;
		setAttributes({
			rowCount: parseInt(rowCount) - 1 + '',
		});
		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.pop();
		replaceInnerBlocks(clientId, advancedTableBlockInnerBlocks, false);
	}

	function onDeleteFirstRow () {
		if(parseInt(rowCount) === 0) return false;
		setAttributes({
			rowCount: parseInt(rowCount) - 1 + '',
		});
		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.shift();
		replaceInnerBlocks(clientId, advancedTableBlockInnerBlocks, false);
	}

	function onInsertColumnBefore () {
		setAttributes({
			columnCount: parseInt(columnCount) + 1 + '',
		});

		// head blocks
		if(table_head_responsive){
			const headCells = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].innerBlocks));
			headCells.unshift(createBlock('greenshift-blocks/tablecell', {cellEl: 'th'}));
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].clientId, headCells, false);
		}

		// bode blocks
		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.map((_, tabIndex) => {
			const innerBlocks = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].innerBlocks))

			innerBlocks.unshift(createBlock('greenshift-blocks/tablecell', {}));
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].clientId, innerBlocks, false);
		})
	}

	function onInsertColumnAfter () {
		setAttributes({
			columnCount: parseInt(columnCount) + 1 + '',
		});

		// head blocks
		if(table_head_responsive){
			const headCells = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].innerBlocks));
			headCells.push(createBlock('greenshift-blocks/tablecell', {cellEl: 'th'}));
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].clientId, headCells, false);
		}

		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.map((_, tabIndex) => {
			const innerBlocks = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].innerBlocks))

			innerBlocks.push(createBlock('greenshift-blocks/tablecell', {}));
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].clientId, innerBlocks, false);
		})
	}

	function onDeleteLastColumn () {
		if(parseInt(columnCount) === 0) return false;

		setAttributes({
			columnCount: parseInt(columnCount) - 1 + '',
		});

		// head blocks
		if(table_head_responsive){
			const headCells = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].innerBlocks));
			headCells.pop();
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].clientId, headCells, false);
		}

		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.map((_, tabIndex) => {
			const innerBlocks = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].innerBlocks))

			innerBlocks.pop();
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].clientId, innerBlocks, false);
		})
	}

	function onDeleteFirstColumn () {
		if(parseInt(columnCount) === 0) return false;
		setAttributes({
			columnCount: parseInt(columnCount) - 1 + '',
		});

		// head blocks
		if(table_head_responsive){
			const headCells = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].innerBlocks));
			headCells.shift();
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tablethead').innerBlocks[0].clientId, headCells, false);
		}

		advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks.map((_, tabIndex) => {
			const innerBlocks = JSON.parse(JSON.stringify(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].innerBlocks))

			innerBlocks.shift();
			replaceInnerBlocks(advancedTableBlockInnerBlocks.find(x => x.name === 'greenshift-blocks/tabletbody').innerBlocks[tabIndex].clientId, innerBlocks, false);
		})
	}

	function onTheadChange(val) {
		if(val) {
			advancedTableBlockInnerBlocks.unshift(createBlock('greenshift-blocks/tablethead', {columnCount: columnCount}));
			replaceInnerBlocks(clientId, advancedTableBlockInnerBlocks, false);
		} else {
			advancedTableBlockInnerBlocks.shift();
			replaceInnerBlocks(clientId, advancedTableBlockInnerBlocks, false);
		}
	}

	function updateStyles(key, nameAttr, value) {
		const newStyles = [...styles_arr]
		newStyles[key][nameAttr] = value
		setAttributes({styles_arr: newStyles})
	}

	const selectNumberOptionsRow = new Array(parseInt(rowCount)).fill().map((e,i) => {
		return {value: (i + 1), label: (i + 1)}
	});
	selectNumberOptionsRow.unshift({value: '', label: __('Select Number Of Row', 'greenshiftaddon')})

	const selectNumberOptionsColumn = new Array(parseInt(columnCount)).fill().map((e,i) => {
		return {value: (i + 1), label: (i + 1)}
	})
	selectNumberOptionsColumn.unshift({value: '', label: __('Select Number Of Column', 'greenshiftaddon')})

	const selectNumberOptions = {
		'row': selectNumberOptionsRow,
		'column': selectNumberOptionsColumn
	}


	const advancedResponsiveTables = document.querySelectorAll('.has-table-head-responsive')

	advancedResponsiveTables.forEach(function (currentTable) {
		currentTable.querySelectorAll('tbody tr').forEach((currentTr) => {
			currentTr.querySelectorAll('td').forEach((currentTd, index) => {
				if(currentTable.querySelectorAll('thead tr th')[index] !== undefined) {
					currentTd.querySelector('.theading-content').innerHTML = currentTable.querySelectorAll('thead tr th')[index].innerHTML;
				}
			})
		})
	})

	return (
		<>
			{!initSetup &&
				<BlockControls group="other">
						<ToolbarDropdownMenu
							hasArrowIndicator
							icon={ table }
							label={ __( 'Edit table', 'greenshiftaddon' ) }
							controls={ tableControls }
						/>
				</BlockControls>
			}

			<InspectorControls>
				<div className="gspb_inspector">
					<InspectorTabs tabs={['general', 'advance']}>
						<InspectorTab key={'general'}>
							<PanelBody title={__("Main Settings", 'greenshiftaddon')} initialOpen={true}>
								<ToggleControl
									label={__('Add Table head and Responsive table', 'greenshiftaddon')}
									checked={table_head_responsive}
									onChange={(value) => {
										onTheadChange(value)
										setAttributes({ table_head_responsive: value })
									}}
								/>

								{table_head_responsive &&
									<ToggleControl
										label={__('Enable Table sorting', 'greenshiftaddon')}
										checked={table_sorting}
										onChange={(value) => {setAttributes({ table_sorting: value })}}
									/>
								}
							</PanelBody>
							<PanelBody title={__("Global Border style", 'greenshiftaddon')} initialOpen={true}>
								<StylesforBlock
									columns={2}
									value={global_borer_style}
									options={[
										{ value: 'borders', label: __('Borders', 'greenshiftaddon') },
										{ value: 'stripes', label: __('Stripes', 'greenshiftaddon') },
										{ value: 'borders_and_stripes', label: __('Borders and stripes', 'greenshiftaddon') },
										{ value: 'clean', label: __('Clean', 'greenshiftaddon') },
									]}
									onChange={(value) => {
										setAttributes({ global_borer_style: value });
									}}
								/>

								{(global_borer_style === 'borders' || global_borer_style === 'borders_and_stripes') &&
									<>
										<div className="gspb_row gspb_row--no-padding-col" style={{ marginTop: 15 }}>
											<div className="gspb_row__col--6">
												<div>{__("Borders Color", "greenshiftaddon")}</div>
											</div>
											<div
												className="gspb_row__col--6"
												style={{ textAlign: 'right', justifyContent: 'flex-end' }}
											>
												<BlpgeColorPicker
													color={colorBorder}
													onChange={(value) =>
														setAttributes({ colorBorder: value.rgb ? `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})` : value })
													}
												/>
											</div>
										</div>
									</>
								}

								{(global_borer_style === 'stripes' || global_borer_style === 'borders_and_stripes') &&
									<>
										<div className="gspb_row gspb_row--no-padding-col" style={{ marginTop: 15 }}>
											<div className="gspb_row__col--6">
												<div>{__("Background Color", "greenshiftaddon")}</div>
											</div>
											<div
												className="gspb_row__col--6"
												style={{ textAlign: 'right', justifyContent: 'flex-end' }}
											>
												<BlpgeColorPicker
													color={stripesColor}
													onChange={(value) =>
														setAttributes({ stripesColor: value.rgb ? `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})` : value })
													}
												/>
											</div>
										</div>
									</>
								}

							</PanelBody>

							<PanelBody title={__("Columns/Row Styles", 'greenshiftaddon')} initialOpen={false}>
								<div className="gspb-additional-conditions">

									{styles_arr.length ? styles_arr.map((style, key) => {
										return (
											<div className="gspb-condition" key={key} style={{marginTop: '30px'}}>
												<div style={{marginBottom: 10, fontWeight: 'bold', textTransform: 'uppercase'}}>{style.title}</div>

												<RadioAdvanced
													label={''}
													fluid={'yes'}
													value={style.style_type}
													onChange={(value) => {
														updateStyles(key, 'style_type', value)
														updateStyles(key, 'select_number', 1)
													}}
													options={[
														{ label: __('Row', 'greenshift'), value: 'row', title: __('Row', 'greenshift') },
														{ label: __('Column', 'greenshift'), value: 'column', title: __('Column', 'greenshift') }
													]}
												/>

												<SelectControl
													label={__('Select number', 'greenshiftquery')}
													value={style.select_number}
													options={selectNumberOptions[style.style_type]}
													onChange={(value) => {
														updateStyles(key, 'select_number', value)
													}}
												/>


												<div style={{
													marginTop: '24px',
													fontSize: '13px',
													fontWeight: '500',
													color: 'rgb(30, 30, 30)'
												}}>{__("Background", "greenshiftaddon")}</div>

												<Background
													attributeName={styles_arr[key].background}
													exclude={['video']}
													onChange={(value) => {
														updateStyles(key, 'background', value)
													}}
													{...props}
												/>

												<div style={{
													marginTop: '24px',
													fontSize: '13px',
													fontWeight: '500',
													color: 'rgb(30, 30, 30)'
												}}>{__("Typography", "greenshiftaddon")}</div>

												<Typography
													attributeName={styles_arr[key].typography}
													includegradient={false}
													includeHoverlinks={false}
													onChange={(value) => {
														updateStyles(key, 'typography', value)
													}}
													{...props}
												/>

												{/*<div style={{*/}
												{/*	marginTop: '24px',*/}
												{/*	fontSize: '13px',*/}
												{/*	fontWeight: '500',*/}
												{/*	color: 'rgb(30, 30, 30)'*/}
												{/*}}>{__("Border", "greenshiftaddon")}</div>*/}

												{/*<Border*/}
												{/*	attributeName={styles_arr[key].border}*/}
												{/*	onChange={(value) => {*/}
												{/*		updateStyles(key, 'border', value)*/}
												{/*	}}*/}
												{/*	{...props}*/}
												{/*/>*/}

												<div style={{marginBottom: '20px'}}></div>

											</div>
										)
									}) : ''}

									{styles_arr.length ?
										<>
											<Button
												style={{marginTop: '10px', width: '100%', justifyContent: 'center'}}
												isDestructive
												onClick={() => setAttributes({styles_arr: styles_arr.slice(0, -1)})}
											>
												{__('Remove Style', 'greenshift')}
											</Button>
										</> : ''}
								</div>
								<Button
									style={{marginTop: '15px', width: '100%', justifyContent: 'center'}}
									isSecondary
									onClick={() => setAttributes({
										styles_arr: [
											...styles_arr,
											{
												title: __('Style #', 'greenshift') + (parseInt(styles_arr.length) + 1),
												style_type: 'row',
												select_number: '',
												background: {},
												border: {},
												typography: {},
											}
										]
									})
									}
								>
									{__('Add Style', 'greenshiftquery')}
								</Button>
							</PanelBody>

							{table_head_responsive &&
								<>
									<PanelBody title={__("Responsive table", 'greenshiftaddon')} initialOpen={false}>
										{/*style={{ marginTop: 10 }}*/}
										<div>
											<div style={{
												marginTop: '24px',
												fontSize: '13px',
												fontWeight: '500',
												color: 'rgb(30, 30, 30)'
											}}>{__("Breakpoint for responsive styles", "greenshiftaddon")}</div>
											<div className="gspb_row gspb_row--no-padding-col">
												<div className="gspb_row__col--7" />
												<div
													className="gspb_row__col--5"
													style={{
														justifyContent: 'space-between',
													}}
												>
													<div>
														<CssUnits
															units={['px']}
															attribute={sizeUnit}
															onChange={(value) => {
																setAttributes({
																	sizeUnit: value,
																});
															}}
														/>
														<div
															className="gspb_inspector_clear_btn--right"
															onClick={() => {
																setAttributes({
																	size: '768',
																});
															}}
														>
															<i className="rhicon rhi-undo" />
														</div>
													</div>
												</div>
												<div style={{ width: '100%' }}>
													<RangeControl
														value={size}
														onChange={(value) => {
															setAttributes({
																size: value,
															});
														}}
														trackColor='#2184f9'
														min={
															sizeUnit ==
															'px'
																? 320
																: 1
														}
														max={
															sizeUnit ==
															'px'
																? 3840
																: 100
														}
													/>
												</div>
											</div>
										</div>

										<div style={{
											marginTop: '24px',
											fontSize: '13px',
											fontWeight: '500',
											color: 'rgb(30, 30, 30)'
										}}>{__("Typography for responsive labels", "greenshiftaddon")}</div>
										<Typography
											attributeName="typography_responsive_labels"
											includegradient={false}
											includeHoverlinks={false}
											{...props}
										/>
									</PanelBody>

									<PanelBody title={__("Background for Head", 'greenshiftaddon')} initialOpen={false}>
										<Background
											attributeName="background_head"
											exclude={['video']}
											{...props}
										/>
									</PanelBody>

									<PanelBody title={__("Border for Head", 'greenshiftaddon')} initialOpen={false}>
										<Border attributeName="border_head" {...props} />
									</PanelBody>

									<PanelBody title={__("Typography for Head", 'greenshiftaddon')} initialOpen={false}>
										<Typography
											attributeName="typography_head"
											includegradient={false}
											includeHoverlinks={false}
											{...props}
										/>
									</PanelBody>
								</>
							}

							<PanelBody title={__("Typography", 'greenshiftaddon')} initialOpen={false}>
								<Typography
									attributeName="typography"
									includegradient={false}
									includeHoverlinks={false}
									{...props}
								/>
							</PanelBody>

							{ /* Spacing */}
							<PanelBody title={__("Block Spacing", 'greenshiftaddon')} initialOpen={false}>
								<Spacing attributeName="spacing" overflow={false} {...props} />
							</PanelBody>
							{ /* Background Settings */}
							<PanelBody
								title={__("Background and Opacity", 'greenshiftaddon')}
								initialOpen={false}
								className="gspb_inspector"
							>
								<Background
									attributeName="background"
									exclude={['video']}
									{...props}
								/>
							</PanelBody>

							{ /* Border Settings */}
							<PanelBody title={__("Border", 'greenshiftaddon')} initialOpen={false}>
								<Border attributeName="border" {...props} />
							</PanelBody>

							{ /* Shadow Settings */}
							<PanelBody title={__("Shadow", 'greenshiftaddon')} initialOpen={false}>
								<Shadow attributeName="shadow" {...props} predefined={true} />
							</PanelBody>

						</InspectorTab>
						<InspectorTab key={'advance'}>
							{ /* Animations Tab */}
							<PanelBody title={__("Animation", 'greenshiftaddon')} initialOpen={true}>
								<Animation
									attributeName="animation"
									{...props}
								/>
							</PanelBody>

							{ /* Css Transform */}
							<PanelBody title={__("Css Transform", 'greenshiftaddon')} initialOpen={false}>
								<CssTransform attributeName="csstransform" {...props} />
							</PanelBody>

							{ /* Position Tab */}
							<PanelBody title={__("Position", 'greenshiftaddon')} initialOpen={false}>
								<Position attributeName="position" {...props} />
							</PanelBody>

							{ /* Responsive */}
							<PanelBody title={__("Responsive and Custom css", 'greenshiftaddon')} initialOpen={false}>
								<Responsive attributeName="responsive" {...props} />
							</PanelBody>

						</InspectorTab>
					</InspectorTabs>
				</div>
			</InspectorControls>
			<BlockToolBar {...props} />
			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={align => setAttributes({ align })}
					alignmentControls={ALIGNMENT_CONTROLS}
				/>
			</BlockControls>
			<AnimationWrapper attributes={attributes} props={props}>
				<div
					id={blockId}
					className={blockClassName}
					{...AnimationProps}
				>
					{!initSetup && (
						<table
							className={classnames(
								// colorProps.className,
								// borderProps.className,
								{
									'has-table-head-responsive': table_head_responsive,
									'has-fixed-layout': hasFixedLayout,
									// This is required in the editor only to overcome
									// the fact the editor rewrites individual border
									// widths into a shorthand format.
									'has-individual-borders': hasSplitBorders(
										attributes?.style?.border
									),
								}
							)}
							{...innerBlocksProps}
						>
							{innerBlocksProps.children}
						</table>
					)}

					{initSetup && (
						<Placeholder
							label={__('Table')}
							icon={<BlockIcon icon={icon} showColors />}
							instructions={__('Insert a table for sharing data.')}
						>
							<form
								className="blocks-table__placeholder-form"
								onSubmit={() => setAttributes({ initSetup: false })}
							>
								<TextControl
									type="number"
									label={__('Column count')}
									value={columnCount}
									onChange={(value) => setAttributes({ columnCount: value + '' })}
									min="1"
									className="blocks-table__placeholder-input"
								/>
								<TextControl
									type="number"
									label={__('Row count')}
									value={rowCount}
									onChange={(value) => setAttributes({ rowCount: value + '' })}
									min="1"
									className="blocks-table__placeholder-input"
								/>
								<Button
									className="blocks-table__placeholder-button"
									variant="primary"
									type="submit"
								>
									{__('Create Table')}
								</Button>
							</form>
						</Placeholder>
					)}

					<style
						dangerouslySetInnerHTML={{
							__html: editor_css,
						}}
					/>
				</div>
			</AnimationWrapper>

		</>
	);
}

export default edit;