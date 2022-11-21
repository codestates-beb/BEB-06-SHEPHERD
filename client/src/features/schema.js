import Schema from 'validate';

export const transaction = new Schema(
  {
    id: {
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
