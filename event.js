/* eslint-disable */

const getById = (id) => {
  return document.getElementById(id)
}
// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

const addEvent = (element, type, handler) => {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false)
  } else {
    // assign each event handler a unique ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++
    // create a hash table of event types for the element
    if (!element.events) element.events = {}
    // create a hash table of event handlers for each element/event pair
    let handlers = element.events[type]
    if (!handlers) {
      handlers = element.events[type] = {}
      // store the existing event handler (if there is one)
      if (element[`on${type}`]) {
        handlers[0] = element[`on${type}`]
      }
    }
    // store the event handler in the hash table
    handlers[handler.$$guid] = handler
    // assign a global event handler to do all the work
    element[`on${type}`] = handleEvent
  }
}
// a counter used to create unique IDs
addEvent.guid = 1

const removeEvent = (element, type, handler) => {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false)
  } else {
    // delete the event handler from the hash table
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid]
    }
  }
}

const handleEvent = (event) => {
  let returnValue = true
  // grab the event object (IE uses a global event object)
  const newEvent = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event)
  // get a reference to the hash table of event handlers
  const handlers = this.events[newEvent.type]
  // execute each event handler
  Object.keys(handlers).forEach((i) => {
    this.$$handleEvent = handlers[i]
    if (this.$$handleEvent(event) === false) {
      returnValue = false
    }
  })
  return returnValue
}

function fixEvent(event) {
  // add W3C standard event methods
  event.preventDefault = fixEvent.preventDefault
  event.stopPropagation = fixEvent.stopPropagation
  return event
}
fixEvent.preventDefault = function () {
  this.returnValue = false
}
fixEvent.stopPropagation = function () {
  this.cancelBubble = true
}

const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
  return typeof obj
} : function (obj) {
  return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ?
    'symbol' : typeof obj
}

function isPlainObject(variable) {
  if (
    !variable ||
    (typeof variable === 'undefined' ? 'undefined' : _typeof(variable)) !== 'object' ||
    variable.nodeType ||
    Object.prototype.toString.call(variable) !== '[object Object]'
  ) {
    return false
  }
  const proto = Object.getPrototypeOf(variable)
  return !proto || proto.hasOwnProperty('constructor') && proto.constructor === Object
}

const receiveEvent = (origin, callback) => {
  function listenerMessage(e) {
    const eOrigin = e.origin.replace('http:', '').replace('https:', '')
    if (origin && eOrigin !== origin) {
      return
    }

    if (e.isTrusted) {// 区分不开手动和自动事件
        try {
            const res = (isPlainObject(e.data) ? e.data : e.data && JSON.parse(e.data))
            if (res.data) {
              const message = { ...res, data: { ...res.data, materialId: res.data.extraInfo } }
              callback(message)
            }
          } catch(err) {
            console.log('receive-err', err)
          }
    }
  }
  addEvent(window, 'message', listenerMessage, false)
}
