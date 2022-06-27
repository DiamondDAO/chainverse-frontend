// node_walk: walk the element tree, stop when func(node) returns false
export function node_walk(node, func) {
  var result = func(node);
  for (
    node = node.firstChild;
    result !== false && node;
    node = node.nextSibling
  )
    result = node_walk(node, func);
  return result;
}

// getCaretPosition: return [start, end] as offsets to elem.textContent that
//   correspond to the selected portion of text
//   (if start == end, caret is at given position and no text is selected)
export function getCaretPosition(elem) {
  var sel = window.getSelection();
  var cum_length = [0, 0];
  //@ts-ignore
  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    //@ts-ignore

    var nodes_to_find = [sel.anchorNode, sel.extentNode];
    //@ts-ignore

    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
      return undefined;
    else {
      var found = [0, 0];
      var i;
      node_walk(elem, function (node) {
        for (i = 0; i < 2; i++) {
          if (node == nodes_to_find[i]) {
            //@ts-ignore

            found[i] = true;
            if (found[i == 0 ? 1 : 0]) return false; // all done
          }
        }

        if (node.textContent && !node.firstChild) {
          for (i = 0; i < 2; i++) {
            if (!found[i]) cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      //@ts-ignore

      cum_length[1] += sel.extentOffset;
    }
  }
  if (cum_length[0] <= cum_length[1]) return cum_length[1];
  return cum_length[1];
}

export const getCaretCoordinates = () => {
  let x, y;
  const selection = window.getSelection();
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    let rect = range.getClientRects()[0];
    if (!rect) {
      // when range is empty, we need to set something so that a rect exists
      try {
        range?.setEnd(selection.anchorNode, 1);
      } catch (e) {}
      rect = range.getClientRects()[0];
    }
    x = rect?.left;
    y = rect?.top || 149;
    return { x, y };
  }
};
