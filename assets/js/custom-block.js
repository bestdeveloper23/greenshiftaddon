(function (blocks, element) {
    var el = element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;

    registerBlockType('custom-blocks/my-custom-block', {
        title: 'Bundle Products',
        icon: 'cart',
        category: 'common',
        edit: function () {
            return el('p', {}, 'Add the bundel product in linked and get the block on frontend');
        },
        save: function () {
            return el('p', {}, 'Hello, Custom Gutenberg Block on the frontend!');
        },
    });
})(
    window.wp.blocks,
    window.wp.element
);




