import {useInnerBlocksProps, useBlockProps} from '@wordpress/block-editor';
import {table} from "@wordpress/icons";
const { AnimationRenderProps } = gspblib.collections;
import classnames from "classnames";
import {
  __experimentalHasSplitBorders as hasSplitBorders
} from '@wordpress/components';

function save ( { attributes } ) {
  const { id, animation, hasFixedLayout, className, table_head_responsive, table_sorting } = attributes;

  let blockId = `gspb_id-${id}`;
  let blockClassName = `gspb-advancedtablebox ${blockId}`;
  blockClassName += table_head_responsive ? ' has-table-head-responsive' : ''

  let AnimationProps = {};
  AnimationProps = AnimationRenderProps(animation);

  const blockProps = useBlockProps.save({
    className: blockClassName,
  });
  const innerBlocksProps = useInnerBlocksProps.save();

  return (
    <>
      <div
        id={blockId}
        {...AnimationProps}
        {...blockProps}
      >
        <table
          className={classnames(
            {
              'has-fixed-layout': hasFixedLayout,
              'table-sort': table_sorting,
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
        </table>
      </div>
    </>
  );
}

export default save;