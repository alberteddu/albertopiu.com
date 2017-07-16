import ReactDOM from 'react-dom';
import React from 'react';
import DirectoryTree from 'components/DirectoryTree';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
    $('.directory-tree').each(function() {
        let el = $(this);

        ReactDOM.render(<DirectoryTree url={el.data('url')} />, this);
    });
});
