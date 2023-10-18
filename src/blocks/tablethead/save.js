import {useInnerBlocksProps, useBlockProps} from '@wordpress/block-editor';

function save ( ) {

  const blockProps = useBlockProps.save( {
    className: '',
  } );
  const innerBlocksProps = useInnerBlocksProps.save( blockProps );

  return <thead {...innerBlocksProps} />
}

export default save;