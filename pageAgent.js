(function zoom() {
    var pageWidth = document.body.clientWidth;
    var nodes = document.body.children;
    var biggestNode;
    var proportion = 1;
    var inputBox = document.querySelector('input[type="text"]');

    // Find the main element I want to see. And find out the proportion for zooming.
    do {
        // Get size of elements from nodes;
        var sizeMap = [];
        for (var ni = 0; ni < nodes.length; ni++) {
            var node = nodes[ni];
            var size = node.innerHTML.length;
            if (node.offsetWidth > 0) {
                sizeMap.push({"element": node, "size": size});
            }
        }
        // Sort. And the first is the biggest one.
        sizeMap.sort(function (a, b) {
            return b.size - a.size;
        });
        // Select the element. Unless it's width == pageWidth.
        if (sizeMap.length > 0) {
            if (sizeMap[0].element.offsetWidth < pageWidth) {
                proportion = pageWidth / sizeMap[0].element.offsetWidth;
                biggestNode = sizeMap[0].element;
                break;
            } else {
                // Maybe next loop will get the element I want.
                nodes = sizeMap[0].element.children;
            }
        } else {
            break;
        }
    } while (true);

    // There must be something wrong if proportion is too big or too small.
    if ((proportion < 2) && (proportion > 1)) {
        // Send message to background.
        chrome.runtime.sendMessage('eiafhhcnnjnnigicgpfpabacnphimbdi', proportion, function () {
            if (inputBox === null) {
                // Make sure that I can see the whole element.
                biggestNode.scrollIntoView(true);
            } else {
                // Show the input box (maybe it is a search box).
                inputBox.scrollIntoView(true);
            }
        });
    }
})();
