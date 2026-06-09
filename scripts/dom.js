(function () {
  function DomCollection(elements) {
    this.elements = Array.prototype.slice.call(elements || []);
  }

  DomCollection.prototype.each = function (callback) {
    this.elements.forEach(function (element, index) {
      callback.call(element, element, index);
    });
    return this;
  };

  DomCollection.prototype.on = function (eventName, handler) {
    return this.each(function (element) {
      element.addEventListener(eventName, handler);
    });
  };

  DomCollection.prototype.val = function (value) {
    if (value === undefined) {
      return this.elements[0] ? this.elements[0].value : undefined;
    }
    return this.each(function (element) {
      element.value = value;
    });
  };

  DomCollection.prototype.text = function (value) {
    if (value === undefined) {
      return this.elements[0] ? this.elements[0].textContent : undefined;
    }
    return this.each(function (element) {
      element.textContent = value;
    });
  };

  DomCollection.prototype.html = function (value) {
    if (value === undefined) {
      return this.elements[0] ? this.elements[0].innerHTML : undefined;
    }
    return this.each(function (element) {
      element.innerHTML = value;
    });
  };

  DomCollection.prototype.attr = function (name, value) {
    if (value === undefined) {
      return this.elements[0]
        ? this.elements[0].getAttribute(name)
        : undefined;
    }
    return this.each(function (element) {
      if (value === false || value === null) {
        element.removeAttribute(name);
        if (name in element) {
          element[name] = false;
        }
        return;
      }

      element.setAttribute(name, value);
      if (typeof value === 'boolean' && name in element) {
        element[name] = value;
      }
    });
  };

  DomCollection.prototype.hide = function () {
    return this.each(function (element) {
      element.hidden = true;
      element.style.display = 'none';
    });
  };

  DomCollection.prototype.show = function () {
    return this.each(function (element) {
      element.hidden = false;
      element.style.display = '';
    });
  };

  DomCollection.prototype.focus = function () {
    if (this.elements[0]) {
      this.elements[0].focus();
    }
    return this;
  };

  window.$ = function (selector) {
    if (typeof selector === 'string') {
      return new DomCollection(document.querySelectorAll(selector));
    }

    if (
      selector === window ||
      selector === document ||
      selector instanceof Element
    ) {
      return new DomCollection([selector]);
    }

    if (selector instanceof NodeList || Array.isArray(selector)) {
      return new DomCollection(selector);
    }

    return new DomCollection([]);
  };
})();
