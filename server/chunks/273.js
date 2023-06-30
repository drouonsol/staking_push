"use strict";
exports.id = 273;
exports.ids = [273];
exports.modules = {

/***/ 8283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__);

const MockWallet = {
    publicKey: _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.Keypair.generate().publicKey,
    signTransaction: ()=>Promise.reject(),
    signAllTransactions: ()=>Promise.reject()
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MockWallet);


/***/ }),

/***/ 1273:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ WorkspaceProvider),
/* harmony export */   "c": () => (/* binding */ useWorkspace)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1024);
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_project_serum_anchor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _movie_review__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3634);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1247);
/* harmony import */ var _MockWallet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8283);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__]);
_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const WorkspaceContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
const programId = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_4__.PublicKey("9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU");
const WorkspaceProvider = ({ children  })=>{
    const wallet = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__.useAnchorWallet)() || _MockWallet__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z;
    const { connection  } = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_5__.useConnection)();
    const provider = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_2__.AnchorProvider(connection, wallet, {});
    (0,_project_serum_anchor__WEBPACK_IMPORTED_MODULE_2__.setProvider)(provider);
    const program = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_2__.Program(_movie_review__WEBPACK_IMPORTED_MODULE_3__/* .IDL */ .x, programId);
    const workspace = {
        connection,
        provider,
        program
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(WorkspaceContext.Provider, {
        value: workspace,
        children: children
    });
};
const useWorkspace = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(WorkspaceContext);
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ IDL)
/* harmony export */ });
const IDL = {
    "version": "0.1.0",
    "name": "anchor_nft_staking",
    "instructions": [
        {
            "name": "createStakingAccount",
            "accounts": [
                {
                    "name": "stakeAccountList",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "user"
                            },
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "infamousstakingnew"
                            }
                        ]
                    }
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "stake",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "nftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftMetadataAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftEdition",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakeAccountState",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "user"
                            },
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "stake_global2"
                            }
                        ]
                    }
                },
                {
                    "name": "stakeAccountList",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "globalState",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "account_global"
                            }
                        ]
                    }
                },
                {
                    "name": "programAuthority",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "authority"
                            }
                        ]
                    }
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "metadataProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "increaseStakeCapacity",
            "accounts": [
                {
                    "name": "stakeAccountList",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "redeem",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakeAccountState",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "user"
                            },
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "stake_global2"
                            }
                        ]
                    }
                },
                {
                    "name": "stakeMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakeAuthority",
                    "isMut": false,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "mint"
                            }
                        ]
                    }
                },
                {
                    "name": "userStakeAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "prepunstake",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "nftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftEdition",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakeAccountState",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "user"
                            },
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "stake_global2"
                            }
                        ]
                    }
                },
                {
                    "name": "stakeAccountList",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "globalState",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "account_global"
                            }
                        ]
                    }
                },
                {
                    "name": "programAuthority",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "authority"
                            }
                        ]
                    }
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "metadataProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "unstake",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "nftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftEdition",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakeAccountState",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "user"
                            },
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "stake_global2"
                            }
                        ]
                    }
                },
                {
                    "name": "programAuthority",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "authority"
                            }
                        ]
                    }
                },
                {
                    "name": "stakeMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakeAuthority",
                    "isMut": false,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "mint"
                            }
                        ]
                    }
                },
                {
                    "name": "userStakeAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "metadataProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "UserStakeInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stakeStartTime",
                        "type": "i64"
                    },
                    {
                        "name": "tokensOwed",
                        "type": "i64"
                    },
                    {
                        "name": "stakedAmount",
                        "type": "i8"
                    },
                    {
                        "name": "userPubkey",
                        "type": "publicKey"
                    },
                    {
                        "name": "prevKey",
                        "type": "bool"
                    },
                    {
                        "name": "prevKeyClaimed",
                        "type": "bool"
                    },
                    {
                        "name": "isInitialized",
                        "type": "bool"
                    },
                    {
                        "name": "prevunstake",
                        "type": {
                            "defined": "MintInfo2"
                        }
                    }
                ]
            }
        },
        {
            "name": "WalletList",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amountstaked",
                        "type": "i64"
                    },
                    {
                        "name": "accountGrown",
                        "type": "bool"
                    },
                    {
                        "name": "specialBoosters",
                        "type": "i64"
                    },
                    {
                        "name": "newUser",
                        "type": {
                            "array": [
                                "i8",
                                7
                            ]
                        }
                    },
                    {
                        "name": "mintlist",
                        "type": {
                            "array": [
                                "publicKey",
                                63
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "StakedTokenINfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stakedNfts",
                        "type": "i8"
                    },
                    {
                        "name": "stakedList",
                        "type": {
                            "array": [
                                "publicKey",
                                6
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "GlobalStake",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "globalNftCount",
                        "type": "i64"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "MintInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tokenMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "preped",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "MintInfo2",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tokenMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "preped",
                        "type": "bool"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "AlreadyStaked",
            "msg": "NFT already staked"
        },
        {
            "code": 6001,
            "name": "UninitializedAccount",
            "msg": "State account is uninitialized"
        },
        {
            "code": 6002,
            "name": "InvalidStakeState",
            "msg": "Stake state is invalid"
        },
        {
            "code": 6003,
            "name": "InvalidOwner",
            "msg": "Nft not owned by user"
        },
        {
            "code": 6004,
            "name": "NoPrepForUnstake",
            "msg": "NFT has not been prepaired to be unstaked"
        },
        {
            "code": 6005,
            "name": "UnclaimedNFT",
            "msg": "Haven't Claiemd Last NFT"
        },
        {
            "code": 6006,
            "name": "TokenNotEligble",
            "msg": "NFT is not Eligble For Staking"
        },
        {
            "code": 6007,
            "name": "AlreadyInit",
            "msg": "Account Has Already Been Initiliazed"
        }
    ],
    "metadata": {
        "address": "9AdA14dP96xHcB4DMpJMYt1aRN46PuF74JXov7z3KCHU"
    }
};


/***/ })

};
;