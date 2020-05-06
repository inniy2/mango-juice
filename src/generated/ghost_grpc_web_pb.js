/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./ghost_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ghostClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ghostPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.diskRequest,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_diskcheck = new grpc.web.MethodDescriptor(
  '/ghost/diskcheck',
  grpc.web.MethodType.UNARY,
  proto.diskRequest,
  proto.APIResponse,
  /**
   * @param {!proto.diskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.diskRequest,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_diskcheck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.diskRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.diskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.diskcheck =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/diskcheck',
      request,
      metadata || {},
      methodDescriptor_ghost_diskcheck,
      callback);
};


/**
 * @param {!proto.diskRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.diskcheck =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/diskcheck',
      request,
      metadata || {},
      methodDescriptor_ghost_diskcheck);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.definitionRequest,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_checkdefinition = new grpc.web.MethodDescriptor(
  '/ghost/checkdefinition',
  grpc.web.MethodType.UNARY,
  proto.definitionRequest,
  proto.APIResponse,
  /**
   * @param {!proto.definitionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.definitionRequest,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_checkdefinition = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.definitionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.definitionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.checkdefinition =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/checkdefinition',
      request,
      metadata || {},
      methodDescriptor_ghost_checkdefinition,
      callback);
};


/**
 * @param {!proto.definitionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.checkdefinition =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/checkdefinition',
      request,
      metadata || {},
      methodDescriptor_ghost_checkdefinition);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_cutover = new grpc.web.MethodDescriptor(
  '/ghost/cutover',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.APIResponse,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_cutover = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.cutover =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/cutover',
      request,
      metadata || {},
      methodDescriptor_ghost_cutover,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.cutover =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/cutover',
      request,
      metadata || {},
      methodDescriptor_ghost_cutover);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_putpanicflag = new grpc.web.MethodDescriptor(
  '/ghost/putpanicflag',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.APIResponse,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_putpanicflag = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.putpanicflag =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/putpanicflag',
      request,
      metadata || {},
      methodDescriptor_ghost_putpanicflag,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.putpanicflag =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/putpanicflag',
      request,
      metadata || {},
      methodDescriptor_ghost_putpanicflag);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_cleanup = new grpc.web.MethodDescriptor(
  '/ghost/cleanup',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.APIResponse,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_cleanup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.cleanup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/cleanup',
      request,
      metadata || {},
      methodDescriptor_ghost_cleanup,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.cleanup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/cleanup',
      request,
      metadata || {},
      methodDescriptor_ghost_cleanup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ghostRequest,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_dryrun = new grpc.web.MethodDescriptor(
  '/ghost/dryrun',
  grpc.web.MethodType.UNARY,
  proto.ghostRequest,
  proto.APIResponse,
  /**
   * @param {!proto.ghostRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ghostRequest,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_dryrun = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.ghostRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.ghostRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.dryrun =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/dryrun',
      request,
      metadata || {},
      methodDescriptor_ghost_dryrun,
      callback);
};


/**
 * @param {!proto.ghostRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.dryrun =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/dryrun',
      request,
      metadata || {},
      methodDescriptor_ghost_dryrun);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ghostRequest,
 *   !proto.APIMessage>}
 */
const methodDescriptor_ghost_execute = new grpc.web.MethodDescriptor(
  '/ghost/execute',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.ghostRequest,
  proto.APIMessage,
  /**
   * @param {!proto.ghostRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIMessage.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ghostRequest,
 *   !proto.APIMessage>}
 */
const methodInfo_ghost_execute = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIMessage,
  /**
   * @param {!proto.ghostRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIMessage.deserializeBinary
);


/**
 * @param {!proto.ghostRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.APIMessage>}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.execute =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ghost/execute',
      request,
      metadata || {},
      methodDescriptor_ghost_execute);
};


/**
 * @param {!proto.ghostRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.APIMessage>}
 *     The XHR Node Readable Stream
 */
proto.ghostPromiseClient.prototype.execute =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ghost/execute',
      request,
      metadata || {},
      methodDescriptor_ghost_execute);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ghostRequest,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_executeNohup = new grpc.web.MethodDescriptor(
  '/ghost/executeNohup',
  grpc.web.MethodType.UNARY,
  proto.ghostRequest,
  proto.APIResponse,
  /**
   * @param {!proto.ghostRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ghostRequest,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_executeNohup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.ghostRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.ghostRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.executeNohup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/executeNohup',
      request,
      metadata || {},
      methodDescriptor_ghost_executeNohup,
      callback);
};


/**
 * @param {!proto.ghostRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.executeNohup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/executeNohup',
      request,
      metadata || {},
      methodDescriptor_ghost_executeNohup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.interactiveRequest,
 *   !proto.APIResponse>}
 */
const methodDescriptor_ghost_interactive = new grpc.web.MethodDescriptor(
  '/ghost/interactive',
  grpc.web.MethodType.UNARY,
  proto.interactiveRequest,
  proto.APIResponse,
  /**
   * @param {!proto.interactiveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.interactiveRequest,
 *   !proto.APIResponse>}
 */
const methodInfo_ghost_interactive = new grpc.web.AbstractClientBase.MethodInfo(
  proto.APIResponse,
  /**
   * @param {!proto.interactiveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.APIResponse.deserializeBinary
);


/**
 * @param {!proto.interactiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.APIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.APIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ghostClient.prototype.interactive =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ghost/interactive',
      request,
      metadata || {},
      methodDescriptor_ghost_interactive,
      callback);
};


/**
 * @param {!proto.interactiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.APIResponse>}
 *     A native promise that resolves to the response
 */
proto.ghostPromiseClient.prototype.interactive =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ghost/interactive',
      request,
      metadata || {},
      methodDescriptor_ghost_interactive);
};


module.exports = proto;

