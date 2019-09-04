type Long = protobuf.Long;

/** Namespace com. */
declare namespace com {

    /** Namespace msg. */
    namespace msg {

        /** Properties of a c_getOpenId_1100. */
        interface Ic_getOpenId_1100 {

            /** c_getOpenId_1100 appid */
            appid: string;

            /** c_getOpenId_1100 sessionCode */
            sessionCode: string;
        }

        /** Represents a c_getOpenId_1100. */
        class c_getOpenId_1100 implements Ic_getOpenId_1100 {

            /**
             * Constructs a new c_getOpenId_1100.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_getOpenId_1100);

            /** c_getOpenId_1100 appid. */
            public appid: string;

            /** c_getOpenId_1100 sessionCode. */
            public sessionCode: string;

            /**
             * Creates a new c_getOpenId_1100 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_getOpenId_1100 instance
             */
            public static create(properties?: com.msg.Ic_getOpenId_1100): com.msg.c_getOpenId_1100;

            /**
             * Encodes the specified c_getOpenId_1100 message. Does not implicitly {@link com.msg.c_getOpenId_1100.verify|verify} messages.
             * @param message c_getOpenId_1100 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_getOpenId_1100, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_getOpenId_1100 message, length delimited. Does not implicitly {@link com.msg.c_getOpenId_1100.verify|verify} messages.
             * @param message c_getOpenId_1100 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_getOpenId_1100, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_getOpenId_1100 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_getOpenId_1100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_getOpenId_1100;

            /**
             * Decodes a c_getOpenId_1100 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_getOpenId_1100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_getOpenId_1100;

            /**
             * Verifies a c_getOpenId_1100 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_getOpenId_1101. */
        interface Is_getOpenId_1101 {

            /** s_getOpenId_1101 openId */
            openId: string;
        }

        /** Represents a s_getOpenId_1101. */
        class s_getOpenId_1101 implements Is_getOpenId_1101 {

            /**
             * Constructs a new s_getOpenId_1101.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_getOpenId_1101);

            /** s_getOpenId_1101 openId. */
            public openId: string;

            /**
             * Creates a new s_getOpenId_1101 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_getOpenId_1101 instance
             */
            public static create(properties?: com.msg.Is_getOpenId_1101): com.msg.s_getOpenId_1101;

            /**
             * Encodes the specified s_getOpenId_1101 message. Does not implicitly {@link com.msg.s_getOpenId_1101.verify|verify} messages.
             * @param message s_getOpenId_1101 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_getOpenId_1101, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_getOpenId_1101 message, length delimited. Does not implicitly {@link com.msg.s_getOpenId_1101.verify|verify} messages.
             * @param message s_getOpenId_1101 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_getOpenId_1101, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_getOpenId_1101 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_getOpenId_1101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_getOpenId_1101;

            /**
             * Decodes a s_getOpenId_1101 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_getOpenId_1101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_getOpenId_1101;

            /**
             * Verifies a s_getOpenId_1101 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_userLogin_1000. */
        interface Ic_userLogin_1000 {

            /** c_userLogin_1000 openId */
            openId: string;

            /** c_userLogin_1000 wxInfo */
            wxInfo?: (com.msg.IwxInfo|null);
        }

        /** Represents a c_userLogin_1000. */
        class c_userLogin_1000 implements Ic_userLogin_1000 {

            /**
             * Constructs a new c_userLogin_1000.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_userLogin_1000);

            /** c_userLogin_1000 openId. */
            public openId: string;

            /** c_userLogin_1000 wxInfo. */
            public wxInfo?: (com.msg.IwxInfo|null);

            /**
             * Creates a new c_userLogin_1000 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_userLogin_1000 instance
             */
            public static create(properties?: com.msg.Ic_userLogin_1000): com.msg.c_userLogin_1000;

            /**
             * Encodes the specified c_userLogin_1000 message. Does not implicitly {@link com.msg.c_userLogin_1000.verify|verify} messages.
             * @param message c_userLogin_1000 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_userLogin_1000, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_userLogin_1000 message, length delimited. Does not implicitly {@link com.msg.c_userLogin_1000.verify|verify} messages.
             * @param message c_userLogin_1000 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_userLogin_1000, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_userLogin_1000 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_userLogin_1000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_userLogin_1000;

            /**
             * Decodes a c_userLogin_1000 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_userLogin_1000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_userLogin_1000;

            /**
             * Verifies a c_userLogin_1000 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_userLogin_1001. */
        interface Is_userLogin_1001 {

            /** s_userLogin_1001 playerInfo */
            playerInfo: com.msg.IplayerInfo;

            /** s_userLogin_1001 loginTime */
            loginTime: (number|Long);

            /** s_userLogin_1001 serverConfig */
            serverConfig?: (com.msg.IserverConfig|null);
        }

        /** Represents a s_userLogin_1001. */
        class s_userLogin_1001 implements Is_userLogin_1001 {

            /**
             * Constructs a new s_userLogin_1001.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_userLogin_1001);

            /** s_userLogin_1001 playerInfo. */
            public playerInfo: com.msg.IplayerInfo;

            /** s_userLogin_1001 loginTime. */
            public loginTime: (number|Long);

            /** s_userLogin_1001 serverConfig. */
            public serverConfig?: (com.msg.IserverConfig|null);

            /**
             * Creates a new s_userLogin_1001 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_userLogin_1001 instance
             */
            public static create(properties?: com.msg.Is_userLogin_1001): com.msg.s_userLogin_1001;

            /**
             * Encodes the specified s_userLogin_1001 message. Does not implicitly {@link com.msg.s_userLogin_1001.verify|verify} messages.
             * @param message s_userLogin_1001 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_userLogin_1001, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_userLogin_1001 message, length delimited. Does not implicitly {@link com.msg.s_userLogin_1001.verify|verify} messages.
             * @param message s_userLogin_1001 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_userLogin_1001, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_userLogin_1001 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_userLogin_1001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_userLogin_1001;

            /**
             * Decodes a s_userLogin_1001 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_userLogin_1001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_userLogin_1001;

            /**
             * Verifies a s_userLogin_1001 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_ExchangeWithDiamond_2000. */
        interface Ic_ExchangeWithDiamond_2000 {

            /** c_ExchangeWithDiamond_2000 openId */
            openId: string;

            /** c_ExchangeWithDiamond_2000 type */
            type: number;

            /** c_ExchangeWithDiamond_2000 diamondNum */
            diamondNum: number;
        }

        /** Represents a c_ExchangeWithDiamond_2000. */
        class c_ExchangeWithDiamond_2000 implements Ic_ExchangeWithDiamond_2000 {

            /**
             * Constructs a new c_ExchangeWithDiamond_2000.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_ExchangeWithDiamond_2000);

            /** c_ExchangeWithDiamond_2000 openId. */
            public openId: string;

            /** c_ExchangeWithDiamond_2000 type. */
            public type: number;

            /** c_ExchangeWithDiamond_2000 diamondNum. */
            public diamondNum: number;

            /**
             * Creates a new c_ExchangeWithDiamond_2000 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_ExchangeWithDiamond_2000 instance
             */
            public static create(properties?: com.msg.Ic_ExchangeWithDiamond_2000): com.msg.c_ExchangeWithDiamond_2000;

            /**
             * Encodes the specified c_ExchangeWithDiamond_2000 message. Does not implicitly {@link com.msg.c_ExchangeWithDiamond_2000.verify|verify} messages.
             * @param message c_ExchangeWithDiamond_2000 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_ExchangeWithDiamond_2000, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_ExchangeWithDiamond_2000 message, length delimited. Does not implicitly {@link com.msg.c_ExchangeWithDiamond_2000.verify|verify} messages.
             * @param message c_ExchangeWithDiamond_2000 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_ExchangeWithDiamond_2000, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_ExchangeWithDiamond_2000 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_ExchangeWithDiamond_2000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_ExchangeWithDiamond_2000;

            /**
             * Decodes a c_ExchangeWithDiamond_2000 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_ExchangeWithDiamond_2000
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_ExchangeWithDiamond_2000;

            /**
             * Verifies a c_ExchangeWithDiamond_2000 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_ExchangeWithDiamond_2001. */
        interface Is_ExchangeWithDiamond_2001 {

            /** s_ExchangeWithDiamond_2001 result */
            result: number;

            /** s_ExchangeWithDiamond_2001 moneyInfo */
            moneyInfo?: (com.msg.ImoneyInfo|null);
        }

        /** Represents a s_ExchangeWithDiamond_2001. */
        class s_ExchangeWithDiamond_2001 implements Is_ExchangeWithDiamond_2001 {

            /**
             * Constructs a new s_ExchangeWithDiamond_2001.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_ExchangeWithDiamond_2001);

            /** s_ExchangeWithDiamond_2001 result. */
            public result: number;

            /** s_ExchangeWithDiamond_2001 moneyInfo. */
            public moneyInfo?: (com.msg.ImoneyInfo|null);

            /**
             * Creates a new s_ExchangeWithDiamond_2001 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_ExchangeWithDiamond_2001 instance
             */
            public static create(properties?: com.msg.Is_ExchangeWithDiamond_2001): com.msg.s_ExchangeWithDiamond_2001;

            /**
             * Encodes the specified s_ExchangeWithDiamond_2001 message. Does not implicitly {@link com.msg.s_ExchangeWithDiamond_2001.verify|verify} messages.
             * @param message s_ExchangeWithDiamond_2001 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_ExchangeWithDiamond_2001, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_ExchangeWithDiamond_2001 message, length delimited. Does not implicitly {@link com.msg.s_ExchangeWithDiamond_2001.verify|verify} messages.
             * @param message s_ExchangeWithDiamond_2001 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_ExchangeWithDiamond_2001, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_ExchangeWithDiamond_2001 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_ExchangeWithDiamond_2001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_ExchangeWithDiamond_2001;

            /**
             * Decodes a s_ExchangeWithDiamond_2001 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_ExchangeWithDiamond_2001
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_ExchangeWithDiamond_2001;

            /**
             * Verifies a s_ExchangeWithDiamond_2001 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_UpgradeWeaponLvl_2010. */
        interface Ic_UpgradeWeaponLvl_2010 {

            /** c_UpgradeWeaponLvl_2010 openId */
            openId: string;

            /** c_UpgradeWeaponLvl_2010 weaponID */
            weaponID: number;

            /** c_UpgradeWeaponLvl_2010 curLvl */
            curLvl: number;

            /** c_UpgradeWeaponLvl_2010 costGold */
            costGold: number;
        }

        /** Represents a c_UpgradeWeaponLvl_2010. */
        class c_UpgradeWeaponLvl_2010 implements Ic_UpgradeWeaponLvl_2010 {

            /**
             * Constructs a new c_UpgradeWeaponLvl_2010.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_UpgradeWeaponLvl_2010);

            /** c_UpgradeWeaponLvl_2010 openId. */
            public openId: string;

            /** c_UpgradeWeaponLvl_2010 weaponID. */
            public weaponID: number;

            /** c_UpgradeWeaponLvl_2010 curLvl. */
            public curLvl: number;

            /** c_UpgradeWeaponLvl_2010 costGold. */
            public costGold: number;

            /**
             * Creates a new c_UpgradeWeaponLvl_2010 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_UpgradeWeaponLvl_2010 instance
             */
            public static create(properties?: com.msg.Ic_UpgradeWeaponLvl_2010): com.msg.c_UpgradeWeaponLvl_2010;

            /**
             * Encodes the specified c_UpgradeWeaponLvl_2010 message. Does not implicitly {@link com.msg.c_UpgradeWeaponLvl_2010.verify|verify} messages.
             * @param message c_UpgradeWeaponLvl_2010 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_UpgradeWeaponLvl_2010, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_UpgradeWeaponLvl_2010 message, length delimited. Does not implicitly {@link com.msg.c_UpgradeWeaponLvl_2010.verify|verify} messages.
             * @param message c_UpgradeWeaponLvl_2010 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_UpgradeWeaponLvl_2010, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_UpgradeWeaponLvl_2010 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_UpgradeWeaponLvl_2010
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_UpgradeWeaponLvl_2010;

            /**
             * Decodes a c_UpgradeWeaponLvl_2010 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_UpgradeWeaponLvl_2010
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_UpgradeWeaponLvl_2010;

            /**
             * Verifies a c_UpgradeWeaponLvl_2010 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_UpgradeWeaponLvl_2011. */
        interface Is_UpgradeWeaponLvl_2011 {

            /** s_UpgradeWeaponLvl_2011 result */
            result: number;

            /** s_UpgradeWeaponLvl_2011 weaponID */
            weaponID: number;

            /** s_UpgradeWeaponLvl_2011 newLvl */
            newLvl: number;

            /** s_UpgradeWeaponLvl_2011 totalGold */
            totalGold: number;
        }

        /** Represents a s_UpgradeWeaponLvl_2011. */
        class s_UpgradeWeaponLvl_2011 implements Is_UpgradeWeaponLvl_2011 {

            /**
             * Constructs a new s_UpgradeWeaponLvl_2011.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_UpgradeWeaponLvl_2011);

            /** s_UpgradeWeaponLvl_2011 result. */
            public result: number;

            /** s_UpgradeWeaponLvl_2011 weaponID. */
            public weaponID: number;

            /** s_UpgradeWeaponLvl_2011 newLvl. */
            public newLvl: number;

            /** s_UpgradeWeaponLvl_2011 totalGold. */
            public totalGold: number;

            /**
             * Creates a new s_UpgradeWeaponLvl_2011 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_UpgradeWeaponLvl_2011 instance
             */
            public static create(properties?: com.msg.Is_UpgradeWeaponLvl_2011): com.msg.s_UpgradeWeaponLvl_2011;

            /**
             * Encodes the specified s_UpgradeWeaponLvl_2011 message. Does not implicitly {@link com.msg.s_UpgradeWeaponLvl_2011.verify|verify} messages.
             * @param message s_UpgradeWeaponLvl_2011 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_UpgradeWeaponLvl_2011, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_UpgradeWeaponLvl_2011 message, length delimited. Does not implicitly {@link com.msg.s_UpgradeWeaponLvl_2011.verify|verify} messages.
             * @param message s_UpgradeWeaponLvl_2011 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_UpgradeWeaponLvl_2011, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_UpgradeWeaponLvl_2011 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_UpgradeWeaponLvl_2011
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_UpgradeWeaponLvl_2011;

            /**
             * Decodes a s_UpgradeWeaponLvl_2011 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_UpgradeWeaponLvl_2011
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_UpgradeWeaponLvl_2011;

            /**
             * Verifies a s_UpgradeWeaponLvl_2011 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_UpgradeSpawnLvl_2012. */
        interface Ic_UpgradeSpawnLvl_2012 {

            /** c_UpgradeSpawnLvl_2012 openId */
            openId: string;

            /** c_UpgradeSpawnLvl_2012 curLvl */
            curLvl: number;

            /** c_UpgradeSpawnLvl_2012 costGold */
            costGold: number;

            /** c_UpgradeSpawnLvl_2012 newGoldSpawnLvl */
            newGoldSpawnLvl: number;

            /** c_UpgradeSpawnLvl_2012 newDiamondSpawnLvl */
            newDiamondSpawnLvl: number;
        }

        /** Represents a c_UpgradeSpawnLvl_2012. */
        class c_UpgradeSpawnLvl_2012 implements Ic_UpgradeSpawnLvl_2012 {

            /**
             * Constructs a new c_UpgradeSpawnLvl_2012.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_UpgradeSpawnLvl_2012);

            /** c_UpgradeSpawnLvl_2012 openId. */
            public openId: string;

            /** c_UpgradeSpawnLvl_2012 curLvl. */
            public curLvl: number;

            /** c_UpgradeSpawnLvl_2012 costGold. */
            public costGold: number;

            /** c_UpgradeSpawnLvl_2012 newGoldSpawnLvl. */
            public newGoldSpawnLvl: number;

            /** c_UpgradeSpawnLvl_2012 newDiamondSpawnLvl. */
            public newDiamondSpawnLvl: number;

            /**
             * Creates a new c_UpgradeSpawnLvl_2012 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_UpgradeSpawnLvl_2012 instance
             */
            public static create(properties?: com.msg.Ic_UpgradeSpawnLvl_2012): com.msg.c_UpgradeSpawnLvl_2012;

            /**
             * Encodes the specified c_UpgradeSpawnLvl_2012 message. Does not implicitly {@link com.msg.c_UpgradeSpawnLvl_2012.verify|verify} messages.
             * @param message c_UpgradeSpawnLvl_2012 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_UpgradeSpawnLvl_2012, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_UpgradeSpawnLvl_2012 message, length delimited. Does not implicitly {@link com.msg.c_UpgradeSpawnLvl_2012.verify|verify} messages.
             * @param message c_UpgradeSpawnLvl_2012 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_UpgradeSpawnLvl_2012, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_UpgradeSpawnLvl_2012 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_UpgradeSpawnLvl_2012
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_UpgradeSpawnLvl_2012;

            /**
             * Decodes a c_UpgradeSpawnLvl_2012 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_UpgradeSpawnLvl_2012
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_UpgradeSpawnLvl_2012;

            /**
             * Verifies a c_UpgradeSpawnLvl_2012 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_UpgradeSpawnLvl_2013. */
        interface Is_UpgradeSpawnLvl_2013 {

            /** s_UpgradeSpawnLvl_2013 result */
            result: number;

            /** s_UpgradeSpawnLvl_2013 newLvl */
            newLvl: number;

            /** s_UpgradeSpawnLvl_2013 totalGold */
            totalGold: number;
        }

        /** Represents a s_UpgradeSpawnLvl_2013. */
        class s_UpgradeSpawnLvl_2013 implements Is_UpgradeSpawnLvl_2013 {

            /**
             * Constructs a new s_UpgradeSpawnLvl_2013.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_UpgradeSpawnLvl_2013);

            /** s_UpgradeSpawnLvl_2013 result. */
            public result: number;

            /** s_UpgradeSpawnLvl_2013 newLvl. */
            public newLvl: number;

            /** s_UpgradeSpawnLvl_2013 totalGold. */
            public totalGold: number;

            /**
             * Creates a new s_UpgradeSpawnLvl_2013 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_UpgradeSpawnLvl_2013 instance
             */
            public static create(properties?: com.msg.Is_UpgradeSpawnLvl_2013): com.msg.s_UpgradeSpawnLvl_2013;

            /**
             * Encodes the specified s_UpgradeSpawnLvl_2013 message. Does not implicitly {@link com.msg.s_UpgradeSpawnLvl_2013.verify|verify} messages.
             * @param message s_UpgradeSpawnLvl_2013 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_UpgradeSpawnLvl_2013, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_UpgradeSpawnLvl_2013 message, length delimited. Does not implicitly {@link com.msg.s_UpgradeSpawnLvl_2013.verify|verify} messages.
             * @param message s_UpgradeSpawnLvl_2013 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_UpgradeSpawnLvl_2013, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_UpgradeSpawnLvl_2013 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_UpgradeSpawnLvl_2013
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_UpgradeSpawnLvl_2013;

            /**
             * Decodes a s_UpgradeSpawnLvl_2013 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_UpgradeSpawnLvl_2013
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_UpgradeSpawnLvl_2013;

            /**
             * Verifies a s_UpgradeSpawnLvl_2013 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_EquipSideWeapon_2020. */
        interface Ic_EquipSideWeapon_2020 {

            /** c_EquipSideWeapon_2020 openId */
            openId: string;

            /** c_EquipSideWeapon_2020 sideWeaponID */
            sideWeaponID: number;
        }

        /** Represents a c_EquipSideWeapon_2020. */
        class c_EquipSideWeapon_2020 implements Ic_EquipSideWeapon_2020 {

            /**
             * Constructs a new c_EquipSideWeapon_2020.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_EquipSideWeapon_2020);

            /** c_EquipSideWeapon_2020 openId. */
            public openId: string;

            /** c_EquipSideWeapon_2020 sideWeaponID. */
            public sideWeaponID: number;

            /**
             * Creates a new c_EquipSideWeapon_2020 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_EquipSideWeapon_2020 instance
             */
            public static create(properties?: com.msg.Ic_EquipSideWeapon_2020): com.msg.c_EquipSideWeapon_2020;

            /**
             * Encodes the specified c_EquipSideWeapon_2020 message. Does not implicitly {@link com.msg.c_EquipSideWeapon_2020.verify|verify} messages.
             * @param message c_EquipSideWeapon_2020 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_EquipSideWeapon_2020, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_EquipSideWeapon_2020 message, length delimited. Does not implicitly {@link com.msg.c_EquipSideWeapon_2020.verify|verify} messages.
             * @param message c_EquipSideWeapon_2020 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_EquipSideWeapon_2020, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_EquipSideWeapon_2020 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_EquipSideWeapon_2020
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_EquipSideWeapon_2020;

            /**
             * Decodes a c_EquipSideWeapon_2020 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_EquipSideWeapon_2020
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_EquipSideWeapon_2020;

            /**
             * Verifies a c_EquipSideWeapon_2020 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_EquipSideWeapon_2021. */
        interface Is_EquipSideWeapon_2021 {

            /** s_EquipSideWeapon_2021 result */
            result: number;

            /** s_EquipSideWeapon_2021 sideWeaponID */
            sideWeaponID: number;
        }

        /** Represents a s_EquipSideWeapon_2021. */
        class s_EquipSideWeapon_2021 implements Is_EquipSideWeapon_2021 {

            /**
             * Constructs a new s_EquipSideWeapon_2021.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_EquipSideWeapon_2021);

            /** s_EquipSideWeapon_2021 result. */
            public result: number;

            /** s_EquipSideWeapon_2021 sideWeaponID. */
            public sideWeaponID: number;

            /**
             * Creates a new s_EquipSideWeapon_2021 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_EquipSideWeapon_2021 instance
             */
            public static create(properties?: com.msg.Is_EquipSideWeapon_2021): com.msg.s_EquipSideWeapon_2021;

            /**
             * Encodes the specified s_EquipSideWeapon_2021 message. Does not implicitly {@link com.msg.s_EquipSideWeapon_2021.verify|verify} messages.
             * @param message s_EquipSideWeapon_2021 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_EquipSideWeapon_2021, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_EquipSideWeapon_2021 message, length delimited. Does not implicitly {@link com.msg.s_EquipSideWeapon_2021.verify|verify} messages.
             * @param message s_EquipSideWeapon_2021 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_EquipSideWeapon_2021, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_EquipSideWeapon_2021 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_EquipSideWeapon_2021
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_EquipSideWeapon_2021;

            /**
             * Decodes a s_EquipSideWeapon_2021 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_EquipSideWeapon_2021
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_EquipSideWeapon_2021;

            /**
             * Verifies a s_EquipSideWeapon_2021 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_UnlockSideWeapon_2022. */
        interface Ic_UnlockSideWeapon_2022 {

            /** c_UnlockSideWeapon_2022 openId */
            openId: string;

            /** c_UnlockSideWeapon_2022 sideWeaponID */
            sideWeaponID: number;
        }

        /** Represents a c_UnlockSideWeapon_2022. */
        class c_UnlockSideWeapon_2022 implements Ic_UnlockSideWeapon_2022 {

            /**
             * Constructs a new c_UnlockSideWeapon_2022.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_UnlockSideWeapon_2022);

            /** c_UnlockSideWeapon_2022 openId. */
            public openId: string;

            /** c_UnlockSideWeapon_2022 sideWeaponID. */
            public sideWeaponID: number;

            /**
             * Creates a new c_UnlockSideWeapon_2022 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_UnlockSideWeapon_2022 instance
             */
            public static create(properties?: com.msg.Ic_UnlockSideWeapon_2022): com.msg.c_UnlockSideWeapon_2022;

            /**
             * Encodes the specified c_UnlockSideWeapon_2022 message. Does not implicitly {@link com.msg.c_UnlockSideWeapon_2022.verify|verify} messages.
             * @param message c_UnlockSideWeapon_2022 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_UnlockSideWeapon_2022, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_UnlockSideWeapon_2022 message, length delimited. Does not implicitly {@link com.msg.c_UnlockSideWeapon_2022.verify|verify} messages.
             * @param message c_UnlockSideWeapon_2022 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_UnlockSideWeapon_2022, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_UnlockSideWeapon_2022 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_UnlockSideWeapon_2022
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_UnlockSideWeapon_2022;

            /**
             * Decodes a c_UnlockSideWeapon_2022 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_UnlockSideWeapon_2022
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_UnlockSideWeapon_2022;

            /**
             * Verifies a c_UnlockSideWeapon_2022 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_UnlockSideWeapon_2023. */
        interface Is_UnlockSideWeapon_2023 {

            /** s_UnlockSideWeapon_2023 result */
            result: number;

            /** s_UnlockSideWeapon_2023 sideWeaponInfo */
            sideWeaponInfo?: (com.msg.IweaponDetail|null);
        }

        /** Represents a s_UnlockSideWeapon_2023. */
        class s_UnlockSideWeapon_2023 implements Is_UnlockSideWeapon_2023 {

            /**
             * Constructs a new s_UnlockSideWeapon_2023.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_UnlockSideWeapon_2023);

            /** s_UnlockSideWeapon_2023 result. */
            public result: number;

            /** s_UnlockSideWeapon_2023 sideWeaponInfo. */
            public sideWeaponInfo?: (com.msg.IweaponDetail|null);

            /**
             * Creates a new s_UnlockSideWeapon_2023 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_UnlockSideWeapon_2023 instance
             */
            public static create(properties?: com.msg.Is_UnlockSideWeapon_2023): com.msg.s_UnlockSideWeapon_2023;

            /**
             * Encodes the specified s_UnlockSideWeapon_2023 message. Does not implicitly {@link com.msg.s_UnlockSideWeapon_2023.verify|verify} messages.
             * @param message s_UnlockSideWeapon_2023 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_UnlockSideWeapon_2023, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_UnlockSideWeapon_2023 message, length delimited. Does not implicitly {@link com.msg.s_UnlockSideWeapon_2023.verify|verify} messages.
             * @param message s_UnlockSideWeapon_2023 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_UnlockSideWeapon_2023, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_UnlockSideWeapon_2023 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_UnlockSideWeapon_2023
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_UnlockSideWeapon_2023;

            /**
             * Decodes a s_UnlockSideWeapon_2023 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_UnlockSideWeapon_2023
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_UnlockSideWeapon_2023;

            /**
             * Verifies a s_UnlockSideWeapon_2023 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_CreateMoneySpawn_2030. */
        interface Ic_CreateMoneySpawn_2030 {

            /** c_CreateMoneySpawn_2030 openId */
            openId: string;

            /** c_CreateMoneySpawn_2030 moneyType */
            moneyType: number;
        }

        /** Represents a c_CreateMoneySpawn_2030. */
        class c_CreateMoneySpawn_2030 implements Ic_CreateMoneySpawn_2030 {

            /**
             * Constructs a new c_CreateMoneySpawn_2030.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_CreateMoneySpawn_2030);

            /** c_CreateMoneySpawn_2030 openId. */
            public openId: string;

            /** c_CreateMoneySpawn_2030 moneyType. */
            public moneyType: number;

            /**
             * Creates a new c_CreateMoneySpawn_2030 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_CreateMoneySpawn_2030 instance
             */
            public static create(properties?: com.msg.Ic_CreateMoneySpawn_2030): com.msg.c_CreateMoneySpawn_2030;

            /**
             * Encodes the specified c_CreateMoneySpawn_2030 message. Does not implicitly {@link com.msg.c_CreateMoneySpawn_2030.verify|verify} messages.
             * @param message c_CreateMoneySpawn_2030 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_CreateMoneySpawn_2030, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_CreateMoneySpawn_2030 message, length delimited. Does not implicitly {@link com.msg.c_CreateMoneySpawn_2030.verify|verify} messages.
             * @param message c_CreateMoneySpawn_2030 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_CreateMoneySpawn_2030, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_CreateMoneySpawn_2030 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_CreateMoneySpawn_2030
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_CreateMoneySpawn_2030;

            /**
             * Decodes a c_CreateMoneySpawn_2030 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_CreateMoneySpawn_2030
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_CreateMoneySpawn_2030;

            /**
             * Verifies a c_CreateMoneySpawn_2030 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_CreateMoneySpawn_2031. */
        interface Is_CreateMoneySpawn_2031 {

            /** s_CreateMoneySpawn_2031 result */
            result: number;

            /** s_CreateMoneySpawn_2031 newSpawnInfo */
            newSpawnInfo: com.msg.ImoneySpawnInfo;
        }

        /** Represents a s_CreateMoneySpawn_2031. */
        class s_CreateMoneySpawn_2031 implements Is_CreateMoneySpawn_2031 {

            /**
             * Constructs a new s_CreateMoneySpawn_2031.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_CreateMoneySpawn_2031);

            /** s_CreateMoneySpawn_2031 result. */
            public result: number;

            /** s_CreateMoneySpawn_2031 newSpawnInfo. */
            public newSpawnInfo: com.msg.ImoneySpawnInfo;

            /**
             * Creates a new s_CreateMoneySpawn_2031 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_CreateMoneySpawn_2031 instance
             */
            public static create(properties?: com.msg.Is_CreateMoneySpawn_2031): com.msg.s_CreateMoneySpawn_2031;

            /**
             * Encodes the specified s_CreateMoneySpawn_2031 message. Does not implicitly {@link com.msg.s_CreateMoneySpawn_2031.verify|verify} messages.
             * @param message s_CreateMoneySpawn_2031 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_CreateMoneySpawn_2031, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_CreateMoneySpawn_2031 message, length delimited. Does not implicitly {@link com.msg.s_CreateMoneySpawn_2031.verify|verify} messages.
             * @param message s_CreateMoneySpawn_2031 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_CreateMoneySpawn_2031, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_CreateMoneySpawn_2031 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_CreateMoneySpawn_2031
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_CreateMoneySpawn_2031;

            /**
             * Decodes a s_CreateMoneySpawn_2031 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_CreateMoneySpawn_2031
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_CreateMoneySpawn_2031;

            /**
             * Verifies a s_CreateMoneySpawn_2031 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_UpdateMoneySpawn_2032. */
        interface Ic_UpdateMoneySpawn_2032 {

            /** c_UpdateMoneySpawn_2032 openId */
            openId: string;

            /** c_UpdateMoneySpawn_2032 spawnID */
            spawnID: number;

            /** c_UpdateMoneySpawn_2032 moneyDelta */
            moneyDelta: number;
        }

        /** Represents a c_UpdateMoneySpawn_2032. */
        class c_UpdateMoneySpawn_2032 implements Ic_UpdateMoneySpawn_2032 {

            /**
             * Constructs a new c_UpdateMoneySpawn_2032.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_UpdateMoneySpawn_2032);

            /** c_UpdateMoneySpawn_2032 openId. */
            public openId: string;

            /** c_UpdateMoneySpawn_2032 spawnID. */
            public spawnID: number;

            /** c_UpdateMoneySpawn_2032 moneyDelta. */
            public moneyDelta: number;

            /**
             * Creates a new c_UpdateMoneySpawn_2032 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_UpdateMoneySpawn_2032 instance
             */
            public static create(properties?: com.msg.Ic_UpdateMoneySpawn_2032): com.msg.c_UpdateMoneySpawn_2032;

            /**
             * Encodes the specified c_UpdateMoneySpawn_2032 message. Does not implicitly {@link com.msg.c_UpdateMoneySpawn_2032.verify|verify} messages.
             * @param message c_UpdateMoneySpawn_2032 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_UpdateMoneySpawn_2032, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_UpdateMoneySpawn_2032 message, length delimited. Does not implicitly {@link com.msg.c_UpdateMoneySpawn_2032.verify|verify} messages.
             * @param message c_UpdateMoneySpawn_2032 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_UpdateMoneySpawn_2032, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_UpdateMoneySpawn_2032 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_UpdateMoneySpawn_2032
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_UpdateMoneySpawn_2032;

            /**
             * Decodes a c_UpdateMoneySpawn_2032 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_UpdateMoneySpawn_2032
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_UpdateMoneySpawn_2032;

            /**
             * Verifies a c_UpdateMoneySpawn_2032 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_UpdateMoneySpawn_2033. */
        interface Is_UpdateMoneySpawn_2033 {

            /** s_UpdateMoneySpawn_2033 result */
            result: number;

            /** s_UpdateMoneySpawn_2033 spawnInfo */
            spawnInfo?: (com.msg.ImoneySpawnInfo|null);
        }

        /** Represents a s_UpdateMoneySpawn_2033. */
        class s_UpdateMoneySpawn_2033 implements Is_UpdateMoneySpawn_2033 {

            /**
             * Constructs a new s_UpdateMoneySpawn_2033.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_UpdateMoneySpawn_2033);

            /** s_UpdateMoneySpawn_2033 result. */
            public result: number;

            /** s_UpdateMoneySpawn_2033 spawnInfo. */
            public spawnInfo?: (com.msg.ImoneySpawnInfo|null);

            /**
             * Creates a new s_UpdateMoneySpawn_2033 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_UpdateMoneySpawn_2033 instance
             */
            public static create(properties?: com.msg.Is_UpdateMoneySpawn_2033): com.msg.s_UpdateMoneySpawn_2033;

            /**
             * Encodes the specified s_UpdateMoneySpawn_2033 message. Does not implicitly {@link com.msg.s_UpdateMoneySpawn_2033.verify|verify} messages.
             * @param message s_UpdateMoneySpawn_2033 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_UpdateMoneySpawn_2033, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_UpdateMoneySpawn_2033 message, length delimited. Does not implicitly {@link com.msg.s_UpdateMoneySpawn_2033.verify|verify} messages.
             * @param message s_UpdateMoneySpawn_2033 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_UpdateMoneySpawn_2033, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_UpdateMoneySpawn_2033 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_UpdateMoneySpawn_2033
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_UpdateMoneySpawn_2033;

            /**
             * Decodes a s_UpdateMoneySpawn_2033 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_UpdateMoneySpawn_2033
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_UpdateMoneySpawn_2033;

            /**
             * Verifies a s_UpdateMoneySpawn_2033 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_GainMoneySpawn_2034. */
        interface Ic_GainMoneySpawn_2034 {

            /** c_GainMoneySpawn_2034 openId */
            openId: string;

            /** c_GainMoneySpawn_2034 spawnID */
            spawnID: number;

            /** c_GainMoneySpawn_2034 base */
            base: number;

            /** c_GainMoneySpawn_2034 lucky */
            lucky: number;
        }

        /** Represents a c_GainMoneySpawn_2034. */
        class c_GainMoneySpawn_2034 implements Ic_GainMoneySpawn_2034 {

            /**
             * Constructs a new c_GainMoneySpawn_2034.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_GainMoneySpawn_2034);

            /** c_GainMoneySpawn_2034 openId. */
            public openId: string;

            /** c_GainMoneySpawn_2034 spawnID. */
            public spawnID: number;

            /** c_GainMoneySpawn_2034 base. */
            public base: number;

            /** c_GainMoneySpawn_2034 lucky. */
            public lucky: number;

            /**
             * Creates a new c_GainMoneySpawn_2034 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_GainMoneySpawn_2034 instance
             */
            public static create(properties?: com.msg.Ic_GainMoneySpawn_2034): com.msg.c_GainMoneySpawn_2034;

            /**
             * Encodes the specified c_GainMoneySpawn_2034 message. Does not implicitly {@link com.msg.c_GainMoneySpawn_2034.verify|verify} messages.
             * @param message c_GainMoneySpawn_2034 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_GainMoneySpawn_2034, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_GainMoneySpawn_2034 message, length delimited. Does not implicitly {@link com.msg.c_GainMoneySpawn_2034.verify|verify} messages.
             * @param message c_GainMoneySpawn_2034 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_GainMoneySpawn_2034, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_GainMoneySpawn_2034 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_GainMoneySpawn_2034
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_GainMoneySpawn_2034;

            /**
             * Decodes a c_GainMoneySpawn_2034 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_GainMoneySpawn_2034
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_GainMoneySpawn_2034;

            /**
             * Verifies a c_GainMoneySpawn_2034 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_GainMoneySpawn_2035. */
        interface Is_GainMoneySpawn_2035 {

            /** s_GainMoneySpawn_2035 result */
            result: number;

            /** s_GainMoneySpawn_2035 spawnInfo */
            spawnInfo?: (com.msg.ImoneySpawnInfo|null);
        }

        /** Represents a s_GainMoneySpawn_2035. */
        class s_GainMoneySpawn_2035 implements Is_GainMoneySpawn_2035 {

            /**
             * Constructs a new s_GainMoneySpawn_2035.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_GainMoneySpawn_2035);

            /** s_GainMoneySpawn_2035 result. */
            public result: number;

            /** s_GainMoneySpawn_2035 spawnInfo. */
            public spawnInfo?: (com.msg.ImoneySpawnInfo|null);

            /**
             * Creates a new s_GainMoneySpawn_2035 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_GainMoneySpawn_2035 instance
             */
            public static create(properties?: com.msg.Is_GainMoneySpawn_2035): com.msg.s_GainMoneySpawn_2035;

            /**
             * Encodes the specified s_GainMoneySpawn_2035 message. Does not implicitly {@link com.msg.s_GainMoneySpawn_2035.verify|verify} messages.
             * @param message s_GainMoneySpawn_2035 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_GainMoneySpawn_2035, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_GainMoneySpawn_2035 message, length delimited. Does not implicitly {@link com.msg.s_GainMoneySpawn_2035.verify|verify} messages.
             * @param message s_GainMoneySpawn_2035 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_GainMoneySpawn_2035, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_GainMoneySpawn_2035 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_GainMoneySpawn_2035
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_GainMoneySpawn_2035;

            /**
             * Decodes a s_GainMoneySpawn_2035 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_GainMoneySpawn_2035
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_GainMoneySpawn_2035;

            /**
             * Verifies a s_GainMoneySpawn_2035 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_RemoveMoneySpawn_2036. */
        interface Ic_RemoveMoneySpawn_2036 {

            /** c_RemoveMoneySpawn_2036 openId */
            openId: string;

            /** c_RemoveMoneySpawn_2036 spawnID */
            spawnID: number;
        }

        /** Represents a c_RemoveMoneySpawn_2036. */
        class c_RemoveMoneySpawn_2036 implements Ic_RemoveMoneySpawn_2036 {

            /**
             * Constructs a new c_RemoveMoneySpawn_2036.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_RemoveMoneySpawn_2036);

            /** c_RemoveMoneySpawn_2036 openId. */
            public openId: string;

            /** c_RemoveMoneySpawn_2036 spawnID. */
            public spawnID: number;

            /**
             * Creates a new c_RemoveMoneySpawn_2036 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_RemoveMoneySpawn_2036 instance
             */
            public static create(properties?: com.msg.Ic_RemoveMoneySpawn_2036): com.msg.c_RemoveMoneySpawn_2036;

            /**
             * Encodes the specified c_RemoveMoneySpawn_2036 message. Does not implicitly {@link com.msg.c_RemoveMoneySpawn_2036.verify|verify} messages.
             * @param message c_RemoveMoneySpawn_2036 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_RemoveMoneySpawn_2036, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_RemoveMoneySpawn_2036 message, length delimited. Does not implicitly {@link com.msg.c_RemoveMoneySpawn_2036.verify|verify} messages.
             * @param message c_RemoveMoneySpawn_2036 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_RemoveMoneySpawn_2036, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_RemoveMoneySpawn_2036 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_RemoveMoneySpawn_2036
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_RemoveMoneySpawn_2036;

            /**
             * Decodes a c_RemoveMoneySpawn_2036 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_RemoveMoneySpawn_2036
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_RemoveMoneySpawn_2036;

            /**
             * Verifies a c_RemoveMoneySpawn_2036 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_RemoveMoneySpawn_2037. */
        interface Is_RemoveMoneySpawn_2037 {

            /** s_RemoveMoneySpawn_2037 result */
            result: number;

            /** s_RemoveMoneySpawn_2037 spawnID */
            spawnID: number;
        }

        /** Represents a s_RemoveMoneySpawn_2037. */
        class s_RemoveMoneySpawn_2037 implements Is_RemoveMoneySpawn_2037 {

            /**
             * Constructs a new s_RemoveMoneySpawn_2037.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_RemoveMoneySpawn_2037);

            /** s_RemoveMoneySpawn_2037 result. */
            public result: number;

            /** s_RemoveMoneySpawn_2037 spawnID. */
            public spawnID: number;

            /**
             * Creates a new s_RemoveMoneySpawn_2037 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_RemoveMoneySpawn_2037 instance
             */
            public static create(properties?: com.msg.Is_RemoveMoneySpawn_2037): com.msg.s_RemoveMoneySpawn_2037;

            /**
             * Encodes the specified s_RemoveMoneySpawn_2037 message. Does not implicitly {@link com.msg.s_RemoveMoneySpawn_2037.verify|verify} messages.
             * @param message s_RemoveMoneySpawn_2037 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_RemoveMoneySpawn_2037, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_RemoveMoneySpawn_2037 message, length delimited. Does not implicitly {@link com.msg.s_RemoveMoneySpawn_2037.verify|verify} messages.
             * @param message s_RemoveMoneySpawn_2037 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_RemoveMoneySpawn_2037, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_RemoveMoneySpawn_2037 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_RemoveMoneySpawn_2037
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_RemoveMoneySpawn_2037;

            /**
             * Decodes a s_RemoveMoneySpawn_2037 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_RemoveMoneySpawn_2037
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_RemoveMoneySpawn_2037;

            /**
             * Verifies a s_RemoveMoneySpawn_2037 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_InvitedByFriend_2040. */
        interface Ic_InvitedByFriend_2040 {

            /** c_InvitedByFriend_2040 openId */
            openId: string;

            /** c_InvitedByFriend_2040 inviterOpenID */
            inviterOpenID: string;
        }

        /** Represents a c_InvitedByFriend_2040. */
        class c_InvitedByFriend_2040 implements Ic_InvitedByFriend_2040 {

            /**
             * Constructs a new c_InvitedByFriend_2040.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_InvitedByFriend_2040);

            /** c_InvitedByFriend_2040 openId. */
            public openId: string;

            /** c_InvitedByFriend_2040 inviterOpenID. */
            public inviterOpenID: string;

            /**
             * Creates a new c_InvitedByFriend_2040 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_InvitedByFriend_2040 instance
             */
            public static create(properties?: com.msg.Ic_InvitedByFriend_2040): com.msg.c_InvitedByFriend_2040;

            /**
             * Encodes the specified c_InvitedByFriend_2040 message. Does not implicitly {@link com.msg.c_InvitedByFriend_2040.verify|verify} messages.
             * @param message c_InvitedByFriend_2040 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_InvitedByFriend_2040, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_InvitedByFriend_2040 message, length delimited. Does not implicitly {@link com.msg.c_InvitedByFriend_2040.verify|verify} messages.
             * @param message c_InvitedByFriend_2040 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_InvitedByFriend_2040, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_InvitedByFriend_2040 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_InvitedByFriend_2040
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_InvitedByFriend_2040;

            /**
             * Decodes a c_InvitedByFriend_2040 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_InvitedByFriend_2040
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_InvitedByFriend_2040;

            /**
             * Verifies a c_InvitedByFriend_2040 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_InvitedByFriend_2041. */
        interface Is_InvitedByFriend_2041 {

            /** s_InvitedByFriend_2041 result */
            result: number;
        }

        /** Represents a s_InvitedByFriend_2041. */
        class s_InvitedByFriend_2041 implements Is_InvitedByFriend_2041 {

            /**
             * Constructs a new s_InvitedByFriend_2041.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_InvitedByFriend_2041);

            /** s_InvitedByFriend_2041 result. */
            public result: number;

            /**
             * Creates a new s_InvitedByFriend_2041 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_InvitedByFriend_2041 instance
             */
            public static create(properties?: com.msg.Is_InvitedByFriend_2041): com.msg.s_InvitedByFriend_2041;

            /**
             * Encodes the specified s_InvitedByFriend_2041 message. Does not implicitly {@link com.msg.s_InvitedByFriend_2041.verify|verify} messages.
             * @param message s_InvitedByFriend_2041 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_InvitedByFriend_2041, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_InvitedByFriend_2041 message, length delimited. Does not implicitly {@link com.msg.s_InvitedByFriend_2041.verify|verify} messages.
             * @param message s_InvitedByFriend_2041 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_InvitedByFriend_2041, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_InvitedByFriend_2041 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_InvitedByFriend_2041
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_InvitedByFriend_2041;

            /**
             * Decodes a s_InvitedByFriend_2041 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_InvitedByFriend_2041
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_InvitedByFriend_2041;

            /**
             * Verifies a s_InvitedByFriend_2041 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_CheckInviteList_2042. */
        interface Ic_CheckInviteList_2042 {

            /** c_CheckInviteList_2042 openId */
            openId: string;
        }

        /** Represents a c_CheckInviteList_2042. */
        class c_CheckInviteList_2042 implements Ic_CheckInviteList_2042 {

            /**
             * Constructs a new c_CheckInviteList_2042.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_CheckInviteList_2042);

            /** c_CheckInviteList_2042 openId. */
            public openId: string;

            /**
             * Creates a new c_CheckInviteList_2042 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_CheckInviteList_2042 instance
             */
            public static create(properties?: com.msg.Ic_CheckInviteList_2042): com.msg.c_CheckInviteList_2042;

            /**
             * Encodes the specified c_CheckInviteList_2042 message. Does not implicitly {@link com.msg.c_CheckInviteList_2042.verify|verify} messages.
             * @param message c_CheckInviteList_2042 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_CheckInviteList_2042, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_CheckInviteList_2042 message, length delimited. Does not implicitly {@link com.msg.c_CheckInviteList_2042.verify|verify} messages.
             * @param message c_CheckInviteList_2042 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_CheckInviteList_2042, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_CheckInviteList_2042 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_CheckInviteList_2042
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_CheckInviteList_2042;

            /**
             * Decodes a c_CheckInviteList_2042 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_CheckInviteList_2042
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_CheckInviteList_2042;

            /**
             * Verifies a c_CheckInviteList_2042 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_CheckInviteList_2043. */
        interface Is_CheckInviteList_2043 {

            /** s_CheckInviteList_2043 inviteList */
            inviteList?: (com.msg.IinviteDetail[]|null);
        }

        /** Represents a s_CheckInviteList_2043. */
        class s_CheckInviteList_2043 implements Is_CheckInviteList_2043 {

            /**
             * Constructs a new s_CheckInviteList_2043.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_CheckInviteList_2043);

            /** s_CheckInviteList_2043 inviteList. */
            public inviteList: com.msg.IinviteDetail[];

            /**
             * Creates a new s_CheckInviteList_2043 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_CheckInviteList_2043 instance
             */
            public static create(properties?: com.msg.Is_CheckInviteList_2043): com.msg.s_CheckInviteList_2043;

            /**
             * Encodes the specified s_CheckInviteList_2043 message. Does not implicitly {@link com.msg.s_CheckInviteList_2043.verify|verify} messages.
             * @param message s_CheckInviteList_2043 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_CheckInviteList_2043, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_CheckInviteList_2043 message, length delimited. Does not implicitly {@link com.msg.s_CheckInviteList_2043.verify|verify} messages.
             * @param message s_CheckInviteList_2043 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_CheckInviteList_2043, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_CheckInviteList_2043 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_CheckInviteList_2043
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_CheckInviteList_2043;

            /**
             * Decodes a s_CheckInviteList_2043 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_CheckInviteList_2043
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_CheckInviteList_2043;

            /**
             * Verifies a s_CheckInviteList_2043 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_GetInviteReward_2044. */
        interface Ic_GetInviteReward_2044 {

            /** c_GetInviteReward_2044 openId */
            openId: string;

            /** c_GetInviteReward_2044 friendOpenId */
            friendOpenId: string;

            /** c_GetInviteReward_2044 rewardType */
            rewardType: number;
        }

        /** Represents a c_GetInviteReward_2044. */
        class c_GetInviteReward_2044 implements Ic_GetInviteReward_2044 {

            /**
             * Constructs a new c_GetInviteReward_2044.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_GetInviteReward_2044);

            /** c_GetInviteReward_2044 openId. */
            public openId: string;

            /** c_GetInviteReward_2044 friendOpenId. */
            public friendOpenId: string;

            /** c_GetInviteReward_2044 rewardType. */
            public rewardType: number;

            /**
             * Creates a new c_GetInviteReward_2044 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_GetInviteReward_2044 instance
             */
            public static create(properties?: com.msg.Ic_GetInviteReward_2044): com.msg.c_GetInviteReward_2044;

            /**
             * Encodes the specified c_GetInviteReward_2044 message. Does not implicitly {@link com.msg.c_GetInviteReward_2044.verify|verify} messages.
             * @param message c_GetInviteReward_2044 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_GetInviteReward_2044, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_GetInviteReward_2044 message, length delimited. Does not implicitly {@link com.msg.c_GetInviteReward_2044.verify|verify} messages.
             * @param message c_GetInviteReward_2044 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_GetInviteReward_2044, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_GetInviteReward_2044 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_GetInviteReward_2044
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_GetInviteReward_2044;

            /**
             * Decodes a c_GetInviteReward_2044 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_GetInviteReward_2044
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_GetInviteReward_2044;

            /**
             * Verifies a c_GetInviteReward_2044 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_GetInviteReward_2045. */
        interface Is_GetInviteReward_2045 {

            /** s_GetInviteReward_2045 result */
            result: number;

            /** s_GetInviteReward_2045 rewardInfo */
            rewardInfo?: (com.msg.IinviteDetail|null);
        }

        /** Represents a s_GetInviteReward_2045. */
        class s_GetInviteReward_2045 implements Is_GetInviteReward_2045 {

            /**
             * Constructs a new s_GetInviteReward_2045.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_GetInviteReward_2045);

            /** s_GetInviteReward_2045 result. */
            public result: number;

            /** s_GetInviteReward_2045 rewardInfo. */
            public rewardInfo?: (com.msg.IinviteDetail|null);

            /**
             * Creates a new s_GetInviteReward_2045 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_GetInviteReward_2045 instance
             */
            public static create(properties?: com.msg.Is_GetInviteReward_2045): com.msg.s_GetInviteReward_2045;

            /**
             * Encodes the specified s_GetInviteReward_2045 message. Does not implicitly {@link com.msg.s_GetInviteReward_2045.verify|verify} messages.
             * @param message s_GetInviteReward_2045 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_GetInviteReward_2045, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_GetInviteReward_2045 message, length delimited. Does not implicitly {@link com.msg.s_GetInviteReward_2045.verify|verify} messages.
             * @param message s_GetInviteReward_2045 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_GetInviteReward_2045, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_GetInviteReward_2045 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_GetInviteReward_2045
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_GetInviteReward_2045;

            /**
             * Decodes a s_GetInviteReward_2045 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_GetInviteReward_2045
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_GetInviteReward_2045;

            /**
             * Verifies a s_GetInviteReward_2045 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_GetInviteVerifyReward_2046. */
        interface Ic_GetInviteVerifyReward_2046 {

            /** c_GetInviteVerifyReward_2046 openId */
            openId: string;

            /** c_GetInviteVerifyReward_2046 friendOpenId */
            friendOpenId: string;

            /** c_GetInviteVerifyReward_2046 rewardType */
            rewardType: number;
        }

        /** Represents a c_GetInviteVerifyReward_2046. */
        class c_GetInviteVerifyReward_2046 implements Ic_GetInviteVerifyReward_2046 {

            /**
             * Constructs a new c_GetInviteVerifyReward_2046.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_GetInviteVerifyReward_2046);

            /** c_GetInviteVerifyReward_2046 openId. */
            public openId: string;

            /** c_GetInviteVerifyReward_2046 friendOpenId. */
            public friendOpenId: string;

            /** c_GetInviteVerifyReward_2046 rewardType. */
            public rewardType: number;

            /**
             * Creates a new c_GetInviteVerifyReward_2046 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_GetInviteVerifyReward_2046 instance
             */
            public static create(properties?: com.msg.Ic_GetInviteVerifyReward_2046): com.msg.c_GetInviteVerifyReward_2046;

            /**
             * Encodes the specified c_GetInviteVerifyReward_2046 message. Does not implicitly {@link com.msg.c_GetInviteVerifyReward_2046.verify|verify} messages.
             * @param message c_GetInviteVerifyReward_2046 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_GetInviteVerifyReward_2046, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_GetInviteVerifyReward_2046 message, length delimited. Does not implicitly {@link com.msg.c_GetInviteVerifyReward_2046.verify|verify} messages.
             * @param message c_GetInviteVerifyReward_2046 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_GetInviteVerifyReward_2046, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_GetInviteVerifyReward_2046 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_GetInviteVerifyReward_2046
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_GetInviteVerifyReward_2046;

            /**
             * Decodes a c_GetInviteVerifyReward_2046 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_GetInviteVerifyReward_2046
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_GetInviteVerifyReward_2046;

            /**
             * Verifies a c_GetInviteVerifyReward_2046 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_GetInviteVerifyReward_2047. */
        interface Is_GetInviteVerifyReward_2047 {

            /** s_GetInviteVerifyReward_2047 result */
            result: number;

            /** s_GetInviteVerifyReward_2047 firendInfo */
            firendInfo?: (com.msg.IinviteDetail|null);

            /** s_GetInviteVerifyReward_2047 rewardNum */
            rewardNum?: (number|null);
        }

        /** Represents a s_GetInviteVerifyReward_2047. */
        class s_GetInviteVerifyReward_2047 implements Is_GetInviteVerifyReward_2047 {

            /**
             * Constructs a new s_GetInviteVerifyReward_2047.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_GetInviteVerifyReward_2047);

            /** s_GetInviteVerifyReward_2047 result. */
            public result: number;

            /** s_GetInviteVerifyReward_2047 firendInfo. */
            public firendInfo?: (com.msg.IinviteDetail|null);

            /** s_GetInviteVerifyReward_2047 rewardNum. */
            public rewardNum: number;

            /**
             * Creates a new s_GetInviteVerifyReward_2047 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_GetInviteVerifyReward_2047 instance
             */
            public static create(properties?: com.msg.Is_GetInviteVerifyReward_2047): com.msg.s_GetInviteVerifyReward_2047;

            /**
             * Encodes the specified s_GetInviteVerifyReward_2047 message. Does not implicitly {@link com.msg.s_GetInviteVerifyReward_2047.verify|verify} messages.
             * @param message s_GetInviteVerifyReward_2047 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_GetInviteVerifyReward_2047, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_GetInviteVerifyReward_2047 message, length delimited. Does not implicitly {@link com.msg.s_GetInviteVerifyReward_2047.verify|verify} messages.
             * @param message s_GetInviteVerifyReward_2047 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_GetInviteVerifyReward_2047, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_GetInviteVerifyReward_2047 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_GetInviteVerifyReward_2047
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_GetInviteVerifyReward_2047;

            /**
             * Decodes a s_GetInviteVerifyReward_2047 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_GetInviteVerifyReward_2047
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_GetInviteVerifyReward_2047;

            /**
             * Verifies a s_GetInviteVerifyReward_2047 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_GainPointByTime_2050. */
        interface Ic_GainPointByTime_2050 {

            /** c_GainPointByTime_2050 openId */
            openId: string;
        }

        /** Represents a c_GainPointByTime_2050. */
        class c_GainPointByTime_2050 implements Ic_GainPointByTime_2050 {

            /**
             * Constructs a new c_GainPointByTime_2050.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_GainPointByTime_2050);

            /** c_GainPointByTime_2050 openId. */
            public openId: string;

            /**
             * Creates a new c_GainPointByTime_2050 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_GainPointByTime_2050 instance
             */
            public static create(properties?: com.msg.Ic_GainPointByTime_2050): com.msg.c_GainPointByTime_2050;

            /**
             * Encodes the specified c_GainPointByTime_2050 message. Does not implicitly {@link com.msg.c_GainPointByTime_2050.verify|verify} messages.
             * @param message c_GainPointByTime_2050 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_GainPointByTime_2050, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_GainPointByTime_2050 message, length delimited. Does not implicitly {@link com.msg.c_GainPointByTime_2050.verify|verify} messages.
             * @param message c_GainPointByTime_2050 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_GainPointByTime_2050, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_GainPointByTime_2050 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_GainPointByTime_2050
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_GainPointByTime_2050;

            /**
             * Decodes a c_GainPointByTime_2050 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_GainPointByTime_2050
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_GainPointByTime_2050;

            /**
             * Verifies a c_GainPointByTime_2050 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_GainPointByTime_2051. */
        interface Is_GainPointByTime_2051 {

            /** s_GainPointByTime_2051 result */
            result: number;

            /** s_GainPointByTime_2051 moneyInfo */
            moneyInfo?: (com.msg.ImoneyInfo|null);
        }

        /** Represents a s_GainPointByTime_2051. */
        class s_GainPointByTime_2051 implements Is_GainPointByTime_2051 {

            /**
             * Constructs a new s_GainPointByTime_2051.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_GainPointByTime_2051);

            /** s_GainPointByTime_2051 result. */
            public result: number;

            /** s_GainPointByTime_2051 moneyInfo. */
            public moneyInfo?: (com.msg.ImoneyInfo|null);

            /**
             * Creates a new s_GainPointByTime_2051 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_GainPointByTime_2051 instance
             */
            public static create(properties?: com.msg.Is_GainPointByTime_2051): com.msg.s_GainPointByTime_2051;

            /**
             * Encodes the specified s_GainPointByTime_2051 message. Does not implicitly {@link com.msg.s_GainPointByTime_2051.verify|verify} messages.
             * @param message s_GainPointByTime_2051 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_GainPointByTime_2051, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_GainPointByTime_2051 message, length delimited. Does not implicitly {@link com.msg.s_GainPointByTime_2051.verify|verify} messages.
             * @param message s_GainPointByTime_2051 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_GainPointByTime_2051, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_GainPointByTime_2051 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_GainPointByTime_2051
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_GainPointByTime_2051;

            /**
             * Decodes a s_GainPointByTime_2051 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_GainPointByTime_2051
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_GainPointByTime_2051;

            /**
             * Verifies a s_GainPointByTime_2051 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_GainPointByMatch_2052. */
        interface Ic_GainPointByMatch_2052 {

            /** c_GainPointByMatch_2052 openId */
            openId: string;

            /** c_GainPointByMatch_2052 curLevel */
            curLevel: number;
        }

        /** Represents a c_GainPointByMatch_2052. */
        class c_GainPointByMatch_2052 implements Ic_GainPointByMatch_2052 {

            /**
             * Constructs a new c_GainPointByMatch_2052.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_GainPointByMatch_2052);

            /** c_GainPointByMatch_2052 openId. */
            public openId: string;

            /** c_GainPointByMatch_2052 curLevel. */
            public curLevel: number;

            /**
             * Creates a new c_GainPointByMatch_2052 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_GainPointByMatch_2052 instance
             */
            public static create(properties?: com.msg.Ic_GainPointByMatch_2052): com.msg.c_GainPointByMatch_2052;

            /**
             * Encodes the specified c_GainPointByMatch_2052 message. Does not implicitly {@link com.msg.c_GainPointByMatch_2052.verify|verify} messages.
             * @param message c_GainPointByMatch_2052 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_GainPointByMatch_2052, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_GainPointByMatch_2052 message, length delimited. Does not implicitly {@link com.msg.c_GainPointByMatch_2052.verify|verify} messages.
             * @param message c_GainPointByMatch_2052 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_GainPointByMatch_2052, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_GainPointByMatch_2052 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_GainPointByMatch_2052
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_GainPointByMatch_2052;

            /**
             * Decodes a c_GainPointByMatch_2052 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_GainPointByMatch_2052
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_GainPointByMatch_2052;

            /**
             * Verifies a c_GainPointByMatch_2052 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_GainPointByMatch_2053. */
        interface Is_GainPointByMatch_2053 {

            /** s_GainPointByMatch_2053 result */
            result: number;

            /** s_GainPointByMatch_2053 pointNum */
            pointNum?: (number|null);
        }

        /** Represents a s_GainPointByMatch_2053. */
        class s_GainPointByMatch_2053 implements Is_GainPointByMatch_2053 {

            /**
             * Constructs a new s_GainPointByMatch_2053.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_GainPointByMatch_2053);

            /** s_GainPointByMatch_2053 result. */
            public result: number;

            /** s_GainPointByMatch_2053 pointNum. */
            public pointNum: number;

            /**
             * Creates a new s_GainPointByMatch_2053 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_GainPointByMatch_2053 instance
             */
            public static create(properties?: com.msg.Is_GainPointByMatch_2053): com.msg.s_GainPointByMatch_2053;

            /**
             * Encodes the specified s_GainPointByMatch_2053 message. Does not implicitly {@link com.msg.s_GainPointByMatch_2053.verify|verify} messages.
             * @param message s_GainPointByMatch_2053 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_GainPointByMatch_2053, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_GainPointByMatch_2053 message, length delimited. Does not implicitly {@link com.msg.s_GainPointByMatch_2053.verify|verify} messages.
             * @param message s_GainPointByMatch_2053 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_GainPointByMatch_2053, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_GainPointByMatch_2053 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_GainPointByMatch_2053
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_GainPointByMatch_2053;

            /**
             * Decodes a s_GainPointByMatch_2053 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_GainPointByMatch_2053
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_GainPointByMatch_2053;

            /**
             * Verifies a s_GainPointByMatch_2053 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_MatchComplete_2100. */
        interface Ic_MatchComplete_2100 {

            /** c_MatchComplete_2100 openId */
            openId: string;

            /** c_MatchComplete_2100 completedLevel */
            completedLevel: number;

            /** c_MatchComplete_2100 goldReward */
            goldReward: number;
        }

        /** Represents a c_MatchComplete_2100. */
        class c_MatchComplete_2100 implements Ic_MatchComplete_2100 {

            /**
             * Constructs a new c_MatchComplete_2100.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_MatchComplete_2100);

            /** c_MatchComplete_2100 openId. */
            public openId: string;

            /** c_MatchComplete_2100 completedLevel. */
            public completedLevel: number;

            /** c_MatchComplete_2100 goldReward. */
            public goldReward: number;

            /**
             * Creates a new c_MatchComplete_2100 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_MatchComplete_2100 instance
             */
            public static create(properties?: com.msg.Ic_MatchComplete_2100): com.msg.c_MatchComplete_2100;

            /**
             * Encodes the specified c_MatchComplete_2100 message. Does not implicitly {@link com.msg.c_MatchComplete_2100.verify|verify} messages.
             * @param message c_MatchComplete_2100 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_MatchComplete_2100, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_MatchComplete_2100 message, length delimited. Does not implicitly {@link com.msg.c_MatchComplete_2100.verify|verify} messages.
             * @param message c_MatchComplete_2100 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_MatchComplete_2100, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_MatchComplete_2100 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_MatchComplete_2100;

            /**
             * Decodes a c_MatchComplete_2100 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_MatchComplete_2100;

            /**
             * Verifies a c_MatchComplete_2100 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_MatchComplete_2100. */
        interface Is_MatchComplete_2100 {

            /** s_MatchComplete_2100 goldReward */
            goldReward: number;

            /** s_MatchComplete_2100 latestUnCompletedLevelID */
            latestUnCompletedLevelID: number;
        }

        /** Represents a s_MatchComplete_2100. */
        class s_MatchComplete_2100 implements Is_MatchComplete_2100 {

            /**
             * Constructs a new s_MatchComplete_2100.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_MatchComplete_2100);

            /** s_MatchComplete_2100 goldReward. */
            public goldReward: number;

            /** s_MatchComplete_2100 latestUnCompletedLevelID. */
            public latestUnCompletedLevelID: number;

            /**
             * Creates a new s_MatchComplete_2100 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_MatchComplete_2100 instance
             */
            public static create(properties?: com.msg.Is_MatchComplete_2100): com.msg.s_MatchComplete_2100;

            /**
             * Encodes the specified s_MatchComplete_2100 message. Does not implicitly {@link com.msg.s_MatchComplete_2100.verify|verify} messages.
             * @param message s_MatchComplete_2100 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_MatchComplete_2100, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_MatchComplete_2100 message, length delimited. Does not implicitly {@link com.msg.s_MatchComplete_2100.verify|verify} messages.
             * @param message s_MatchComplete_2100 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_MatchComplete_2100, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_MatchComplete_2100 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_MatchComplete_2100;

            /**
             * Decodes a s_MatchComplete_2100 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_MatchComplete_2100
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_MatchComplete_2100;

            /**
             * Verifies a s_MatchComplete_2100 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_MatchStart_2101. */
        interface Ic_MatchStart_2101 {

            /** c_MatchStart_2101 openId */
            openId: string;
        }

        /** Represents a c_MatchStart_2101. */
        class c_MatchStart_2101 implements Ic_MatchStart_2101 {

            /**
             * Constructs a new c_MatchStart_2101.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_MatchStart_2101);

            /** c_MatchStart_2101 openId. */
            public openId: string;

            /**
             * Creates a new c_MatchStart_2101 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_MatchStart_2101 instance
             */
            public static create(properties?: com.msg.Ic_MatchStart_2101): com.msg.c_MatchStart_2101;

            /**
             * Encodes the specified c_MatchStart_2101 message. Does not implicitly {@link com.msg.c_MatchStart_2101.verify|verify} messages.
             * @param message c_MatchStart_2101 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_MatchStart_2101, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_MatchStart_2101 message, length delimited. Does not implicitly {@link com.msg.c_MatchStart_2101.verify|verify} messages.
             * @param message c_MatchStart_2101 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_MatchStart_2101, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_MatchStart_2101 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_MatchStart_2101;

            /**
             * Decodes a c_MatchStart_2101 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_MatchStart_2101;

            /**
             * Verifies a c_MatchStart_2101 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_MatchStart_2101. */
        interface Is_MatchStart_2101 {

            /** s_MatchStart_2101 result */
            result: number;

            /** s_MatchStart_2101 curPoint */
            curPoint: number;

            /** s_MatchStart_2101 latestPointRefreshTime */
            latestPointRefreshTime?: (number|Long|null);
        }

        /** Represents a s_MatchStart_2101. */
        class s_MatchStart_2101 implements Is_MatchStart_2101 {

            /**
             * Constructs a new s_MatchStart_2101.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_MatchStart_2101);

            /** s_MatchStart_2101 result. */
            public result: number;

            /** s_MatchStart_2101 curPoint. */
            public curPoint: number;

            /** s_MatchStart_2101 latestPointRefreshTime. */
            public latestPointRefreshTime: (number|Long);

            /**
             * Creates a new s_MatchStart_2101 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_MatchStart_2101 instance
             */
            public static create(properties?: com.msg.Is_MatchStart_2101): com.msg.s_MatchStart_2101;

            /**
             * Encodes the specified s_MatchStart_2101 message. Does not implicitly {@link com.msg.s_MatchStart_2101.verify|verify} messages.
             * @param message s_MatchStart_2101 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_MatchStart_2101, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_MatchStart_2101 message, length delimited. Does not implicitly {@link com.msg.s_MatchStart_2101.verify|verify} messages.
             * @param message s_MatchStart_2101 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_MatchStart_2101, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_MatchStart_2101 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_MatchStart_2101;

            /**
             * Decodes a s_MatchStart_2101 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_MatchStart_2101
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_MatchStart_2101;

            /**
             * Verifies a s_MatchStart_2101 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_WeaponEvolution_2014. */
        interface Ic_WeaponEvolution_2014 {

            /** c_WeaponEvolution_2014 openId */
            openId: string;

            /** c_WeaponEvolution_2014 weaponID */
            weaponID: number;

            /** c_WeaponEvolution_2014 curEvolutionLvl */
            curEvolutionLvl: number;

            /** c_WeaponEvolution_2014 costGold */
            costGold: number;
        }

        /** Represents a c_WeaponEvolution_2014. */
        class c_WeaponEvolution_2014 implements Ic_WeaponEvolution_2014 {

            /**
             * Constructs a new c_WeaponEvolution_2014.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_WeaponEvolution_2014);

            /** c_WeaponEvolution_2014 openId. */
            public openId: string;

            /** c_WeaponEvolution_2014 weaponID. */
            public weaponID: number;

            /** c_WeaponEvolution_2014 curEvolutionLvl. */
            public curEvolutionLvl: number;

            /** c_WeaponEvolution_2014 costGold. */
            public costGold: number;

            /**
             * Creates a new c_WeaponEvolution_2014 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_WeaponEvolution_2014 instance
             */
            public static create(properties?: com.msg.Ic_WeaponEvolution_2014): com.msg.c_WeaponEvolution_2014;

            /**
             * Encodes the specified c_WeaponEvolution_2014 message. Does not implicitly {@link com.msg.c_WeaponEvolution_2014.verify|verify} messages.
             * @param message c_WeaponEvolution_2014 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_WeaponEvolution_2014, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_WeaponEvolution_2014 message, length delimited. Does not implicitly {@link com.msg.c_WeaponEvolution_2014.verify|verify} messages.
             * @param message c_WeaponEvolution_2014 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_WeaponEvolution_2014, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_WeaponEvolution_2014 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_WeaponEvolution_2014
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_WeaponEvolution_2014;

            /**
             * Decodes a c_WeaponEvolution_2014 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_WeaponEvolution_2014
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_WeaponEvolution_2014;

            /**
             * Verifies a c_WeaponEvolution_2014 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_WeaponEvolution_2015. */
        interface Is_WeaponEvolution_2015 {

            /** s_WeaponEvolution_2015 result */
            result: number;

            /** s_WeaponEvolution_2015 weaponID */
            weaponID: number;

            /** s_WeaponEvolution_2015 newEvolutionLvl */
            newEvolutionLvl: number;

            /** s_WeaponEvolution_2015 totalGold */
            totalGold: number;
        }

        /** Represents a s_WeaponEvolution_2015. */
        class s_WeaponEvolution_2015 implements Is_WeaponEvolution_2015 {

            /**
             * Constructs a new s_WeaponEvolution_2015.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_WeaponEvolution_2015);

            /** s_WeaponEvolution_2015 result. */
            public result: number;

            /** s_WeaponEvolution_2015 weaponID. */
            public weaponID: number;

            /** s_WeaponEvolution_2015 newEvolutionLvl. */
            public newEvolutionLvl: number;

            /** s_WeaponEvolution_2015 totalGold. */
            public totalGold: number;

            /**
             * Creates a new s_WeaponEvolution_2015 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_WeaponEvolution_2015 instance
             */
            public static create(properties?: com.msg.Is_WeaponEvolution_2015): com.msg.s_WeaponEvolution_2015;

            /**
             * Encodes the specified s_WeaponEvolution_2015 message. Does not implicitly {@link com.msg.s_WeaponEvolution_2015.verify|verify} messages.
             * @param message s_WeaponEvolution_2015 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_WeaponEvolution_2015, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_WeaponEvolution_2015 message, length delimited. Does not implicitly {@link com.msg.s_WeaponEvolution_2015.verify|verify} messages.
             * @param message s_WeaponEvolution_2015 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_WeaponEvolution_2015, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_WeaponEvolution_2015 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_WeaponEvolution_2015
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_WeaponEvolution_2015;

            /**
             * Decodes a s_WeaponEvolution_2015 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_WeaponEvolution_2015
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_WeaponEvolution_2015;

            /**
             * Verifies a s_WeaponEvolution_2015 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_GetMessageVerifyCode_2200. */
        interface Ic_GetMessageVerifyCode_2200 {

            /** c_GetMessageVerifyCode_2200 phoneNumber */
            phoneNumber: (number|Long);
        }

        /** Represents a c_GetMessageVerifyCode_2200. */
        class c_GetMessageVerifyCode_2200 implements Ic_GetMessageVerifyCode_2200 {

            /**
             * Constructs a new c_GetMessageVerifyCode_2200.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_GetMessageVerifyCode_2200);

            /** c_GetMessageVerifyCode_2200 phoneNumber. */
            public phoneNumber: (number|Long);

            /**
             * Creates a new c_GetMessageVerifyCode_2200 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_GetMessageVerifyCode_2200 instance
             */
            public static create(properties?: com.msg.Ic_GetMessageVerifyCode_2200): com.msg.c_GetMessageVerifyCode_2200;

            /**
             * Encodes the specified c_GetMessageVerifyCode_2200 message. Does not implicitly {@link com.msg.c_GetMessageVerifyCode_2200.verify|verify} messages.
             * @param message c_GetMessageVerifyCode_2200 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_GetMessageVerifyCode_2200, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_GetMessageVerifyCode_2200 message, length delimited. Does not implicitly {@link com.msg.c_GetMessageVerifyCode_2200.verify|verify} messages.
             * @param message c_GetMessageVerifyCode_2200 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_GetMessageVerifyCode_2200, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_GetMessageVerifyCode_2200 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_GetMessageVerifyCode_2200
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_GetMessageVerifyCode_2200;

            /**
             * Decodes a c_GetMessageVerifyCode_2200 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_GetMessageVerifyCode_2200
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_GetMessageVerifyCode_2200;

            /**
             * Verifies a c_GetMessageVerifyCode_2200 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_GetMessageVerifyCode_2201. */
        interface Is_GetMessageVerifyCode_2201 {

            /** s_GetMessageVerifyCode_2201 result */
            result: number;
        }

        /** Represents a s_GetMessageVerifyCode_2201. */
        class s_GetMessageVerifyCode_2201 implements Is_GetMessageVerifyCode_2201 {

            /**
             * Constructs a new s_GetMessageVerifyCode_2201.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_GetMessageVerifyCode_2201);

            /** s_GetMessageVerifyCode_2201 result. */
            public result: number;

            /**
             * Creates a new s_GetMessageVerifyCode_2201 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_GetMessageVerifyCode_2201 instance
             */
            public static create(properties?: com.msg.Is_GetMessageVerifyCode_2201): com.msg.s_GetMessageVerifyCode_2201;

            /**
             * Encodes the specified s_GetMessageVerifyCode_2201 message. Does not implicitly {@link com.msg.s_GetMessageVerifyCode_2201.verify|verify} messages.
             * @param message s_GetMessageVerifyCode_2201 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_GetMessageVerifyCode_2201, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_GetMessageVerifyCode_2201 message, length delimited. Does not implicitly {@link com.msg.s_GetMessageVerifyCode_2201.verify|verify} messages.
             * @param message s_GetMessageVerifyCode_2201 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_GetMessageVerifyCode_2201, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_GetMessageVerifyCode_2201 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_GetMessageVerifyCode_2201
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_GetMessageVerifyCode_2201;

            /**
             * Decodes a s_GetMessageVerifyCode_2201 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_GetMessageVerifyCode_2201
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_GetMessageVerifyCode_2201;

            /**
             * Verifies a s_GetMessageVerifyCode_2201 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_CheckPhoneVerify_2202. */
        interface Ic_CheckPhoneVerify_2202 {

            /** c_CheckPhoneVerify_2202 openId */
            openId: string;

            /** c_CheckPhoneVerify_2202 phoneNumber */
            phoneNumber: (number|Long);

            /** c_CheckPhoneVerify_2202 verifyCode */
            verifyCode: number;
        }

        /** Represents a c_CheckPhoneVerify_2202. */
        class c_CheckPhoneVerify_2202 implements Ic_CheckPhoneVerify_2202 {

            /**
             * Constructs a new c_CheckPhoneVerify_2202.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_CheckPhoneVerify_2202);

            /** c_CheckPhoneVerify_2202 openId. */
            public openId: string;

            /** c_CheckPhoneVerify_2202 phoneNumber. */
            public phoneNumber: (number|Long);

            /** c_CheckPhoneVerify_2202 verifyCode. */
            public verifyCode: number;

            /**
             * Creates a new c_CheckPhoneVerify_2202 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_CheckPhoneVerify_2202 instance
             */
            public static create(properties?: com.msg.Ic_CheckPhoneVerify_2202): com.msg.c_CheckPhoneVerify_2202;

            /**
             * Encodes the specified c_CheckPhoneVerify_2202 message. Does not implicitly {@link com.msg.c_CheckPhoneVerify_2202.verify|verify} messages.
             * @param message c_CheckPhoneVerify_2202 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_CheckPhoneVerify_2202, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_CheckPhoneVerify_2202 message, length delimited. Does not implicitly {@link com.msg.c_CheckPhoneVerify_2202.verify|verify} messages.
             * @param message c_CheckPhoneVerify_2202 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_CheckPhoneVerify_2202, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_CheckPhoneVerify_2202 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_CheckPhoneVerify_2202
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_CheckPhoneVerify_2202;

            /**
             * Decodes a c_CheckPhoneVerify_2202 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_CheckPhoneVerify_2202
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_CheckPhoneVerify_2202;

            /**
             * Verifies a c_CheckPhoneVerify_2202 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_CheckPhoneVerify_2203. */
        interface Is_CheckPhoneVerify_2203 {

            /** s_CheckPhoneVerify_2203 result */
            result: number;

            /** s_CheckPhoneVerify_2203 verifyReward */
            verifyReward?: (com.msg.IrewardInfo|null);
        }

        /** Represents a s_CheckPhoneVerify_2203. */
        class s_CheckPhoneVerify_2203 implements Is_CheckPhoneVerify_2203 {

            /**
             * Constructs a new s_CheckPhoneVerify_2203.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_CheckPhoneVerify_2203);

            /** s_CheckPhoneVerify_2203 result. */
            public result: number;

            /** s_CheckPhoneVerify_2203 verifyReward. */
            public verifyReward?: (com.msg.IrewardInfo|null);

            /**
             * Creates a new s_CheckPhoneVerify_2203 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_CheckPhoneVerify_2203 instance
             */
            public static create(properties?: com.msg.Is_CheckPhoneVerify_2203): com.msg.s_CheckPhoneVerify_2203;

            /**
             * Encodes the specified s_CheckPhoneVerify_2203 message. Does not implicitly {@link com.msg.s_CheckPhoneVerify_2203.verify|verify} messages.
             * @param message s_CheckPhoneVerify_2203 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_CheckPhoneVerify_2203, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_CheckPhoneVerify_2203 message, length delimited. Does not implicitly {@link com.msg.s_CheckPhoneVerify_2203.verify|verify} messages.
             * @param message s_CheckPhoneVerify_2203 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_CheckPhoneVerify_2203, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_CheckPhoneVerify_2203 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_CheckPhoneVerify_2203
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_CheckPhoneVerify_2203;

            /**
             * Decodes a s_CheckPhoneVerify_2203 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_CheckPhoneVerify_2203
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_CheckPhoneVerify_2203;

            /**
             * Verifies a s_CheckPhoneVerify_2203 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_Lottery_2300. */
        interface Ic_Lottery_2300 {

            /** c_Lottery_2300 openId */
            openId: string;
        }

        /** Represents a c_Lottery_2300. */
        class c_Lottery_2300 implements Ic_Lottery_2300 {

            /**
             * Constructs a new c_Lottery_2300.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_Lottery_2300);

            /** c_Lottery_2300 openId. */
            public openId: string;

            /**
             * Creates a new c_Lottery_2300 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_Lottery_2300 instance
             */
            public static create(properties?: com.msg.Ic_Lottery_2300): com.msg.c_Lottery_2300;

            /**
             * Encodes the specified c_Lottery_2300 message. Does not implicitly {@link com.msg.c_Lottery_2300.verify|verify} messages.
             * @param message c_Lottery_2300 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_Lottery_2300, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_Lottery_2300 message, length delimited. Does not implicitly {@link com.msg.c_Lottery_2300.verify|verify} messages.
             * @param message c_Lottery_2300 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_Lottery_2300, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_Lottery_2300 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_Lottery_2300
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_Lottery_2300;

            /**
             * Decodes a c_Lottery_2300 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_Lottery_2300
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_Lottery_2300;

            /**
             * Verifies a c_Lottery_2300 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_Lottery_2301. */
        interface Is_Lottery_2301 {

            /** s_Lottery_2301 result */
            result: number;

            /** s_Lottery_2301 rewardConfigID */
            rewardConfigID?: (number|null);
        }

        /** Represents a s_Lottery_2301. */
        class s_Lottery_2301 implements Is_Lottery_2301 {

            /**
             * Constructs a new s_Lottery_2301.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_Lottery_2301);

            /** s_Lottery_2301 result. */
            public result: number;

            /** s_Lottery_2301 rewardConfigID. */
            public rewardConfigID: number;

            /**
             * Creates a new s_Lottery_2301 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_Lottery_2301 instance
             */
            public static create(properties?: com.msg.Is_Lottery_2301): com.msg.s_Lottery_2301;

            /**
             * Encodes the specified s_Lottery_2301 message. Does not implicitly {@link com.msg.s_Lottery_2301.verify|verify} messages.
             * @param message s_Lottery_2301 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_Lottery_2301, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_Lottery_2301 message, length delimited. Does not implicitly {@link com.msg.s_Lottery_2301.verify|verify} messages.
             * @param message s_Lottery_2301 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_Lottery_2301, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_Lottery_2301 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_Lottery_2301
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_Lottery_2301;

            /**
             * Decodes a s_Lottery_2301 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_Lottery_2301
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_Lottery_2301;

            /**
             * Verifies a s_Lottery_2301 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a c_CheckLotteryRewardHistroy_2302. */
        interface Ic_CheckLotteryRewardHistroy_2302 {

            /** c_CheckLotteryRewardHistroy_2302 openId */
            openId: string;

            /** c_CheckLotteryRewardHistroy_2302 pageIndex */
            pageIndex: number;

            /** c_CheckLotteryRewardHistroy_2302 histCount */
            histCount: number;
        }

        /** Represents a c_CheckLotteryRewardHistroy_2302. */
        class c_CheckLotteryRewardHistroy_2302 implements Ic_CheckLotteryRewardHistroy_2302 {

            /**
             * Constructs a new c_CheckLotteryRewardHistroy_2302.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Ic_CheckLotteryRewardHistroy_2302);

            /** c_CheckLotteryRewardHistroy_2302 openId. */
            public openId: string;

            /** c_CheckLotteryRewardHistroy_2302 pageIndex. */
            public pageIndex: number;

            /** c_CheckLotteryRewardHistroy_2302 histCount. */
            public histCount: number;

            /**
             * Creates a new c_CheckLotteryRewardHistroy_2302 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns c_CheckLotteryRewardHistroy_2302 instance
             */
            public static create(properties?: com.msg.Ic_CheckLotteryRewardHistroy_2302): com.msg.c_CheckLotteryRewardHistroy_2302;

            /**
             * Encodes the specified c_CheckLotteryRewardHistroy_2302 message. Does not implicitly {@link com.msg.c_CheckLotteryRewardHistroy_2302.verify|verify} messages.
             * @param message c_CheckLotteryRewardHistroy_2302 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Ic_CheckLotteryRewardHistroy_2302, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified c_CheckLotteryRewardHistroy_2302 message, length delimited. Does not implicitly {@link com.msg.c_CheckLotteryRewardHistroy_2302.verify|verify} messages.
             * @param message c_CheckLotteryRewardHistroy_2302 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Ic_CheckLotteryRewardHistroy_2302, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a c_CheckLotteryRewardHistroy_2302 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns c_CheckLotteryRewardHistroy_2302
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.c_CheckLotteryRewardHistroy_2302;

            /**
             * Decodes a c_CheckLotteryRewardHistroy_2302 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns c_CheckLotteryRewardHistroy_2302
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.c_CheckLotteryRewardHistroy_2302;

            /**
             * Verifies a c_CheckLotteryRewardHistroy_2302 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a s_CheckLotteryRewardHistroy_2303. */
        interface Is_CheckLotteryRewardHistroy_2303 {

            /** s_CheckLotteryRewardHistroy_2303 result */
            result: number;

            /** s_CheckLotteryRewardHistroy_2303 rewardHistList */
            rewardHistList?: (com.msg.IlotteryRewardInfo[]|null);
        }

        /** Represents a s_CheckLotteryRewardHistroy_2303. */
        class s_CheckLotteryRewardHistroy_2303 implements Is_CheckLotteryRewardHistroy_2303 {

            /**
             * Constructs a new s_CheckLotteryRewardHistroy_2303.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.Is_CheckLotteryRewardHistroy_2303);

            /** s_CheckLotteryRewardHistroy_2303 result. */
            public result: number;

            /** s_CheckLotteryRewardHistroy_2303 rewardHistList. */
            public rewardHistList: com.msg.IlotteryRewardInfo[];

            /**
             * Creates a new s_CheckLotteryRewardHistroy_2303 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns s_CheckLotteryRewardHistroy_2303 instance
             */
            public static create(properties?: com.msg.Is_CheckLotteryRewardHistroy_2303): com.msg.s_CheckLotteryRewardHistroy_2303;

            /**
             * Encodes the specified s_CheckLotteryRewardHistroy_2303 message. Does not implicitly {@link com.msg.s_CheckLotteryRewardHistroy_2303.verify|verify} messages.
             * @param message s_CheckLotteryRewardHistroy_2303 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.Is_CheckLotteryRewardHistroy_2303, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified s_CheckLotteryRewardHistroy_2303 message, length delimited. Does not implicitly {@link com.msg.s_CheckLotteryRewardHistroy_2303.verify|verify} messages.
             * @param message s_CheckLotteryRewardHistroy_2303 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.Is_CheckLotteryRewardHistroy_2303, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a s_CheckLotteryRewardHistroy_2303 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns s_CheckLotteryRewardHistroy_2303
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.s_CheckLotteryRewardHistroy_2303;

            /**
             * Decodes a s_CheckLotteryRewardHistroy_2303 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns s_CheckLotteryRewardHistroy_2303
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.s_CheckLotteryRewardHistroy_2303;

            /**
             * Verifies a s_CheckLotteryRewardHistroy_2303 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a wxInfo. */
        interface IwxInfo {

            /** wxInfo nickName */
            nickName: string;

            /** wxInfo imageUrl */
            imageUrl: string;
        }

        /** Represents a wxInfo. */
        class wxInfo implements IwxInfo {

            /**
             * Constructs a new wxInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IwxInfo);

            /** wxInfo nickName. */
            public nickName: string;

            /** wxInfo imageUrl. */
            public imageUrl: string;

            /**
             * Creates a new wxInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns wxInfo instance
             */
            public static create(properties?: com.msg.IwxInfo): com.msg.wxInfo;

            /**
             * Encodes the specified wxInfo message. Does not implicitly {@link com.msg.wxInfo.verify|verify} messages.
             * @param message wxInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IwxInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified wxInfo message, length delimited. Does not implicitly {@link com.msg.wxInfo.verify|verify} messages.
             * @param message wxInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IwxInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a wxInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns wxInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.wxInfo;

            /**
             * Decodes a wxInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns wxInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.wxInfo;

            /**
             * Verifies a wxInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a playerInfo. */
        interface IplayerInfo {

            /** playerInfo openId */
            openId: string;

            /** playerInfo newbiGuideInfo */
            newbiGuideInfo: com.msg.InewbiGuideInfo;

            /** playerInfo moneyInfo */
            moneyInfo: com.msg.ImoneyInfo;

            /** playerInfo levelInfo */
            levelInfo: com.msg.IlevelInfo;

            /** playerInfo playerWeaponInfo */
            playerWeaponInfo: com.msg.IplayerWeaponInfo;

            /** playerInfo inviteList */
            inviteList?: (com.msg.IinviteDetail[]|null);

            /** playerInfo verifyInfo */
            verifyInfo: com.msg.IverifyInfo;
        }

        /** Represents a playerInfo. */
        class playerInfo implements IplayerInfo {

            /**
             * Constructs a new playerInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IplayerInfo);

            /** playerInfo openId. */
            public openId: string;

            /** playerInfo newbiGuideInfo. */
            public newbiGuideInfo: com.msg.InewbiGuideInfo;

            /** playerInfo moneyInfo. */
            public moneyInfo: com.msg.ImoneyInfo;

            /** playerInfo levelInfo. */
            public levelInfo: com.msg.IlevelInfo;

            /** playerInfo playerWeaponInfo. */
            public playerWeaponInfo: com.msg.IplayerWeaponInfo;

            /** playerInfo inviteList. */
            public inviteList: com.msg.IinviteDetail[];

            /** playerInfo verifyInfo. */
            public verifyInfo: com.msg.IverifyInfo;

            /**
             * Creates a new playerInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns playerInfo instance
             */
            public static create(properties?: com.msg.IplayerInfo): com.msg.playerInfo;

            /**
             * Encodes the specified playerInfo message. Does not implicitly {@link com.msg.playerInfo.verify|verify} messages.
             * @param message playerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IplayerInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified playerInfo message, length delimited. Does not implicitly {@link com.msg.playerInfo.verify|verify} messages.
             * @param message playerInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IplayerInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a playerInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns playerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.playerInfo;

            /**
             * Decodes a playerInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns playerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.playerInfo;

            /**
             * Verifies a playerInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a newbiGuideInfo. */
        interface InewbiGuideInfo {

            /** newbiGuideInfo nextStep */
            nextStep: number;
        }

        /** Represents a newbiGuideInfo. */
        class newbiGuideInfo implements InewbiGuideInfo {

            /**
             * Constructs a new newbiGuideInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.InewbiGuideInfo);

            /** newbiGuideInfo nextStep. */
            public nextStep: number;

            /**
             * Creates a new newbiGuideInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns newbiGuideInfo instance
             */
            public static create(properties?: com.msg.InewbiGuideInfo): com.msg.newbiGuideInfo;

            /**
             * Encodes the specified newbiGuideInfo message. Does not implicitly {@link com.msg.newbiGuideInfo.verify|verify} messages.
             * @param message newbiGuideInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.InewbiGuideInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified newbiGuideInfo message, length delimited. Does not implicitly {@link com.msg.newbiGuideInfo.verify|verify} messages.
             * @param message newbiGuideInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.InewbiGuideInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a newbiGuideInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns newbiGuideInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.newbiGuideInfo;

            /**
             * Decodes a newbiGuideInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns newbiGuideInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.newbiGuideInfo;

            /**
             * Verifies a newbiGuideInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a moneyInfo. */
        interface ImoneyInfo {

            /** moneyInfo goldNum */
            goldNum: number;

            /** moneyInfo diamondNum */
            diamondNum: number;

            /** moneyInfo pointNum */
            pointNum: number;

            /** 最近一次体力恢复时间戳(秒 东八区) == Java new Date().getTime(); */
            latestPointRefreshTime: (number|Long);

            /** moneyInfo spawnList */
            spawnList?: (com.msg.ImoneySpawnInfo[]|null);

            /** moneyInfo lotteryNum */
            lotteryNum: number;
        }

        /** Represents a moneyInfo. */
        class moneyInfo implements ImoneyInfo {

            /**
             * Constructs a new moneyInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.ImoneyInfo);

            /** moneyInfo goldNum. */
            public goldNum: number;

            /** moneyInfo diamondNum. */
            public diamondNum: number;

            /** moneyInfo pointNum. */
            public pointNum: number;

            /** 最近一次体力恢复时间戳(秒 东八区) == Java new Date().getTime(); */
            public latestPointRefreshTime: (number|Long);

            /** moneyInfo spawnList. */
            public spawnList: com.msg.ImoneySpawnInfo[];

            /** moneyInfo lotteryNum. */
            public lotteryNum: number;

            /**
             * Creates a new moneyInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns moneyInfo instance
             */
            public static create(properties?: com.msg.ImoneyInfo): com.msg.moneyInfo;

            /**
             * Encodes the specified moneyInfo message. Does not implicitly {@link com.msg.moneyInfo.verify|verify} messages.
             * @param message moneyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.ImoneyInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified moneyInfo message, length delimited. Does not implicitly {@link com.msg.moneyInfo.verify|verify} messages.
             * @param message moneyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.ImoneyInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a moneyInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns moneyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.moneyInfo;

            /**
             * Decodes a moneyInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns moneyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.moneyInfo;

            /**
             * Verifies a moneyInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a moneySpawnInfo. */
        interface ImoneySpawnInfo {

            /** moneySpawnInfo spawnID */
            spawnID: number;

            /** moneySpawnInfo moneyType */
            moneyType: number;

            /** moneySpawnInfo moneyNum */
            moneyNum: number;

            /** moneySpawnInfo spawnType */
            spawnType: number;

            /** moneySpawnInfo latestPointRefreshTime */
            latestPointRefreshTime: (number|Long);

            /** moneySpawnInfo createTime */
            createTime: (number|Long);
        }

        /** Represents a moneySpawnInfo. */
        class moneySpawnInfo implements ImoneySpawnInfo {

            /**
             * Constructs a new moneySpawnInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.ImoneySpawnInfo);

            /** moneySpawnInfo spawnID. */
            public spawnID: number;

            /** moneySpawnInfo moneyType. */
            public moneyType: number;

            /** moneySpawnInfo moneyNum. */
            public moneyNum: number;

            /** moneySpawnInfo spawnType. */
            public spawnType: number;

            /** moneySpawnInfo latestPointRefreshTime. */
            public latestPointRefreshTime: (number|Long);

            /** moneySpawnInfo createTime. */
            public createTime: (number|Long);

            /**
             * Creates a new moneySpawnInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns moneySpawnInfo instance
             */
            public static create(properties?: com.msg.ImoneySpawnInfo): com.msg.moneySpawnInfo;

            /**
             * Encodes the specified moneySpawnInfo message. Does not implicitly {@link com.msg.moneySpawnInfo.verify|verify} messages.
             * @param message moneySpawnInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.ImoneySpawnInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified moneySpawnInfo message, length delimited. Does not implicitly {@link com.msg.moneySpawnInfo.verify|verify} messages.
             * @param message moneySpawnInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.ImoneySpawnInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a moneySpawnInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns moneySpawnInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.moneySpawnInfo;

            /**
             * Decodes a moneySpawnInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns moneySpawnInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.moneySpawnInfo;

            /**
             * Verifies a moneySpawnInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a levelInfo. */
        interface IlevelInfo {

            /** levelInfo latestUnCompeleteLevel */
            latestUnCompeleteLevel: number;
        }

        /** Represents a levelInfo. */
        class levelInfo implements IlevelInfo {

            /**
             * Constructs a new levelInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IlevelInfo);

            /** levelInfo latestUnCompeleteLevel. */
            public latestUnCompeleteLevel: number;

            /**
             * Creates a new levelInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns levelInfo instance
             */
            public static create(properties?: com.msg.IlevelInfo): com.msg.levelInfo;

            /**
             * Encodes the specified levelInfo message. Does not implicitly {@link com.msg.levelInfo.verify|verify} messages.
             * @param message levelInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IlevelInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified levelInfo message, length delimited. Does not implicitly {@link com.msg.levelInfo.verify|verify} messages.
             * @param message levelInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IlevelInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a levelInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns levelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.levelInfo;

            /**
             * Decodes a levelInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns levelInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.levelInfo;

            /**
             * Verifies a levelInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a playerWeaponInfo. */
        interface IplayerWeaponInfo {

            /** playerWeaponInfo mainWeapon */
            mainWeapon: com.msg.IweaponDetail;

            /** playerWeaponInfo curSideWeaponId */
            curSideWeaponId: number;

            /** playerWeaponInfo sideWeapons */
            sideWeapons?: (com.msg.IweaponDetail[]|null);

            /** playerWeaponInfo spawnLvl */
            spawnLvl: number;
        }

        /** Represents a playerWeaponInfo. */
        class playerWeaponInfo implements IplayerWeaponInfo {

            /**
             * Constructs a new playerWeaponInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IplayerWeaponInfo);

            /** playerWeaponInfo mainWeapon. */
            public mainWeapon: com.msg.IweaponDetail;

            /** playerWeaponInfo curSideWeaponId. */
            public curSideWeaponId: number;

            /** playerWeaponInfo sideWeapons. */
            public sideWeapons: com.msg.IweaponDetail[];

            /** playerWeaponInfo spawnLvl. */
            public spawnLvl: number;

            /**
             * Creates a new playerWeaponInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns playerWeaponInfo instance
             */
            public static create(properties?: com.msg.IplayerWeaponInfo): com.msg.playerWeaponInfo;

            /**
             * Encodes the specified playerWeaponInfo message. Does not implicitly {@link com.msg.playerWeaponInfo.verify|verify} messages.
             * @param message playerWeaponInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IplayerWeaponInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified playerWeaponInfo message, length delimited. Does not implicitly {@link com.msg.playerWeaponInfo.verify|verify} messages.
             * @param message playerWeaponInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IplayerWeaponInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a playerWeaponInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns playerWeaponInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.playerWeaponInfo;

            /**
             * Decodes a playerWeaponInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns playerWeaponInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.playerWeaponInfo;

            /**
             * Verifies a playerWeaponInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a weaponDetail. */
        interface IweaponDetail {

            /** weaponDetail id */
            id: number;

            /** weaponDetail level */
            level: number;

            /** weaponDetail evolveLevel */
            evolveLevel: number;
        }

        /** Represents a weaponDetail. */
        class weaponDetail implements IweaponDetail {

            /**
             * Constructs a new weaponDetail.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IweaponDetail);

            /** weaponDetail id. */
            public id: number;

            /** weaponDetail level. */
            public level: number;

            /** weaponDetail evolveLevel. */
            public evolveLevel: number;

            /**
             * Creates a new weaponDetail instance using the specified properties.
             * @param [properties] Properties to set
             * @returns weaponDetail instance
             */
            public static create(properties?: com.msg.IweaponDetail): com.msg.weaponDetail;

            /**
             * Encodes the specified weaponDetail message. Does not implicitly {@link com.msg.weaponDetail.verify|verify} messages.
             * @param message weaponDetail message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IweaponDetail, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified weaponDetail message, length delimited. Does not implicitly {@link com.msg.weaponDetail.verify|verify} messages.
             * @param message weaponDetail message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IweaponDetail, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a weaponDetail message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns weaponDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.weaponDetail;

            /**
             * Decodes a weaponDetail message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns weaponDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.weaponDetail;

            /**
             * Verifies a weaponDetail message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of an inviteDetail. */
        interface IinviteDetail {

            /** inviteDetail friendOpenID */
            friendOpenID: string;

            /** inviteDetail picUrl */
            picUrl: string;

            /** inviteDetail rewardGained */
            rewardGained: number;

            /** inviteDetail rewardNum */
            rewardNum: number;

            /** inviteDetail index */
            index: number;

            /** inviteDetail bindPhone */
            bindPhone?: (number|null);
        }

        /** Represents an inviteDetail. */
        class inviteDetail implements IinviteDetail {

            /**
             * Constructs a new inviteDetail.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IinviteDetail);

            /** inviteDetail friendOpenID. */
            public friendOpenID: string;

            /** inviteDetail picUrl. */
            public picUrl: string;

            /** inviteDetail rewardGained. */
            public rewardGained: number;

            /** inviteDetail rewardNum. */
            public rewardNum: number;

            /** inviteDetail index. */
            public index: number;

            /** inviteDetail bindPhone. */
            public bindPhone: number;

            /**
             * Creates a new inviteDetail instance using the specified properties.
             * @param [properties] Properties to set
             * @returns inviteDetail instance
             */
            public static create(properties?: com.msg.IinviteDetail): com.msg.inviteDetail;

            /**
             * Encodes the specified inviteDetail message. Does not implicitly {@link com.msg.inviteDetail.verify|verify} messages.
             * @param message inviteDetail message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IinviteDetail, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified inviteDetail message, length delimited. Does not implicitly {@link com.msg.inviteDetail.verify|verify} messages.
             * @param message inviteDetail message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IinviteDetail, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes an inviteDetail message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns inviteDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.inviteDetail;

            /**
             * Decodes an inviteDetail message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns inviteDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.inviteDetail;

            /**
             * Verifies an inviteDetail message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a verifyInfo. */
        interface IverifyInfo {

            /** verifyInfo state */
            state: number;
        }

        /** Represents a verifyInfo. */
        class verifyInfo implements IverifyInfo {

            /**
             * Constructs a new verifyInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IverifyInfo);

            /** verifyInfo state. */
            public state: number;

            /**
             * Creates a new verifyInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns verifyInfo instance
             */
            public static create(properties?: com.msg.IverifyInfo): com.msg.verifyInfo;

            /**
             * Encodes the specified verifyInfo message. Does not implicitly {@link com.msg.verifyInfo.verify|verify} messages.
             * @param message verifyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IverifyInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified verifyInfo message, length delimited. Does not implicitly {@link com.msg.verifyInfo.verify|verify} messages.
             * @param message verifyInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IverifyInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a verifyInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns verifyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.verifyInfo;

            /**
             * Decodes a verifyInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns verifyInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.verifyInfo;

            /**
             * Verifies a verifyInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a serverConfig. */
        interface IserverConfig {

            /** serverConfig shareEnable */
            shareEnable: number;

            /** serverConfig luckyEnable */
            luckyEnable: number;

            /** serverConfig inviteType */
            inviteType: number;

            /** serverConfig verifyReward */
            verifyReward: number;

            /** serverConfig exchange_Coin */
            exchange_Coin: number;

            /** serverConfig exchange_Point */
            exchange_Point: number;

            /** serverConfig verifyColddown */
            verifyColddown: number;
        }

        /** Represents a serverConfig. */
        class serverConfig implements IserverConfig {

            /**
             * Constructs a new serverConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IserverConfig);

            /** serverConfig shareEnable. */
            public shareEnable: number;

            /** serverConfig luckyEnable. */
            public luckyEnable: number;

            /** serverConfig inviteType. */
            public inviteType: number;

            /** serverConfig verifyReward. */
            public verifyReward: number;

            /** serverConfig exchange_Coin. */
            public exchange_Coin: number;

            /** serverConfig exchange_Point. */
            public exchange_Point: number;

            /** serverConfig verifyColddown. */
            public verifyColddown: number;

            /**
             * Creates a new serverConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns serverConfig instance
             */
            public static create(properties?: com.msg.IserverConfig): com.msg.serverConfig;

            /**
             * Encodes the specified serverConfig message. Does not implicitly {@link com.msg.serverConfig.verify|verify} messages.
             * @param message serverConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IserverConfig, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified serverConfig message, length delimited. Does not implicitly {@link com.msg.serverConfig.verify|verify} messages.
             * @param message serverConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IserverConfig, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a serverConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns serverConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.serverConfig;

            /**
             * Decodes a serverConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns serverConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.serverConfig;

            /**
             * Verifies a serverConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a lotteryRewardInfo. */
        interface IlotteryRewardInfo {

            /** lotteryRewardInfo rewardConfigID */
            rewardConfigID: number;

            /** lotteryRewardInfo lotteryTime */
            lotteryTime: (number|Long);

            /** lotteryRewardInfo messageDeleteTime */
            messageDeleteTime: (number|Long);
        }

        /** Represents a lotteryRewardInfo. */
        class lotteryRewardInfo implements IlotteryRewardInfo {

            /**
             * Constructs a new lotteryRewardInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IlotteryRewardInfo);

            /** lotteryRewardInfo rewardConfigID. */
            public rewardConfigID: number;

            /** lotteryRewardInfo lotteryTime. */
            public lotteryTime: (number|Long);

            /** lotteryRewardInfo messageDeleteTime. */
            public messageDeleteTime: (number|Long);

            /**
             * Creates a new lotteryRewardInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns lotteryRewardInfo instance
             */
            public static create(properties?: com.msg.IlotteryRewardInfo): com.msg.lotteryRewardInfo;

            /**
             * Encodes the specified lotteryRewardInfo message. Does not implicitly {@link com.msg.lotteryRewardInfo.verify|verify} messages.
             * @param message lotteryRewardInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IlotteryRewardInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified lotteryRewardInfo message, length delimited. Does not implicitly {@link com.msg.lotteryRewardInfo.verify|verify} messages.
             * @param message lotteryRewardInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IlotteryRewardInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a lotteryRewardInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns lotteryRewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.lotteryRewardInfo;

            /**
             * Decodes a lotteryRewardInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns lotteryRewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.lotteryRewardInfo;

            /**
             * Verifies a lotteryRewardInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }

        /** Properties of a rewardInfo. */
        interface IrewardInfo {

            /** rewardInfo diamondNum */
            diamondNum?: (number|null);

            /** rewardInfo goldNum */
            goldNum?: (number|null);

            /** rewardInfo pointNum */
            pointNum?: (number|null);

            /** rewardInfo lotteryNum */
            lotteryNum?: (number|null);
        }

        /** Represents a rewardInfo. */
        class rewardInfo implements IrewardInfo {

            /**
             * Constructs a new rewardInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: com.msg.IrewardInfo);

            /** rewardInfo diamondNum. */
            public diamondNum: number;

            /** rewardInfo goldNum. */
            public goldNum: number;

            /** rewardInfo pointNum. */
            public pointNum: number;

            /** rewardInfo lotteryNum. */
            public lotteryNum: number;

            /**
             * Creates a new rewardInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns rewardInfo instance
             */
            public static create(properties?: com.msg.IrewardInfo): com.msg.rewardInfo;

            /**
             * Encodes the specified rewardInfo message. Does not implicitly {@link com.msg.rewardInfo.verify|verify} messages.
             * @param message rewardInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: com.msg.IrewardInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified rewardInfo message, length delimited. Does not implicitly {@link com.msg.rewardInfo.verify|verify} messages.
             * @param message rewardInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: com.msg.IrewardInfo, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a rewardInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns rewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): com.msg.rewardInfo;

            /**
             * Decodes a rewardInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns rewardInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): com.msg.rewardInfo;

            /**
             * Verifies a rewardInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }
}
