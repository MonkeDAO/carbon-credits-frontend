export type Carbon = {
  version: "0.1.0";
  name: "carbon";
  instructions: [
    {
      name: "initConfig";
      accounts: [
        {
          name: "mintConfig";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "newNftCreator";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "creator";
          type: "publicKey";
        },
        {
          name: "purchaseTokenMint";
          type: "publicKey";
        },
        {
          name: "oneCreditPrice";
          type: "u64";
        }
      ];
    },
    {
      name: "deleteConfig";
      accounts: [
        {
          name: "burnConfig";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "carbonCredit";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "purchaseTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "purchaseTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "carbonReceipt";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mintConfig";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newNftMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newNftMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newNftMasterEdition";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newNftCreator";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: false;
        },
        {
          name: "adminSplTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "nftProgramId";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "time";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "expireCarbonCredit";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "carbonReceipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintConfig";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nftMetadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newNftCreator";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "nftProgramId";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "time";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "markFulfilled";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "carbonReceipt";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "markUnfulfilled";
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "carbonReceipt";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "mintConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newNftCreatorBump";
            type: "u8";
          },
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "purchaseTokenMint";
            type: "publicKey";
          },
          {
            name: "oneCreditPrice";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "carbonReceipt";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "publicKey";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "time";
            type: "i64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "isExpired";
            type: "bool";
          },
          {
            name: "isFulfilled";
            type: "bool";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "NoValidSigner";
      msg: "No valid signer present";
    },
    {
      code: 6001;
      name: "IncorrectAdmin";
      msg: "Incorrect Admin wallet";
    },
    {
      code: 6002;
      name: "InvalidUserPurchaseMintTokenAccount";
      msg: "Invalid User Account for Purchase";
    }
  ];
};

export const IDL: Carbon = {
  version: "0.1.0",
  name: "carbon",
  instructions: [
    {
      name: "initConfig",
      accounts: [
        {
          name: "mintConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "newNftCreator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "creator",
          type: "publicKey",
        },
        {
          name: "purchaseTokenMint",
          type: "publicKey",
        },
        {
          name: "oneCreditPrice",
          type: "u64",
        },
      ],
    },
    {
      name: "deleteConfig",
      accounts: [
        {
          name: "burnConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "carbonCredit",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "purchaseTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "purchaseTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "carbonReceipt",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mintConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newNftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newNftMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newNftMasterEdition",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newNftCreator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "adminSplTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftProgramId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "time",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "expireCarbonCredit",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "carbonReceipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newNftCreator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftProgramId",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "time",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "markFulfilled",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "carbonReceipt",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "markUnfulfilled",
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "carbonReceipt",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "mintConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "newNftCreatorBump",
            type: "u8",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "purchaseTokenMint",
            type: "publicKey",
          },
          {
            name: "oneCreditPrice",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "carbonReceipt",
      type: {
        kind: "struct",
        fields: [
          {
            name: "buyer",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "time",
            type: "i64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "isExpired",
            type: "bool",
          },
          {
            name: "isFulfilled",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NoValidSigner",
      msg: "No valid signer present",
    },
    {
      code: 6001,
      name: "IncorrectAdmin",
      msg: "Incorrect Admin wallet",
    },
    {
      code: 6002,
      name: "InvalidUserPurchaseMintTokenAccount",
      msg: "Invalid User Account for Purchase",
    },
  ],
};
