/**
	* Icon box Block
	*/

// Import Styles
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { useEffect, useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

// import * as THREE from 'three';


// Import block dependencies
import attributes from './components/attributes';
import ModelBox from './components/ModelBox';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { gspb_setBlockId } = gspblib.utilities;
const { BlockToolBar } = gspblib.components;
const { AnimationWrapper } = gspblib.collections;

// Register Block
registerBlockType('greenshift-blocks/modelviewer2', {
	title: __('3D Model Viewer2'),
	description: __('Gltf, Glb model viewer with AR'),
	icon: blockIcon,
	category: 'greenShiftAddondev',
	keywords: ['3d', 'gltf', 'glb'],
	supports: {
		align: ['wide', 'full']
	},

	usesContext: ["postId", "postType", "greenshiftquery_post_type", "repeaterArray"],

	// Define attributes
	attributes: attributes,

	edit(props) {
		const {
			attributes: {
				td_rx,
				td_ry,
				td_rz,
				td_mmove,
				td_variants,
			}
		} = props;
		// Generate Unique ID for The Block
		useEffect(() => {
			gspb_setBlockId(props);
		}, []);

		const ModelRef = useRef();
		const animateid = useRef();

		useEffect(() => {
			const { ownerDocument } = ModelRef.current;
			const body = ownerDocument.body;
			var loadedtdel = false;

			const onInteraction = () => {
				if (loadedtdel === true) {
					return;
				}
				loadedtdel = true;

				if (body.querySelector('#gs-modelviewer-script') === null) {
					const modelViewerScript = document.createElement("script");
					modelViewerScript.type = "module";
					modelViewerScript.src = greenShift_params.pluginURL + "libs/modelviewer/model-viewer.min.js";
					modelViewerScript.id = 'gs-modelviewer-script';
					body.appendChild(modelViewerScript);
				}


			};

			const onProgress = (event) => {

				const progressBar = event.target.querySelector(".progress-bar");
				const updatingBar = event.target.querySelector(".update-bar");
				updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
				if (event.detail.totalProgress == 1) {
					progressBar.classList.add("hide");
				}
			};

			body.addEventListener("mouseover", onInteraction, { once: true });
			body.addEventListener("touchmove", onInteraction, { once: true });
			body.addEventListener("scroll", onInteraction, { once: true });
			body.addEventListener("keydown", onInteraction, { once: true });
			var requestIdleCallback = window.requestIdleCallback || function (cb) {
				const start = Date.now();
				return setTimeout(function () {
					cb({
						didTimeout: false,
						timeRemaining: function () {
							return Math.max(0, 50 - (Date.now() - start));
						},
					});
				}, 1);
			};

			(() => {
				const modelViewer = ModelRef.current.querySelector(".gsmodelviewer");
				modelViewer.addEventListener('load', () => { 
					// const $scene = Object.getOwnPropertySymbols(modelViewer).filter(symbol => symbol.description === 'scene')[0]; 
					// const scene = modelViewer.getScene(); 
					// console.log(scene); 
					const modelss = modelViewer.model.object;
					
					const materiall = modelViewer.model['hierarchy'];

					console.log(modelViewer.model, materiall)
					if (modelss) {
						// Iterate over the objects and perform operations
						modelss.traverse((object) => {
							// Access each object and perform operations as needed
							console.log(object);
						});
					}
				});
				if (modelViewer) {
					modelViewer.addEventListener("progress", onProgress);
					const time = performance.now();
					let td_rx = modelViewer.getAttribute("data-rx");
					let td_ry = modelViewer.getAttribute("data-ry");
					let td_rz = modelViewer.getAttribute("data-rz");
					let td_scale = modelViewer.getAttribute("data-scale");
					let td_camera = modelViewer.getAttribute("data-camera");
					let td_variants = modelViewer.getAttribute("data-variants");
					let td_mousemove = modelViewer.getAttribute("data-mousemove");
					let td_loaditer = modelViewer.getAttribute("data-loaditer");

					if (td_loaditer) {
					} else {
						requestIdleCallback(function () {
							onInteraction();
						}, {
							timeout: 2500
						});
					}
					let mouseX = 0;
					let mouseY = 0;
					let windowHalfX = window.innerWidth / 2;
					let windowHalfY = window.innerHeight / 2;
					document.addEventListener("mousemove", function (event) {

						mouseX = (event.clientX - windowHalfX);
						mouseY = (event.clientY - windowHalfY);

					});
					if (td_scale) {
						modelViewer.scale = `${td_scale} ${td_scale} ${td_scale}`;
					}
					if (td_variants) {
						const select = ModelRef.current.querySelector(".gsvariantselect");
						modelViewer.addEventListener("load", () => {
							const names = modelViewer.availableVariants;
							if (typeof names !== "undefined" && names.length > 0) {
								select.classList.remove("rhhidden");
								for (const name of names) {
									const option = document.createElement("option");
									option.value = name;
									option.textContent = name;
									select.appendChild(option);
								}
							}
						});
						select.addEventListener("input", (event) => {
							modelViewer.variantName = event.target.value;
						});
					}
					if (td_rx || td_ry || td_rz || td_mousemove) {
						const animate = (now) => {
							animateid.current = requestAnimationFrame(animate);
							if (typeof modelViewer.orientation !== "undefined") {
								let spaceorient = modelViewer.orientation.split(" ");
								if (typeof td_rx === "undefined") td_rx = 0;
								if (typeof td_ry === "undefined") td_ry = 0;
								if (typeof td_rz === "undefined") td_rz = 0;
								let rx = parseFloat(spaceorient[0]) + td_rx / 50;
								let ry = parseFloat(spaceorient[1]) + td_ry / 50;
								let rz = parseFloat(spaceorient[2]) + td_rz / 50;
								if (td_mousemove) {
									rz += 0.05 * (mouseX * td_mousemove / 1000 - rz);
									ry += 0.05 * (mouseY * td_mousemove / 1000 - ry);
								}
								modelViewer.orientation = `${rx}deg ${ry}deg ${rz}deg`;
								if (!td_camera) {
									modelViewer.updateFraming();
								}

							}
						};

						const stopanimate = () => {
							cancelAnimationFrame(animateid.current);
						}
						if (typeof modelViewer.orientation !== "undefined") {
							modelViewer.orientation = `0deg 0deg 0deg`;
						}
						stopanimate();
						animate();

					}
				}

			})();
		}, [td_rx, td_ry, td_rz, td_mmove, td_variants]);

		const wrapperBlockProps = useBlockProps({
			"data-gspb-block-id": props.attributes.id
		});
		wrapperBlockProps.className = wrapperBlockProps.className.replace(props.attributes.className, '');

		return (
			<div {...wrapperBlockProps}>
				<Inspector {...props} />
				<BlockToolBar {...props} />

				<AnimationWrapper attributes={props.attributes} props={props}>
					<div ref={ModelRef}>
						<ModelBox editor={true} {...props} />
					</div>
				</AnimationWrapper>
			</div>
		);
	},

	save(props) {
		// Save container
		return <ModelBox {...props} />;
	},
});
