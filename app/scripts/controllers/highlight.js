document.addEventListener('click', function (e) {
    if (e.target.localName == 'a') {
        highlight(e.target);
    }

    function highlight(node) {
        var items = document.querySelectorAll('.menuList');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('activate');
        }
        node.parentNode.classList.add('activate');
    }
});