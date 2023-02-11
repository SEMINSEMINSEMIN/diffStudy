function updateAttributes(oldNode, newNode) {
    for (const {name, value} of [ ...newNode.attributes ]) {
      if (value === oldNode.getAttribute(name)) continue;
      oldNode.setAttribute(name, value);
    }
    for (const {name} of [ ...oldNode.attributes ]) {
      if (newNode.getAttribute(name) !== undefined) continue;
      oldNode.removeAttribute(name);
    }
  }
  
  export function updateElement (parent, newNode, oldNode) {
    if (!newNode && oldNode) {
      // console.log("case 1");
      return oldNode.remove();
    }
    if (newNode && !oldNode) {
      // console.log("case 2");
      return parent.appendChild(newNode);
    }
    if (newNode instanceof Text && oldNode instanceof Text) {
      if (oldNode.nodeValue === newNode.nodeValue) return;
      // console.log("case 3");
      oldNode.nodeValue = newNode.nodeValue
      return;
    }
    if (newNode.nodeName !== oldNode.nodeName) {
      // console.log("case4");
      const index = [ ...parent.childNodes ].indexOf(oldNode);
      oldNode.remove();
      parent.appendChild(newNode, index);
      return;
    }
    // console.log("case5");
    updateAttributes(oldNode, newNode);
  
    const newChildren = [ ...newNode.childNodes ];
    const oldChildren = [ ...oldNode.childNodes ];
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement(oldNode, newChildren[i], oldChildren[i]);
    }
  }