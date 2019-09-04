var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.com = (function() {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    var com = {};

    com.msg = (function() {

        /**
         * Namespace msg.
         * @memberof com
         * @namespace
         */
        var msg = {};

        msg.c_getOpenId_1100 = (function() {

            /**
             * Properties of a c_getOpenId_1100.
             * @memberof com.msg
             * @interface Ic_getOpenId_1100
             * @property {string} appid c_getOpenId_1100 appid
             * @property {string} sessionCode c_getOpenId_1100 sessionCode
             */

            /**
             * Constructs a new c_getOpenId_1100.
             * @memberof com.msg
             * @classdesc Represents a c_getOpenId_1100.
             * @implements Ic_getOpenId_1100
             * @constructor
             * @param {com.msg.Ic_getOpenId_1100=} [properties] Properties to set
             */
            function c_getOpenId_1100(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_getOpenId_1100 appid.
             * @member {string} appid
             * @memberof com.msg.c_getOpenId_1100
             * @instance
             */
            c_getOpenId_1100.prototype.appid = "";

            /**
             * c_getOpenId_1100 sessionCode.
             * @member {string} sessionCode
             * @memberof com.msg.c_getOpenId_1100
             * @instance
             */
            c_getOpenId_1100.prototype.sessionCode = "";

            /**
             * Creates a new c_getOpenId_1100 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_getOpenId_1100
             * @static
             * @param {com.msg.Ic_getOpenId_1100=} [properties] Properties to set
             * @returns {com.msg.c_getOpenId_1100} c_getOpenId_1100 instance
             */
            c_getOpenId_1100.create = function create(properties) {
                return new c_getOpenId_1100(properties);
            };

            /**
             * Encodes the specified c_getOpenId_1100 message. Does not implicitly {@link com.msg.c_getOpenId_1100.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_getOpenId_1100
             * @static
             * @param {com.msg.Ic_getOpenId_1100} message c_getOpenId_1100 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_getOpenId_1100.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.appid);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessionCode);
                return writer;
            };

            /**
             * Encodes the specified c_getOpenId_1100 message, length delimited. Does not implicitly {@link com.msg.c_getOpenId_1100.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_getOpenId_1100
             * @static
             * @param {com.msg.Ic_getOpenId_1100} message c_getOpenId_1100 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_getOpenId_1100.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_getOpenId_1100 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_getOpenId_1100
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_getOpenId_1100} c_getOpenId_1100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_getOpenId_1100.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_getOpenId_1100();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.appid = reader.string();
                        break;
                    case 2:
                        message.sessionCode = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("appid"))
                    throw $util.ProtocolError("missing required 'appid'", { instance: message });
                if (!message.hasOwnProperty("sessionCode"))
                    throw $util.ProtocolError("missing required 'sessionCode'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_getOpenId_1100 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_getOpenId_1100
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_getOpenId_1100} c_getOpenId_1100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_getOpenId_1100.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_getOpenId_1100 message.
             * @function verify
             * @memberof com.msg.c_getOpenId_1100
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_getOpenId_1100.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.appid))
                    return "appid: string expected";
                if (!$util.isString(message.sessionCode))
                    return "sessionCode: string expected";
                return null;
            };

            return c_getOpenId_1100;
        })();

        msg.s_getOpenId_1101 = (function() {

            /**
             * Properties of a s_getOpenId_1101.
             * @memberof com.msg
             * @interface Is_getOpenId_1101
             * @property {string} openId s_getOpenId_1101 openId
             */

            /**
             * Constructs a new s_getOpenId_1101.
             * @memberof com.msg
             * @classdesc Represents a s_getOpenId_1101.
             * @implements Is_getOpenId_1101
             * @constructor
             * @param {com.msg.Is_getOpenId_1101=} [properties] Properties to set
             */
            function s_getOpenId_1101(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_getOpenId_1101 openId.
             * @member {string} openId
             * @memberof com.msg.s_getOpenId_1101
             * @instance
             */
            s_getOpenId_1101.prototype.openId = "";

            /**
             * Creates a new s_getOpenId_1101 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_getOpenId_1101
             * @static
             * @param {com.msg.Is_getOpenId_1101=} [properties] Properties to set
             * @returns {com.msg.s_getOpenId_1101} s_getOpenId_1101 instance
             */
            s_getOpenId_1101.create = function create(properties) {
                return new s_getOpenId_1101(properties);
            };

            /**
             * Encodes the specified s_getOpenId_1101 message. Does not implicitly {@link com.msg.s_getOpenId_1101.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_getOpenId_1101
             * @static
             * @param {com.msg.Is_getOpenId_1101} message s_getOpenId_1101 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_getOpenId_1101.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                return writer;
            };

            /**
             * Encodes the specified s_getOpenId_1101 message, length delimited. Does not implicitly {@link com.msg.s_getOpenId_1101.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_getOpenId_1101
             * @static
             * @param {com.msg.Is_getOpenId_1101} message s_getOpenId_1101 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_getOpenId_1101.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_getOpenId_1101 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_getOpenId_1101
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_getOpenId_1101} s_getOpenId_1101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_getOpenId_1101.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_getOpenId_1101();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_getOpenId_1101 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_getOpenId_1101
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_getOpenId_1101} s_getOpenId_1101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_getOpenId_1101.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_getOpenId_1101 message.
             * @function verify
             * @memberof com.msg.s_getOpenId_1101
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_getOpenId_1101.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                return null;
            };

            return s_getOpenId_1101;
        })();

        msg.c_userLogin_1000 = (function() {

            /**
             * Properties of a c_userLogin_1000.
             * @memberof com.msg
             * @interface Ic_userLogin_1000
             * @property {string} openId c_userLogin_1000 openId
             * @property {com.msg.IwxInfo|null} [wxInfo] c_userLogin_1000 wxInfo
             */

            /**
             * Constructs a new c_userLogin_1000.
             * @memberof com.msg
             * @classdesc Represents a c_userLogin_1000.
             * @implements Ic_userLogin_1000
             * @constructor
             * @param {com.msg.Ic_userLogin_1000=} [properties] Properties to set
             */
            function c_userLogin_1000(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_userLogin_1000 openId.
             * @member {string} openId
             * @memberof com.msg.c_userLogin_1000
             * @instance
             */
            c_userLogin_1000.prototype.openId = "";

            /**
             * c_userLogin_1000 wxInfo.
             * @member {com.msg.IwxInfo|null|undefined} wxInfo
             * @memberof com.msg.c_userLogin_1000
             * @instance
             */
            c_userLogin_1000.prototype.wxInfo = null;

            /**
             * Creates a new c_userLogin_1000 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_userLogin_1000
             * @static
             * @param {com.msg.Ic_userLogin_1000=} [properties] Properties to set
             * @returns {com.msg.c_userLogin_1000} c_userLogin_1000 instance
             */
            c_userLogin_1000.create = function create(properties) {
                return new c_userLogin_1000(properties);
            };

            /**
             * Encodes the specified c_userLogin_1000 message. Does not implicitly {@link com.msg.c_userLogin_1000.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_userLogin_1000
             * @static
             * @param {com.msg.Ic_userLogin_1000} message c_userLogin_1000 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_userLogin_1000.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                if (message.wxInfo != null && message.hasOwnProperty("wxInfo"))
                    $root.com.msg.wxInfo.encode(message.wxInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified c_userLogin_1000 message, length delimited. Does not implicitly {@link com.msg.c_userLogin_1000.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_userLogin_1000
             * @static
             * @param {com.msg.Ic_userLogin_1000} message c_userLogin_1000 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_userLogin_1000.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_userLogin_1000 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_userLogin_1000
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_userLogin_1000} c_userLogin_1000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_userLogin_1000.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_userLogin_1000();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.wxInfo = $root.com.msg.wxInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_userLogin_1000 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_userLogin_1000
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_userLogin_1000} c_userLogin_1000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_userLogin_1000.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_userLogin_1000 message.
             * @function verify
             * @memberof com.msg.c_userLogin_1000
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_userLogin_1000.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (message.wxInfo != null && message.hasOwnProperty("wxInfo")) {
                    var error = $root.com.msg.wxInfo.verify(message.wxInfo);
                    if (error)
                        return "wxInfo." + error;
                }
                return null;
            };

            return c_userLogin_1000;
        })();

        msg.s_userLogin_1001 = (function() {

            /**
             * Properties of a s_userLogin_1001.
             * @memberof com.msg
             * @interface Is_userLogin_1001
             * @property {com.msg.IplayerInfo} playerInfo s_userLogin_1001 playerInfo
             * @property {number|Long} loginTime s_userLogin_1001 loginTime
             * @property {com.msg.IserverConfig|null} [serverConfig] s_userLogin_1001 serverConfig
             */

            /**
             * Constructs a new s_userLogin_1001.
             * @memberof com.msg
             * @classdesc Represents a s_userLogin_1001.
             * @implements Is_userLogin_1001
             * @constructor
             * @param {com.msg.Is_userLogin_1001=} [properties] Properties to set
             */
            function s_userLogin_1001(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_userLogin_1001 playerInfo.
             * @member {com.msg.IplayerInfo} playerInfo
             * @memberof com.msg.s_userLogin_1001
             * @instance
             */
            s_userLogin_1001.prototype.playerInfo = null;

            /**
             * s_userLogin_1001 loginTime.
             * @member {number|Long} loginTime
             * @memberof com.msg.s_userLogin_1001
             * @instance
             */
            s_userLogin_1001.prototype.loginTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * s_userLogin_1001 serverConfig.
             * @member {com.msg.IserverConfig|null|undefined} serverConfig
             * @memberof com.msg.s_userLogin_1001
             * @instance
             */
            s_userLogin_1001.prototype.serverConfig = null;

            /**
             * Creates a new s_userLogin_1001 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_userLogin_1001
             * @static
             * @param {com.msg.Is_userLogin_1001=} [properties] Properties to set
             * @returns {com.msg.s_userLogin_1001} s_userLogin_1001 instance
             */
            s_userLogin_1001.create = function create(properties) {
                return new s_userLogin_1001(properties);
            };

            /**
             * Encodes the specified s_userLogin_1001 message. Does not implicitly {@link com.msg.s_userLogin_1001.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_userLogin_1001
             * @static
             * @param {com.msg.Is_userLogin_1001} message s_userLogin_1001 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_userLogin_1001.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                $root.com.msg.playerInfo.encode(message.playerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.loginTime);
                if (message.serverConfig != null && message.hasOwnProperty("serverConfig"))
                    $root.com.msg.serverConfig.encode(message.serverConfig, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_userLogin_1001 message, length delimited. Does not implicitly {@link com.msg.s_userLogin_1001.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_userLogin_1001
             * @static
             * @param {com.msg.Is_userLogin_1001} message s_userLogin_1001 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_userLogin_1001.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_userLogin_1001 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_userLogin_1001
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_userLogin_1001} s_userLogin_1001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_userLogin_1001.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_userLogin_1001();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.playerInfo = $root.com.msg.playerInfo.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.loginTime = reader.int64();
                        break;
                    case 3:
                        message.serverConfig = $root.com.msg.serverConfig.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("playerInfo"))
                    throw $util.ProtocolError("missing required 'playerInfo'", { instance: message });
                if (!message.hasOwnProperty("loginTime"))
                    throw $util.ProtocolError("missing required 'loginTime'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_userLogin_1001 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_userLogin_1001
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_userLogin_1001} s_userLogin_1001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_userLogin_1001.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_userLogin_1001 message.
             * @function verify
             * @memberof com.msg.s_userLogin_1001
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_userLogin_1001.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                {
                    var error = $root.com.msg.playerInfo.verify(message.playerInfo);
                    if (error)
                        return "playerInfo." + error;
                }
                if (!$util.isInteger(message.loginTime) && !(message.loginTime && $util.isInteger(message.loginTime.low) && $util.isInteger(message.loginTime.high)))
                    return "loginTime: integer|Long expected";
                if (message.serverConfig != null && message.hasOwnProperty("serverConfig")) {
                    var error = $root.com.msg.serverConfig.verify(message.serverConfig);
                    if (error)
                        return "serverConfig." + error;
                }
                return null;
            };

            return s_userLogin_1001;
        })();

        msg.c_ExchangeWithDiamond_2000 = (function() {

            /**
             * Properties of a c_ExchangeWithDiamond_2000.
             * @memberof com.msg
             * @interface Ic_ExchangeWithDiamond_2000
             * @property {string} openId c_ExchangeWithDiamond_2000 openId
             * @property {number} type c_ExchangeWithDiamond_2000 type
             * @property {number} diamondNum c_ExchangeWithDiamond_2000 diamondNum
             */

            /**
             * Constructs a new c_ExchangeWithDiamond_2000.
             * @memberof com.msg
             * @classdesc Represents a c_ExchangeWithDiamond_2000.
             * @implements Ic_ExchangeWithDiamond_2000
             * @constructor
             * @param {com.msg.Ic_ExchangeWithDiamond_2000=} [properties] Properties to set
             */
            function c_ExchangeWithDiamond_2000(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_ExchangeWithDiamond_2000 openId.
             * @member {string} openId
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @instance
             */
            c_ExchangeWithDiamond_2000.prototype.openId = "";

            /**
             * c_ExchangeWithDiamond_2000 type.
             * @member {number} type
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @instance
             */
            c_ExchangeWithDiamond_2000.prototype.type = 0;

            /**
             * c_ExchangeWithDiamond_2000 diamondNum.
             * @member {number} diamondNum
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @instance
             */
            c_ExchangeWithDiamond_2000.prototype.diamondNum = 0;

            /**
             * Creates a new c_ExchangeWithDiamond_2000 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @static
             * @param {com.msg.Ic_ExchangeWithDiamond_2000=} [properties] Properties to set
             * @returns {com.msg.c_ExchangeWithDiamond_2000} c_ExchangeWithDiamond_2000 instance
             */
            c_ExchangeWithDiamond_2000.create = function create(properties) {
                return new c_ExchangeWithDiamond_2000(properties);
            };

            /**
             * Encodes the specified c_ExchangeWithDiamond_2000 message. Does not implicitly {@link com.msg.c_ExchangeWithDiamond_2000.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @static
             * @param {com.msg.Ic_ExchangeWithDiamond_2000} message c_ExchangeWithDiamond_2000 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_ExchangeWithDiamond_2000.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.diamondNum);
                return writer;
            };

            /**
             * Encodes the specified c_ExchangeWithDiamond_2000 message, length delimited. Does not implicitly {@link com.msg.c_ExchangeWithDiamond_2000.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @static
             * @param {com.msg.Ic_ExchangeWithDiamond_2000} message c_ExchangeWithDiamond_2000 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_ExchangeWithDiamond_2000.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_ExchangeWithDiamond_2000 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_ExchangeWithDiamond_2000} c_ExchangeWithDiamond_2000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_ExchangeWithDiamond_2000.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_ExchangeWithDiamond_2000();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.diamondNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("type"))
                    throw $util.ProtocolError("missing required 'type'", { instance: message });
                if (!message.hasOwnProperty("diamondNum"))
                    throw $util.ProtocolError("missing required 'diamondNum'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_ExchangeWithDiamond_2000 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_ExchangeWithDiamond_2000} c_ExchangeWithDiamond_2000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_ExchangeWithDiamond_2000.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_ExchangeWithDiamond_2000 message.
             * @function verify
             * @memberof com.msg.c_ExchangeWithDiamond_2000
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_ExchangeWithDiamond_2000.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
                if (!$util.isInteger(message.diamondNum))
                    return "diamondNum: integer expected";
                return null;
            };

            return c_ExchangeWithDiamond_2000;
        })();

        msg.s_ExchangeWithDiamond_2001 = (function() {

            /**
             * Properties of a s_ExchangeWithDiamond_2001.
             * @memberof com.msg
             * @interface Is_ExchangeWithDiamond_2001
             * @property {number} result s_ExchangeWithDiamond_2001 result
             * @property {com.msg.ImoneyInfo|null} [moneyInfo] s_ExchangeWithDiamond_2001 moneyInfo
             */

            /**
             * Constructs a new s_ExchangeWithDiamond_2001.
             * @memberof com.msg
             * @classdesc Represents a s_ExchangeWithDiamond_2001.
             * @implements Is_ExchangeWithDiamond_2001
             * @constructor
             * @param {com.msg.Is_ExchangeWithDiamond_2001=} [properties] Properties to set
             */
            function s_ExchangeWithDiamond_2001(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_ExchangeWithDiamond_2001 result.
             * @member {number} result
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @instance
             */
            s_ExchangeWithDiamond_2001.prototype.result = 0;

            /**
             * s_ExchangeWithDiamond_2001 moneyInfo.
             * @member {com.msg.ImoneyInfo|null|undefined} moneyInfo
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @instance
             */
            s_ExchangeWithDiamond_2001.prototype.moneyInfo = null;

            /**
             * Creates a new s_ExchangeWithDiamond_2001 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @static
             * @param {com.msg.Is_ExchangeWithDiamond_2001=} [properties] Properties to set
             * @returns {com.msg.s_ExchangeWithDiamond_2001} s_ExchangeWithDiamond_2001 instance
             */
            s_ExchangeWithDiamond_2001.create = function create(properties) {
                return new s_ExchangeWithDiamond_2001(properties);
            };

            /**
             * Encodes the specified s_ExchangeWithDiamond_2001 message. Does not implicitly {@link com.msg.s_ExchangeWithDiamond_2001.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @static
             * @param {com.msg.Is_ExchangeWithDiamond_2001} message s_ExchangeWithDiamond_2001 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_ExchangeWithDiamond_2001.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.moneyInfo != null && message.hasOwnProperty("moneyInfo"))
                    $root.com.msg.moneyInfo.encode(message.moneyInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_ExchangeWithDiamond_2001 message, length delimited. Does not implicitly {@link com.msg.s_ExchangeWithDiamond_2001.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @static
             * @param {com.msg.Is_ExchangeWithDiamond_2001} message s_ExchangeWithDiamond_2001 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_ExchangeWithDiamond_2001.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_ExchangeWithDiamond_2001 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_ExchangeWithDiamond_2001} s_ExchangeWithDiamond_2001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_ExchangeWithDiamond_2001.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_ExchangeWithDiamond_2001();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.moneyInfo = $root.com.msg.moneyInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_ExchangeWithDiamond_2001 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_ExchangeWithDiamond_2001} s_ExchangeWithDiamond_2001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_ExchangeWithDiamond_2001.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_ExchangeWithDiamond_2001 message.
             * @function verify
             * @memberof com.msg.s_ExchangeWithDiamond_2001
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_ExchangeWithDiamond_2001.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.moneyInfo != null && message.hasOwnProperty("moneyInfo")) {
                    var error = $root.com.msg.moneyInfo.verify(message.moneyInfo);
                    if (error)
                        return "moneyInfo." + error;
                }
                return null;
            };

            return s_ExchangeWithDiamond_2001;
        })();

        msg.c_UpgradeWeaponLvl_2010 = (function() {

            /**
             * Properties of a c_UpgradeWeaponLvl_2010.
             * @memberof com.msg
             * @interface Ic_UpgradeWeaponLvl_2010
             * @property {string} openId c_UpgradeWeaponLvl_2010 openId
             * @property {number} weaponID c_UpgradeWeaponLvl_2010 weaponID
             * @property {number} curLvl c_UpgradeWeaponLvl_2010 curLvl
             * @property {number} costGold c_UpgradeWeaponLvl_2010 costGold
             */

            /**
             * Constructs a new c_UpgradeWeaponLvl_2010.
             * @memberof com.msg
             * @classdesc Represents a c_UpgradeWeaponLvl_2010.
             * @implements Ic_UpgradeWeaponLvl_2010
             * @constructor
             * @param {com.msg.Ic_UpgradeWeaponLvl_2010=} [properties] Properties to set
             */
            function c_UpgradeWeaponLvl_2010(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_UpgradeWeaponLvl_2010 openId.
             * @member {string} openId
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @instance
             */
            c_UpgradeWeaponLvl_2010.prototype.openId = "";

            /**
             * c_UpgradeWeaponLvl_2010 weaponID.
             * @member {number} weaponID
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @instance
             */
            c_UpgradeWeaponLvl_2010.prototype.weaponID = 0;

            /**
             * c_UpgradeWeaponLvl_2010 curLvl.
             * @member {number} curLvl
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @instance
             */
            c_UpgradeWeaponLvl_2010.prototype.curLvl = 0;

            /**
             * c_UpgradeWeaponLvl_2010 costGold.
             * @member {number} costGold
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @instance
             */
            c_UpgradeWeaponLvl_2010.prototype.costGold = 0;

            /**
             * Creates a new c_UpgradeWeaponLvl_2010 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @static
             * @param {com.msg.Ic_UpgradeWeaponLvl_2010=} [properties] Properties to set
             * @returns {com.msg.c_UpgradeWeaponLvl_2010} c_UpgradeWeaponLvl_2010 instance
             */
            c_UpgradeWeaponLvl_2010.create = function create(properties) {
                return new c_UpgradeWeaponLvl_2010(properties);
            };

            /**
             * Encodes the specified c_UpgradeWeaponLvl_2010 message. Does not implicitly {@link com.msg.c_UpgradeWeaponLvl_2010.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @static
             * @param {com.msg.Ic_UpgradeWeaponLvl_2010} message c_UpgradeWeaponLvl_2010 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UpgradeWeaponLvl_2010.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.weaponID);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.curLvl);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.costGold);
                return writer;
            };

            /**
             * Encodes the specified c_UpgradeWeaponLvl_2010 message, length delimited. Does not implicitly {@link com.msg.c_UpgradeWeaponLvl_2010.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @static
             * @param {com.msg.Ic_UpgradeWeaponLvl_2010} message c_UpgradeWeaponLvl_2010 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UpgradeWeaponLvl_2010.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_UpgradeWeaponLvl_2010 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_UpgradeWeaponLvl_2010} c_UpgradeWeaponLvl_2010
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UpgradeWeaponLvl_2010.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_UpgradeWeaponLvl_2010();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.weaponID = reader.int32();
                        break;
                    case 3:
                        message.curLvl = reader.int32();
                        break;
                    case 4:
                        message.costGold = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("weaponID"))
                    throw $util.ProtocolError("missing required 'weaponID'", { instance: message });
                if (!message.hasOwnProperty("curLvl"))
                    throw $util.ProtocolError("missing required 'curLvl'", { instance: message });
                if (!message.hasOwnProperty("costGold"))
                    throw $util.ProtocolError("missing required 'costGold'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_UpgradeWeaponLvl_2010 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_UpgradeWeaponLvl_2010} c_UpgradeWeaponLvl_2010
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UpgradeWeaponLvl_2010.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_UpgradeWeaponLvl_2010 message.
             * @function verify
             * @memberof com.msg.c_UpgradeWeaponLvl_2010
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_UpgradeWeaponLvl_2010.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.weaponID))
                    return "weaponID: integer expected";
                if (!$util.isInteger(message.curLvl))
                    return "curLvl: integer expected";
                if (!$util.isInteger(message.costGold))
                    return "costGold: integer expected";
                return null;
            };

            return c_UpgradeWeaponLvl_2010;
        })();

        msg.s_UpgradeWeaponLvl_2011 = (function() {

            /**
             * Properties of a s_UpgradeWeaponLvl_2011.
             * @memberof com.msg
             * @interface Is_UpgradeWeaponLvl_2011
             * @property {number} result s_UpgradeWeaponLvl_2011 result
             * @property {number} weaponID s_UpgradeWeaponLvl_2011 weaponID
             * @property {number} newLvl s_UpgradeWeaponLvl_2011 newLvl
             * @property {number} totalGold s_UpgradeWeaponLvl_2011 totalGold
             */

            /**
             * Constructs a new s_UpgradeWeaponLvl_2011.
             * @memberof com.msg
             * @classdesc Represents a s_UpgradeWeaponLvl_2011.
             * @implements Is_UpgradeWeaponLvl_2011
             * @constructor
             * @param {com.msg.Is_UpgradeWeaponLvl_2011=} [properties] Properties to set
             */
            function s_UpgradeWeaponLvl_2011(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_UpgradeWeaponLvl_2011 result.
             * @member {number} result
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @instance
             */
            s_UpgradeWeaponLvl_2011.prototype.result = 0;

            /**
             * s_UpgradeWeaponLvl_2011 weaponID.
             * @member {number} weaponID
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @instance
             */
            s_UpgradeWeaponLvl_2011.prototype.weaponID = 0;

            /**
             * s_UpgradeWeaponLvl_2011 newLvl.
             * @member {number} newLvl
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @instance
             */
            s_UpgradeWeaponLvl_2011.prototype.newLvl = 0;

            /**
             * s_UpgradeWeaponLvl_2011 totalGold.
             * @member {number} totalGold
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @instance
             */
            s_UpgradeWeaponLvl_2011.prototype.totalGold = 0;

            /**
             * Creates a new s_UpgradeWeaponLvl_2011 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @static
             * @param {com.msg.Is_UpgradeWeaponLvl_2011=} [properties] Properties to set
             * @returns {com.msg.s_UpgradeWeaponLvl_2011} s_UpgradeWeaponLvl_2011 instance
             */
            s_UpgradeWeaponLvl_2011.create = function create(properties) {
                return new s_UpgradeWeaponLvl_2011(properties);
            };

            /**
             * Encodes the specified s_UpgradeWeaponLvl_2011 message. Does not implicitly {@link com.msg.s_UpgradeWeaponLvl_2011.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @static
             * @param {com.msg.Is_UpgradeWeaponLvl_2011} message s_UpgradeWeaponLvl_2011 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UpgradeWeaponLvl_2011.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.weaponID);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.newLvl);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.totalGold);
                return writer;
            };

            /**
             * Encodes the specified s_UpgradeWeaponLvl_2011 message, length delimited. Does not implicitly {@link com.msg.s_UpgradeWeaponLvl_2011.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @static
             * @param {com.msg.Is_UpgradeWeaponLvl_2011} message s_UpgradeWeaponLvl_2011 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UpgradeWeaponLvl_2011.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_UpgradeWeaponLvl_2011 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_UpgradeWeaponLvl_2011} s_UpgradeWeaponLvl_2011
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UpgradeWeaponLvl_2011.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_UpgradeWeaponLvl_2011();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.weaponID = reader.int32();
                        break;
                    case 3:
                        message.newLvl = reader.int32();
                        break;
                    case 4:
                        message.totalGold = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("weaponID"))
                    throw $util.ProtocolError("missing required 'weaponID'", { instance: message });
                if (!message.hasOwnProperty("newLvl"))
                    throw $util.ProtocolError("missing required 'newLvl'", { instance: message });
                if (!message.hasOwnProperty("totalGold"))
                    throw $util.ProtocolError("missing required 'totalGold'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_UpgradeWeaponLvl_2011 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_UpgradeWeaponLvl_2011} s_UpgradeWeaponLvl_2011
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UpgradeWeaponLvl_2011.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_UpgradeWeaponLvl_2011 message.
             * @function verify
             * @memberof com.msg.s_UpgradeWeaponLvl_2011
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_UpgradeWeaponLvl_2011.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (!$util.isInteger(message.weaponID))
                    return "weaponID: integer expected";
                if (!$util.isInteger(message.newLvl))
                    return "newLvl: integer expected";
                if (!$util.isInteger(message.totalGold))
                    return "totalGold: integer expected";
                return null;
            };

            return s_UpgradeWeaponLvl_2011;
        })();

        msg.c_UpgradeSpawnLvl_2012 = (function() {

            /**
             * Properties of a c_UpgradeSpawnLvl_2012.
             * @memberof com.msg
             * @interface Ic_UpgradeSpawnLvl_2012
             * @property {string} openId c_UpgradeSpawnLvl_2012 openId
             * @property {number} curLvl c_UpgradeSpawnLvl_2012 curLvl
             * @property {number} costGold c_UpgradeSpawnLvl_2012 costGold
             * @property {number} newGoldSpawnLvl c_UpgradeSpawnLvl_2012 newGoldSpawnLvl
             * @property {number} newDiamondSpawnLvl c_UpgradeSpawnLvl_2012 newDiamondSpawnLvl
             */

            /**
             * Constructs a new c_UpgradeSpawnLvl_2012.
             * @memberof com.msg
             * @classdesc Represents a c_UpgradeSpawnLvl_2012.
             * @implements Ic_UpgradeSpawnLvl_2012
             * @constructor
             * @param {com.msg.Ic_UpgradeSpawnLvl_2012=} [properties] Properties to set
             */
            function c_UpgradeSpawnLvl_2012(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_UpgradeSpawnLvl_2012 openId.
             * @member {string} openId
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @instance
             */
            c_UpgradeSpawnLvl_2012.prototype.openId = "";

            /**
             * c_UpgradeSpawnLvl_2012 curLvl.
             * @member {number} curLvl
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @instance
             */
            c_UpgradeSpawnLvl_2012.prototype.curLvl = 0;

            /**
             * c_UpgradeSpawnLvl_2012 costGold.
             * @member {number} costGold
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @instance
             */
            c_UpgradeSpawnLvl_2012.prototype.costGold = 0;

            /**
             * c_UpgradeSpawnLvl_2012 newGoldSpawnLvl.
             * @member {number} newGoldSpawnLvl
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @instance
             */
            c_UpgradeSpawnLvl_2012.prototype.newGoldSpawnLvl = 0;

            /**
             * c_UpgradeSpawnLvl_2012 newDiamondSpawnLvl.
             * @member {number} newDiamondSpawnLvl
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @instance
             */
            c_UpgradeSpawnLvl_2012.prototype.newDiamondSpawnLvl = 0;

            /**
             * Creates a new c_UpgradeSpawnLvl_2012 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @static
             * @param {com.msg.Ic_UpgradeSpawnLvl_2012=} [properties] Properties to set
             * @returns {com.msg.c_UpgradeSpawnLvl_2012} c_UpgradeSpawnLvl_2012 instance
             */
            c_UpgradeSpawnLvl_2012.create = function create(properties) {
                return new c_UpgradeSpawnLvl_2012(properties);
            };

            /**
             * Encodes the specified c_UpgradeSpawnLvl_2012 message. Does not implicitly {@link com.msg.c_UpgradeSpawnLvl_2012.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @static
             * @param {com.msg.Ic_UpgradeSpawnLvl_2012} message c_UpgradeSpawnLvl_2012 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UpgradeSpawnLvl_2012.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.curLvl);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.costGold);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.newGoldSpawnLvl);
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.newDiamondSpawnLvl);
                return writer;
            };

            /**
             * Encodes the specified c_UpgradeSpawnLvl_2012 message, length delimited. Does not implicitly {@link com.msg.c_UpgradeSpawnLvl_2012.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @static
             * @param {com.msg.Ic_UpgradeSpawnLvl_2012} message c_UpgradeSpawnLvl_2012 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UpgradeSpawnLvl_2012.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_UpgradeSpawnLvl_2012 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_UpgradeSpawnLvl_2012} c_UpgradeSpawnLvl_2012
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UpgradeSpawnLvl_2012.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_UpgradeSpawnLvl_2012();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.curLvl = reader.int32();
                        break;
                    case 3:
                        message.costGold = reader.int32();
                        break;
                    case 4:
                        message.newGoldSpawnLvl = reader.int32();
                        break;
                    case 5:
                        message.newDiamondSpawnLvl = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("curLvl"))
                    throw $util.ProtocolError("missing required 'curLvl'", { instance: message });
                if (!message.hasOwnProperty("costGold"))
                    throw $util.ProtocolError("missing required 'costGold'", { instance: message });
                if (!message.hasOwnProperty("newGoldSpawnLvl"))
                    throw $util.ProtocolError("missing required 'newGoldSpawnLvl'", { instance: message });
                if (!message.hasOwnProperty("newDiamondSpawnLvl"))
                    throw $util.ProtocolError("missing required 'newDiamondSpawnLvl'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_UpgradeSpawnLvl_2012 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_UpgradeSpawnLvl_2012} c_UpgradeSpawnLvl_2012
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UpgradeSpawnLvl_2012.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_UpgradeSpawnLvl_2012 message.
             * @function verify
             * @memberof com.msg.c_UpgradeSpawnLvl_2012
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_UpgradeSpawnLvl_2012.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.curLvl))
                    return "curLvl: integer expected";
                if (!$util.isInteger(message.costGold))
                    return "costGold: integer expected";
                if (!$util.isInteger(message.newGoldSpawnLvl))
                    return "newGoldSpawnLvl: integer expected";
                if (!$util.isInteger(message.newDiamondSpawnLvl))
                    return "newDiamondSpawnLvl: integer expected";
                return null;
            };

            return c_UpgradeSpawnLvl_2012;
        })();

        msg.s_UpgradeSpawnLvl_2013 = (function() {

            /**
             * Properties of a s_UpgradeSpawnLvl_2013.
             * @memberof com.msg
             * @interface Is_UpgradeSpawnLvl_2013
             * @property {number} result s_UpgradeSpawnLvl_2013 result
             * @property {number} newLvl s_UpgradeSpawnLvl_2013 newLvl
             * @property {number} totalGold s_UpgradeSpawnLvl_2013 totalGold
             */

            /**
             * Constructs a new s_UpgradeSpawnLvl_2013.
             * @memberof com.msg
             * @classdesc Represents a s_UpgradeSpawnLvl_2013.
             * @implements Is_UpgradeSpawnLvl_2013
             * @constructor
             * @param {com.msg.Is_UpgradeSpawnLvl_2013=} [properties] Properties to set
             */
            function s_UpgradeSpawnLvl_2013(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_UpgradeSpawnLvl_2013 result.
             * @member {number} result
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @instance
             */
            s_UpgradeSpawnLvl_2013.prototype.result = 0;

            /**
             * s_UpgradeSpawnLvl_2013 newLvl.
             * @member {number} newLvl
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @instance
             */
            s_UpgradeSpawnLvl_2013.prototype.newLvl = 0;

            /**
             * s_UpgradeSpawnLvl_2013 totalGold.
             * @member {number} totalGold
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @instance
             */
            s_UpgradeSpawnLvl_2013.prototype.totalGold = 0;

            /**
             * Creates a new s_UpgradeSpawnLvl_2013 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @static
             * @param {com.msg.Is_UpgradeSpawnLvl_2013=} [properties] Properties to set
             * @returns {com.msg.s_UpgradeSpawnLvl_2013} s_UpgradeSpawnLvl_2013 instance
             */
            s_UpgradeSpawnLvl_2013.create = function create(properties) {
                return new s_UpgradeSpawnLvl_2013(properties);
            };

            /**
             * Encodes the specified s_UpgradeSpawnLvl_2013 message. Does not implicitly {@link com.msg.s_UpgradeSpawnLvl_2013.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @static
             * @param {com.msg.Is_UpgradeSpawnLvl_2013} message s_UpgradeSpawnLvl_2013 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UpgradeSpawnLvl_2013.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.newLvl);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.totalGold);
                return writer;
            };

            /**
             * Encodes the specified s_UpgradeSpawnLvl_2013 message, length delimited. Does not implicitly {@link com.msg.s_UpgradeSpawnLvl_2013.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @static
             * @param {com.msg.Is_UpgradeSpawnLvl_2013} message s_UpgradeSpawnLvl_2013 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UpgradeSpawnLvl_2013.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_UpgradeSpawnLvl_2013 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_UpgradeSpawnLvl_2013} s_UpgradeSpawnLvl_2013
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UpgradeSpawnLvl_2013.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_UpgradeSpawnLvl_2013();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.newLvl = reader.int32();
                        break;
                    case 3:
                        message.totalGold = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("newLvl"))
                    throw $util.ProtocolError("missing required 'newLvl'", { instance: message });
                if (!message.hasOwnProperty("totalGold"))
                    throw $util.ProtocolError("missing required 'totalGold'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_UpgradeSpawnLvl_2013 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_UpgradeSpawnLvl_2013} s_UpgradeSpawnLvl_2013
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UpgradeSpawnLvl_2013.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_UpgradeSpawnLvl_2013 message.
             * @function verify
             * @memberof com.msg.s_UpgradeSpawnLvl_2013
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_UpgradeSpawnLvl_2013.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (!$util.isInteger(message.newLvl))
                    return "newLvl: integer expected";
                if (!$util.isInteger(message.totalGold))
                    return "totalGold: integer expected";
                return null;
            };

            return s_UpgradeSpawnLvl_2013;
        })();

        msg.c_EquipSideWeapon_2020 = (function() {

            /**
             * Properties of a c_EquipSideWeapon_2020.
             * @memberof com.msg
             * @interface Ic_EquipSideWeapon_2020
             * @property {string} openId c_EquipSideWeapon_2020 openId
             * @property {number} sideWeaponID c_EquipSideWeapon_2020 sideWeaponID
             */

            /**
             * Constructs a new c_EquipSideWeapon_2020.
             * @memberof com.msg
             * @classdesc Represents a c_EquipSideWeapon_2020.
             * @implements Ic_EquipSideWeapon_2020
             * @constructor
             * @param {com.msg.Ic_EquipSideWeapon_2020=} [properties] Properties to set
             */
            function c_EquipSideWeapon_2020(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_EquipSideWeapon_2020 openId.
             * @member {string} openId
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @instance
             */
            c_EquipSideWeapon_2020.prototype.openId = "";

            /**
             * c_EquipSideWeapon_2020 sideWeaponID.
             * @member {number} sideWeaponID
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @instance
             */
            c_EquipSideWeapon_2020.prototype.sideWeaponID = 0;

            /**
             * Creates a new c_EquipSideWeapon_2020 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @static
             * @param {com.msg.Ic_EquipSideWeapon_2020=} [properties] Properties to set
             * @returns {com.msg.c_EquipSideWeapon_2020} c_EquipSideWeapon_2020 instance
             */
            c_EquipSideWeapon_2020.create = function create(properties) {
                return new c_EquipSideWeapon_2020(properties);
            };

            /**
             * Encodes the specified c_EquipSideWeapon_2020 message. Does not implicitly {@link com.msg.c_EquipSideWeapon_2020.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @static
             * @param {com.msg.Ic_EquipSideWeapon_2020} message c_EquipSideWeapon_2020 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_EquipSideWeapon_2020.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sideWeaponID);
                return writer;
            };

            /**
             * Encodes the specified c_EquipSideWeapon_2020 message, length delimited. Does not implicitly {@link com.msg.c_EquipSideWeapon_2020.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @static
             * @param {com.msg.Ic_EquipSideWeapon_2020} message c_EquipSideWeapon_2020 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_EquipSideWeapon_2020.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_EquipSideWeapon_2020 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_EquipSideWeapon_2020} c_EquipSideWeapon_2020
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_EquipSideWeapon_2020.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_EquipSideWeapon_2020();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.sideWeaponID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("sideWeaponID"))
                    throw $util.ProtocolError("missing required 'sideWeaponID'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_EquipSideWeapon_2020 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_EquipSideWeapon_2020} c_EquipSideWeapon_2020
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_EquipSideWeapon_2020.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_EquipSideWeapon_2020 message.
             * @function verify
             * @memberof com.msg.c_EquipSideWeapon_2020
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_EquipSideWeapon_2020.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.sideWeaponID))
                    return "sideWeaponID: integer expected";
                return null;
            };

            return c_EquipSideWeapon_2020;
        })();

        msg.s_EquipSideWeapon_2021 = (function() {

            /**
             * Properties of a s_EquipSideWeapon_2021.
             * @memberof com.msg
             * @interface Is_EquipSideWeapon_2021
             * @property {number} result s_EquipSideWeapon_2021 result
             * @property {number} sideWeaponID s_EquipSideWeapon_2021 sideWeaponID
             */

            /**
             * Constructs a new s_EquipSideWeapon_2021.
             * @memberof com.msg
             * @classdesc Represents a s_EquipSideWeapon_2021.
             * @implements Is_EquipSideWeapon_2021
             * @constructor
             * @param {com.msg.Is_EquipSideWeapon_2021=} [properties] Properties to set
             */
            function s_EquipSideWeapon_2021(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_EquipSideWeapon_2021 result.
             * @member {number} result
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @instance
             */
            s_EquipSideWeapon_2021.prototype.result = 0;

            /**
             * s_EquipSideWeapon_2021 sideWeaponID.
             * @member {number} sideWeaponID
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @instance
             */
            s_EquipSideWeapon_2021.prototype.sideWeaponID = 0;

            /**
             * Creates a new s_EquipSideWeapon_2021 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @static
             * @param {com.msg.Is_EquipSideWeapon_2021=} [properties] Properties to set
             * @returns {com.msg.s_EquipSideWeapon_2021} s_EquipSideWeapon_2021 instance
             */
            s_EquipSideWeapon_2021.create = function create(properties) {
                return new s_EquipSideWeapon_2021(properties);
            };

            /**
             * Encodes the specified s_EquipSideWeapon_2021 message. Does not implicitly {@link com.msg.s_EquipSideWeapon_2021.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @static
             * @param {com.msg.Is_EquipSideWeapon_2021} message s_EquipSideWeapon_2021 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_EquipSideWeapon_2021.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sideWeaponID);
                return writer;
            };

            /**
             * Encodes the specified s_EquipSideWeapon_2021 message, length delimited. Does not implicitly {@link com.msg.s_EquipSideWeapon_2021.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @static
             * @param {com.msg.Is_EquipSideWeapon_2021} message s_EquipSideWeapon_2021 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_EquipSideWeapon_2021.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_EquipSideWeapon_2021 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_EquipSideWeapon_2021} s_EquipSideWeapon_2021
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_EquipSideWeapon_2021.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_EquipSideWeapon_2021();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.sideWeaponID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("sideWeaponID"))
                    throw $util.ProtocolError("missing required 'sideWeaponID'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_EquipSideWeapon_2021 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_EquipSideWeapon_2021} s_EquipSideWeapon_2021
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_EquipSideWeapon_2021.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_EquipSideWeapon_2021 message.
             * @function verify
             * @memberof com.msg.s_EquipSideWeapon_2021
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_EquipSideWeapon_2021.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (!$util.isInteger(message.sideWeaponID))
                    return "sideWeaponID: integer expected";
                return null;
            };

            return s_EquipSideWeapon_2021;
        })();

        msg.c_UnlockSideWeapon_2022 = (function() {

            /**
             * Properties of a c_UnlockSideWeapon_2022.
             * @memberof com.msg
             * @interface Ic_UnlockSideWeapon_2022
             * @property {string} openId c_UnlockSideWeapon_2022 openId
             * @property {number} sideWeaponID c_UnlockSideWeapon_2022 sideWeaponID
             */

            /**
             * Constructs a new c_UnlockSideWeapon_2022.
             * @memberof com.msg
             * @classdesc Represents a c_UnlockSideWeapon_2022.
             * @implements Ic_UnlockSideWeapon_2022
             * @constructor
             * @param {com.msg.Ic_UnlockSideWeapon_2022=} [properties] Properties to set
             */
            function c_UnlockSideWeapon_2022(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_UnlockSideWeapon_2022 openId.
             * @member {string} openId
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @instance
             */
            c_UnlockSideWeapon_2022.prototype.openId = "";

            /**
             * c_UnlockSideWeapon_2022 sideWeaponID.
             * @member {number} sideWeaponID
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @instance
             */
            c_UnlockSideWeapon_2022.prototype.sideWeaponID = 0;

            /**
             * Creates a new c_UnlockSideWeapon_2022 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @static
             * @param {com.msg.Ic_UnlockSideWeapon_2022=} [properties] Properties to set
             * @returns {com.msg.c_UnlockSideWeapon_2022} c_UnlockSideWeapon_2022 instance
             */
            c_UnlockSideWeapon_2022.create = function create(properties) {
                return new c_UnlockSideWeapon_2022(properties);
            };

            /**
             * Encodes the specified c_UnlockSideWeapon_2022 message. Does not implicitly {@link com.msg.c_UnlockSideWeapon_2022.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @static
             * @param {com.msg.Ic_UnlockSideWeapon_2022} message c_UnlockSideWeapon_2022 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UnlockSideWeapon_2022.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sideWeaponID);
                return writer;
            };

            /**
             * Encodes the specified c_UnlockSideWeapon_2022 message, length delimited. Does not implicitly {@link com.msg.c_UnlockSideWeapon_2022.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @static
             * @param {com.msg.Ic_UnlockSideWeapon_2022} message c_UnlockSideWeapon_2022 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UnlockSideWeapon_2022.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_UnlockSideWeapon_2022 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_UnlockSideWeapon_2022} c_UnlockSideWeapon_2022
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UnlockSideWeapon_2022.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_UnlockSideWeapon_2022();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.sideWeaponID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("sideWeaponID"))
                    throw $util.ProtocolError("missing required 'sideWeaponID'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_UnlockSideWeapon_2022 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_UnlockSideWeapon_2022} c_UnlockSideWeapon_2022
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UnlockSideWeapon_2022.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_UnlockSideWeapon_2022 message.
             * @function verify
             * @memberof com.msg.c_UnlockSideWeapon_2022
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_UnlockSideWeapon_2022.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.sideWeaponID))
                    return "sideWeaponID: integer expected";
                return null;
            };

            return c_UnlockSideWeapon_2022;
        })();

        msg.s_UnlockSideWeapon_2023 = (function() {

            /**
             * Properties of a s_UnlockSideWeapon_2023.
             * @memberof com.msg
             * @interface Is_UnlockSideWeapon_2023
             * @property {number} result s_UnlockSideWeapon_2023 result
             * @property {com.msg.IweaponDetail|null} [sideWeaponInfo] s_UnlockSideWeapon_2023 sideWeaponInfo
             */

            /**
             * Constructs a new s_UnlockSideWeapon_2023.
             * @memberof com.msg
             * @classdesc Represents a s_UnlockSideWeapon_2023.
             * @implements Is_UnlockSideWeapon_2023
             * @constructor
             * @param {com.msg.Is_UnlockSideWeapon_2023=} [properties] Properties to set
             */
            function s_UnlockSideWeapon_2023(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_UnlockSideWeapon_2023 result.
             * @member {number} result
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @instance
             */
            s_UnlockSideWeapon_2023.prototype.result = 0;

            /**
             * s_UnlockSideWeapon_2023 sideWeaponInfo.
             * @member {com.msg.IweaponDetail|null|undefined} sideWeaponInfo
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @instance
             */
            s_UnlockSideWeapon_2023.prototype.sideWeaponInfo = null;

            /**
             * Creates a new s_UnlockSideWeapon_2023 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @static
             * @param {com.msg.Is_UnlockSideWeapon_2023=} [properties] Properties to set
             * @returns {com.msg.s_UnlockSideWeapon_2023} s_UnlockSideWeapon_2023 instance
             */
            s_UnlockSideWeapon_2023.create = function create(properties) {
                return new s_UnlockSideWeapon_2023(properties);
            };

            /**
             * Encodes the specified s_UnlockSideWeapon_2023 message. Does not implicitly {@link com.msg.s_UnlockSideWeapon_2023.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @static
             * @param {com.msg.Is_UnlockSideWeapon_2023} message s_UnlockSideWeapon_2023 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UnlockSideWeapon_2023.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.sideWeaponInfo != null && message.hasOwnProperty("sideWeaponInfo"))
                    $root.com.msg.weaponDetail.encode(message.sideWeaponInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_UnlockSideWeapon_2023 message, length delimited. Does not implicitly {@link com.msg.s_UnlockSideWeapon_2023.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @static
             * @param {com.msg.Is_UnlockSideWeapon_2023} message s_UnlockSideWeapon_2023 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UnlockSideWeapon_2023.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_UnlockSideWeapon_2023 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_UnlockSideWeapon_2023} s_UnlockSideWeapon_2023
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UnlockSideWeapon_2023.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_UnlockSideWeapon_2023();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.sideWeaponInfo = $root.com.msg.weaponDetail.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_UnlockSideWeapon_2023 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_UnlockSideWeapon_2023} s_UnlockSideWeapon_2023
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UnlockSideWeapon_2023.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_UnlockSideWeapon_2023 message.
             * @function verify
             * @memberof com.msg.s_UnlockSideWeapon_2023
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_UnlockSideWeapon_2023.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.sideWeaponInfo != null && message.hasOwnProperty("sideWeaponInfo")) {
                    var error = $root.com.msg.weaponDetail.verify(message.sideWeaponInfo);
                    if (error)
                        return "sideWeaponInfo." + error;
                }
                return null;
            };

            return s_UnlockSideWeapon_2023;
        })();

        msg.c_CreateMoneySpawn_2030 = (function() {

            /**
             * Properties of a c_CreateMoneySpawn_2030.
             * @memberof com.msg
             * @interface Ic_CreateMoneySpawn_2030
             * @property {string} openId c_CreateMoneySpawn_2030 openId
             * @property {number} moneyType c_CreateMoneySpawn_2030 moneyType
             */

            /**
             * Constructs a new c_CreateMoneySpawn_2030.
             * @memberof com.msg
             * @classdesc Represents a c_CreateMoneySpawn_2030.
             * @implements Ic_CreateMoneySpawn_2030
             * @constructor
             * @param {com.msg.Ic_CreateMoneySpawn_2030=} [properties] Properties to set
             */
            function c_CreateMoneySpawn_2030(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_CreateMoneySpawn_2030 openId.
             * @member {string} openId
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @instance
             */
            c_CreateMoneySpawn_2030.prototype.openId = "";

            /**
             * c_CreateMoneySpawn_2030 moneyType.
             * @member {number} moneyType
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @instance
             */
            c_CreateMoneySpawn_2030.prototype.moneyType = 0;

            /**
             * Creates a new c_CreateMoneySpawn_2030 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @static
             * @param {com.msg.Ic_CreateMoneySpawn_2030=} [properties] Properties to set
             * @returns {com.msg.c_CreateMoneySpawn_2030} c_CreateMoneySpawn_2030 instance
             */
            c_CreateMoneySpawn_2030.create = function create(properties) {
                return new c_CreateMoneySpawn_2030(properties);
            };

            /**
             * Encodes the specified c_CreateMoneySpawn_2030 message. Does not implicitly {@link com.msg.c_CreateMoneySpawn_2030.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @static
             * @param {com.msg.Ic_CreateMoneySpawn_2030} message c_CreateMoneySpawn_2030 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CreateMoneySpawn_2030.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.moneyType);
                return writer;
            };

            /**
             * Encodes the specified c_CreateMoneySpawn_2030 message, length delimited. Does not implicitly {@link com.msg.c_CreateMoneySpawn_2030.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @static
             * @param {com.msg.Ic_CreateMoneySpawn_2030} message c_CreateMoneySpawn_2030 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CreateMoneySpawn_2030.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_CreateMoneySpawn_2030 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_CreateMoneySpawn_2030} c_CreateMoneySpawn_2030
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CreateMoneySpawn_2030.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_CreateMoneySpawn_2030();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.moneyType = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("moneyType"))
                    throw $util.ProtocolError("missing required 'moneyType'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_CreateMoneySpawn_2030 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_CreateMoneySpawn_2030} c_CreateMoneySpawn_2030
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CreateMoneySpawn_2030.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_CreateMoneySpawn_2030 message.
             * @function verify
             * @memberof com.msg.c_CreateMoneySpawn_2030
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_CreateMoneySpawn_2030.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.moneyType))
                    return "moneyType: integer expected";
                return null;
            };

            return c_CreateMoneySpawn_2030;
        })();

        msg.s_CreateMoneySpawn_2031 = (function() {

            /**
             * Properties of a s_CreateMoneySpawn_2031.
             * @memberof com.msg
             * @interface Is_CreateMoneySpawn_2031
             * @property {number} result s_CreateMoneySpawn_2031 result
             * @property {com.msg.ImoneySpawnInfo} newSpawnInfo s_CreateMoneySpawn_2031 newSpawnInfo
             */

            /**
             * Constructs a new s_CreateMoneySpawn_2031.
             * @memberof com.msg
             * @classdesc Represents a s_CreateMoneySpawn_2031.
             * @implements Is_CreateMoneySpawn_2031
             * @constructor
             * @param {com.msg.Is_CreateMoneySpawn_2031=} [properties] Properties to set
             */
            function s_CreateMoneySpawn_2031(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_CreateMoneySpawn_2031 result.
             * @member {number} result
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @instance
             */
            s_CreateMoneySpawn_2031.prototype.result = 0;

            /**
             * s_CreateMoneySpawn_2031 newSpawnInfo.
             * @member {com.msg.ImoneySpawnInfo} newSpawnInfo
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @instance
             */
            s_CreateMoneySpawn_2031.prototype.newSpawnInfo = null;

            /**
             * Creates a new s_CreateMoneySpawn_2031 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @static
             * @param {com.msg.Is_CreateMoneySpawn_2031=} [properties] Properties to set
             * @returns {com.msg.s_CreateMoneySpawn_2031} s_CreateMoneySpawn_2031 instance
             */
            s_CreateMoneySpawn_2031.create = function create(properties) {
                return new s_CreateMoneySpawn_2031(properties);
            };

            /**
             * Encodes the specified s_CreateMoneySpawn_2031 message. Does not implicitly {@link com.msg.s_CreateMoneySpawn_2031.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @static
             * @param {com.msg.Is_CreateMoneySpawn_2031} message s_CreateMoneySpawn_2031 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CreateMoneySpawn_2031.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                $root.com.msg.moneySpawnInfo.encode(message.newSpawnInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_CreateMoneySpawn_2031 message, length delimited. Does not implicitly {@link com.msg.s_CreateMoneySpawn_2031.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @static
             * @param {com.msg.Is_CreateMoneySpawn_2031} message s_CreateMoneySpawn_2031 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CreateMoneySpawn_2031.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_CreateMoneySpawn_2031 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_CreateMoneySpawn_2031} s_CreateMoneySpawn_2031
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CreateMoneySpawn_2031.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_CreateMoneySpawn_2031();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.newSpawnInfo = $root.com.msg.moneySpawnInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("newSpawnInfo"))
                    throw $util.ProtocolError("missing required 'newSpawnInfo'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_CreateMoneySpawn_2031 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_CreateMoneySpawn_2031} s_CreateMoneySpawn_2031
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CreateMoneySpawn_2031.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_CreateMoneySpawn_2031 message.
             * @function verify
             * @memberof com.msg.s_CreateMoneySpawn_2031
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_CreateMoneySpawn_2031.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                {
                    var error = $root.com.msg.moneySpawnInfo.verify(message.newSpawnInfo);
                    if (error)
                        return "newSpawnInfo." + error;
                }
                return null;
            };

            return s_CreateMoneySpawn_2031;
        })();

        msg.c_UpdateMoneySpawn_2032 = (function() {

            /**
             * Properties of a c_UpdateMoneySpawn_2032.
             * @memberof com.msg
             * @interface Ic_UpdateMoneySpawn_2032
             * @property {string} openId c_UpdateMoneySpawn_2032 openId
             * @property {number} spawnID c_UpdateMoneySpawn_2032 spawnID
             * @property {number} moneyDelta c_UpdateMoneySpawn_2032 moneyDelta
             */

            /**
             * Constructs a new c_UpdateMoneySpawn_2032.
             * @memberof com.msg
             * @classdesc Represents a c_UpdateMoneySpawn_2032.
             * @implements Ic_UpdateMoneySpawn_2032
             * @constructor
             * @param {com.msg.Ic_UpdateMoneySpawn_2032=} [properties] Properties to set
             */
            function c_UpdateMoneySpawn_2032(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_UpdateMoneySpawn_2032 openId.
             * @member {string} openId
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @instance
             */
            c_UpdateMoneySpawn_2032.prototype.openId = "";

            /**
             * c_UpdateMoneySpawn_2032 spawnID.
             * @member {number} spawnID
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @instance
             */
            c_UpdateMoneySpawn_2032.prototype.spawnID = 0;

            /**
             * c_UpdateMoneySpawn_2032 moneyDelta.
             * @member {number} moneyDelta
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @instance
             */
            c_UpdateMoneySpawn_2032.prototype.moneyDelta = 0;

            /**
             * Creates a new c_UpdateMoneySpawn_2032 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @static
             * @param {com.msg.Ic_UpdateMoneySpawn_2032=} [properties] Properties to set
             * @returns {com.msg.c_UpdateMoneySpawn_2032} c_UpdateMoneySpawn_2032 instance
             */
            c_UpdateMoneySpawn_2032.create = function create(properties) {
                return new c_UpdateMoneySpawn_2032(properties);
            };

            /**
             * Encodes the specified c_UpdateMoneySpawn_2032 message. Does not implicitly {@link com.msg.c_UpdateMoneySpawn_2032.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @static
             * @param {com.msg.Ic_UpdateMoneySpawn_2032} message c_UpdateMoneySpawn_2032 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UpdateMoneySpawn_2032.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.spawnID);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.moneyDelta);
                return writer;
            };

            /**
             * Encodes the specified c_UpdateMoneySpawn_2032 message, length delimited. Does not implicitly {@link com.msg.c_UpdateMoneySpawn_2032.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @static
             * @param {com.msg.Ic_UpdateMoneySpawn_2032} message c_UpdateMoneySpawn_2032 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_UpdateMoneySpawn_2032.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_UpdateMoneySpawn_2032 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_UpdateMoneySpawn_2032} c_UpdateMoneySpawn_2032
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UpdateMoneySpawn_2032.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_UpdateMoneySpawn_2032();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.spawnID = reader.int32();
                        break;
                    case 3:
                        message.moneyDelta = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("spawnID"))
                    throw $util.ProtocolError("missing required 'spawnID'", { instance: message });
                if (!message.hasOwnProperty("moneyDelta"))
                    throw $util.ProtocolError("missing required 'moneyDelta'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_UpdateMoneySpawn_2032 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_UpdateMoneySpawn_2032} c_UpdateMoneySpawn_2032
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_UpdateMoneySpawn_2032.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_UpdateMoneySpawn_2032 message.
             * @function verify
             * @memberof com.msg.c_UpdateMoneySpawn_2032
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_UpdateMoneySpawn_2032.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.spawnID))
                    return "spawnID: integer expected";
                if (!$util.isInteger(message.moneyDelta))
                    return "moneyDelta: integer expected";
                return null;
            };

            return c_UpdateMoneySpawn_2032;
        })();

        msg.s_UpdateMoneySpawn_2033 = (function() {

            /**
             * Properties of a s_UpdateMoneySpawn_2033.
             * @memberof com.msg
             * @interface Is_UpdateMoneySpawn_2033
             * @property {number} result s_UpdateMoneySpawn_2033 result
             * @property {com.msg.ImoneySpawnInfo|null} [spawnInfo] s_UpdateMoneySpawn_2033 spawnInfo
             */

            /**
             * Constructs a new s_UpdateMoneySpawn_2033.
             * @memberof com.msg
             * @classdesc Represents a s_UpdateMoneySpawn_2033.
             * @implements Is_UpdateMoneySpawn_2033
             * @constructor
             * @param {com.msg.Is_UpdateMoneySpawn_2033=} [properties] Properties to set
             */
            function s_UpdateMoneySpawn_2033(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_UpdateMoneySpawn_2033 result.
             * @member {number} result
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @instance
             */
            s_UpdateMoneySpawn_2033.prototype.result = 0;

            /**
             * s_UpdateMoneySpawn_2033 spawnInfo.
             * @member {com.msg.ImoneySpawnInfo|null|undefined} spawnInfo
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @instance
             */
            s_UpdateMoneySpawn_2033.prototype.spawnInfo = null;

            /**
             * Creates a new s_UpdateMoneySpawn_2033 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @static
             * @param {com.msg.Is_UpdateMoneySpawn_2033=} [properties] Properties to set
             * @returns {com.msg.s_UpdateMoneySpawn_2033} s_UpdateMoneySpawn_2033 instance
             */
            s_UpdateMoneySpawn_2033.create = function create(properties) {
                return new s_UpdateMoneySpawn_2033(properties);
            };

            /**
             * Encodes the specified s_UpdateMoneySpawn_2033 message. Does not implicitly {@link com.msg.s_UpdateMoneySpawn_2033.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @static
             * @param {com.msg.Is_UpdateMoneySpawn_2033} message s_UpdateMoneySpawn_2033 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UpdateMoneySpawn_2033.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.spawnInfo != null && message.hasOwnProperty("spawnInfo"))
                    $root.com.msg.moneySpawnInfo.encode(message.spawnInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_UpdateMoneySpawn_2033 message, length delimited. Does not implicitly {@link com.msg.s_UpdateMoneySpawn_2033.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @static
             * @param {com.msg.Is_UpdateMoneySpawn_2033} message s_UpdateMoneySpawn_2033 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_UpdateMoneySpawn_2033.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_UpdateMoneySpawn_2033 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_UpdateMoneySpawn_2033} s_UpdateMoneySpawn_2033
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UpdateMoneySpawn_2033.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_UpdateMoneySpawn_2033();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.spawnInfo = $root.com.msg.moneySpawnInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_UpdateMoneySpawn_2033 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_UpdateMoneySpawn_2033} s_UpdateMoneySpawn_2033
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_UpdateMoneySpawn_2033.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_UpdateMoneySpawn_2033 message.
             * @function verify
             * @memberof com.msg.s_UpdateMoneySpawn_2033
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_UpdateMoneySpawn_2033.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.spawnInfo != null && message.hasOwnProperty("spawnInfo")) {
                    var error = $root.com.msg.moneySpawnInfo.verify(message.spawnInfo);
                    if (error)
                        return "spawnInfo." + error;
                }
                return null;
            };

            return s_UpdateMoneySpawn_2033;
        })();

        msg.c_GainMoneySpawn_2034 = (function() {

            /**
             * Properties of a c_GainMoneySpawn_2034.
             * @memberof com.msg
             * @interface Ic_GainMoneySpawn_2034
             * @property {string} openId c_GainMoneySpawn_2034 openId
             * @property {number} spawnID c_GainMoneySpawn_2034 spawnID
             * @property {number} base c_GainMoneySpawn_2034 base
             * @property {number} lucky c_GainMoneySpawn_2034 lucky
             */

            /**
             * Constructs a new c_GainMoneySpawn_2034.
             * @memberof com.msg
             * @classdesc Represents a c_GainMoneySpawn_2034.
             * @implements Ic_GainMoneySpawn_2034
             * @constructor
             * @param {com.msg.Ic_GainMoneySpawn_2034=} [properties] Properties to set
             */
            function c_GainMoneySpawn_2034(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_GainMoneySpawn_2034 openId.
             * @member {string} openId
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @instance
             */
            c_GainMoneySpawn_2034.prototype.openId = "";

            /**
             * c_GainMoneySpawn_2034 spawnID.
             * @member {number} spawnID
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @instance
             */
            c_GainMoneySpawn_2034.prototype.spawnID = 0;

            /**
             * c_GainMoneySpawn_2034 base.
             * @member {number} base
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @instance
             */
            c_GainMoneySpawn_2034.prototype.base = 0;

            /**
             * c_GainMoneySpawn_2034 lucky.
             * @member {number} lucky
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @instance
             */
            c_GainMoneySpawn_2034.prototype.lucky = 0;

            /**
             * Creates a new c_GainMoneySpawn_2034 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @static
             * @param {com.msg.Ic_GainMoneySpawn_2034=} [properties] Properties to set
             * @returns {com.msg.c_GainMoneySpawn_2034} c_GainMoneySpawn_2034 instance
             */
            c_GainMoneySpawn_2034.create = function create(properties) {
                return new c_GainMoneySpawn_2034(properties);
            };

            /**
             * Encodes the specified c_GainMoneySpawn_2034 message. Does not implicitly {@link com.msg.c_GainMoneySpawn_2034.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @static
             * @param {com.msg.Ic_GainMoneySpawn_2034} message c_GainMoneySpawn_2034 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GainMoneySpawn_2034.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.spawnID);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.base);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lucky);
                return writer;
            };

            /**
             * Encodes the specified c_GainMoneySpawn_2034 message, length delimited. Does not implicitly {@link com.msg.c_GainMoneySpawn_2034.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @static
             * @param {com.msg.Ic_GainMoneySpawn_2034} message c_GainMoneySpawn_2034 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GainMoneySpawn_2034.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_GainMoneySpawn_2034 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_GainMoneySpawn_2034} c_GainMoneySpawn_2034
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GainMoneySpawn_2034.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_GainMoneySpawn_2034();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.spawnID = reader.int32();
                        break;
                    case 3:
                        message.base = reader.int32();
                        break;
                    case 4:
                        message.lucky = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("spawnID"))
                    throw $util.ProtocolError("missing required 'spawnID'", { instance: message });
                if (!message.hasOwnProperty("base"))
                    throw $util.ProtocolError("missing required 'base'", { instance: message });
                if (!message.hasOwnProperty("lucky"))
                    throw $util.ProtocolError("missing required 'lucky'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_GainMoneySpawn_2034 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_GainMoneySpawn_2034} c_GainMoneySpawn_2034
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GainMoneySpawn_2034.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_GainMoneySpawn_2034 message.
             * @function verify
             * @memberof com.msg.c_GainMoneySpawn_2034
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_GainMoneySpawn_2034.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.spawnID))
                    return "spawnID: integer expected";
                if (!$util.isInteger(message.base))
                    return "base: integer expected";
                if (!$util.isInteger(message.lucky))
                    return "lucky: integer expected";
                return null;
            };

            return c_GainMoneySpawn_2034;
        })();

        msg.s_GainMoneySpawn_2035 = (function() {

            /**
             * Properties of a s_GainMoneySpawn_2035.
             * @memberof com.msg
             * @interface Is_GainMoneySpawn_2035
             * @property {number} result s_GainMoneySpawn_2035 result
             * @property {com.msg.ImoneySpawnInfo|null} [spawnInfo] s_GainMoneySpawn_2035 spawnInfo
             */

            /**
             * Constructs a new s_GainMoneySpawn_2035.
             * @memberof com.msg
             * @classdesc Represents a s_GainMoneySpawn_2035.
             * @implements Is_GainMoneySpawn_2035
             * @constructor
             * @param {com.msg.Is_GainMoneySpawn_2035=} [properties] Properties to set
             */
            function s_GainMoneySpawn_2035(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_GainMoneySpawn_2035 result.
             * @member {number} result
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @instance
             */
            s_GainMoneySpawn_2035.prototype.result = 0;

            /**
             * s_GainMoneySpawn_2035 spawnInfo.
             * @member {com.msg.ImoneySpawnInfo|null|undefined} spawnInfo
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @instance
             */
            s_GainMoneySpawn_2035.prototype.spawnInfo = null;

            /**
             * Creates a new s_GainMoneySpawn_2035 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @static
             * @param {com.msg.Is_GainMoneySpawn_2035=} [properties] Properties to set
             * @returns {com.msg.s_GainMoneySpawn_2035} s_GainMoneySpawn_2035 instance
             */
            s_GainMoneySpawn_2035.create = function create(properties) {
                return new s_GainMoneySpawn_2035(properties);
            };

            /**
             * Encodes the specified s_GainMoneySpawn_2035 message. Does not implicitly {@link com.msg.s_GainMoneySpawn_2035.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @static
             * @param {com.msg.Is_GainMoneySpawn_2035} message s_GainMoneySpawn_2035 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GainMoneySpawn_2035.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.spawnInfo != null && message.hasOwnProperty("spawnInfo"))
                    $root.com.msg.moneySpawnInfo.encode(message.spawnInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_GainMoneySpawn_2035 message, length delimited. Does not implicitly {@link com.msg.s_GainMoneySpawn_2035.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @static
             * @param {com.msg.Is_GainMoneySpawn_2035} message s_GainMoneySpawn_2035 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GainMoneySpawn_2035.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_GainMoneySpawn_2035 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_GainMoneySpawn_2035} s_GainMoneySpawn_2035
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GainMoneySpawn_2035.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_GainMoneySpawn_2035();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.spawnInfo = $root.com.msg.moneySpawnInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_GainMoneySpawn_2035 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_GainMoneySpawn_2035} s_GainMoneySpawn_2035
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GainMoneySpawn_2035.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_GainMoneySpawn_2035 message.
             * @function verify
             * @memberof com.msg.s_GainMoneySpawn_2035
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_GainMoneySpawn_2035.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.spawnInfo != null && message.hasOwnProperty("spawnInfo")) {
                    var error = $root.com.msg.moneySpawnInfo.verify(message.spawnInfo);
                    if (error)
                        return "spawnInfo." + error;
                }
                return null;
            };

            return s_GainMoneySpawn_2035;
        })();

        msg.c_RemoveMoneySpawn_2036 = (function() {

            /**
             * Properties of a c_RemoveMoneySpawn_2036.
             * @memberof com.msg
             * @interface Ic_RemoveMoneySpawn_2036
             * @property {string} openId c_RemoveMoneySpawn_2036 openId
             * @property {number} spawnID c_RemoveMoneySpawn_2036 spawnID
             */

            /**
             * Constructs a new c_RemoveMoneySpawn_2036.
             * @memberof com.msg
             * @classdesc Represents a c_RemoveMoneySpawn_2036.
             * @implements Ic_RemoveMoneySpawn_2036
             * @constructor
             * @param {com.msg.Ic_RemoveMoneySpawn_2036=} [properties] Properties to set
             */
            function c_RemoveMoneySpawn_2036(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_RemoveMoneySpawn_2036 openId.
             * @member {string} openId
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @instance
             */
            c_RemoveMoneySpawn_2036.prototype.openId = "";

            /**
             * c_RemoveMoneySpawn_2036 spawnID.
             * @member {number} spawnID
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @instance
             */
            c_RemoveMoneySpawn_2036.prototype.spawnID = 0;

            /**
             * Creates a new c_RemoveMoneySpawn_2036 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @static
             * @param {com.msg.Ic_RemoveMoneySpawn_2036=} [properties] Properties to set
             * @returns {com.msg.c_RemoveMoneySpawn_2036} c_RemoveMoneySpawn_2036 instance
             */
            c_RemoveMoneySpawn_2036.create = function create(properties) {
                return new c_RemoveMoneySpawn_2036(properties);
            };

            /**
             * Encodes the specified c_RemoveMoneySpawn_2036 message. Does not implicitly {@link com.msg.c_RemoveMoneySpawn_2036.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @static
             * @param {com.msg.Ic_RemoveMoneySpawn_2036} message c_RemoveMoneySpawn_2036 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_RemoveMoneySpawn_2036.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.spawnID);
                return writer;
            };

            /**
             * Encodes the specified c_RemoveMoneySpawn_2036 message, length delimited. Does not implicitly {@link com.msg.c_RemoveMoneySpawn_2036.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @static
             * @param {com.msg.Ic_RemoveMoneySpawn_2036} message c_RemoveMoneySpawn_2036 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_RemoveMoneySpawn_2036.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_RemoveMoneySpawn_2036 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_RemoveMoneySpawn_2036} c_RemoveMoneySpawn_2036
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_RemoveMoneySpawn_2036.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_RemoveMoneySpawn_2036();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.spawnID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("spawnID"))
                    throw $util.ProtocolError("missing required 'spawnID'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_RemoveMoneySpawn_2036 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_RemoveMoneySpawn_2036} c_RemoveMoneySpawn_2036
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_RemoveMoneySpawn_2036.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_RemoveMoneySpawn_2036 message.
             * @function verify
             * @memberof com.msg.c_RemoveMoneySpawn_2036
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_RemoveMoneySpawn_2036.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.spawnID))
                    return "spawnID: integer expected";
                return null;
            };

            return c_RemoveMoneySpawn_2036;
        })();

        msg.s_RemoveMoneySpawn_2037 = (function() {

            /**
             * Properties of a s_RemoveMoneySpawn_2037.
             * @memberof com.msg
             * @interface Is_RemoveMoneySpawn_2037
             * @property {number} result s_RemoveMoneySpawn_2037 result
             * @property {number} spawnID s_RemoveMoneySpawn_2037 spawnID
             */

            /**
             * Constructs a new s_RemoveMoneySpawn_2037.
             * @memberof com.msg
             * @classdesc Represents a s_RemoveMoneySpawn_2037.
             * @implements Is_RemoveMoneySpawn_2037
             * @constructor
             * @param {com.msg.Is_RemoveMoneySpawn_2037=} [properties] Properties to set
             */
            function s_RemoveMoneySpawn_2037(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_RemoveMoneySpawn_2037 result.
             * @member {number} result
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @instance
             */
            s_RemoveMoneySpawn_2037.prototype.result = 0;

            /**
             * s_RemoveMoneySpawn_2037 spawnID.
             * @member {number} spawnID
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @instance
             */
            s_RemoveMoneySpawn_2037.prototype.spawnID = 0;

            /**
             * Creates a new s_RemoveMoneySpawn_2037 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @static
             * @param {com.msg.Is_RemoveMoneySpawn_2037=} [properties] Properties to set
             * @returns {com.msg.s_RemoveMoneySpawn_2037} s_RemoveMoneySpawn_2037 instance
             */
            s_RemoveMoneySpawn_2037.create = function create(properties) {
                return new s_RemoveMoneySpawn_2037(properties);
            };

            /**
             * Encodes the specified s_RemoveMoneySpawn_2037 message. Does not implicitly {@link com.msg.s_RemoveMoneySpawn_2037.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @static
             * @param {com.msg.Is_RemoveMoneySpawn_2037} message s_RemoveMoneySpawn_2037 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_RemoveMoneySpawn_2037.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.spawnID);
                return writer;
            };

            /**
             * Encodes the specified s_RemoveMoneySpawn_2037 message, length delimited. Does not implicitly {@link com.msg.s_RemoveMoneySpawn_2037.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @static
             * @param {com.msg.Is_RemoveMoneySpawn_2037} message s_RemoveMoneySpawn_2037 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_RemoveMoneySpawn_2037.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_RemoveMoneySpawn_2037 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_RemoveMoneySpawn_2037} s_RemoveMoneySpawn_2037
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_RemoveMoneySpawn_2037.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_RemoveMoneySpawn_2037();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.spawnID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("spawnID"))
                    throw $util.ProtocolError("missing required 'spawnID'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_RemoveMoneySpawn_2037 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_RemoveMoneySpawn_2037} s_RemoveMoneySpawn_2037
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_RemoveMoneySpawn_2037.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_RemoveMoneySpawn_2037 message.
             * @function verify
             * @memberof com.msg.s_RemoveMoneySpawn_2037
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_RemoveMoneySpawn_2037.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (!$util.isInteger(message.spawnID))
                    return "spawnID: integer expected";
                return null;
            };

            return s_RemoveMoneySpawn_2037;
        })();

        msg.c_InvitedByFriend_2040 = (function() {

            /**
             * Properties of a c_InvitedByFriend_2040.
             * @memberof com.msg
             * @interface Ic_InvitedByFriend_2040
             * @property {string} openId c_InvitedByFriend_2040 openId
             * @property {string} inviterOpenID c_InvitedByFriend_2040 inviterOpenID
             */

            /**
             * Constructs a new c_InvitedByFriend_2040.
             * @memberof com.msg
             * @classdesc Represents a c_InvitedByFriend_2040.
             * @implements Ic_InvitedByFriend_2040
             * @constructor
             * @param {com.msg.Ic_InvitedByFriend_2040=} [properties] Properties to set
             */
            function c_InvitedByFriend_2040(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_InvitedByFriend_2040 openId.
             * @member {string} openId
             * @memberof com.msg.c_InvitedByFriend_2040
             * @instance
             */
            c_InvitedByFriend_2040.prototype.openId = "";

            /**
             * c_InvitedByFriend_2040 inviterOpenID.
             * @member {string} inviterOpenID
             * @memberof com.msg.c_InvitedByFriend_2040
             * @instance
             */
            c_InvitedByFriend_2040.prototype.inviterOpenID = "";

            /**
             * Creates a new c_InvitedByFriend_2040 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_InvitedByFriend_2040
             * @static
             * @param {com.msg.Ic_InvitedByFriend_2040=} [properties] Properties to set
             * @returns {com.msg.c_InvitedByFriend_2040} c_InvitedByFriend_2040 instance
             */
            c_InvitedByFriend_2040.create = function create(properties) {
                return new c_InvitedByFriend_2040(properties);
            };

            /**
             * Encodes the specified c_InvitedByFriend_2040 message. Does not implicitly {@link com.msg.c_InvitedByFriend_2040.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_InvitedByFriend_2040
             * @static
             * @param {com.msg.Ic_InvitedByFriend_2040} message c_InvitedByFriend_2040 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_InvitedByFriend_2040.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.inviterOpenID);
                return writer;
            };

            /**
             * Encodes the specified c_InvitedByFriend_2040 message, length delimited. Does not implicitly {@link com.msg.c_InvitedByFriend_2040.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_InvitedByFriend_2040
             * @static
             * @param {com.msg.Ic_InvitedByFriend_2040} message c_InvitedByFriend_2040 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_InvitedByFriend_2040.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_InvitedByFriend_2040 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_InvitedByFriend_2040
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_InvitedByFriend_2040} c_InvitedByFriend_2040
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_InvitedByFriend_2040.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_InvitedByFriend_2040();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.inviterOpenID = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("inviterOpenID"))
                    throw $util.ProtocolError("missing required 'inviterOpenID'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_InvitedByFriend_2040 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_InvitedByFriend_2040
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_InvitedByFriend_2040} c_InvitedByFriend_2040
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_InvitedByFriend_2040.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_InvitedByFriend_2040 message.
             * @function verify
             * @memberof com.msg.c_InvitedByFriend_2040
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_InvitedByFriend_2040.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isString(message.inviterOpenID))
                    return "inviterOpenID: string expected";
                return null;
            };

            return c_InvitedByFriend_2040;
        })();

        msg.s_InvitedByFriend_2041 = (function() {

            /**
             * Properties of a s_InvitedByFriend_2041.
             * @memberof com.msg
             * @interface Is_InvitedByFriend_2041
             * @property {number} result s_InvitedByFriend_2041 result
             */

            /**
             * Constructs a new s_InvitedByFriend_2041.
             * @memberof com.msg
             * @classdesc Represents a s_InvitedByFriend_2041.
             * @implements Is_InvitedByFriend_2041
             * @constructor
             * @param {com.msg.Is_InvitedByFriend_2041=} [properties] Properties to set
             */
            function s_InvitedByFriend_2041(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_InvitedByFriend_2041 result.
             * @member {number} result
             * @memberof com.msg.s_InvitedByFriend_2041
             * @instance
             */
            s_InvitedByFriend_2041.prototype.result = 0;

            /**
             * Creates a new s_InvitedByFriend_2041 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_InvitedByFriend_2041
             * @static
             * @param {com.msg.Is_InvitedByFriend_2041=} [properties] Properties to set
             * @returns {com.msg.s_InvitedByFriend_2041} s_InvitedByFriend_2041 instance
             */
            s_InvitedByFriend_2041.create = function create(properties) {
                return new s_InvitedByFriend_2041(properties);
            };

            /**
             * Encodes the specified s_InvitedByFriend_2041 message. Does not implicitly {@link com.msg.s_InvitedByFriend_2041.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_InvitedByFriend_2041
             * @static
             * @param {com.msg.Is_InvitedByFriend_2041} message s_InvitedByFriend_2041 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_InvitedByFriend_2041.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                return writer;
            };

            /**
             * Encodes the specified s_InvitedByFriend_2041 message, length delimited. Does not implicitly {@link com.msg.s_InvitedByFriend_2041.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_InvitedByFriend_2041
             * @static
             * @param {com.msg.Is_InvitedByFriend_2041} message s_InvitedByFriend_2041 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_InvitedByFriend_2041.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_InvitedByFriend_2041 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_InvitedByFriend_2041
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_InvitedByFriend_2041} s_InvitedByFriend_2041
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_InvitedByFriend_2041.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_InvitedByFriend_2041();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_InvitedByFriend_2041 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_InvitedByFriend_2041
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_InvitedByFriend_2041} s_InvitedByFriend_2041
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_InvitedByFriend_2041.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_InvitedByFriend_2041 message.
             * @function verify
             * @memberof com.msg.s_InvitedByFriend_2041
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_InvitedByFriend_2041.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                return null;
            };

            return s_InvitedByFriend_2041;
        })();

        msg.c_CheckInviteList_2042 = (function() {

            /**
             * Properties of a c_CheckInviteList_2042.
             * @memberof com.msg
             * @interface Ic_CheckInviteList_2042
             * @property {string} openId c_CheckInviteList_2042 openId
             */

            /**
             * Constructs a new c_CheckInviteList_2042.
             * @memberof com.msg
             * @classdesc Represents a c_CheckInviteList_2042.
             * @implements Ic_CheckInviteList_2042
             * @constructor
             * @param {com.msg.Ic_CheckInviteList_2042=} [properties] Properties to set
             */
            function c_CheckInviteList_2042(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_CheckInviteList_2042 openId.
             * @member {string} openId
             * @memberof com.msg.c_CheckInviteList_2042
             * @instance
             */
            c_CheckInviteList_2042.prototype.openId = "";

            /**
             * Creates a new c_CheckInviteList_2042 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_CheckInviteList_2042
             * @static
             * @param {com.msg.Ic_CheckInviteList_2042=} [properties] Properties to set
             * @returns {com.msg.c_CheckInviteList_2042} c_CheckInviteList_2042 instance
             */
            c_CheckInviteList_2042.create = function create(properties) {
                return new c_CheckInviteList_2042(properties);
            };

            /**
             * Encodes the specified c_CheckInviteList_2042 message. Does not implicitly {@link com.msg.c_CheckInviteList_2042.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_CheckInviteList_2042
             * @static
             * @param {com.msg.Ic_CheckInviteList_2042} message c_CheckInviteList_2042 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CheckInviteList_2042.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                return writer;
            };

            /**
             * Encodes the specified c_CheckInviteList_2042 message, length delimited. Does not implicitly {@link com.msg.c_CheckInviteList_2042.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_CheckInviteList_2042
             * @static
             * @param {com.msg.Ic_CheckInviteList_2042} message c_CheckInviteList_2042 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CheckInviteList_2042.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_CheckInviteList_2042 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_CheckInviteList_2042
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_CheckInviteList_2042} c_CheckInviteList_2042
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CheckInviteList_2042.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_CheckInviteList_2042();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_CheckInviteList_2042 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_CheckInviteList_2042
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_CheckInviteList_2042} c_CheckInviteList_2042
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CheckInviteList_2042.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_CheckInviteList_2042 message.
             * @function verify
             * @memberof com.msg.c_CheckInviteList_2042
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_CheckInviteList_2042.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                return null;
            };

            return c_CheckInviteList_2042;
        })();

        msg.s_CheckInviteList_2043 = (function() {

            /**
             * Properties of a s_CheckInviteList_2043.
             * @memberof com.msg
             * @interface Is_CheckInviteList_2043
             * @property {Array.<com.msg.IinviteDetail>|null} [inviteList] s_CheckInviteList_2043 inviteList
             */

            /**
             * Constructs a new s_CheckInviteList_2043.
             * @memberof com.msg
             * @classdesc Represents a s_CheckInviteList_2043.
             * @implements Is_CheckInviteList_2043
             * @constructor
             * @param {com.msg.Is_CheckInviteList_2043=} [properties] Properties to set
             */
            function s_CheckInviteList_2043(properties) {
                this.inviteList = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_CheckInviteList_2043 inviteList.
             * @member {Array.<com.msg.IinviteDetail>} inviteList
             * @memberof com.msg.s_CheckInviteList_2043
             * @instance
             */
            s_CheckInviteList_2043.prototype.inviteList = $util.emptyArray;

            /**
             * Creates a new s_CheckInviteList_2043 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_CheckInviteList_2043
             * @static
             * @param {com.msg.Is_CheckInviteList_2043=} [properties] Properties to set
             * @returns {com.msg.s_CheckInviteList_2043} s_CheckInviteList_2043 instance
             */
            s_CheckInviteList_2043.create = function create(properties) {
                return new s_CheckInviteList_2043(properties);
            };

            /**
             * Encodes the specified s_CheckInviteList_2043 message. Does not implicitly {@link com.msg.s_CheckInviteList_2043.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_CheckInviteList_2043
             * @static
             * @param {com.msg.Is_CheckInviteList_2043} message s_CheckInviteList_2043 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CheckInviteList_2043.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.inviteList != null && message.inviteList.length)
                    for (var i = 0; i < message.inviteList.length; ++i)
                        $root.com.msg.inviteDetail.encode(message.inviteList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_CheckInviteList_2043 message, length delimited. Does not implicitly {@link com.msg.s_CheckInviteList_2043.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_CheckInviteList_2043
             * @static
             * @param {com.msg.Is_CheckInviteList_2043} message s_CheckInviteList_2043 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CheckInviteList_2043.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_CheckInviteList_2043 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_CheckInviteList_2043
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_CheckInviteList_2043} s_CheckInviteList_2043
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CheckInviteList_2043.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_CheckInviteList_2043();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.inviteList && message.inviteList.length))
                            message.inviteList = [];
                        message.inviteList.push($root.com.msg.inviteDetail.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a s_CheckInviteList_2043 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_CheckInviteList_2043
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_CheckInviteList_2043} s_CheckInviteList_2043
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CheckInviteList_2043.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_CheckInviteList_2043 message.
             * @function verify
             * @memberof com.msg.s_CheckInviteList_2043
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_CheckInviteList_2043.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.inviteList != null && message.hasOwnProperty("inviteList")) {
                    if (!Array.isArray(message.inviteList))
                        return "inviteList: array expected";
                    for (var i = 0; i < message.inviteList.length; ++i) {
                        var error = $root.com.msg.inviteDetail.verify(message.inviteList[i]);
                        if (error)
                            return "inviteList." + error;
                    }
                }
                return null;
            };

            return s_CheckInviteList_2043;
        })();

        msg.c_GetInviteReward_2044 = (function() {

            /**
             * Properties of a c_GetInviteReward_2044.
             * @memberof com.msg
             * @interface Ic_GetInviteReward_2044
             * @property {string} openId c_GetInviteReward_2044 openId
             * @property {string} friendOpenId c_GetInviteReward_2044 friendOpenId
             * @property {number} rewardType c_GetInviteReward_2044 rewardType
             */

            /**
             * Constructs a new c_GetInviteReward_2044.
             * @memberof com.msg
             * @classdesc Represents a c_GetInviteReward_2044.
             * @implements Ic_GetInviteReward_2044
             * @constructor
             * @param {com.msg.Ic_GetInviteReward_2044=} [properties] Properties to set
             */
            function c_GetInviteReward_2044(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_GetInviteReward_2044 openId.
             * @member {string} openId
             * @memberof com.msg.c_GetInviteReward_2044
             * @instance
             */
            c_GetInviteReward_2044.prototype.openId = "";

            /**
             * c_GetInviteReward_2044 friendOpenId.
             * @member {string} friendOpenId
             * @memberof com.msg.c_GetInviteReward_2044
             * @instance
             */
            c_GetInviteReward_2044.prototype.friendOpenId = "";

            /**
             * c_GetInviteReward_2044 rewardType.
             * @member {number} rewardType
             * @memberof com.msg.c_GetInviteReward_2044
             * @instance
             */
            c_GetInviteReward_2044.prototype.rewardType = 0;

            /**
             * Creates a new c_GetInviteReward_2044 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_GetInviteReward_2044
             * @static
             * @param {com.msg.Ic_GetInviteReward_2044=} [properties] Properties to set
             * @returns {com.msg.c_GetInviteReward_2044} c_GetInviteReward_2044 instance
             */
            c_GetInviteReward_2044.create = function create(properties) {
                return new c_GetInviteReward_2044(properties);
            };

            /**
             * Encodes the specified c_GetInviteReward_2044 message. Does not implicitly {@link com.msg.c_GetInviteReward_2044.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_GetInviteReward_2044
             * @static
             * @param {com.msg.Ic_GetInviteReward_2044} message c_GetInviteReward_2044 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GetInviteReward_2044.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.friendOpenId);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rewardType);
                return writer;
            };

            /**
             * Encodes the specified c_GetInviteReward_2044 message, length delimited. Does not implicitly {@link com.msg.c_GetInviteReward_2044.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_GetInviteReward_2044
             * @static
             * @param {com.msg.Ic_GetInviteReward_2044} message c_GetInviteReward_2044 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GetInviteReward_2044.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_GetInviteReward_2044 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_GetInviteReward_2044
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_GetInviteReward_2044} c_GetInviteReward_2044
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GetInviteReward_2044.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_GetInviteReward_2044();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.friendOpenId = reader.string();
                        break;
                    case 3:
                        message.rewardType = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("friendOpenId"))
                    throw $util.ProtocolError("missing required 'friendOpenId'", { instance: message });
                if (!message.hasOwnProperty("rewardType"))
                    throw $util.ProtocolError("missing required 'rewardType'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_GetInviteReward_2044 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_GetInviteReward_2044
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_GetInviteReward_2044} c_GetInviteReward_2044
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GetInviteReward_2044.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_GetInviteReward_2044 message.
             * @function verify
             * @memberof com.msg.c_GetInviteReward_2044
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_GetInviteReward_2044.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isString(message.friendOpenId))
                    return "friendOpenId: string expected";
                if (!$util.isInteger(message.rewardType))
                    return "rewardType: integer expected";
                return null;
            };

            return c_GetInviteReward_2044;
        })();

        msg.s_GetInviteReward_2045 = (function() {

            /**
             * Properties of a s_GetInviteReward_2045.
             * @memberof com.msg
             * @interface Is_GetInviteReward_2045
             * @property {number} result s_GetInviteReward_2045 result
             * @property {com.msg.IinviteDetail|null} [rewardInfo] s_GetInviteReward_2045 rewardInfo
             */

            /**
             * Constructs a new s_GetInviteReward_2045.
             * @memberof com.msg
             * @classdesc Represents a s_GetInviteReward_2045.
             * @implements Is_GetInviteReward_2045
             * @constructor
             * @param {com.msg.Is_GetInviteReward_2045=} [properties] Properties to set
             */
            function s_GetInviteReward_2045(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_GetInviteReward_2045 result.
             * @member {number} result
             * @memberof com.msg.s_GetInviteReward_2045
             * @instance
             */
            s_GetInviteReward_2045.prototype.result = 0;

            /**
             * s_GetInviteReward_2045 rewardInfo.
             * @member {com.msg.IinviteDetail|null|undefined} rewardInfo
             * @memberof com.msg.s_GetInviteReward_2045
             * @instance
             */
            s_GetInviteReward_2045.prototype.rewardInfo = null;

            /**
             * Creates a new s_GetInviteReward_2045 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_GetInviteReward_2045
             * @static
             * @param {com.msg.Is_GetInviteReward_2045=} [properties] Properties to set
             * @returns {com.msg.s_GetInviteReward_2045} s_GetInviteReward_2045 instance
             */
            s_GetInviteReward_2045.create = function create(properties) {
                return new s_GetInviteReward_2045(properties);
            };

            /**
             * Encodes the specified s_GetInviteReward_2045 message. Does not implicitly {@link com.msg.s_GetInviteReward_2045.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_GetInviteReward_2045
             * @static
             * @param {com.msg.Is_GetInviteReward_2045} message s_GetInviteReward_2045 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GetInviteReward_2045.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.rewardInfo != null && message.hasOwnProperty("rewardInfo"))
                    $root.com.msg.inviteDetail.encode(message.rewardInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_GetInviteReward_2045 message, length delimited. Does not implicitly {@link com.msg.s_GetInviteReward_2045.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_GetInviteReward_2045
             * @static
             * @param {com.msg.Is_GetInviteReward_2045} message s_GetInviteReward_2045 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GetInviteReward_2045.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_GetInviteReward_2045 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_GetInviteReward_2045
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_GetInviteReward_2045} s_GetInviteReward_2045
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GetInviteReward_2045.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_GetInviteReward_2045();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.rewardInfo = $root.com.msg.inviteDetail.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_GetInviteReward_2045 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_GetInviteReward_2045
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_GetInviteReward_2045} s_GetInviteReward_2045
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GetInviteReward_2045.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_GetInviteReward_2045 message.
             * @function verify
             * @memberof com.msg.s_GetInviteReward_2045
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_GetInviteReward_2045.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.rewardInfo != null && message.hasOwnProperty("rewardInfo")) {
                    var error = $root.com.msg.inviteDetail.verify(message.rewardInfo);
                    if (error)
                        return "rewardInfo." + error;
                }
                return null;
            };

            return s_GetInviteReward_2045;
        })();

        msg.c_GetInviteVerifyReward_2046 = (function() {

            /**
             * Properties of a c_GetInviteVerifyReward_2046.
             * @memberof com.msg
             * @interface Ic_GetInviteVerifyReward_2046
             * @property {string} openId c_GetInviteVerifyReward_2046 openId
             * @property {string} friendOpenId c_GetInviteVerifyReward_2046 friendOpenId
             * @property {number} rewardType c_GetInviteVerifyReward_2046 rewardType
             */

            /**
             * Constructs a new c_GetInviteVerifyReward_2046.
             * @memberof com.msg
             * @classdesc Represents a c_GetInviteVerifyReward_2046.
             * @implements Ic_GetInviteVerifyReward_2046
             * @constructor
             * @param {com.msg.Ic_GetInviteVerifyReward_2046=} [properties] Properties to set
             */
            function c_GetInviteVerifyReward_2046(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_GetInviteVerifyReward_2046 openId.
             * @member {string} openId
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @instance
             */
            c_GetInviteVerifyReward_2046.prototype.openId = "";

            /**
             * c_GetInviteVerifyReward_2046 friendOpenId.
             * @member {string} friendOpenId
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @instance
             */
            c_GetInviteVerifyReward_2046.prototype.friendOpenId = "";

            /**
             * c_GetInviteVerifyReward_2046 rewardType.
             * @member {number} rewardType
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @instance
             */
            c_GetInviteVerifyReward_2046.prototype.rewardType = 0;

            /**
             * Creates a new c_GetInviteVerifyReward_2046 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @static
             * @param {com.msg.Ic_GetInviteVerifyReward_2046=} [properties] Properties to set
             * @returns {com.msg.c_GetInviteVerifyReward_2046} c_GetInviteVerifyReward_2046 instance
             */
            c_GetInviteVerifyReward_2046.create = function create(properties) {
                return new c_GetInviteVerifyReward_2046(properties);
            };

            /**
             * Encodes the specified c_GetInviteVerifyReward_2046 message. Does not implicitly {@link com.msg.c_GetInviteVerifyReward_2046.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @static
             * @param {com.msg.Ic_GetInviteVerifyReward_2046} message c_GetInviteVerifyReward_2046 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GetInviteVerifyReward_2046.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.friendOpenId);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rewardType);
                return writer;
            };

            /**
             * Encodes the specified c_GetInviteVerifyReward_2046 message, length delimited. Does not implicitly {@link com.msg.c_GetInviteVerifyReward_2046.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @static
             * @param {com.msg.Ic_GetInviteVerifyReward_2046} message c_GetInviteVerifyReward_2046 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GetInviteVerifyReward_2046.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_GetInviteVerifyReward_2046 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_GetInviteVerifyReward_2046} c_GetInviteVerifyReward_2046
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GetInviteVerifyReward_2046.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_GetInviteVerifyReward_2046();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.friendOpenId = reader.string();
                        break;
                    case 3:
                        message.rewardType = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("friendOpenId"))
                    throw $util.ProtocolError("missing required 'friendOpenId'", { instance: message });
                if (!message.hasOwnProperty("rewardType"))
                    throw $util.ProtocolError("missing required 'rewardType'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_GetInviteVerifyReward_2046 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_GetInviteVerifyReward_2046} c_GetInviteVerifyReward_2046
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GetInviteVerifyReward_2046.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_GetInviteVerifyReward_2046 message.
             * @function verify
             * @memberof com.msg.c_GetInviteVerifyReward_2046
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_GetInviteVerifyReward_2046.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isString(message.friendOpenId))
                    return "friendOpenId: string expected";
                if (!$util.isInteger(message.rewardType))
                    return "rewardType: integer expected";
                return null;
            };

            return c_GetInviteVerifyReward_2046;
        })();

        msg.s_GetInviteVerifyReward_2047 = (function() {

            /**
             * Properties of a s_GetInviteVerifyReward_2047.
             * @memberof com.msg
             * @interface Is_GetInviteVerifyReward_2047
             * @property {number} result s_GetInviteVerifyReward_2047 result
             * @property {com.msg.IinviteDetail|null} [firendInfo] s_GetInviteVerifyReward_2047 firendInfo
             * @property {number|null} [rewardNum] s_GetInviteVerifyReward_2047 rewardNum
             */

            /**
             * Constructs a new s_GetInviteVerifyReward_2047.
             * @memberof com.msg
             * @classdesc Represents a s_GetInviteVerifyReward_2047.
             * @implements Is_GetInviteVerifyReward_2047
             * @constructor
             * @param {com.msg.Is_GetInviteVerifyReward_2047=} [properties] Properties to set
             */
            function s_GetInviteVerifyReward_2047(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_GetInviteVerifyReward_2047 result.
             * @member {number} result
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @instance
             */
            s_GetInviteVerifyReward_2047.prototype.result = 0;

            /**
             * s_GetInviteVerifyReward_2047 firendInfo.
             * @member {com.msg.IinviteDetail|null|undefined} firendInfo
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @instance
             */
            s_GetInviteVerifyReward_2047.prototype.firendInfo = null;

            /**
             * s_GetInviteVerifyReward_2047 rewardNum.
             * @member {number} rewardNum
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @instance
             */
            s_GetInviteVerifyReward_2047.prototype.rewardNum = 0;

            /**
             * Creates a new s_GetInviteVerifyReward_2047 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @static
             * @param {com.msg.Is_GetInviteVerifyReward_2047=} [properties] Properties to set
             * @returns {com.msg.s_GetInviteVerifyReward_2047} s_GetInviteVerifyReward_2047 instance
             */
            s_GetInviteVerifyReward_2047.create = function create(properties) {
                return new s_GetInviteVerifyReward_2047(properties);
            };

            /**
             * Encodes the specified s_GetInviteVerifyReward_2047 message. Does not implicitly {@link com.msg.s_GetInviteVerifyReward_2047.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @static
             * @param {com.msg.Is_GetInviteVerifyReward_2047} message s_GetInviteVerifyReward_2047 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GetInviteVerifyReward_2047.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.firendInfo != null && message.hasOwnProperty("firendInfo"))
                    $root.com.msg.inviteDetail.encode(message.firendInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.rewardNum != null && message.hasOwnProperty("rewardNum"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rewardNum);
                return writer;
            };

            /**
             * Encodes the specified s_GetInviteVerifyReward_2047 message, length delimited. Does not implicitly {@link com.msg.s_GetInviteVerifyReward_2047.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @static
             * @param {com.msg.Is_GetInviteVerifyReward_2047} message s_GetInviteVerifyReward_2047 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GetInviteVerifyReward_2047.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_GetInviteVerifyReward_2047 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_GetInviteVerifyReward_2047} s_GetInviteVerifyReward_2047
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GetInviteVerifyReward_2047.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_GetInviteVerifyReward_2047();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.firendInfo = $root.com.msg.inviteDetail.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.rewardNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_GetInviteVerifyReward_2047 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_GetInviteVerifyReward_2047} s_GetInviteVerifyReward_2047
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GetInviteVerifyReward_2047.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_GetInviteVerifyReward_2047 message.
             * @function verify
             * @memberof com.msg.s_GetInviteVerifyReward_2047
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_GetInviteVerifyReward_2047.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.firendInfo != null && message.hasOwnProperty("firendInfo")) {
                    var error = $root.com.msg.inviteDetail.verify(message.firendInfo);
                    if (error)
                        return "firendInfo." + error;
                }
                if (message.rewardNum != null && message.hasOwnProperty("rewardNum"))
                    if (!$util.isInteger(message.rewardNum))
                        return "rewardNum: integer expected";
                return null;
            };

            return s_GetInviteVerifyReward_2047;
        })();

        msg.c_GainPointByTime_2050 = (function() {

            /**
             * Properties of a c_GainPointByTime_2050.
             * @memberof com.msg
             * @interface Ic_GainPointByTime_2050
             * @property {string} openId c_GainPointByTime_2050 openId
             */

            /**
             * Constructs a new c_GainPointByTime_2050.
             * @memberof com.msg
             * @classdesc Represents a c_GainPointByTime_2050.
             * @implements Ic_GainPointByTime_2050
             * @constructor
             * @param {com.msg.Ic_GainPointByTime_2050=} [properties] Properties to set
             */
            function c_GainPointByTime_2050(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_GainPointByTime_2050 openId.
             * @member {string} openId
             * @memberof com.msg.c_GainPointByTime_2050
             * @instance
             */
            c_GainPointByTime_2050.prototype.openId = "";

            /**
             * Creates a new c_GainPointByTime_2050 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_GainPointByTime_2050
             * @static
             * @param {com.msg.Ic_GainPointByTime_2050=} [properties] Properties to set
             * @returns {com.msg.c_GainPointByTime_2050} c_GainPointByTime_2050 instance
             */
            c_GainPointByTime_2050.create = function create(properties) {
                return new c_GainPointByTime_2050(properties);
            };

            /**
             * Encodes the specified c_GainPointByTime_2050 message. Does not implicitly {@link com.msg.c_GainPointByTime_2050.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_GainPointByTime_2050
             * @static
             * @param {com.msg.Ic_GainPointByTime_2050} message c_GainPointByTime_2050 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GainPointByTime_2050.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                return writer;
            };

            /**
             * Encodes the specified c_GainPointByTime_2050 message, length delimited. Does not implicitly {@link com.msg.c_GainPointByTime_2050.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_GainPointByTime_2050
             * @static
             * @param {com.msg.Ic_GainPointByTime_2050} message c_GainPointByTime_2050 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GainPointByTime_2050.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_GainPointByTime_2050 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_GainPointByTime_2050
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_GainPointByTime_2050} c_GainPointByTime_2050
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GainPointByTime_2050.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_GainPointByTime_2050();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_GainPointByTime_2050 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_GainPointByTime_2050
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_GainPointByTime_2050} c_GainPointByTime_2050
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GainPointByTime_2050.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_GainPointByTime_2050 message.
             * @function verify
             * @memberof com.msg.c_GainPointByTime_2050
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_GainPointByTime_2050.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                return null;
            };

            return c_GainPointByTime_2050;
        })();

        msg.s_GainPointByTime_2051 = (function() {

            /**
             * Properties of a s_GainPointByTime_2051.
             * @memberof com.msg
             * @interface Is_GainPointByTime_2051
             * @property {number} result s_GainPointByTime_2051 result
             * @property {com.msg.ImoneyInfo|null} [moneyInfo] s_GainPointByTime_2051 moneyInfo
             */

            /**
             * Constructs a new s_GainPointByTime_2051.
             * @memberof com.msg
             * @classdesc Represents a s_GainPointByTime_2051.
             * @implements Is_GainPointByTime_2051
             * @constructor
             * @param {com.msg.Is_GainPointByTime_2051=} [properties] Properties to set
             */
            function s_GainPointByTime_2051(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_GainPointByTime_2051 result.
             * @member {number} result
             * @memberof com.msg.s_GainPointByTime_2051
             * @instance
             */
            s_GainPointByTime_2051.prototype.result = 0;

            /**
             * s_GainPointByTime_2051 moneyInfo.
             * @member {com.msg.ImoneyInfo|null|undefined} moneyInfo
             * @memberof com.msg.s_GainPointByTime_2051
             * @instance
             */
            s_GainPointByTime_2051.prototype.moneyInfo = null;

            /**
             * Creates a new s_GainPointByTime_2051 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_GainPointByTime_2051
             * @static
             * @param {com.msg.Is_GainPointByTime_2051=} [properties] Properties to set
             * @returns {com.msg.s_GainPointByTime_2051} s_GainPointByTime_2051 instance
             */
            s_GainPointByTime_2051.create = function create(properties) {
                return new s_GainPointByTime_2051(properties);
            };

            /**
             * Encodes the specified s_GainPointByTime_2051 message. Does not implicitly {@link com.msg.s_GainPointByTime_2051.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_GainPointByTime_2051
             * @static
             * @param {com.msg.Is_GainPointByTime_2051} message s_GainPointByTime_2051 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GainPointByTime_2051.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.moneyInfo != null && message.hasOwnProperty("moneyInfo"))
                    $root.com.msg.moneyInfo.encode(message.moneyInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_GainPointByTime_2051 message, length delimited. Does not implicitly {@link com.msg.s_GainPointByTime_2051.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_GainPointByTime_2051
             * @static
             * @param {com.msg.Is_GainPointByTime_2051} message s_GainPointByTime_2051 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GainPointByTime_2051.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_GainPointByTime_2051 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_GainPointByTime_2051
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_GainPointByTime_2051} s_GainPointByTime_2051
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GainPointByTime_2051.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_GainPointByTime_2051();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.moneyInfo = $root.com.msg.moneyInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_GainPointByTime_2051 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_GainPointByTime_2051
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_GainPointByTime_2051} s_GainPointByTime_2051
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GainPointByTime_2051.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_GainPointByTime_2051 message.
             * @function verify
             * @memberof com.msg.s_GainPointByTime_2051
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_GainPointByTime_2051.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.moneyInfo != null && message.hasOwnProperty("moneyInfo")) {
                    var error = $root.com.msg.moneyInfo.verify(message.moneyInfo);
                    if (error)
                        return "moneyInfo." + error;
                }
                return null;
            };

            return s_GainPointByTime_2051;
        })();

        msg.c_GainPointByMatch_2052 = (function() {

            /**
             * Properties of a c_GainPointByMatch_2052.
             * @memberof com.msg
             * @interface Ic_GainPointByMatch_2052
             * @property {string} openId c_GainPointByMatch_2052 openId
             * @property {number} curLevel c_GainPointByMatch_2052 curLevel
             */

            /**
             * Constructs a new c_GainPointByMatch_2052.
             * @memberof com.msg
             * @classdesc Represents a c_GainPointByMatch_2052.
             * @implements Ic_GainPointByMatch_2052
             * @constructor
             * @param {com.msg.Ic_GainPointByMatch_2052=} [properties] Properties to set
             */
            function c_GainPointByMatch_2052(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_GainPointByMatch_2052 openId.
             * @member {string} openId
             * @memberof com.msg.c_GainPointByMatch_2052
             * @instance
             */
            c_GainPointByMatch_2052.prototype.openId = "";

            /**
             * c_GainPointByMatch_2052 curLevel.
             * @member {number} curLevel
             * @memberof com.msg.c_GainPointByMatch_2052
             * @instance
             */
            c_GainPointByMatch_2052.prototype.curLevel = 0;

            /**
             * Creates a new c_GainPointByMatch_2052 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_GainPointByMatch_2052
             * @static
             * @param {com.msg.Ic_GainPointByMatch_2052=} [properties] Properties to set
             * @returns {com.msg.c_GainPointByMatch_2052} c_GainPointByMatch_2052 instance
             */
            c_GainPointByMatch_2052.create = function create(properties) {
                return new c_GainPointByMatch_2052(properties);
            };

            /**
             * Encodes the specified c_GainPointByMatch_2052 message. Does not implicitly {@link com.msg.c_GainPointByMatch_2052.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_GainPointByMatch_2052
             * @static
             * @param {com.msg.Ic_GainPointByMatch_2052} message c_GainPointByMatch_2052 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GainPointByMatch_2052.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.curLevel);
                return writer;
            };

            /**
             * Encodes the specified c_GainPointByMatch_2052 message, length delimited. Does not implicitly {@link com.msg.c_GainPointByMatch_2052.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_GainPointByMatch_2052
             * @static
             * @param {com.msg.Ic_GainPointByMatch_2052} message c_GainPointByMatch_2052 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GainPointByMatch_2052.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_GainPointByMatch_2052 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_GainPointByMatch_2052
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_GainPointByMatch_2052} c_GainPointByMatch_2052
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GainPointByMatch_2052.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_GainPointByMatch_2052();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.curLevel = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("curLevel"))
                    throw $util.ProtocolError("missing required 'curLevel'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_GainPointByMatch_2052 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_GainPointByMatch_2052
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_GainPointByMatch_2052} c_GainPointByMatch_2052
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GainPointByMatch_2052.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_GainPointByMatch_2052 message.
             * @function verify
             * @memberof com.msg.c_GainPointByMatch_2052
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_GainPointByMatch_2052.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.curLevel))
                    return "curLevel: integer expected";
                return null;
            };

            return c_GainPointByMatch_2052;
        })();

        msg.s_GainPointByMatch_2053 = (function() {

            /**
             * Properties of a s_GainPointByMatch_2053.
             * @memberof com.msg
             * @interface Is_GainPointByMatch_2053
             * @property {number} result s_GainPointByMatch_2053 result
             * @property {number|null} [pointNum] s_GainPointByMatch_2053 pointNum
             */

            /**
             * Constructs a new s_GainPointByMatch_2053.
             * @memberof com.msg
             * @classdesc Represents a s_GainPointByMatch_2053.
             * @implements Is_GainPointByMatch_2053
             * @constructor
             * @param {com.msg.Is_GainPointByMatch_2053=} [properties] Properties to set
             */
            function s_GainPointByMatch_2053(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_GainPointByMatch_2053 result.
             * @member {number} result
             * @memberof com.msg.s_GainPointByMatch_2053
             * @instance
             */
            s_GainPointByMatch_2053.prototype.result = 0;

            /**
             * s_GainPointByMatch_2053 pointNum.
             * @member {number} pointNum
             * @memberof com.msg.s_GainPointByMatch_2053
             * @instance
             */
            s_GainPointByMatch_2053.prototype.pointNum = 0;

            /**
             * Creates a new s_GainPointByMatch_2053 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_GainPointByMatch_2053
             * @static
             * @param {com.msg.Is_GainPointByMatch_2053=} [properties] Properties to set
             * @returns {com.msg.s_GainPointByMatch_2053} s_GainPointByMatch_2053 instance
             */
            s_GainPointByMatch_2053.create = function create(properties) {
                return new s_GainPointByMatch_2053(properties);
            };

            /**
             * Encodes the specified s_GainPointByMatch_2053 message. Does not implicitly {@link com.msg.s_GainPointByMatch_2053.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_GainPointByMatch_2053
             * @static
             * @param {com.msg.Is_GainPointByMatch_2053} message s_GainPointByMatch_2053 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GainPointByMatch_2053.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.pointNum != null && message.hasOwnProperty("pointNum"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.pointNum);
                return writer;
            };

            /**
             * Encodes the specified s_GainPointByMatch_2053 message, length delimited. Does not implicitly {@link com.msg.s_GainPointByMatch_2053.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_GainPointByMatch_2053
             * @static
             * @param {com.msg.Is_GainPointByMatch_2053} message s_GainPointByMatch_2053 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GainPointByMatch_2053.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_GainPointByMatch_2053 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_GainPointByMatch_2053
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_GainPointByMatch_2053} s_GainPointByMatch_2053
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GainPointByMatch_2053.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_GainPointByMatch_2053();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.pointNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_GainPointByMatch_2053 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_GainPointByMatch_2053
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_GainPointByMatch_2053} s_GainPointByMatch_2053
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GainPointByMatch_2053.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_GainPointByMatch_2053 message.
             * @function verify
             * @memberof com.msg.s_GainPointByMatch_2053
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_GainPointByMatch_2053.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.pointNum != null && message.hasOwnProperty("pointNum"))
                    if (!$util.isInteger(message.pointNum))
                        return "pointNum: integer expected";
                return null;
            };

            return s_GainPointByMatch_2053;
        })();

        msg.c_MatchComplete_2100 = (function() {

            /**
             * Properties of a c_MatchComplete_2100.
             * @memberof com.msg
             * @interface Ic_MatchComplete_2100
             * @property {string} openId c_MatchComplete_2100 openId
             * @property {number} completedLevel c_MatchComplete_2100 completedLevel
             * @property {number} goldReward c_MatchComplete_2100 goldReward
             */

            /**
             * Constructs a new c_MatchComplete_2100.
             * @memberof com.msg
             * @classdesc Represents a c_MatchComplete_2100.
             * @implements Ic_MatchComplete_2100
             * @constructor
             * @param {com.msg.Ic_MatchComplete_2100=} [properties] Properties to set
             */
            function c_MatchComplete_2100(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_MatchComplete_2100 openId.
             * @member {string} openId
             * @memberof com.msg.c_MatchComplete_2100
             * @instance
             */
            c_MatchComplete_2100.prototype.openId = "";

            /**
             * c_MatchComplete_2100 completedLevel.
             * @member {number} completedLevel
             * @memberof com.msg.c_MatchComplete_2100
             * @instance
             */
            c_MatchComplete_2100.prototype.completedLevel = 0;

            /**
             * c_MatchComplete_2100 goldReward.
             * @member {number} goldReward
             * @memberof com.msg.c_MatchComplete_2100
             * @instance
             */
            c_MatchComplete_2100.prototype.goldReward = 0;

            /**
             * Creates a new c_MatchComplete_2100 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_MatchComplete_2100
             * @static
             * @param {com.msg.Ic_MatchComplete_2100=} [properties] Properties to set
             * @returns {com.msg.c_MatchComplete_2100} c_MatchComplete_2100 instance
             */
            c_MatchComplete_2100.create = function create(properties) {
                return new c_MatchComplete_2100(properties);
            };

            /**
             * Encodes the specified c_MatchComplete_2100 message. Does not implicitly {@link com.msg.c_MatchComplete_2100.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_MatchComplete_2100
             * @static
             * @param {com.msg.Ic_MatchComplete_2100} message c_MatchComplete_2100 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_MatchComplete_2100.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.completedLevel);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.goldReward);
                return writer;
            };

            /**
             * Encodes the specified c_MatchComplete_2100 message, length delimited. Does not implicitly {@link com.msg.c_MatchComplete_2100.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_MatchComplete_2100
             * @static
             * @param {com.msg.Ic_MatchComplete_2100} message c_MatchComplete_2100 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_MatchComplete_2100.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_MatchComplete_2100 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_MatchComplete_2100
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_MatchComplete_2100} c_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_MatchComplete_2100.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_MatchComplete_2100();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.completedLevel = reader.int32();
                        break;
                    case 3:
                        message.goldReward = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("completedLevel"))
                    throw $util.ProtocolError("missing required 'completedLevel'", { instance: message });
                if (!message.hasOwnProperty("goldReward"))
                    throw $util.ProtocolError("missing required 'goldReward'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_MatchComplete_2100 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_MatchComplete_2100
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_MatchComplete_2100} c_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_MatchComplete_2100.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_MatchComplete_2100 message.
             * @function verify
             * @memberof com.msg.c_MatchComplete_2100
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_MatchComplete_2100.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.completedLevel))
                    return "completedLevel: integer expected";
                if (!$util.isInteger(message.goldReward))
                    return "goldReward: integer expected";
                return null;
            };

            return c_MatchComplete_2100;
        })();

        msg.s_MatchComplete_2100 = (function() {

            /**
             * Properties of a s_MatchComplete_2100.
             * @memberof com.msg
             * @interface Is_MatchComplete_2100
             * @property {number} goldReward s_MatchComplete_2100 goldReward
             * @property {number} latestUnCompletedLevelID s_MatchComplete_2100 latestUnCompletedLevelID
             */

            /**
             * Constructs a new s_MatchComplete_2100.
             * @memberof com.msg
             * @classdesc Represents a s_MatchComplete_2100.
             * @implements Is_MatchComplete_2100
             * @constructor
             * @param {com.msg.Is_MatchComplete_2100=} [properties] Properties to set
             */
            function s_MatchComplete_2100(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_MatchComplete_2100 goldReward.
             * @member {number} goldReward
             * @memberof com.msg.s_MatchComplete_2100
             * @instance
             */
            s_MatchComplete_2100.prototype.goldReward = 0;

            /**
             * s_MatchComplete_2100 latestUnCompletedLevelID.
             * @member {number} latestUnCompletedLevelID
             * @memberof com.msg.s_MatchComplete_2100
             * @instance
             */
            s_MatchComplete_2100.prototype.latestUnCompletedLevelID = 0;

            /**
             * Creates a new s_MatchComplete_2100 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_MatchComplete_2100
             * @static
             * @param {com.msg.Is_MatchComplete_2100=} [properties] Properties to set
             * @returns {com.msg.s_MatchComplete_2100} s_MatchComplete_2100 instance
             */
            s_MatchComplete_2100.create = function create(properties) {
                return new s_MatchComplete_2100(properties);
            };

            /**
             * Encodes the specified s_MatchComplete_2100 message. Does not implicitly {@link com.msg.s_MatchComplete_2100.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_MatchComplete_2100
             * @static
             * @param {com.msg.Is_MatchComplete_2100} message s_MatchComplete_2100 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_MatchComplete_2100.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.goldReward);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.latestUnCompletedLevelID);
                return writer;
            };

            /**
             * Encodes the specified s_MatchComplete_2100 message, length delimited. Does not implicitly {@link com.msg.s_MatchComplete_2100.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_MatchComplete_2100
             * @static
             * @param {com.msg.Is_MatchComplete_2100} message s_MatchComplete_2100 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_MatchComplete_2100.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_MatchComplete_2100 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_MatchComplete_2100
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_MatchComplete_2100} s_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_MatchComplete_2100.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_MatchComplete_2100();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.goldReward = reader.int32();
                        break;
                    case 2:
                        message.latestUnCompletedLevelID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("goldReward"))
                    throw $util.ProtocolError("missing required 'goldReward'", { instance: message });
                if (!message.hasOwnProperty("latestUnCompletedLevelID"))
                    throw $util.ProtocolError("missing required 'latestUnCompletedLevelID'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_MatchComplete_2100 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_MatchComplete_2100
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_MatchComplete_2100} s_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_MatchComplete_2100.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_MatchComplete_2100 message.
             * @function verify
             * @memberof com.msg.s_MatchComplete_2100
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_MatchComplete_2100.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.goldReward))
                    return "goldReward: integer expected";
                if (!$util.isInteger(message.latestUnCompletedLevelID))
                    return "latestUnCompletedLevelID: integer expected";
                return null;
            };

            return s_MatchComplete_2100;
        })();

        msg.c_MatchStart_2101 = (function() {

            /**
             * Properties of a c_MatchStart_2101.
             * @memberof com.msg
             * @interface Ic_MatchStart_2101
             * @property {string} openId c_MatchStart_2101 openId
             */

            /**
             * Constructs a new c_MatchStart_2101.
             * @memberof com.msg
             * @classdesc Represents a c_MatchStart_2101.
             * @implements Ic_MatchStart_2101
             * @constructor
             * @param {com.msg.Ic_MatchStart_2101=} [properties] Properties to set
             */
            function c_MatchStart_2101(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_MatchStart_2101 openId.
             * @member {string} openId
             * @memberof com.msg.c_MatchStart_2101
             * @instance
             */
            c_MatchStart_2101.prototype.openId = "";

            /**
             * Creates a new c_MatchStart_2101 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_MatchStart_2101
             * @static
             * @param {com.msg.Ic_MatchStart_2101=} [properties] Properties to set
             * @returns {com.msg.c_MatchStart_2101} c_MatchStart_2101 instance
             */
            c_MatchStart_2101.create = function create(properties) {
                return new c_MatchStart_2101(properties);
            };

            /**
             * Encodes the specified c_MatchStart_2101 message. Does not implicitly {@link com.msg.c_MatchStart_2101.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_MatchStart_2101
             * @static
             * @param {com.msg.Ic_MatchStart_2101} message c_MatchStart_2101 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_MatchStart_2101.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                return writer;
            };

            /**
             * Encodes the specified c_MatchStart_2101 message, length delimited. Does not implicitly {@link com.msg.c_MatchStart_2101.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_MatchStart_2101
             * @static
             * @param {com.msg.Ic_MatchStart_2101} message c_MatchStart_2101 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_MatchStart_2101.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_MatchStart_2101 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_MatchStart_2101
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_MatchStart_2101} c_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_MatchStart_2101.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_MatchStart_2101();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_MatchStart_2101 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_MatchStart_2101
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_MatchStart_2101} c_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_MatchStart_2101.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_MatchStart_2101 message.
             * @function verify
             * @memberof com.msg.c_MatchStart_2101
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_MatchStart_2101.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                return null;
            };

            return c_MatchStart_2101;
        })();

        msg.s_MatchStart_2101 = (function() {

            /**
             * Properties of a s_MatchStart_2101.
             * @memberof com.msg
             * @interface Is_MatchStart_2101
             * @property {number} result s_MatchStart_2101 result
             * @property {number} curPoint s_MatchStart_2101 curPoint
             * @property {number|Long|null} [latestPointRefreshTime] s_MatchStart_2101 latestPointRefreshTime
             */

            /**
             * Constructs a new s_MatchStart_2101.
             * @memberof com.msg
             * @classdesc Represents a s_MatchStart_2101.
             * @implements Is_MatchStart_2101
             * @constructor
             * @param {com.msg.Is_MatchStart_2101=} [properties] Properties to set
             */
            function s_MatchStart_2101(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_MatchStart_2101 result.
             * @member {number} result
             * @memberof com.msg.s_MatchStart_2101
             * @instance
             */
            s_MatchStart_2101.prototype.result = 0;

            /**
             * s_MatchStart_2101 curPoint.
             * @member {number} curPoint
             * @memberof com.msg.s_MatchStart_2101
             * @instance
             */
            s_MatchStart_2101.prototype.curPoint = 0;

            /**
             * s_MatchStart_2101 latestPointRefreshTime.
             * @member {number|Long} latestPointRefreshTime
             * @memberof com.msg.s_MatchStart_2101
             * @instance
             */
            s_MatchStart_2101.prototype.latestPointRefreshTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new s_MatchStart_2101 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_MatchStart_2101
             * @static
             * @param {com.msg.Is_MatchStart_2101=} [properties] Properties to set
             * @returns {com.msg.s_MatchStart_2101} s_MatchStart_2101 instance
             */
            s_MatchStart_2101.create = function create(properties) {
                return new s_MatchStart_2101(properties);
            };

            /**
             * Encodes the specified s_MatchStart_2101 message. Does not implicitly {@link com.msg.s_MatchStart_2101.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_MatchStart_2101
             * @static
             * @param {com.msg.Is_MatchStart_2101} message s_MatchStart_2101 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_MatchStart_2101.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.curPoint);
                if (message.latestPointRefreshTime != null && message.hasOwnProperty("latestPointRefreshTime"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.latestPointRefreshTime);
                return writer;
            };

            /**
             * Encodes the specified s_MatchStart_2101 message, length delimited. Does not implicitly {@link com.msg.s_MatchStart_2101.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_MatchStart_2101
             * @static
             * @param {com.msg.Is_MatchStart_2101} message s_MatchStart_2101 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_MatchStart_2101.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_MatchStart_2101 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_MatchStart_2101
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_MatchStart_2101} s_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_MatchStart_2101.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_MatchStart_2101();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.curPoint = reader.int32();
                        break;
                    case 3:
                        message.latestPointRefreshTime = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("curPoint"))
                    throw $util.ProtocolError("missing required 'curPoint'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_MatchStart_2101 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_MatchStart_2101
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_MatchStart_2101} s_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_MatchStart_2101.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_MatchStart_2101 message.
             * @function verify
             * @memberof com.msg.s_MatchStart_2101
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_MatchStart_2101.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (!$util.isInteger(message.curPoint))
                    return "curPoint: integer expected";
                if (message.latestPointRefreshTime != null && message.hasOwnProperty("latestPointRefreshTime"))
                    if (!$util.isInteger(message.latestPointRefreshTime) && !(message.latestPointRefreshTime && $util.isInteger(message.latestPointRefreshTime.low) && $util.isInteger(message.latestPointRefreshTime.high)))
                        return "latestPointRefreshTime: integer|Long expected";
                return null;
            };

            return s_MatchStart_2101;
        })();

        msg.c_WeaponEvolution_2014 = (function() {

            /**
             * Properties of a c_WeaponEvolution_2014.
             * @memberof com.msg
             * @interface Ic_WeaponEvolution_2014
             * @property {string} openId c_WeaponEvolution_2014 openId
             * @property {number} weaponID c_WeaponEvolution_2014 weaponID
             * @property {number} curEvolutionLvl c_WeaponEvolution_2014 curEvolutionLvl
             * @property {number} costGold c_WeaponEvolution_2014 costGold
             */

            /**
             * Constructs a new c_WeaponEvolution_2014.
             * @memberof com.msg
             * @classdesc Represents a c_WeaponEvolution_2014.
             * @implements Ic_WeaponEvolution_2014
             * @constructor
             * @param {com.msg.Ic_WeaponEvolution_2014=} [properties] Properties to set
             */
            function c_WeaponEvolution_2014(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_WeaponEvolution_2014 openId.
             * @member {string} openId
             * @memberof com.msg.c_WeaponEvolution_2014
             * @instance
             */
            c_WeaponEvolution_2014.prototype.openId = "";

            /**
             * c_WeaponEvolution_2014 weaponID.
             * @member {number} weaponID
             * @memberof com.msg.c_WeaponEvolution_2014
             * @instance
             */
            c_WeaponEvolution_2014.prototype.weaponID = 0;

            /**
             * c_WeaponEvolution_2014 curEvolutionLvl.
             * @member {number} curEvolutionLvl
             * @memberof com.msg.c_WeaponEvolution_2014
             * @instance
             */
            c_WeaponEvolution_2014.prototype.curEvolutionLvl = 0;

            /**
             * c_WeaponEvolution_2014 costGold.
             * @member {number} costGold
             * @memberof com.msg.c_WeaponEvolution_2014
             * @instance
             */
            c_WeaponEvolution_2014.prototype.costGold = 0;

            /**
             * Creates a new c_WeaponEvolution_2014 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_WeaponEvolution_2014
             * @static
             * @param {com.msg.Ic_WeaponEvolution_2014=} [properties] Properties to set
             * @returns {com.msg.c_WeaponEvolution_2014} c_WeaponEvolution_2014 instance
             */
            c_WeaponEvolution_2014.create = function create(properties) {
                return new c_WeaponEvolution_2014(properties);
            };

            /**
             * Encodes the specified c_WeaponEvolution_2014 message. Does not implicitly {@link com.msg.c_WeaponEvolution_2014.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_WeaponEvolution_2014
             * @static
             * @param {com.msg.Ic_WeaponEvolution_2014} message c_WeaponEvolution_2014 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_WeaponEvolution_2014.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.weaponID);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.curEvolutionLvl);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.costGold);
                return writer;
            };

            /**
             * Encodes the specified c_WeaponEvolution_2014 message, length delimited. Does not implicitly {@link com.msg.c_WeaponEvolution_2014.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_WeaponEvolution_2014
             * @static
             * @param {com.msg.Ic_WeaponEvolution_2014} message c_WeaponEvolution_2014 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_WeaponEvolution_2014.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_WeaponEvolution_2014 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_WeaponEvolution_2014
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_WeaponEvolution_2014} c_WeaponEvolution_2014
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_WeaponEvolution_2014.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_WeaponEvolution_2014();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.weaponID = reader.int32();
                        break;
                    case 3:
                        message.curEvolutionLvl = reader.int32();
                        break;
                    case 4:
                        message.costGold = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("weaponID"))
                    throw $util.ProtocolError("missing required 'weaponID'", { instance: message });
                if (!message.hasOwnProperty("curEvolutionLvl"))
                    throw $util.ProtocolError("missing required 'curEvolutionLvl'", { instance: message });
                if (!message.hasOwnProperty("costGold"))
                    throw $util.ProtocolError("missing required 'costGold'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_WeaponEvolution_2014 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_WeaponEvolution_2014
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_WeaponEvolution_2014} c_WeaponEvolution_2014
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_WeaponEvolution_2014.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_WeaponEvolution_2014 message.
             * @function verify
             * @memberof com.msg.c_WeaponEvolution_2014
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_WeaponEvolution_2014.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.weaponID))
                    return "weaponID: integer expected";
                if (!$util.isInteger(message.curEvolutionLvl))
                    return "curEvolutionLvl: integer expected";
                if (!$util.isInteger(message.costGold))
                    return "costGold: integer expected";
                return null;
            };

            return c_WeaponEvolution_2014;
        })();

        msg.s_WeaponEvolution_2015 = (function() {

            /**
             * Properties of a s_WeaponEvolution_2015.
             * @memberof com.msg
             * @interface Is_WeaponEvolution_2015
             * @property {number} result s_WeaponEvolution_2015 result
             * @property {number} weaponID s_WeaponEvolution_2015 weaponID
             * @property {number} newEvolutionLvl s_WeaponEvolution_2015 newEvolutionLvl
             * @property {number} totalGold s_WeaponEvolution_2015 totalGold
             */

            /**
             * Constructs a new s_WeaponEvolution_2015.
             * @memberof com.msg
             * @classdesc Represents a s_WeaponEvolution_2015.
             * @implements Is_WeaponEvolution_2015
             * @constructor
             * @param {com.msg.Is_WeaponEvolution_2015=} [properties] Properties to set
             */
            function s_WeaponEvolution_2015(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_WeaponEvolution_2015 result.
             * @member {number} result
             * @memberof com.msg.s_WeaponEvolution_2015
             * @instance
             */
            s_WeaponEvolution_2015.prototype.result = 0;

            /**
             * s_WeaponEvolution_2015 weaponID.
             * @member {number} weaponID
             * @memberof com.msg.s_WeaponEvolution_2015
             * @instance
             */
            s_WeaponEvolution_2015.prototype.weaponID = 0;

            /**
             * s_WeaponEvolution_2015 newEvolutionLvl.
             * @member {number} newEvolutionLvl
             * @memberof com.msg.s_WeaponEvolution_2015
             * @instance
             */
            s_WeaponEvolution_2015.prototype.newEvolutionLvl = 0;

            /**
             * s_WeaponEvolution_2015 totalGold.
             * @member {number} totalGold
             * @memberof com.msg.s_WeaponEvolution_2015
             * @instance
             */
            s_WeaponEvolution_2015.prototype.totalGold = 0;

            /**
             * Creates a new s_WeaponEvolution_2015 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_WeaponEvolution_2015
             * @static
             * @param {com.msg.Is_WeaponEvolution_2015=} [properties] Properties to set
             * @returns {com.msg.s_WeaponEvolution_2015} s_WeaponEvolution_2015 instance
             */
            s_WeaponEvolution_2015.create = function create(properties) {
                return new s_WeaponEvolution_2015(properties);
            };

            /**
             * Encodes the specified s_WeaponEvolution_2015 message. Does not implicitly {@link com.msg.s_WeaponEvolution_2015.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_WeaponEvolution_2015
             * @static
             * @param {com.msg.Is_WeaponEvolution_2015} message s_WeaponEvolution_2015 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_WeaponEvolution_2015.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.weaponID);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.newEvolutionLvl);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.totalGold);
                return writer;
            };

            /**
             * Encodes the specified s_WeaponEvolution_2015 message, length delimited. Does not implicitly {@link com.msg.s_WeaponEvolution_2015.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_WeaponEvolution_2015
             * @static
             * @param {com.msg.Is_WeaponEvolution_2015} message s_WeaponEvolution_2015 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_WeaponEvolution_2015.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_WeaponEvolution_2015 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_WeaponEvolution_2015
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_WeaponEvolution_2015} s_WeaponEvolution_2015
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_WeaponEvolution_2015.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_WeaponEvolution_2015();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.weaponID = reader.int32();
                        break;
                    case 3:
                        message.newEvolutionLvl = reader.int32();
                        break;
                    case 4:
                        message.totalGold = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                if (!message.hasOwnProperty("weaponID"))
                    throw $util.ProtocolError("missing required 'weaponID'", { instance: message });
                if (!message.hasOwnProperty("newEvolutionLvl"))
                    throw $util.ProtocolError("missing required 'newEvolutionLvl'", { instance: message });
                if (!message.hasOwnProperty("totalGold"))
                    throw $util.ProtocolError("missing required 'totalGold'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_WeaponEvolution_2015 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_WeaponEvolution_2015
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_WeaponEvolution_2015} s_WeaponEvolution_2015
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_WeaponEvolution_2015.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_WeaponEvolution_2015 message.
             * @function verify
             * @memberof com.msg.s_WeaponEvolution_2015
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_WeaponEvolution_2015.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (!$util.isInteger(message.weaponID))
                    return "weaponID: integer expected";
                if (!$util.isInteger(message.newEvolutionLvl))
                    return "newEvolutionLvl: integer expected";
                if (!$util.isInteger(message.totalGold))
                    return "totalGold: integer expected";
                return null;
            };

            return s_WeaponEvolution_2015;
        })();

        msg.c_GetMessageVerifyCode_2200 = (function() {

            /**
             * Properties of a c_GetMessageVerifyCode_2200.
             * @memberof com.msg
             * @interface Ic_GetMessageVerifyCode_2200
             * @property {number|Long} phoneNumber c_GetMessageVerifyCode_2200 phoneNumber
             */

            /**
             * Constructs a new c_GetMessageVerifyCode_2200.
             * @memberof com.msg
             * @classdesc Represents a c_GetMessageVerifyCode_2200.
             * @implements Ic_GetMessageVerifyCode_2200
             * @constructor
             * @param {com.msg.Ic_GetMessageVerifyCode_2200=} [properties] Properties to set
             */
            function c_GetMessageVerifyCode_2200(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_GetMessageVerifyCode_2200 phoneNumber.
             * @member {number|Long} phoneNumber
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @instance
             */
            c_GetMessageVerifyCode_2200.prototype.phoneNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new c_GetMessageVerifyCode_2200 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @static
             * @param {com.msg.Ic_GetMessageVerifyCode_2200=} [properties] Properties to set
             * @returns {com.msg.c_GetMessageVerifyCode_2200} c_GetMessageVerifyCode_2200 instance
             */
            c_GetMessageVerifyCode_2200.create = function create(properties) {
                return new c_GetMessageVerifyCode_2200(properties);
            };

            /**
             * Encodes the specified c_GetMessageVerifyCode_2200 message. Does not implicitly {@link com.msg.c_GetMessageVerifyCode_2200.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @static
             * @param {com.msg.Ic_GetMessageVerifyCode_2200} message c_GetMessageVerifyCode_2200 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GetMessageVerifyCode_2200.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.phoneNumber);
                return writer;
            };

            /**
             * Encodes the specified c_GetMessageVerifyCode_2200 message, length delimited. Does not implicitly {@link com.msg.c_GetMessageVerifyCode_2200.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @static
             * @param {com.msg.Ic_GetMessageVerifyCode_2200} message c_GetMessageVerifyCode_2200 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_GetMessageVerifyCode_2200.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_GetMessageVerifyCode_2200 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_GetMessageVerifyCode_2200} c_GetMessageVerifyCode_2200
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GetMessageVerifyCode_2200.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_GetMessageVerifyCode_2200();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.phoneNumber = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("phoneNumber"))
                    throw $util.ProtocolError("missing required 'phoneNumber'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_GetMessageVerifyCode_2200 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_GetMessageVerifyCode_2200} c_GetMessageVerifyCode_2200
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_GetMessageVerifyCode_2200.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_GetMessageVerifyCode_2200 message.
             * @function verify
             * @memberof com.msg.c_GetMessageVerifyCode_2200
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_GetMessageVerifyCode_2200.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.phoneNumber) && !(message.phoneNumber && $util.isInteger(message.phoneNumber.low) && $util.isInteger(message.phoneNumber.high)))
                    return "phoneNumber: integer|Long expected";
                return null;
            };

            return c_GetMessageVerifyCode_2200;
        })();

        msg.s_GetMessageVerifyCode_2201 = (function() {

            /**
             * Properties of a s_GetMessageVerifyCode_2201.
             * @memberof com.msg
             * @interface Is_GetMessageVerifyCode_2201
             * @property {number} result s_GetMessageVerifyCode_2201 result
             */

            /**
             * Constructs a new s_GetMessageVerifyCode_2201.
             * @memberof com.msg
             * @classdesc Represents a s_GetMessageVerifyCode_2201.
             * @implements Is_GetMessageVerifyCode_2201
             * @constructor
             * @param {com.msg.Is_GetMessageVerifyCode_2201=} [properties] Properties to set
             */
            function s_GetMessageVerifyCode_2201(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_GetMessageVerifyCode_2201 result.
             * @member {number} result
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @instance
             */
            s_GetMessageVerifyCode_2201.prototype.result = 0;

            /**
             * Creates a new s_GetMessageVerifyCode_2201 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @static
             * @param {com.msg.Is_GetMessageVerifyCode_2201=} [properties] Properties to set
             * @returns {com.msg.s_GetMessageVerifyCode_2201} s_GetMessageVerifyCode_2201 instance
             */
            s_GetMessageVerifyCode_2201.create = function create(properties) {
                return new s_GetMessageVerifyCode_2201(properties);
            };

            /**
             * Encodes the specified s_GetMessageVerifyCode_2201 message. Does not implicitly {@link com.msg.s_GetMessageVerifyCode_2201.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @static
             * @param {com.msg.Is_GetMessageVerifyCode_2201} message s_GetMessageVerifyCode_2201 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GetMessageVerifyCode_2201.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                return writer;
            };

            /**
             * Encodes the specified s_GetMessageVerifyCode_2201 message, length delimited. Does not implicitly {@link com.msg.s_GetMessageVerifyCode_2201.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @static
             * @param {com.msg.Is_GetMessageVerifyCode_2201} message s_GetMessageVerifyCode_2201 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_GetMessageVerifyCode_2201.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_GetMessageVerifyCode_2201 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_GetMessageVerifyCode_2201} s_GetMessageVerifyCode_2201
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GetMessageVerifyCode_2201.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_GetMessageVerifyCode_2201();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_GetMessageVerifyCode_2201 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_GetMessageVerifyCode_2201} s_GetMessageVerifyCode_2201
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_GetMessageVerifyCode_2201.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_GetMessageVerifyCode_2201 message.
             * @function verify
             * @memberof com.msg.s_GetMessageVerifyCode_2201
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_GetMessageVerifyCode_2201.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                return null;
            };

            return s_GetMessageVerifyCode_2201;
        })();

        msg.c_CheckPhoneVerify_2202 = (function() {

            /**
             * Properties of a c_CheckPhoneVerify_2202.
             * @memberof com.msg
             * @interface Ic_CheckPhoneVerify_2202
             * @property {string} openId c_CheckPhoneVerify_2202 openId
             * @property {number|Long} phoneNumber c_CheckPhoneVerify_2202 phoneNumber
             * @property {number} verifyCode c_CheckPhoneVerify_2202 verifyCode
             */

            /**
             * Constructs a new c_CheckPhoneVerify_2202.
             * @memberof com.msg
             * @classdesc Represents a c_CheckPhoneVerify_2202.
             * @implements Ic_CheckPhoneVerify_2202
             * @constructor
             * @param {com.msg.Ic_CheckPhoneVerify_2202=} [properties] Properties to set
             */
            function c_CheckPhoneVerify_2202(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_CheckPhoneVerify_2202 openId.
             * @member {string} openId
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @instance
             */
            c_CheckPhoneVerify_2202.prototype.openId = "";

            /**
             * c_CheckPhoneVerify_2202 phoneNumber.
             * @member {number|Long} phoneNumber
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @instance
             */
            c_CheckPhoneVerify_2202.prototype.phoneNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * c_CheckPhoneVerify_2202 verifyCode.
             * @member {number} verifyCode
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @instance
             */
            c_CheckPhoneVerify_2202.prototype.verifyCode = 0;

            /**
             * Creates a new c_CheckPhoneVerify_2202 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @static
             * @param {com.msg.Ic_CheckPhoneVerify_2202=} [properties] Properties to set
             * @returns {com.msg.c_CheckPhoneVerify_2202} c_CheckPhoneVerify_2202 instance
             */
            c_CheckPhoneVerify_2202.create = function create(properties) {
                return new c_CheckPhoneVerify_2202(properties);
            };

            /**
             * Encodes the specified c_CheckPhoneVerify_2202 message. Does not implicitly {@link com.msg.c_CheckPhoneVerify_2202.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @static
             * @param {com.msg.Ic_CheckPhoneVerify_2202} message c_CheckPhoneVerify_2202 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CheckPhoneVerify_2202.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.phoneNumber);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.verifyCode);
                return writer;
            };

            /**
             * Encodes the specified c_CheckPhoneVerify_2202 message, length delimited. Does not implicitly {@link com.msg.c_CheckPhoneVerify_2202.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @static
             * @param {com.msg.Ic_CheckPhoneVerify_2202} message c_CheckPhoneVerify_2202 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CheckPhoneVerify_2202.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_CheckPhoneVerify_2202 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_CheckPhoneVerify_2202} c_CheckPhoneVerify_2202
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CheckPhoneVerify_2202.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_CheckPhoneVerify_2202();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.phoneNumber = reader.int64();
                        break;
                    case 3:
                        message.verifyCode = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("phoneNumber"))
                    throw $util.ProtocolError("missing required 'phoneNumber'", { instance: message });
                if (!message.hasOwnProperty("verifyCode"))
                    throw $util.ProtocolError("missing required 'verifyCode'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_CheckPhoneVerify_2202 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_CheckPhoneVerify_2202} c_CheckPhoneVerify_2202
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CheckPhoneVerify_2202.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_CheckPhoneVerify_2202 message.
             * @function verify
             * @memberof com.msg.c_CheckPhoneVerify_2202
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_CheckPhoneVerify_2202.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.phoneNumber) && !(message.phoneNumber && $util.isInteger(message.phoneNumber.low) && $util.isInteger(message.phoneNumber.high)))
                    return "phoneNumber: integer|Long expected";
                if (!$util.isInteger(message.verifyCode))
                    return "verifyCode: integer expected";
                return null;
            };

            return c_CheckPhoneVerify_2202;
        })();

        msg.s_CheckPhoneVerify_2203 = (function() {

            /**
             * Properties of a s_CheckPhoneVerify_2203.
             * @memberof com.msg
             * @interface Is_CheckPhoneVerify_2203
             * @property {number} result s_CheckPhoneVerify_2203 result
             * @property {com.msg.IrewardInfo|null} [verifyReward] s_CheckPhoneVerify_2203 verifyReward
             */

            /**
             * Constructs a new s_CheckPhoneVerify_2203.
             * @memberof com.msg
             * @classdesc Represents a s_CheckPhoneVerify_2203.
             * @implements Is_CheckPhoneVerify_2203
             * @constructor
             * @param {com.msg.Is_CheckPhoneVerify_2203=} [properties] Properties to set
             */
            function s_CheckPhoneVerify_2203(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_CheckPhoneVerify_2203 result.
             * @member {number} result
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @instance
             */
            s_CheckPhoneVerify_2203.prototype.result = 0;

            /**
             * s_CheckPhoneVerify_2203 verifyReward.
             * @member {com.msg.IrewardInfo|null|undefined} verifyReward
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @instance
             */
            s_CheckPhoneVerify_2203.prototype.verifyReward = null;

            /**
             * Creates a new s_CheckPhoneVerify_2203 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @static
             * @param {com.msg.Is_CheckPhoneVerify_2203=} [properties] Properties to set
             * @returns {com.msg.s_CheckPhoneVerify_2203} s_CheckPhoneVerify_2203 instance
             */
            s_CheckPhoneVerify_2203.create = function create(properties) {
                return new s_CheckPhoneVerify_2203(properties);
            };

            /**
             * Encodes the specified s_CheckPhoneVerify_2203 message. Does not implicitly {@link com.msg.s_CheckPhoneVerify_2203.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @static
             * @param {com.msg.Is_CheckPhoneVerify_2203} message s_CheckPhoneVerify_2203 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CheckPhoneVerify_2203.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.verifyReward != null && message.hasOwnProperty("verifyReward"))
                    $root.com.msg.rewardInfo.encode(message.verifyReward, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_CheckPhoneVerify_2203 message, length delimited. Does not implicitly {@link com.msg.s_CheckPhoneVerify_2203.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @static
             * @param {com.msg.Is_CheckPhoneVerify_2203} message s_CheckPhoneVerify_2203 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CheckPhoneVerify_2203.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_CheckPhoneVerify_2203 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_CheckPhoneVerify_2203} s_CheckPhoneVerify_2203
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CheckPhoneVerify_2203.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_CheckPhoneVerify_2203();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.verifyReward = $root.com.msg.rewardInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_CheckPhoneVerify_2203 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_CheckPhoneVerify_2203} s_CheckPhoneVerify_2203
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CheckPhoneVerify_2203.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_CheckPhoneVerify_2203 message.
             * @function verify
             * @memberof com.msg.s_CheckPhoneVerify_2203
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_CheckPhoneVerify_2203.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.verifyReward != null && message.hasOwnProperty("verifyReward")) {
                    var error = $root.com.msg.rewardInfo.verify(message.verifyReward);
                    if (error)
                        return "verifyReward." + error;
                }
                return null;
            };

            return s_CheckPhoneVerify_2203;
        })();

        msg.c_Lottery_2300 = (function() {

            /**
             * Properties of a c_Lottery_2300.
             * @memberof com.msg
             * @interface Ic_Lottery_2300
             * @property {string} openId c_Lottery_2300 openId
             */

            /**
             * Constructs a new c_Lottery_2300.
             * @memberof com.msg
             * @classdesc Represents a c_Lottery_2300.
             * @implements Ic_Lottery_2300
             * @constructor
             * @param {com.msg.Ic_Lottery_2300=} [properties] Properties to set
             */
            function c_Lottery_2300(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_Lottery_2300 openId.
             * @member {string} openId
             * @memberof com.msg.c_Lottery_2300
             * @instance
             */
            c_Lottery_2300.prototype.openId = "";

            /**
             * Creates a new c_Lottery_2300 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_Lottery_2300
             * @static
             * @param {com.msg.Ic_Lottery_2300=} [properties] Properties to set
             * @returns {com.msg.c_Lottery_2300} c_Lottery_2300 instance
             */
            c_Lottery_2300.create = function create(properties) {
                return new c_Lottery_2300(properties);
            };

            /**
             * Encodes the specified c_Lottery_2300 message. Does not implicitly {@link com.msg.c_Lottery_2300.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_Lottery_2300
             * @static
             * @param {com.msg.Ic_Lottery_2300} message c_Lottery_2300 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_Lottery_2300.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                return writer;
            };

            /**
             * Encodes the specified c_Lottery_2300 message, length delimited. Does not implicitly {@link com.msg.c_Lottery_2300.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_Lottery_2300
             * @static
             * @param {com.msg.Ic_Lottery_2300} message c_Lottery_2300 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_Lottery_2300.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_Lottery_2300 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_Lottery_2300
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_Lottery_2300} c_Lottery_2300
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_Lottery_2300.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_Lottery_2300();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_Lottery_2300 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_Lottery_2300
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_Lottery_2300} c_Lottery_2300
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_Lottery_2300.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_Lottery_2300 message.
             * @function verify
             * @memberof com.msg.c_Lottery_2300
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_Lottery_2300.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                return null;
            };

            return c_Lottery_2300;
        })();

        msg.s_Lottery_2301 = (function() {

            /**
             * Properties of a s_Lottery_2301.
             * @memberof com.msg
             * @interface Is_Lottery_2301
             * @property {number} result s_Lottery_2301 result
             * @property {number|null} [rewardConfigID] s_Lottery_2301 rewardConfigID
             */

            /**
             * Constructs a new s_Lottery_2301.
             * @memberof com.msg
             * @classdesc Represents a s_Lottery_2301.
             * @implements Is_Lottery_2301
             * @constructor
             * @param {com.msg.Is_Lottery_2301=} [properties] Properties to set
             */
            function s_Lottery_2301(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_Lottery_2301 result.
             * @member {number} result
             * @memberof com.msg.s_Lottery_2301
             * @instance
             */
            s_Lottery_2301.prototype.result = 0;

            /**
             * s_Lottery_2301 rewardConfigID.
             * @member {number} rewardConfigID
             * @memberof com.msg.s_Lottery_2301
             * @instance
             */
            s_Lottery_2301.prototype.rewardConfigID = 0;

            /**
             * Creates a new s_Lottery_2301 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_Lottery_2301
             * @static
             * @param {com.msg.Is_Lottery_2301=} [properties] Properties to set
             * @returns {com.msg.s_Lottery_2301} s_Lottery_2301 instance
             */
            s_Lottery_2301.create = function create(properties) {
                return new s_Lottery_2301(properties);
            };

            /**
             * Encodes the specified s_Lottery_2301 message. Does not implicitly {@link com.msg.s_Lottery_2301.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_Lottery_2301
             * @static
             * @param {com.msg.Is_Lottery_2301} message s_Lottery_2301 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_Lottery_2301.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.rewardConfigID != null && message.hasOwnProperty("rewardConfigID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rewardConfigID);
                return writer;
            };

            /**
             * Encodes the specified s_Lottery_2301 message, length delimited. Does not implicitly {@link com.msg.s_Lottery_2301.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_Lottery_2301
             * @static
             * @param {com.msg.Is_Lottery_2301} message s_Lottery_2301 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_Lottery_2301.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_Lottery_2301 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_Lottery_2301
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_Lottery_2301} s_Lottery_2301
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_Lottery_2301.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_Lottery_2301();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.rewardConfigID = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_Lottery_2301 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_Lottery_2301
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_Lottery_2301} s_Lottery_2301
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_Lottery_2301.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_Lottery_2301 message.
             * @function verify
             * @memberof com.msg.s_Lottery_2301
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_Lottery_2301.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.rewardConfigID != null && message.hasOwnProperty("rewardConfigID"))
                    if (!$util.isInteger(message.rewardConfigID))
                        return "rewardConfigID: integer expected";
                return null;
            };

            return s_Lottery_2301;
        })();

        msg.c_CheckLotteryRewardHistroy_2302 = (function() {

            /**
             * Properties of a c_CheckLotteryRewardHistroy_2302.
             * @memberof com.msg
             * @interface Ic_CheckLotteryRewardHistroy_2302
             * @property {string} openId c_CheckLotteryRewardHistroy_2302 openId
             * @property {number} pageIndex c_CheckLotteryRewardHistroy_2302 pageIndex
             * @property {number} histCount c_CheckLotteryRewardHistroy_2302 histCount
             */

            /**
             * Constructs a new c_CheckLotteryRewardHistroy_2302.
             * @memberof com.msg
             * @classdesc Represents a c_CheckLotteryRewardHistroy_2302.
             * @implements Ic_CheckLotteryRewardHistroy_2302
             * @constructor
             * @param {com.msg.Ic_CheckLotteryRewardHistroy_2302=} [properties] Properties to set
             */
            function c_CheckLotteryRewardHistroy_2302(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * c_CheckLotteryRewardHistroy_2302 openId.
             * @member {string} openId
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @instance
             */
            c_CheckLotteryRewardHistroy_2302.prototype.openId = "";

            /**
             * c_CheckLotteryRewardHistroy_2302 pageIndex.
             * @member {number} pageIndex
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @instance
             */
            c_CheckLotteryRewardHistroy_2302.prototype.pageIndex = 0;

            /**
             * c_CheckLotteryRewardHistroy_2302 histCount.
             * @member {number} histCount
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @instance
             */
            c_CheckLotteryRewardHistroy_2302.prototype.histCount = 0;

            /**
             * Creates a new c_CheckLotteryRewardHistroy_2302 instance using the specified properties.
             * @function create
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @static
             * @param {com.msg.Ic_CheckLotteryRewardHistroy_2302=} [properties] Properties to set
             * @returns {com.msg.c_CheckLotteryRewardHistroy_2302} c_CheckLotteryRewardHistroy_2302 instance
             */
            c_CheckLotteryRewardHistroy_2302.create = function create(properties) {
                return new c_CheckLotteryRewardHistroy_2302(properties);
            };

            /**
             * Encodes the specified c_CheckLotteryRewardHistroy_2302 message. Does not implicitly {@link com.msg.c_CheckLotteryRewardHistroy_2302.verify|verify} messages.
             * @function encode
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @static
             * @param {com.msg.Ic_CheckLotteryRewardHistroy_2302} message c_CheckLotteryRewardHistroy_2302 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CheckLotteryRewardHistroy_2302.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.pageIndex);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.histCount);
                return writer;
            };

            /**
             * Encodes the specified c_CheckLotteryRewardHistroy_2302 message, length delimited. Does not implicitly {@link com.msg.c_CheckLotteryRewardHistroy_2302.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @static
             * @param {com.msg.Ic_CheckLotteryRewardHistroy_2302} message c_CheckLotteryRewardHistroy_2302 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            c_CheckLotteryRewardHistroy_2302.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a c_CheckLotteryRewardHistroy_2302 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.c_CheckLotteryRewardHistroy_2302} c_CheckLotteryRewardHistroy_2302
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CheckLotteryRewardHistroy_2302.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.c_CheckLotteryRewardHistroy_2302();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.pageIndex = reader.int32();
                        break;
                    case 3:
                        message.histCount = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("pageIndex"))
                    throw $util.ProtocolError("missing required 'pageIndex'", { instance: message });
                if (!message.hasOwnProperty("histCount"))
                    throw $util.ProtocolError("missing required 'histCount'", { instance: message });
                return message;
            };

            /**
             * Decodes a c_CheckLotteryRewardHistroy_2302 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.c_CheckLotteryRewardHistroy_2302} c_CheckLotteryRewardHistroy_2302
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            c_CheckLotteryRewardHistroy_2302.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a c_CheckLotteryRewardHistroy_2302 message.
             * @function verify
             * @memberof com.msg.c_CheckLotteryRewardHistroy_2302
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            c_CheckLotteryRewardHistroy_2302.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                if (!$util.isInteger(message.pageIndex))
                    return "pageIndex: integer expected";
                if (!$util.isInteger(message.histCount))
                    return "histCount: integer expected";
                return null;
            };

            return c_CheckLotteryRewardHistroy_2302;
        })();

        msg.s_CheckLotteryRewardHistroy_2303 = (function() {

            /**
             * Properties of a s_CheckLotteryRewardHistroy_2303.
             * @memberof com.msg
             * @interface Is_CheckLotteryRewardHistroy_2303
             * @property {number} result s_CheckLotteryRewardHistroy_2303 result
             * @property {Array.<com.msg.IlotteryRewardInfo>|null} [rewardHistList] s_CheckLotteryRewardHistroy_2303 rewardHistList
             */

            /**
             * Constructs a new s_CheckLotteryRewardHistroy_2303.
             * @memberof com.msg
             * @classdesc Represents a s_CheckLotteryRewardHistroy_2303.
             * @implements Is_CheckLotteryRewardHistroy_2303
             * @constructor
             * @param {com.msg.Is_CheckLotteryRewardHistroy_2303=} [properties] Properties to set
             */
            function s_CheckLotteryRewardHistroy_2303(properties) {
                this.rewardHistList = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * s_CheckLotteryRewardHistroy_2303 result.
             * @member {number} result
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @instance
             */
            s_CheckLotteryRewardHistroy_2303.prototype.result = 0;

            /**
             * s_CheckLotteryRewardHistroy_2303 rewardHistList.
             * @member {Array.<com.msg.IlotteryRewardInfo>} rewardHistList
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @instance
             */
            s_CheckLotteryRewardHistroy_2303.prototype.rewardHistList = $util.emptyArray;

            /**
             * Creates a new s_CheckLotteryRewardHistroy_2303 instance using the specified properties.
             * @function create
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @static
             * @param {com.msg.Is_CheckLotteryRewardHistroy_2303=} [properties] Properties to set
             * @returns {com.msg.s_CheckLotteryRewardHistroy_2303} s_CheckLotteryRewardHistroy_2303 instance
             */
            s_CheckLotteryRewardHistroy_2303.create = function create(properties) {
                return new s_CheckLotteryRewardHistroy_2303(properties);
            };

            /**
             * Encodes the specified s_CheckLotteryRewardHistroy_2303 message. Does not implicitly {@link com.msg.s_CheckLotteryRewardHistroy_2303.verify|verify} messages.
             * @function encode
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @static
             * @param {com.msg.Is_CheckLotteryRewardHistroy_2303} message s_CheckLotteryRewardHistroy_2303 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CheckLotteryRewardHistroy_2303.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.rewardHistList != null && message.rewardHistList.length)
                    for (var i = 0; i < message.rewardHistList.length; ++i)
                        $root.com.msg.lotteryRewardInfo.encode(message.rewardHistList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified s_CheckLotteryRewardHistroy_2303 message, length delimited. Does not implicitly {@link com.msg.s_CheckLotteryRewardHistroy_2303.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @static
             * @param {com.msg.Is_CheckLotteryRewardHistroy_2303} message s_CheckLotteryRewardHistroy_2303 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            s_CheckLotteryRewardHistroy_2303.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a s_CheckLotteryRewardHistroy_2303 message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.s_CheckLotteryRewardHistroy_2303} s_CheckLotteryRewardHistroy_2303
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CheckLotteryRewardHistroy_2303.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.s_CheckLotteryRewardHistroy_2303();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        if (!(message.rewardHistList && message.rewardHistList.length))
                            message.rewardHistList = [];
                        message.rewardHistList.push($root.com.msg.lotteryRewardInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("result"))
                    throw $util.ProtocolError("missing required 'result'", { instance: message });
                return message;
            };

            /**
             * Decodes a s_CheckLotteryRewardHistroy_2303 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.s_CheckLotteryRewardHistroy_2303} s_CheckLotteryRewardHistroy_2303
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            s_CheckLotteryRewardHistroy_2303.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a s_CheckLotteryRewardHistroy_2303 message.
             * @function verify
             * @memberof com.msg.s_CheckLotteryRewardHistroy_2303
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            s_CheckLotteryRewardHistroy_2303.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
                if (message.rewardHistList != null && message.hasOwnProperty("rewardHistList")) {
                    if (!Array.isArray(message.rewardHistList))
                        return "rewardHistList: array expected";
                    for (var i = 0; i < message.rewardHistList.length; ++i) {
                        var error = $root.com.msg.lotteryRewardInfo.verify(message.rewardHistList[i]);
                        if (error)
                            return "rewardHistList." + error;
                    }
                }
                return null;
            };

            return s_CheckLotteryRewardHistroy_2303;
        })();

        msg.wxInfo = (function() {

            /**
             * Properties of a wxInfo.
             * @memberof com.msg
             * @interface IwxInfo
             * @property {string} nickName wxInfo nickName
             * @property {string} imageUrl wxInfo imageUrl
             */

            /**
             * Constructs a new wxInfo.
             * @memberof com.msg
             * @classdesc Represents a wxInfo.
             * @implements IwxInfo
             * @constructor
             * @param {com.msg.IwxInfo=} [properties] Properties to set
             */
            function wxInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * wxInfo nickName.
             * @member {string} nickName
             * @memberof com.msg.wxInfo
             * @instance
             */
            wxInfo.prototype.nickName = "";

            /**
             * wxInfo imageUrl.
             * @member {string} imageUrl
             * @memberof com.msg.wxInfo
             * @instance
             */
            wxInfo.prototype.imageUrl = "";

            /**
             * Creates a new wxInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.wxInfo
             * @static
             * @param {com.msg.IwxInfo=} [properties] Properties to set
             * @returns {com.msg.wxInfo} wxInfo instance
             */
            wxInfo.create = function create(properties) {
                return new wxInfo(properties);
            };

            /**
             * Encodes the specified wxInfo message. Does not implicitly {@link com.msg.wxInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.wxInfo
             * @static
             * @param {com.msg.IwxInfo} message wxInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            wxInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickName);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.imageUrl);
                return writer;
            };

            /**
             * Encodes the specified wxInfo message, length delimited. Does not implicitly {@link com.msg.wxInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.wxInfo
             * @static
             * @param {com.msg.IwxInfo} message wxInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            wxInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a wxInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.wxInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.wxInfo} wxInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            wxInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.wxInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.nickName = reader.string();
                        break;
                    case 2:
                        message.imageUrl = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("nickName"))
                    throw $util.ProtocolError("missing required 'nickName'", { instance: message });
                if (!message.hasOwnProperty("imageUrl"))
                    throw $util.ProtocolError("missing required 'imageUrl'", { instance: message });
                return message;
            };

            /**
             * Decodes a wxInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.wxInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.wxInfo} wxInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            wxInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a wxInfo message.
             * @function verify
             * @memberof com.msg.wxInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            wxInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.nickName))
                    return "nickName: string expected";
                if (!$util.isString(message.imageUrl))
                    return "imageUrl: string expected";
                return null;
            };

            return wxInfo;
        })();

        msg.playerInfo = (function() {

            /**
             * Properties of a playerInfo.
             * @memberof com.msg
             * @interface IplayerInfo
             * @property {string} openId playerInfo openId
             * @property {com.msg.InewbiGuideInfo} newbiGuideInfo playerInfo newbiGuideInfo
             * @property {com.msg.ImoneyInfo} moneyInfo playerInfo moneyInfo
             * @property {com.msg.IlevelInfo} levelInfo playerInfo levelInfo
             * @property {com.msg.IplayerWeaponInfo} playerWeaponInfo playerInfo playerWeaponInfo
             * @property {Array.<com.msg.IinviteDetail>|null} [inviteList] playerInfo inviteList
             * @property {com.msg.IverifyInfo} verifyInfo playerInfo verifyInfo
             */

            /**
             * Constructs a new playerInfo.
             * @memberof com.msg
             * @classdesc Represents a playerInfo.
             * @implements IplayerInfo
             * @constructor
             * @param {com.msg.IplayerInfo=} [properties] Properties to set
             */
            function playerInfo(properties) {
                this.inviteList = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * playerInfo openId.
             * @member {string} openId
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.openId = "";

            /**
             * playerInfo newbiGuideInfo.
             * @member {com.msg.InewbiGuideInfo} newbiGuideInfo
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.newbiGuideInfo = null;

            /**
             * playerInfo moneyInfo.
             * @member {com.msg.ImoneyInfo} moneyInfo
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.moneyInfo = null;

            /**
             * playerInfo levelInfo.
             * @member {com.msg.IlevelInfo} levelInfo
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.levelInfo = null;

            /**
             * playerInfo playerWeaponInfo.
             * @member {com.msg.IplayerWeaponInfo} playerWeaponInfo
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.playerWeaponInfo = null;

            /**
             * playerInfo inviteList.
             * @member {Array.<com.msg.IinviteDetail>} inviteList
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.inviteList = $util.emptyArray;

            /**
             * playerInfo verifyInfo.
             * @member {com.msg.IverifyInfo} verifyInfo
             * @memberof com.msg.playerInfo
             * @instance
             */
            playerInfo.prototype.verifyInfo = null;

            /**
             * Creates a new playerInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.playerInfo
             * @static
             * @param {com.msg.IplayerInfo=} [properties] Properties to set
             * @returns {com.msg.playerInfo} playerInfo instance
             */
            playerInfo.create = function create(properties) {
                return new playerInfo(properties);
            };

            /**
             * Encodes the specified playerInfo message. Does not implicitly {@link com.msg.playerInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.playerInfo
             * @static
             * @param {com.msg.IplayerInfo} message playerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            playerInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openId);
                $root.com.msg.newbiGuideInfo.encode(message.newbiGuideInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                $root.com.msg.moneyInfo.encode(message.moneyInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                $root.com.msg.levelInfo.encode(message.levelInfo, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                $root.com.msg.playerWeaponInfo.encode(message.playerWeaponInfo, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.inviteList != null && message.inviteList.length)
                    for (var i = 0; i < message.inviteList.length; ++i)
                        $root.com.msg.inviteDetail.encode(message.inviteList[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                $root.com.msg.verifyInfo.encode(message.verifyInfo, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified playerInfo message, length delimited. Does not implicitly {@link com.msg.playerInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.playerInfo
             * @static
             * @param {com.msg.IplayerInfo} message playerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            playerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a playerInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.playerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.playerInfo} playerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            playerInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.playerInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.openId = reader.string();
                        break;
                    case 2:
                        message.newbiGuideInfo = $root.com.msg.newbiGuideInfo.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.moneyInfo = $root.com.msg.moneyInfo.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.levelInfo = $root.com.msg.levelInfo.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.playerWeaponInfo = $root.com.msg.playerWeaponInfo.decode(reader, reader.uint32());
                        break;
                    case 6:
                        if (!(message.inviteList && message.inviteList.length))
                            message.inviteList = [];
                        message.inviteList.push($root.com.msg.inviteDetail.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        message.verifyInfo = $root.com.msg.verifyInfo.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("openId"))
                    throw $util.ProtocolError("missing required 'openId'", { instance: message });
                if (!message.hasOwnProperty("newbiGuideInfo"))
                    throw $util.ProtocolError("missing required 'newbiGuideInfo'", { instance: message });
                if (!message.hasOwnProperty("moneyInfo"))
                    throw $util.ProtocolError("missing required 'moneyInfo'", { instance: message });
                if (!message.hasOwnProperty("levelInfo"))
                    throw $util.ProtocolError("missing required 'levelInfo'", { instance: message });
                if (!message.hasOwnProperty("playerWeaponInfo"))
                    throw $util.ProtocolError("missing required 'playerWeaponInfo'", { instance: message });
                if (!message.hasOwnProperty("verifyInfo"))
                    throw $util.ProtocolError("missing required 'verifyInfo'", { instance: message });
                return message;
            };

            /**
             * Decodes a playerInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.playerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.playerInfo} playerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            playerInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a playerInfo message.
             * @function verify
             * @memberof com.msg.playerInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            playerInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.openId))
                    return "openId: string expected";
                {
                    var error = $root.com.msg.newbiGuideInfo.verify(message.newbiGuideInfo);
                    if (error)
                        return "newbiGuideInfo." + error;
                }
                {
                    var error = $root.com.msg.moneyInfo.verify(message.moneyInfo);
                    if (error)
                        return "moneyInfo." + error;
                }
                {
                    var error = $root.com.msg.levelInfo.verify(message.levelInfo);
                    if (error)
                        return "levelInfo." + error;
                }
                {
                    var error = $root.com.msg.playerWeaponInfo.verify(message.playerWeaponInfo);
                    if (error)
                        return "playerWeaponInfo." + error;
                }
                if (message.inviteList != null && message.hasOwnProperty("inviteList")) {
                    if (!Array.isArray(message.inviteList))
                        return "inviteList: array expected";
                    for (var i = 0; i < message.inviteList.length; ++i) {
                        var error = $root.com.msg.inviteDetail.verify(message.inviteList[i]);
                        if (error)
                            return "inviteList." + error;
                    }
                }
                {
                    var error = $root.com.msg.verifyInfo.verify(message.verifyInfo);
                    if (error)
                        return "verifyInfo." + error;
                }
                return null;
            };

            return playerInfo;
        })();

        msg.newbiGuideInfo = (function() {

            /**
             * Properties of a newbiGuideInfo.
             * @memberof com.msg
             * @interface InewbiGuideInfo
             * @property {number} nextStep newbiGuideInfo nextStep
             */

            /**
             * Constructs a new newbiGuideInfo.
             * @memberof com.msg
             * @classdesc Represents a newbiGuideInfo.
             * @implements InewbiGuideInfo
             * @constructor
             * @param {com.msg.InewbiGuideInfo=} [properties] Properties to set
             */
            function newbiGuideInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * newbiGuideInfo nextStep.
             * @member {number} nextStep
             * @memberof com.msg.newbiGuideInfo
             * @instance
             */
            newbiGuideInfo.prototype.nextStep = 0;

            /**
             * Creates a new newbiGuideInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.newbiGuideInfo
             * @static
             * @param {com.msg.InewbiGuideInfo=} [properties] Properties to set
             * @returns {com.msg.newbiGuideInfo} newbiGuideInfo instance
             */
            newbiGuideInfo.create = function create(properties) {
                return new newbiGuideInfo(properties);
            };

            /**
             * Encodes the specified newbiGuideInfo message. Does not implicitly {@link com.msg.newbiGuideInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.newbiGuideInfo
             * @static
             * @param {com.msg.InewbiGuideInfo} message newbiGuideInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            newbiGuideInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nextStep);
                return writer;
            };

            /**
             * Encodes the specified newbiGuideInfo message, length delimited. Does not implicitly {@link com.msg.newbiGuideInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.newbiGuideInfo
             * @static
             * @param {com.msg.InewbiGuideInfo} message newbiGuideInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            newbiGuideInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a newbiGuideInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.newbiGuideInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.newbiGuideInfo} newbiGuideInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            newbiGuideInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.newbiGuideInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.nextStep = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("nextStep"))
                    throw $util.ProtocolError("missing required 'nextStep'", { instance: message });
                return message;
            };

            /**
             * Decodes a newbiGuideInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.newbiGuideInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.newbiGuideInfo} newbiGuideInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            newbiGuideInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a newbiGuideInfo message.
             * @function verify
             * @memberof com.msg.newbiGuideInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            newbiGuideInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.nextStep))
                    return "nextStep: integer expected";
                return null;
            };

            return newbiGuideInfo;
        })();

        msg.moneyInfo = (function() {

            /**
             * Properties of a moneyInfo.
             * @memberof com.msg
             * @interface ImoneyInfo
             * @property {number} goldNum moneyInfo goldNum
             * @property {number} diamondNum moneyInfo diamondNum
             * @property {number} pointNum moneyInfo pointNum
             * @property {number|Long} latestPointRefreshTime 最近一次体力恢复时间戳(秒 东八区) == Java new Date().getTime();
             * @property {Array.<com.msg.ImoneySpawnInfo>|null} [spawnList] moneyInfo spawnList
             * @property {number} lotteryNum moneyInfo lotteryNum
             */

            /**
             * Constructs a new moneyInfo.
             * @memberof com.msg
             * @classdesc Represents a moneyInfo.
             * @implements ImoneyInfo
             * @constructor
             * @param {com.msg.ImoneyInfo=} [properties] Properties to set
             */
            function moneyInfo(properties) {
                this.spawnList = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * moneyInfo goldNum.
             * @member {number} goldNum
             * @memberof com.msg.moneyInfo
             * @instance
             */
            moneyInfo.prototype.goldNum = 0;

            /**
             * moneyInfo diamondNum.
             * @member {number} diamondNum
             * @memberof com.msg.moneyInfo
             * @instance
             */
            moneyInfo.prototype.diamondNum = 0;

            /**
             * moneyInfo pointNum.
             * @member {number} pointNum
             * @memberof com.msg.moneyInfo
             * @instance
             */
            moneyInfo.prototype.pointNum = 0;

            /**
             * 最近一次体力恢复时间戳(秒 东八区) == Java new Date().getTime();
             * @member {number|Long} latestPointRefreshTime
             * @memberof com.msg.moneyInfo
             * @instance
             */
            moneyInfo.prototype.latestPointRefreshTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * moneyInfo spawnList.
             * @member {Array.<com.msg.ImoneySpawnInfo>} spawnList
             * @memberof com.msg.moneyInfo
             * @instance
             */
            moneyInfo.prototype.spawnList = $util.emptyArray;

            /**
             * moneyInfo lotteryNum.
             * @member {number} lotteryNum
             * @memberof com.msg.moneyInfo
             * @instance
             */
            moneyInfo.prototype.lotteryNum = 0;

            /**
             * Creates a new moneyInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.moneyInfo
             * @static
             * @param {com.msg.ImoneyInfo=} [properties] Properties to set
             * @returns {com.msg.moneyInfo} moneyInfo instance
             */
            moneyInfo.create = function create(properties) {
                return new moneyInfo(properties);
            };

            /**
             * Encodes the specified moneyInfo message. Does not implicitly {@link com.msg.moneyInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.moneyInfo
             * @static
             * @param {com.msg.ImoneyInfo} message moneyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            moneyInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.goldNum);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.diamondNum);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.pointNum);
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.latestPointRefreshTime);
                if (message.spawnList != null && message.spawnList.length)
                    for (var i = 0; i < message.spawnList.length; ++i)
                        $root.com.msg.moneySpawnInfo.encode(message.spawnList[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.lotteryNum);
                return writer;
            };

            /**
             * Encodes the specified moneyInfo message, length delimited. Does not implicitly {@link com.msg.moneyInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.moneyInfo
             * @static
             * @param {com.msg.ImoneyInfo} message moneyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            moneyInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a moneyInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.moneyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.moneyInfo} moneyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            moneyInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.moneyInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.goldNum = reader.int32();
                        break;
                    case 2:
                        message.diamondNum = reader.int32();
                        break;
                    case 3:
                        message.pointNum = reader.int32();
                        break;
                    case 4:
                        message.latestPointRefreshTime = reader.int64();
                        break;
                    case 5:
                        if (!(message.spawnList && message.spawnList.length))
                            message.spawnList = [];
                        message.spawnList.push($root.com.msg.moneySpawnInfo.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        message.lotteryNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("goldNum"))
                    throw $util.ProtocolError("missing required 'goldNum'", { instance: message });
                if (!message.hasOwnProperty("diamondNum"))
                    throw $util.ProtocolError("missing required 'diamondNum'", { instance: message });
                if (!message.hasOwnProperty("pointNum"))
                    throw $util.ProtocolError("missing required 'pointNum'", { instance: message });
                if (!message.hasOwnProperty("latestPointRefreshTime"))
                    throw $util.ProtocolError("missing required 'latestPointRefreshTime'", { instance: message });
                if (!message.hasOwnProperty("lotteryNum"))
                    throw $util.ProtocolError("missing required 'lotteryNum'", { instance: message });
                return message;
            };

            /**
             * Decodes a moneyInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.moneyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.moneyInfo} moneyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            moneyInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a moneyInfo message.
             * @function verify
             * @memberof com.msg.moneyInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            moneyInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.goldNum))
                    return "goldNum: integer expected";
                if (!$util.isInteger(message.diamondNum))
                    return "diamondNum: integer expected";
                if (!$util.isInteger(message.pointNum))
                    return "pointNum: integer expected";
                if (!$util.isInteger(message.latestPointRefreshTime) && !(message.latestPointRefreshTime && $util.isInteger(message.latestPointRefreshTime.low) && $util.isInteger(message.latestPointRefreshTime.high)))
                    return "latestPointRefreshTime: integer|Long expected";
                if (message.spawnList != null && message.hasOwnProperty("spawnList")) {
                    if (!Array.isArray(message.spawnList))
                        return "spawnList: array expected";
                    for (var i = 0; i < message.spawnList.length; ++i) {
                        var error = $root.com.msg.moneySpawnInfo.verify(message.spawnList[i]);
                        if (error)
                            return "spawnList." + error;
                    }
                }
                if (!$util.isInteger(message.lotteryNum))
                    return "lotteryNum: integer expected";
                return null;
            };

            return moneyInfo;
        })();

        msg.moneySpawnInfo = (function() {

            /**
             * Properties of a moneySpawnInfo.
             * @memberof com.msg
             * @interface ImoneySpawnInfo
             * @property {number} spawnID moneySpawnInfo spawnID
             * @property {number} moneyType moneySpawnInfo moneyType
             * @property {number} moneyNum moneySpawnInfo moneyNum
             * @property {number} spawnType moneySpawnInfo spawnType
             * @property {number|Long} latestPointRefreshTime moneySpawnInfo latestPointRefreshTime
             * @property {number|Long} createTime moneySpawnInfo createTime
             */

            /**
             * Constructs a new moneySpawnInfo.
             * @memberof com.msg
             * @classdesc Represents a moneySpawnInfo.
             * @implements ImoneySpawnInfo
             * @constructor
             * @param {com.msg.ImoneySpawnInfo=} [properties] Properties to set
             */
            function moneySpawnInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * moneySpawnInfo spawnID.
             * @member {number} spawnID
             * @memberof com.msg.moneySpawnInfo
             * @instance
             */
            moneySpawnInfo.prototype.spawnID = 0;

            /**
             * moneySpawnInfo moneyType.
             * @member {number} moneyType
             * @memberof com.msg.moneySpawnInfo
             * @instance
             */
            moneySpawnInfo.prototype.moneyType = 0;

            /**
             * moneySpawnInfo moneyNum.
             * @member {number} moneyNum
             * @memberof com.msg.moneySpawnInfo
             * @instance
             */
            moneySpawnInfo.prototype.moneyNum = 0;

            /**
             * moneySpawnInfo spawnType.
             * @member {number} spawnType
             * @memberof com.msg.moneySpawnInfo
             * @instance
             */
            moneySpawnInfo.prototype.spawnType = 0;

            /**
             * moneySpawnInfo latestPointRefreshTime.
             * @member {number|Long} latestPointRefreshTime
             * @memberof com.msg.moneySpawnInfo
             * @instance
             */
            moneySpawnInfo.prototype.latestPointRefreshTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * moneySpawnInfo createTime.
             * @member {number|Long} createTime
             * @memberof com.msg.moneySpawnInfo
             * @instance
             */
            moneySpawnInfo.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new moneySpawnInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.moneySpawnInfo
             * @static
             * @param {com.msg.ImoneySpawnInfo=} [properties] Properties to set
             * @returns {com.msg.moneySpawnInfo} moneySpawnInfo instance
             */
            moneySpawnInfo.create = function create(properties) {
                return new moneySpawnInfo(properties);
            };

            /**
             * Encodes the specified moneySpawnInfo message. Does not implicitly {@link com.msg.moneySpawnInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.moneySpawnInfo
             * @static
             * @param {com.msg.ImoneySpawnInfo} message moneySpawnInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            moneySpawnInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.spawnID);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.moneyType);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.moneyNum);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.spawnType);
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.latestPointRefreshTime);
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.createTime);
                return writer;
            };

            /**
             * Encodes the specified moneySpawnInfo message, length delimited. Does not implicitly {@link com.msg.moneySpawnInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.moneySpawnInfo
             * @static
             * @param {com.msg.ImoneySpawnInfo} message moneySpawnInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            moneySpawnInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a moneySpawnInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.moneySpawnInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.moneySpawnInfo} moneySpawnInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            moneySpawnInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.moneySpawnInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.spawnID = reader.int32();
                        break;
                    case 2:
                        message.moneyType = reader.int32();
                        break;
                    case 3:
                        message.moneyNum = reader.int32();
                        break;
                    case 4:
                        message.spawnType = reader.int32();
                        break;
                    case 5:
                        message.latestPointRefreshTime = reader.int64();
                        break;
                    case 6:
                        message.createTime = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("spawnID"))
                    throw $util.ProtocolError("missing required 'spawnID'", { instance: message });
                if (!message.hasOwnProperty("moneyType"))
                    throw $util.ProtocolError("missing required 'moneyType'", { instance: message });
                if (!message.hasOwnProperty("moneyNum"))
                    throw $util.ProtocolError("missing required 'moneyNum'", { instance: message });
                if (!message.hasOwnProperty("spawnType"))
                    throw $util.ProtocolError("missing required 'spawnType'", { instance: message });
                if (!message.hasOwnProperty("latestPointRefreshTime"))
                    throw $util.ProtocolError("missing required 'latestPointRefreshTime'", { instance: message });
                if (!message.hasOwnProperty("createTime"))
                    throw $util.ProtocolError("missing required 'createTime'", { instance: message });
                return message;
            };

            /**
             * Decodes a moneySpawnInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.moneySpawnInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.moneySpawnInfo} moneySpawnInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            moneySpawnInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a moneySpawnInfo message.
             * @function verify
             * @memberof com.msg.moneySpawnInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            moneySpawnInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.spawnID))
                    return "spawnID: integer expected";
                if (!$util.isInteger(message.moneyType))
                    return "moneyType: integer expected";
                if (!$util.isInteger(message.moneyNum))
                    return "moneyNum: integer expected";
                if (!$util.isInteger(message.spawnType))
                    return "spawnType: integer expected";
                if (!$util.isInteger(message.latestPointRefreshTime) && !(message.latestPointRefreshTime && $util.isInteger(message.latestPointRefreshTime.low) && $util.isInteger(message.latestPointRefreshTime.high)))
                    return "latestPointRefreshTime: integer|Long expected";
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
                return null;
            };

            return moneySpawnInfo;
        })();

        msg.levelInfo = (function() {

            /**
             * Properties of a levelInfo.
             * @memberof com.msg
             * @interface IlevelInfo
             * @property {number} latestUnCompeleteLevel levelInfo latestUnCompeleteLevel
             */

            /**
             * Constructs a new levelInfo.
             * @memberof com.msg
             * @classdesc Represents a levelInfo.
             * @implements IlevelInfo
             * @constructor
             * @param {com.msg.IlevelInfo=} [properties] Properties to set
             */
            function levelInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * levelInfo latestUnCompeleteLevel.
             * @member {number} latestUnCompeleteLevel
             * @memberof com.msg.levelInfo
             * @instance
             */
            levelInfo.prototype.latestUnCompeleteLevel = 0;

            /**
             * Creates a new levelInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.levelInfo
             * @static
             * @param {com.msg.IlevelInfo=} [properties] Properties to set
             * @returns {com.msg.levelInfo} levelInfo instance
             */
            levelInfo.create = function create(properties) {
                return new levelInfo(properties);
            };

            /**
             * Encodes the specified levelInfo message. Does not implicitly {@link com.msg.levelInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.levelInfo
             * @static
             * @param {com.msg.IlevelInfo} message levelInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            levelInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.latestUnCompeleteLevel);
                return writer;
            };

            /**
             * Encodes the specified levelInfo message, length delimited. Does not implicitly {@link com.msg.levelInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.levelInfo
             * @static
             * @param {com.msg.IlevelInfo} message levelInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            levelInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a levelInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.levelInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.levelInfo} levelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            levelInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.levelInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.latestUnCompeleteLevel = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("latestUnCompeleteLevel"))
                    throw $util.ProtocolError("missing required 'latestUnCompeleteLevel'", { instance: message });
                return message;
            };

            /**
             * Decodes a levelInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.levelInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.levelInfo} levelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            levelInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a levelInfo message.
             * @function verify
             * @memberof com.msg.levelInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            levelInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.latestUnCompeleteLevel))
                    return "latestUnCompeleteLevel: integer expected";
                return null;
            };

            return levelInfo;
        })();

        msg.playerWeaponInfo = (function() {

            /**
             * Properties of a playerWeaponInfo.
             * @memberof com.msg
             * @interface IplayerWeaponInfo
             * @property {com.msg.IweaponDetail} mainWeapon playerWeaponInfo mainWeapon
             * @property {number} curSideWeaponId playerWeaponInfo curSideWeaponId
             * @property {Array.<com.msg.IweaponDetail>|null} [sideWeapons] playerWeaponInfo sideWeapons
             * @property {number} spawnLvl playerWeaponInfo spawnLvl
             */

            /**
             * Constructs a new playerWeaponInfo.
             * @memberof com.msg
             * @classdesc Represents a playerWeaponInfo.
             * @implements IplayerWeaponInfo
             * @constructor
             * @param {com.msg.IplayerWeaponInfo=} [properties] Properties to set
             */
            function playerWeaponInfo(properties) {
                this.sideWeapons = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * playerWeaponInfo mainWeapon.
             * @member {com.msg.IweaponDetail} mainWeapon
             * @memberof com.msg.playerWeaponInfo
             * @instance
             */
            playerWeaponInfo.prototype.mainWeapon = null;

            /**
             * playerWeaponInfo curSideWeaponId.
             * @member {number} curSideWeaponId
             * @memberof com.msg.playerWeaponInfo
             * @instance
             */
            playerWeaponInfo.prototype.curSideWeaponId = 0;

            /**
             * playerWeaponInfo sideWeapons.
             * @member {Array.<com.msg.IweaponDetail>} sideWeapons
             * @memberof com.msg.playerWeaponInfo
             * @instance
             */
            playerWeaponInfo.prototype.sideWeapons = $util.emptyArray;

            /**
             * playerWeaponInfo spawnLvl.
             * @member {number} spawnLvl
             * @memberof com.msg.playerWeaponInfo
             * @instance
             */
            playerWeaponInfo.prototype.spawnLvl = 0;

            /**
             * Creates a new playerWeaponInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.playerWeaponInfo
             * @static
             * @param {com.msg.IplayerWeaponInfo=} [properties] Properties to set
             * @returns {com.msg.playerWeaponInfo} playerWeaponInfo instance
             */
            playerWeaponInfo.create = function create(properties) {
                return new playerWeaponInfo(properties);
            };

            /**
             * Encodes the specified playerWeaponInfo message. Does not implicitly {@link com.msg.playerWeaponInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.playerWeaponInfo
             * @static
             * @param {com.msg.IplayerWeaponInfo} message playerWeaponInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            playerWeaponInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                $root.com.msg.weaponDetail.encode(message.mainWeapon, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.curSideWeaponId);
                if (message.sideWeapons != null && message.sideWeapons.length)
                    for (var i = 0; i < message.sideWeapons.length; ++i)
                        $root.com.msg.weaponDetail.encode(message.sideWeapons[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.spawnLvl);
                return writer;
            };

            /**
             * Encodes the specified playerWeaponInfo message, length delimited. Does not implicitly {@link com.msg.playerWeaponInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.playerWeaponInfo
             * @static
             * @param {com.msg.IplayerWeaponInfo} message playerWeaponInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            playerWeaponInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a playerWeaponInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.playerWeaponInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.playerWeaponInfo} playerWeaponInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            playerWeaponInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.playerWeaponInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mainWeapon = $root.com.msg.weaponDetail.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.curSideWeaponId = reader.int32();
                        break;
                    case 3:
                        if (!(message.sideWeapons && message.sideWeapons.length))
                            message.sideWeapons = [];
                        message.sideWeapons.push($root.com.msg.weaponDetail.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        message.spawnLvl = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("mainWeapon"))
                    throw $util.ProtocolError("missing required 'mainWeapon'", { instance: message });
                if (!message.hasOwnProperty("curSideWeaponId"))
                    throw $util.ProtocolError("missing required 'curSideWeaponId'", { instance: message });
                if (!message.hasOwnProperty("spawnLvl"))
                    throw $util.ProtocolError("missing required 'spawnLvl'", { instance: message });
                return message;
            };

            /**
             * Decodes a playerWeaponInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.playerWeaponInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.playerWeaponInfo} playerWeaponInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            playerWeaponInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a playerWeaponInfo message.
             * @function verify
             * @memberof com.msg.playerWeaponInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            playerWeaponInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                {
                    var error = $root.com.msg.weaponDetail.verify(message.mainWeapon);
                    if (error)
                        return "mainWeapon." + error;
                }
                if (!$util.isInteger(message.curSideWeaponId))
                    return "curSideWeaponId: integer expected";
                if (message.sideWeapons != null && message.hasOwnProperty("sideWeapons")) {
                    if (!Array.isArray(message.sideWeapons))
                        return "sideWeapons: array expected";
                    for (var i = 0; i < message.sideWeapons.length; ++i) {
                        var error = $root.com.msg.weaponDetail.verify(message.sideWeapons[i]);
                        if (error)
                            return "sideWeapons." + error;
                    }
                }
                if (!$util.isInteger(message.spawnLvl))
                    return "spawnLvl: integer expected";
                return null;
            };

            return playerWeaponInfo;
        })();

        msg.weaponDetail = (function() {

            /**
             * Properties of a weaponDetail.
             * @memberof com.msg
             * @interface IweaponDetail
             * @property {number} id weaponDetail id
             * @property {number} level weaponDetail level
             * @property {number} evolveLevel weaponDetail evolveLevel
             */

            /**
             * Constructs a new weaponDetail.
             * @memberof com.msg
             * @classdesc Represents a weaponDetail.
             * @implements IweaponDetail
             * @constructor
             * @param {com.msg.IweaponDetail=} [properties] Properties to set
             */
            function weaponDetail(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * weaponDetail id.
             * @member {number} id
             * @memberof com.msg.weaponDetail
             * @instance
             */
            weaponDetail.prototype.id = 0;

            /**
             * weaponDetail level.
             * @member {number} level
             * @memberof com.msg.weaponDetail
             * @instance
             */
            weaponDetail.prototype.level = 0;

            /**
             * weaponDetail evolveLevel.
             * @member {number} evolveLevel
             * @memberof com.msg.weaponDetail
             * @instance
             */
            weaponDetail.prototype.evolveLevel = 0;

            /**
             * Creates a new weaponDetail instance using the specified properties.
             * @function create
             * @memberof com.msg.weaponDetail
             * @static
             * @param {com.msg.IweaponDetail=} [properties] Properties to set
             * @returns {com.msg.weaponDetail} weaponDetail instance
             */
            weaponDetail.create = function create(properties) {
                return new weaponDetail(properties);
            };

            /**
             * Encodes the specified weaponDetail message. Does not implicitly {@link com.msg.weaponDetail.verify|verify} messages.
             * @function encode
             * @memberof com.msg.weaponDetail
             * @static
             * @param {com.msg.IweaponDetail} message weaponDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            weaponDetail.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.level);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.evolveLevel);
                return writer;
            };

            /**
             * Encodes the specified weaponDetail message, length delimited. Does not implicitly {@link com.msg.weaponDetail.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.weaponDetail
             * @static
             * @param {com.msg.IweaponDetail} message weaponDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            weaponDetail.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a weaponDetail message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.weaponDetail
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.weaponDetail} weaponDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            weaponDetail.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.weaponDetail();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.level = reader.int32();
                        break;
                    case 3:
                        message.evolveLevel = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                if (!message.hasOwnProperty("level"))
                    throw $util.ProtocolError("missing required 'level'", { instance: message });
                if (!message.hasOwnProperty("evolveLevel"))
                    throw $util.ProtocolError("missing required 'evolveLevel'", { instance: message });
                return message;
            };

            /**
             * Decodes a weaponDetail message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.weaponDetail
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.weaponDetail} weaponDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            weaponDetail.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a weaponDetail message.
             * @function verify
             * @memberof com.msg.weaponDetail
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            weaponDetail.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
                if (!$util.isInteger(message.evolveLevel))
                    return "evolveLevel: integer expected";
                return null;
            };

            return weaponDetail;
        })();

        msg.inviteDetail = (function() {

            /**
             * Properties of an inviteDetail.
             * @memberof com.msg
             * @interface IinviteDetail
             * @property {string} friendOpenID inviteDetail friendOpenID
             * @property {string} picUrl inviteDetail picUrl
             * @property {number} rewardGained inviteDetail rewardGained
             * @property {number} rewardNum inviteDetail rewardNum
             * @property {number} index inviteDetail index
             * @property {number|null} [bindPhone] inviteDetail bindPhone
             */

            /**
             * Constructs a new inviteDetail.
             * @memberof com.msg
             * @classdesc Represents an inviteDetail.
             * @implements IinviteDetail
             * @constructor
             * @param {com.msg.IinviteDetail=} [properties] Properties to set
             */
            function inviteDetail(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * inviteDetail friendOpenID.
             * @member {string} friendOpenID
             * @memberof com.msg.inviteDetail
             * @instance
             */
            inviteDetail.prototype.friendOpenID = "";

            /**
             * inviteDetail picUrl.
             * @member {string} picUrl
             * @memberof com.msg.inviteDetail
             * @instance
             */
            inviteDetail.prototype.picUrl = "";

            /**
             * inviteDetail rewardGained.
             * @member {number} rewardGained
             * @memberof com.msg.inviteDetail
             * @instance
             */
            inviteDetail.prototype.rewardGained = 0;

            /**
             * inviteDetail rewardNum.
             * @member {number} rewardNum
             * @memberof com.msg.inviteDetail
             * @instance
             */
            inviteDetail.prototype.rewardNum = 0;

            /**
             * inviteDetail index.
             * @member {number} index
             * @memberof com.msg.inviteDetail
             * @instance
             */
            inviteDetail.prototype.index = 0;

            /**
             * inviteDetail bindPhone.
             * @member {number} bindPhone
             * @memberof com.msg.inviteDetail
             * @instance
             */
            inviteDetail.prototype.bindPhone = 0;

            /**
             * Creates a new inviteDetail instance using the specified properties.
             * @function create
             * @memberof com.msg.inviteDetail
             * @static
             * @param {com.msg.IinviteDetail=} [properties] Properties to set
             * @returns {com.msg.inviteDetail} inviteDetail instance
             */
            inviteDetail.create = function create(properties) {
                return new inviteDetail(properties);
            };

            /**
             * Encodes the specified inviteDetail message. Does not implicitly {@link com.msg.inviteDetail.verify|verify} messages.
             * @function encode
             * @memberof com.msg.inviteDetail
             * @static
             * @param {com.msg.IinviteDetail} message inviteDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            inviteDetail.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.friendOpenID);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.picUrl);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.rewardGained);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.rewardNum);
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.index);
                if (message.bindPhone != null && message.hasOwnProperty("bindPhone"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.bindPhone);
                return writer;
            };

            /**
             * Encodes the specified inviteDetail message, length delimited. Does not implicitly {@link com.msg.inviteDetail.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.inviteDetail
             * @static
             * @param {com.msg.IinviteDetail} message inviteDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            inviteDetail.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an inviteDetail message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.inviteDetail
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.inviteDetail} inviteDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            inviteDetail.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.inviteDetail();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.friendOpenID = reader.string();
                        break;
                    case 2:
                        message.picUrl = reader.string();
                        break;
                    case 3:
                        message.rewardGained = reader.int32();
                        break;
                    case 4:
                        message.rewardNum = reader.int32();
                        break;
                    case 5:
                        message.index = reader.int32();
                        break;
                    case 6:
                        message.bindPhone = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("friendOpenID"))
                    throw $util.ProtocolError("missing required 'friendOpenID'", { instance: message });
                if (!message.hasOwnProperty("picUrl"))
                    throw $util.ProtocolError("missing required 'picUrl'", { instance: message });
                if (!message.hasOwnProperty("rewardGained"))
                    throw $util.ProtocolError("missing required 'rewardGained'", { instance: message });
                if (!message.hasOwnProperty("rewardNum"))
                    throw $util.ProtocolError("missing required 'rewardNum'", { instance: message });
                if (!message.hasOwnProperty("index"))
                    throw $util.ProtocolError("missing required 'index'", { instance: message });
                return message;
            };

            /**
             * Decodes an inviteDetail message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.inviteDetail
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.inviteDetail} inviteDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            inviteDetail.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an inviteDetail message.
             * @function verify
             * @memberof com.msg.inviteDetail
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            inviteDetail.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.friendOpenID))
                    return "friendOpenID: string expected";
                if (!$util.isString(message.picUrl))
                    return "picUrl: string expected";
                if (!$util.isInteger(message.rewardGained))
                    return "rewardGained: integer expected";
                if (!$util.isInteger(message.rewardNum))
                    return "rewardNum: integer expected";
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
                if (message.bindPhone != null && message.hasOwnProperty("bindPhone"))
                    if (!$util.isInteger(message.bindPhone))
                        return "bindPhone: integer expected";
                return null;
            };

            return inviteDetail;
        })();

        msg.verifyInfo = (function() {

            /**
             * Properties of a verifyInfo.
             * @memberof com.msg
             * @interface IverifyInfo
             * @property {number} state verifyInfo state
             */

            /**
             * Constructs a new verifyInfo.
             * @memberof com.msg
             * @classdesc Represents a verifyInfo.
             * @implements IverifyInfo
             * @constructor
             * @param {com.msg.IverifyInfo=} [properties] Properties to set
             */
            function verifyInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * verifyInfo state.
             * @member {number} state
             * @memberof com.msg.verifyInfo
             * @instance
             */
            verifyInfo.prototype.state = 0;

            /**
             * Creates a new verifyInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.verifyInfo
             * @static
             * @param {com.msg.IverifyInfo=} [properties] Properties to set
             * @returns {com.msg.verifyInfo} verifyInfo instance
             */
            verifyInfo.create = function create(properties) {
                return new verifyInfo(properties);
            };

            /**
             * Encodes the specified verifyInfo message. Does not implicitly {@link com.msg.verifyInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.verifyInfo
             * @static
             * @param {com.msg.IverifyInfo} message verifyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            verifyInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                return writer;
            };

            /**
             * Encodes the specified verifyInfo message, length delimited. Does not implicitly {@link com.msg.verifyInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.verifyInfo
             * @static
             * @param {com.msg.IverifyInfo} message verifyInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            verifyInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a verifyInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.verifyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.verifyInfo} verifyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            verifyInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.verifyInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.state = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("state"))
                    throw $util.ProtocolError("missing required 'state'", { instance: message });
                return message;
            };

            /**
             * Decodes a verifyInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.verifyInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.verifyInfo} verifyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            verifyInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a verifyInfo message.
             * @function verify
             * @memberof com.msg.verifyInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            verifyInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
                return null;
            };

            return verifyInfo;
        })();

        msg.serverConfig = (function() {

            /**
             * Properties of a serverConfig.
             * @memberof com.msg
             * @interface IserverConfig
             * @property {number} shareEnable serverConfig shareEnable
             * @property {number} luckyEnable serverConfig luckyEnable
             * @property {number} inviteType serverConfig inviteType
             * @property {number} verifyReward serverConfig verifyReward
             * @property {number} exchange_Coin serverConfig exchange_Coin
             * @property {number} exchange_Point serverConfig exchange_Point
             * @property {number} verifyColddown serverConfig verifyColddown
             */

            /**
             * Constructs a new serverConfig.
             * @memberof com.msg
             * @classdesc Represents a serverConfig.
             * @implements IserverConfig
             * @constructor
             * @param {com.msg.IserverConfig=} [properties] Properties to set
             */
            function serverConfig(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * serverConfig shareEnable.
             * @member {number} shareEnable
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.shareEnable = 0;

            /**
             * serverConfig luckyEnable.
             * @member {number} luckyEnable
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.luckyEnable = 0;

            /**
             * serverConfig inviteType.
             * @member {number} inviteType
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.inviteType = 0;

            /**
             * serverConfig verifyReward.
             * @member {number} verifyReward
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.verifyReward = 0;

            /**
             * serverConfig exchange_Coin.
             * @member {number} exchange_Coin
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.exchange_Coin = 0;

            /**
             * serverConfig exchange_Point.
             * @member {number} exchange_Point
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.exchange_Point = 0;

            /**
             * serverConfig verifyColddown.
             * @member {number} verifyColddown
             * @memberof com.msg.serverConfig
             * @instance
             */
            serverConfig.prototype.verifyColddown = 0;

            /**
             * Creates a new serverConfig instance using the specified properties.
             * @function create
             * @memberof com.msg.serverConfig
             * @static
             * @param {com.msg.IserverConfig=} [properties] Properties to set
             * @returns {com.msg.serverConfig} serverConfig instance
             */
            serverConfig.create = function create(properties) {
                return new serverConfig(properties);
            };

            /**
             * Encodes the specified serverConfig message. Does not implicitly {@link com.msg.serverConfig.verify|verify} messages.
             * @function encode
             * @memberof com.msg.serverConfig
             * @static
             * @param {com.msg.IserverConfig} message serverConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            serverConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.shareEnable);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.luckyEnable);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.inviteType);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.verifyReward);
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.exchange_Coin);
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.exchange_Point);
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.verifyColddown);
                return writer;
            };

            /**
             * Encodes the specified serverConfig message, length delimited. Does not implicitly {@link com.msg.serverConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.serverConfig
             * @static
             * @param {com.msg.IserverConfig} message serverConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            serverConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a serverConfig message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.serverConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.serverConfig} serverConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            serverConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.serverConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.shareEnable = reader.int32();
                        break;
                    case 2:
                        message.luckyEnable = reader.int32();
                        break;
                    case 3:
                        message.inviteType = reader.int32();
                        break;
                    case 4:
                        message.verifyReward = reader.int32();
                        break;
                    case 5:
                        message.exchange_Coin = reader.int32();
                        break;
                    case 6:
                        message.exchange_Point = reader.int32();
                        break;
                    case 7:
                        message.verifyColddown = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("shareEnable"))
                    throw $util.ProtocolError("missing required 'shareEnable'", { instance: message });
                if (!message.hasOwnProperty("luckyEnable"))
                    throw $util.ProtocolError("missing required 'luckyEnable'", { instance: message });
                if (!message.hasOwnProperty("inviteType"))
                    throw $util.ProtocolError("missing required 'inviteType'", { instance: message });
                if (!message.hasOwnProperty("verifyReward"))
                    throw $util.ProtocolError("missing required 'verifyReward'", { instance: message });
                if (!message.hasOwnProperty("exchange_Coin"))
                    throw $util.ProtocolError("missing required 'exchange_Coin'", { instance: message });
                if (!message.hasOwnProperty("exchange_Point"))
                    throw $util.ProtocolError("missing required 'exchange_Point'", { instance: message });
                if (!message.hasOwnProperty("verifyColddown"))
                    throw $util.ProtocolError("missing required 'verifyColddown'", { instance: message });
                return message;
            };

            /**
             * Decodes a serverConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.serverConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.serverConfig} serverConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            serverConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a serverConfig message.
             * @function verify
             * @memberof com.msg.serverConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            serverConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.shareEnable))
                    return "shareEnable: integer expected";
                if (!$util.isInteger(message.luckyEnable))
                    return "luckyEnable: integer expected";
                if (!$util.isInteger(message.inviteType))
                    return "inviteType: integer expected";
                if (!$util.isInteger(message.verifyReward))
                    return "verifyReward: integer expected";
                if (!$util.isInteger(message.exchange_Coin))
                    return "exchange_Coin: integer expected";
                if (!$util.isInteger(message.exchange_Point))
                    return "exchange_Point: integer expected";
                if (!$util.isInteger(message.verifyColddown))
                    return "verifyColddown: integer expected";
                return null;
            };

            return serverConfig;
        })();

        msg.lotteryRewardInfo = (function() {

            /**
             * Properties of a lotteryRewardInfo.
             * @memberof com.msg
             * @interface IlotteryRewardInfo
             * @property {number} rewardConfigID lotteryRewardInfo rewardConfigID
             * @property {number|Long} lotteryTime lotteryRewardInfo lotteryTime
             * @property {number|Long} messageDeleteTime lotteryRewardInfo messageDeleteTime
             */

            /**
             * Constructs a new lotteryRewardInfo.
             * @memberof com.msg
             * @classdesc Represents a lotteryRewardInfo.
             * @implements IlotteryRewardInfo
             * @constructor
             * @param {com.msg.IlotteryRewardInfo=} [properties] Properties to set
             */
            function lotteryRewardInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * lotteryRewardInfo rewardConfigID.
             * @member {number} rewardConfigID
             * @memberof com.msg.lotteryRewardInfo
             * @instance
             */
            lotteryRewardInfo.prototype.rewardConfigID = 0;

            /**
             * lotteryRewardInfo lotteryTime.
             * @member {number|Long} lotteryTime
             * @memberof com.msg.lotteryRewardInfo
             * @instance
             */
            lotteryRewardInfo.prototype.lotteryTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * lotteryRewardInfo messageDeleteTime.
             * @member {number|Long} messageDeleteTime
             * @memberof com.msg.lotteryRewardInfo
             * @instance
             */
            lotteryRewardInfo.prototype.messageDeleteTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new lotteryRewardInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.lotteryRewardInfo
             * @static
             * @param {com.msg.IlotteryRewardInfo=} [properties] Properties to set
             * @returns {com.msg.lotteryRewardInfo} lotteryRewardInfo instance
             */
            lotteryRewardInfo.create = function create(properties) {
                return new lotteryRewardInfo(properties);
            };

            /**
             * Encodes the specified lotteryRewardInfo message. Does not implicitly {@link com.msg.lotteryRewardInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.lotteryRewardInfo
             * @static
             * @param {com.msg.IlotteryRewardInfo} message lotteryRewardInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            lotteryRewardInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.rewardConfigID);
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.lotteryTime);
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.messageDeleteTime);
                return writer;
            };

            /**
             * Encodes the specified lotteryRewardInfo message, length delimited. Does not implicitly {@link com.msg.lotteryRewardInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.lotteryRewardInfo
             * @static
             * @param {com.msg.IlotteryRewardInfo} message lotteryRewardInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            lotteryRewardInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a lotteryRewardInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.lotteryRewardInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.lotteryRewardInfo} lotteryRewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            lotteryRewardInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.lotteryRewardInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.rewardConfigID = reader.int32();
                        break;
                    case 2:
                        message.lotteryTime = reader.int64();
                        break;
                    case 3:
                        message.messageDeleteTime = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("rewardConfigID"))
                    throw $util.ProtocolError("missing required 'rewardConfigID'", { instance: message });
                if (!message.hasOwnProperty("lotteryTime"))
                    throw $util.ProtocolError("missing required 'lotteryTime'", { instance: message });
                if (!message.hasOwnProperty("messageDeleteTime"))
                    throw $util.ProtocolError("missing required 'messageDeleteTime'", { instance: message });
                return message;
            };

            /**
             * Decodes a lotteryRewardInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.lotteryRewardInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.lotteryRewardInfo} lotteryRewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            lotteryRewardInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a lotteryRewardInfo message.
             * @function verify
             * @memberof com.msg.lotteryRewardInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            lotteryRewardInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.rewardConfigID))
                    return "rewardConfigID: integer expected";
                if (!$util.isInteger(message.lotteryTime) && !(message.lotteryTime && $util.isInteger(message.lotteryTime.low) && $util.isInteger(message.lotteryTime.high)))
                    return "lotteryTime: integer|Long expected";
                if (!$util.isInteger(message.messageDeleteTime) && !(message.messageDeleteTime && $util.isInteger(message.messageDeleteTime.low) && $util.isInteger(message.messageDeleteTime.high)))
                    return "messageDeleteTime: integer|Long expected";
                return null;
            };

            return lotteryRewardInfo;
        })();

        msg.rewardInfo = (function() {

            /**
             * Properties of a rewardInfo.
             * @memberof com.msg
             * @interface IrewardInfo
             * @property {number|null} [diamondNum] rewardInfo diamondNum
             * @property {number|null} [goldNum] rewardInfo goldNum
             * @property {number|null} [pointNum] rewardInfo pointNum
             * @property {number|null} [lotteryNum] rewardInfo lotteryNum
             */

            /**
             * Constructs a new rewardInfo.
             * @memberof com.msg
             * @classdesc Represents a rewardInfo.
             * @implements IrewardInfo
             * @constructor
             * @param {com.msg.IrewardInfo=} [properties] Properties to set
             */
            function rewardInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * rewardInfo diamondNum.
             * @member {number} diamondNum
             * @memberof com.msg.rewardInfo
             * @instance
             */
            rewardInfo.prototype.diamondNum = 0;

            /**
             * rewardInfo goldNum.
             * @member {number} goldNum
             * @memberof com.msg.rewardInfo
             * @instance
             */
            rewardInfo.prototype.goldNum = 0;

            /**
             * rewardInfo pointNum.
             * @member {number} pointNum
             * @memberof com.msg.rewardInfo
             * @instance
             */
            rewardInfo.prototype.pointNum = 0;

            /**
             * rewardInfo lotteryNum.
             * @member {number} lotteryNum
             * @memberof com.msg.rewardInfo
             * @instance
             */
            rewardInfo.prototype.lotteryNum = 0;

            /**
             * Creates a new rewardInfo instance using the specified properties.
             * @function create
             * @memberof com.msg.rewardInfo
             * @static
             * @param {com.msg.IrewardInfo=} [properties] Properties to set
             * @returns {com.msg.rewardInfo} rewardInfo instance
             */
            rewardInfo.create = function create(properties) {
                return new rewardInfo(properties);
            };

            /**
             * Encodes the specified rewardInfo message. Does not implicitly {@link com.msg.rewardInfo.verify|verify} messages.
             * @function encode
             * @memberof com.msg.rewardInfo
             * @static
             * @param {com.msg.IrewardInfo} message rewardInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            rewardInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.diamondNum != null && message.hasOwnProperty("diamondNum"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.diamondNum);
                if (message.goldNum != null && message.hasOwnProperty("goldNum"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.goldNum);
                if (message.pointNum != null && message.hasOwnProperty("pointNum"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.pointNum);
                if (message.lotteryNum != null && message.hasOwnProperty("lotteryNum"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lotteryNum);
                return writer;
            };

            /**
             * Encodes the specified rewardInfo message, length delimited. Does not implicitly {@link com.msg.rewardInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof com.msg.rewardInfo
             * @static
             * @param {com.msg.IrewardInfo} message rewardInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            rewardInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a rewardInfo message from the specified reader or buffer.
             * @function decode
             * @memberof com.msg.rewardInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {com.msg.rewardInfo} rewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            rewardInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.msg.rewardInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.diamondNum = reader.int32();
                        break;
                    case 2:
                        message.goldNum = reader.int32();
                        break;
                    case 3:
                        message.pointNum = reader.int32();
                        break;
                    case 4:
                        message.lotteryNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a rewardInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof com.msg.rewardInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {com.msg.rewardInfo} rewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            rewardInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a rewardInfo message.
             * @function verify
             * @memberof com.msg.rewardInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            rewardInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.diamondNum != null && message.hasOwnProperty("diamondNum"))
                    if (!$util.isInteger(message.diamondNum))
                        return "diamondNum: integer expected";
                if (message.goldNum != null && message.hasOwnProperty("goldNum"))
                    if (!$util.isInteger(message.goldNum))
                        return "goldNum: integer expected";
                if (message.pointNum != null && message.hasOwnProperty("pointNum"))
                    if (!$util.isInteger(message.pointNum))
                        return "pointNum: integer expected";
                if (message.lotteryNum != null && message.hasOwnProperty("lotteryNum"))
                    if (!$util.isInteger(message.lotteryNum))
                        return "lotteryNum: integer expected";
                return null;
            };

            return rewardInfo;
        })();

        return msg;
    })();

    return com;
})();