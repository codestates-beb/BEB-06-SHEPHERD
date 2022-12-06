import Schema from 'validate';

export const transaction = new Schema(
  {
    blockNumber: {
      type: Number,
      required: true
    },
    blockHash: {
      type: String,
      required: true
    },
    transactionHash: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    to: {
      location: {
        type: String,
        required: false
      },
      accountAddress: {
        type: String,
        required: true
      }
    },
    from: {
      location: {
        type: String,
        required: false
      },
      accountAddress: {
        type: String,
        required: true
      }
    },
    orderer: {
      type: String,
      required: true
    }
  }
);

export const order = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String
    },
    type: {
      type: String,
      enum: ['Z', 'X']
    },
    from: {
      locationAddress: {
        type: String,
        required: true
      },
      accountAddress: {
        type: String,
        required: true
      }
    },
    to: {
      locationAddress: {
        type: String,
        required: true
      },
      accountAddress: {
        type: String,
        required: true
      }
    },
    orderer: {
      type: String,
      required: true
    }
  }
);

const generalEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailFormat = string => generalEmailRegex.test(string);

export const loginForm = new Schema(
  {
    email: {
      type: String,
      use: { emailFormat },
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
);
