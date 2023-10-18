import {useInnerBlocksProps, useBlockProps} from '@wordpress/block-editor';

function save ( { attributes } ) {
  const { cellEl } = attributes;

  const TableTag = `${cellEl}`;

  const blockProps = useBlockProps.save( {
    className: '',
  } );
  const innerBlocksProps = useInnerBlocksProps.save( blockProps );

  return (
    <>
      {cellEl === 'td' ?
        <TableTag {...innerBlocksProps}>
          <div className="td-responsive-wrapper">
            <div className="theading-content"></div>
            <div className="td-content">{innerBlocksProps.children}</div>
          </div>
        </TableTag>
        :
        <>
          <TableTag {...innerBlocksProps} />
        </>
      }

    </>
  )
}

export default save;