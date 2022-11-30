import Schema from 'validate';

export const transaction = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    arrival: {
      date: {
        type: Date,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    },
    currentLocation: {
      type: String,
      required: true
    },
    departure: {
      date: {
        type: Date,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    },
    orderDate: {
      type: Date,
      required: true
    },
    orderer: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Ongoing', 'Ready', 'Complete'],
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
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
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
