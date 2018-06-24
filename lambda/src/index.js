function handlerPlaceholder(event, context, callback) {
  callback(null, { message: 'This is a placeholder handler.'});
}

exports.handler = handlerPlaceholder;
